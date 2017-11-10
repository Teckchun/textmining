package com.kshrd.repository;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.jdbc.SQL;

import com.kshrd.Utility.Pagination;
import com.kshrd.entity.AdvancedSearchParams;
import com.kshrd.entity.Board;

public class BoardSQLBuilder {

	public String advancedSearch(AdvancedSearchParams advancedSearchParams,Pagination pagination) {
	
		
		String dcinside =new SQL() {{
			SELECT(" a.board_num,a.board_view,a.board_recommand,a.board_url,a.board_title, a.insert_date, 'dcinside' as type ");
			FROM("dcinside_list a");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}
			
			// HOW ABOUT THIS ONE PU??? ohh mayb I forgot lol
			WHERE(" (a.insert_date >= '"+advancedSearchParams.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+advancedSearchParams.getEndDate()+"'"+")");
			
			GROUP_BY("board_num");
			
		}}.toString();
		
		
		String ppomppu =new SQL() {{
			SELECT(" a.board_num,a.board_view,a.board_recommand,a.board_url,a.board_title, a.insert_date, 'ppomppu' as type ");
			FROM("ppomppu_list a");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}


			WHERE(" (a.insert_date >= '"+advancedSearchParams.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+advancedSearchParams.getEndDate()+"'"+")");
			GROUP_BY("board_num");
			
		}}.toString();
		
		String momcafe =new SQL() {{
			SELECT(" a.board_num,a.board_view,a.board_recommand,a.board_url,a.board_title, a.insert_date ,'momcafe' as type ");
			FROM("momcafe_list a");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}
			

			WHERE(" (a.insert_date >= '"+advancedSearchParams.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+advancedSearchParams.getEndDate()+"'"+")");
			GROUP_BY("board_num");
			
		}}.toString();
		String momsholic =new SQL() {{
			SELECT(" a.board_num,a.board_view,a.board_recommand,a.board_url,a.board_title, a.insert_date ,'momcafe' as type ");
			FROM("momcafe_list a");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}
			

			WHERE(" (a.insert_date >= '"+advancedSearchParams.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+advancedSearchParams.getEndDate()+"'"+")");
			
			WHERE(" a.category =2 ");
			GROUP_BY("board_num");
			
		}}.toString();
		
		String jihumom =new SQL() {{
			SELECT(" a.board_num,a.board_view,a.board_recommand,a.board_url,a.board_title, a.insert_date ,'momcafe' as type ");
			FROM("momcafe_list a");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}
			

			WHERE(" (a.insert_date >= '"+advancedSearchParams.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+advancedSearchParams.getEndDate()+"'"+")");
			WHERE(" a.category =1 ");
			GROUP_BY("board_num");
			
			
		}}.toString();
		
		
		
		String limit = pagination.getLimit()+"";
		String offset = pagination.getOffset()+"";
		
		
		System.out.println("SELECT * FROM ("+dcinside+" union "+ ppomppu + " union "+jihumom+ " union "+momsholic+") AS A"+" order by insert_date desc");
		
		return "SELECT * FROM ("+dcinside+" union "+ ppomppu + " union "+jihumom+ " union "+momsholic+") AS A"+" order by 2 desc"+
		" limit "+limit+" offset "+offset;
	}
	//TODO: THIS ONE RIGHT TECKCHUN?? yes this one, I want to count from 3 tables and the count should be base on the data from the 
	// JOS ITS WHERE CLAUSE THE SAME WITH SELECT DATA TE ? ITS WHERE CLAUSE MUST BE THE SAME NA yes
	public String advancedSearchBoardCount(AdvancedSearchParams advancedSearchParams) {
		String dcinside =new SQL() {{
			SELECT(" a.board_num,a.board_view,a.board_recommand,a.board_url,a.board_title, a.insert_date ,'dcinside' as type ");
			FROM("dcinside_list a ");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}

			WHERE(" (a.insert_date >= '"+advancedSearchParams.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+advancedSearchParams.getEndDate()+"'"+")");
			GROUP_BY("board_num");
		}}.toString();
		
		String ppomppu =new SQL() {{
			SELECT("  a.board_num,a.board_view,a.board_recommand,a.board_url,a.board_title, a.insert_date ,'ppomppu' as type ");
			FROM("ppomppu_list a ");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}

			WHERE(" (a.insert_date >= '"+advancedSearchParams.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+advancedSearchParams.getEndDate()+"'"+")");
			GROUP_BY("board_num");
			
			
		}}.toString();
		
		String momcafe =new SQL() {{
			SELECT("  a.board_num,a.board_view,a.board_recommand,a.board_url,a.board_title, a.insert_date ,'momcafe' as type ");
			FROM("momcafe_list a ");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}

			WHERE(" (a.insert_date >= '"+advancedSearchParams.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+advancedSearchParams.getEndDate()+"'"+")");
			WHERE(" (a.category=1 OR a.category=2)");
			GROUP_BY("board_num");
			
		}}.toString();
		System.out.println("SELECT COUNT(*) FROM "+"("+dcinside+" union "+ ppomppu + " union "+momcafe+") AS A");
		return "SELECT COUNT(*) FROM "+"("+dcinside+" union "+ ppomppu + " union "+momcafe+") AS A";
	
	
	}
	
	
	public String getBoards(@Param("boards") Board board, @Param("pagination") Pagination pagination) {
		
		
		
		if(board.getBoardTitle().equals("")){
			
			String dcinside = new SQL(){{
				SELECT(" dc_index as board_index,  board_title,board_view,board_recommand,board_url,insert_date,'dcinside' as type ");
				FROM(" dcinside_list a ");
			
				WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
				WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");;
				
			}}.toString();
			
			
			String ppomppu = new SQL() {{
				SELECT(" ppom_index as board_index,  board_title,board_view,board_recommand,board_url,insert_date,'ppomppu' as type ");
				FROM(" ppomppu_list a ");
			
				WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
				WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
				
				
			}}.toString();
			
			String momcafe = new SQL() {{
				SELECT(" mml_index as board_index,  board_title,board_view,board_recommand,board_url,insert_date,'momcafe' as type");
				FROM(" momcafe_list a ");
				WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
				WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
				WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			
				
			}}.toString();
			
			String jihumom = new SQL() {{
				SELECT(" mml_index as board_index,  board_title,board_view,board_recommand,board_url,insert_date,'jihumom' as type");
				FROM(" momcafe_list a ");
				WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
				WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
				WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
				WHERE(" a.category =1 ");
			}}.toString();
			
			String momsholic = new SQL() {{
				SELECT(" mml_index as board_index,  board_title,board_view,board_recommand,board_url,insert_date,'momsholic' as type");
				FROM(" momcafe_list a ");
				WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
				WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
				WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
				WHERE(" a.category = 2");
			}}.toString();
			
			
			
			String sql = "";
			if(board.getType().equals("all")) {
				sql = dcinside +" union "+ ppomppu +" union "+ momcafe+" order by insert_date desc ";
				String limit = pagination.getLimit()+"";
				String offset = pagination.getOffset()+"";
				sql += " limit "+limit+" offset "+offset;
				System.out.println(sql);
				
			}else if(board.getType().equals("dcinside")) {
				sql = dcinside+" order by insert_date desc ";
				String limit = pagination.getLimit()+"";
				String offset = pagination.getOffset()+"";
				sql += " limit "+limit+" offset "+offset;
				System.out.println(sql);
				
			}else if(board.getType().equals("ppomppu")) {
				sql = ppomppu+" order by insert_date desc ";
				String limit = pagination.getLimit()+"";
				String offset = pagination.getOffset()+"";
				sql += " limit "+limit+" offset "+offset;
				System.out.println(sql);
				
				
			}else if(board.getType().equals("momsholic")) {
				sql = momsholic+" order by insert_date desc ";
				String limit = pagination.getLimit()+"";
				String offset = pagination.getOffset()+"";
				sql += " limit "+limit+" offset "+offset;
				System.out.println(sql);
			}else if(board.getType().equals("jihumom")) {
				sql = jihumom+" order by insert_date desc ";
				String limit = pagination.getLimit()+"";
				String offset = pagination.getOffset()+"";
				sql += " limit "+limit+" offset "+offset;
				System.out.println(sql);

				
			}
			
			return sql;
				
			
		}else{
			
			
			
		String dcinside = new SQL() {{
			SELECT(" dc_index as board_index,  board_title,board_view,board_recommand,board_url,insert_date,'dcinside' as type ");
			FROM(" dcinside_list a ");
			WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
			WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			
		}}.toString();
		
		
		
		//System.out.println(dcinside);
		
		String ppomppu = new SQL() {{
			SELECT(" ppom_index as board_index,  board_title,board_view,board_recommand,board_url,insert_date,'ppomppu' as type ");
			FROM(" ppomppu_list a ");
			WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
			WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			
		}}.toString();
		
		String momcafe = new SQL() {{
			SELECT(" mml_index as board_index,  board_title,board_view,board_recommand,board_url,insert_date,'momcafe' as type ");
			FROM(" momcafe_list a ");
			WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
			WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			
		}}.toString();
		
		String momsholic = new SQL() {{
			SELECT(" mml_index as board_index,  board_title,board_view,board_recommand,board_url,insert_date,'momcafe' as type ");
			FROM(" momcafe_list a ");
			WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
			WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			WHERE(" a.category =2 ");
		}}.toString();
		String jihumom = new SQL() {{
			SELECT(" mml_index as board_index,  board_title,board_view,board_recommand,board_url,insert_date,'momcafe' as type ");
			FROM(" momcafe_list a ");
			WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
			WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			WHERE(" a.category =1 ");
		}}.toString();
		String sql = "";
		if(board.getType().equals("all")) {
			sql = dcinside +" union "+ ppomppu +" union "+ momcafe+" order by insert_date desc ";
			String limit = pagination.getLimit()+"";
			String offset = pagination.getOffset()+"";
			sql += " limit "+limit+" offset "+offset;
			
		}else if(board.getType().equals("ppomppu")) {
			sql =  ppomppu +" order by insert_date desc ";
			String limit = pagination.getLimit()+"";
			String offset = pagination.getOffset()+"";
			sql += " limit "+limit+" offset "+offset;
			
		}else if(board.getType().equals("momsholic")) {
			sql =  momsholic +" order by insert_date desc ";
			String limit = pagination.getLimit()+"";
			String offset = pagination.getOffset()+"";
			sql += " limit "+limit+" offset "+offset;
			
		}else if(board.getType().equals("jihumom")) {
			sql =  jihumom +" order by insert_date desc ";
			String limit = pagination.getLimit()+"";
			String offset = pagination.getOffset()+"";
			sql += " limit "+limit+" offset "+offset;
			
		}else if(board.getType().equals("dcinside")){
			sql =  dcinside +" order by insert_date desc ";
			String limit = pagination.getLimit()+"";
			String offset = pagination.getOffset()+"";
			sql += " limit "+limit+" offset "+offset;
			
		}
		
		System.out.println("getboards=> "+sql);
		return sql;
		
	
		}
		
		
		}
	
	
	public String countBoards(Board board) {
		
		String dcinside = new SQL() {{
			SELECT(" count(*) ");
			FROM(" dcinside_list a ");
			WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
			WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			
		}}.toString();
		
		//System.out.println(dcinside);
		
		String ppomppu = new SQL() {{
			SELECT(" count(*) ");
			FROM(" ppomppu_list a ");
			WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
			WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			
		}}.toString();
		
		String momcafe = new SQL() {{
			SELECT(" count(*) ");
			FROM(" momcafe_list a ");
			WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
			WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			
		}}.toString();
		
		String momsholic = new SQL() {{
			SELECT(" count(*) ");
			FROM(" momcafe_list a ");
			WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
			WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			WHERE(" a.category=2 ");
			
		}}.toString();
		
		String jihumom = new SQL() {{
			SELECT(" count(*) ");
			FROM(" momcafe_list a ");
			WHERE(" a.board_title like concat('%','"+board.getBoardTitle()+"','%')");
			WHERE(" (a.insert_date >= '"+board.getStartDate()+"'");
			WHERE(" a.insert_date <= '"+board.getEndDate()+"'"+")");
			WHERE(" a.category=1 ");
			
		}}.toString();
		
		String sql = "";
		if(board.getType().equals("all")) {
			sql = new SQL() {{
				SELECT("("+dcinside+")"+"+"+"("+ppomppu+")"+"+"+"("+momcafe+")");
			}}.toString();
	
		}else if(board.getType().equals("ppomppu")) {
			sql = new SQL() {{
				SELECT("("+ppomppu+")");
			}}.toString();
		}else if(board.getType().equals("momsholic")) {
			sql = new SQL() {{
				SELECT("("+momsholic+")");
			}}.toString();
		}else if(board.getType().equals("jihumom")) {
			sql = new SQL() {{
				SELECT("("+jihumom+")");
			}}.toString();
		}else if(board.getType().equals("dcinside")) {
			sql = new SQL() {{
				SELECT("("+dcinside+")");
			}}.toString();
		}
		
		 
		//System.out.println("COUNT=> "+sql);
		
		
		
		return sql;
	}
	
	
	
	
	
}
