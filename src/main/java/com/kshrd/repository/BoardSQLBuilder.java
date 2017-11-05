package com.kshrd.repository;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.jdbc.SQL;

import com.kshrd.Utility.Pagination;
import com.kshrd.entity.AdvancedSearchParams;
import com.kshrd.entity.Board;

public class BoardSQLBuilder {

	public String advancedSearch(AdvancedSearchParams advancedSearchParams) {
	
		
		String dcinside =new SQL() {{
			SELECT("*");
			FROM("dcinside_list a");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}
			GROUP_BY("board_num");
			
		}}.toString();
		
		String ppomppu =new SQL() {{
			SELECT("*");
			FROM("ppomppu_list a");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}
			GROUP_BY("board_num");
			
		}}.toString();
		
		String momcafe =new SQL() {{
			SELECT("*");
			FROM("momcafe_list a");
			JOIN("product_synonym_dic b on a.board_title LIKE concat('%',b.product_synonym,'%')");
			WHERE(" b.product_name = '"+advancedSearchParams.getKeywords()[0]+"'");
			for(int i =0; i<advancedSearchParams.getMustKeywords().length;i++) {
				WHERE(" a.board_title like concat('%','"+ advancedSearchParams.getMustKeywords()[i].toString() +"','%')");
			};
			for(int i =0; i<advancedSearchParams.getExcludeKeywords().length;i++) {
				WHERE(" a.board_title not like concat('%','"+advancedSearchParams.getExcludeKeywords()[i].toString()+"', '%')");
			}
			GROUP_BY("board_num");
			
		}}.toString();
		
		
		
		System.out.println(dcinside+" union "+ ppomppu + " union "+momcafe);
		return dcinside+" union "+ ppomppu + " union "+momcafe+" order by insert_date desc";
	}
	
	
	public String getBoards(@Param("boards") Board board, @Param("pagination") Pagination pagination) {
		
		
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
		String sql = dcinside +" union "+ ppomppu +" union "+ momcafe+" order by insert_date desc ";
		String limit = pagination.getLimit()+"";
		String offset = pagination.getOffset()+"";
		sql += " limit "+limit+" offset "+offset;
		
		
		System.out.println(sql);
		return sql;
		
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
		
		String sql = new SQL() {{
			SELECT("("+dcinside+")"+"+"+"("+ppomppu+")"+"+"+"("+momcafe+")");
		}}.toString();
		System.out.println("COUNT=> "+sql);
		return sql;
	}
	
	
	
	
	
}
