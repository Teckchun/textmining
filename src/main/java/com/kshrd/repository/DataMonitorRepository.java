package com.kshrd.repository;

import com.kshrd.Utility.Pagination;
import com.kshrd.entity.AdvancedSearchParams;
import com.kshrd.entity.Board;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Teckchun on 10/24/17.
 */

@Repository
public interface DataMonitorRepository {

   
    @SelectProvider(type=BoardSQLBuilder.class, method="getBoards")
    public List<Map<String, Object>> getBoards(@Param("boards") Board board, @Param("pagination") Pagination pagination);
 
    @SelectProvider(type=BoardSQLBuilder.class, method="countBoards")
    public int countBoards(Board board);
    
    
    @SelectProvider(type = BoardSQLBuilder.class, method="getBoardForGraph")
    public List<Map<String,Object>> getBoardsForGraph(@Param("boards") Board baord);
    
    
    
    @SelectProvider(type=BoardSQLBuilder.class, method="advancedSearch")
    public  List<Map<String,Object>> advancedSearch(@Param("filter") AdvancedSearchParams advancedSearchParams,
    		@Param("pagination") Pagination pagination);
    
    @SelectProvider(type=BoardSQLBuilder.class, method="advancedSearchBoardCount")
    public int countAdvancedSearchBoard(AdvancedSearchParams advancedSearchParams);
    
    




    @Select("select * " +
            "from ppomppu_list a join product_synonym_dic b on a.board_title like concat('%',b.product_synonym,'%') " +
            "where b.product_name=#{product_name} " +
            "and a.board_title like concat('%',#{content_like},'%') " +
            "and a.board_title not like concat('%',#{exclude_one},'%')" +
            " and a.board_title not like concat('%',#{exclude_two},'%') " +
            "and a.board_title not like concat('%',#{exclude_three},'%') group by board_num")
    public  List<Map<String,Object>> getPpommpuContent(
            @Param("product_name") String productName,
            @Param("content_like") String contentLike,
            @Param("exclude_one") String excludeOne,
            @Param("exclude_two") String excludeTwo,
            @Param("exclude_three") String excludeThree
            );


    @Select("select * " +
            "from dcinside_list a join product_synonym_dic b on a.board_title like concat('%',b.product_synonym,'%') " +
            "where b.product_name=#{product_name} " +
            "and a.board_title like concat('%',#{content_like},'%') " +
            "and a.board_title not like concat('%',#{exclude_one},'%')" +
            " and a.board_title not like concat('%',#{exclude_two},'%') " +
            "and a.board_title not like concat('%',#{exclude_three},'%') group by board_num")
    public  List<Map<String,Object>> getDCInside(
            @Param("product_name") String productName,
            @Param("content_like") String contentLike,
            @Param("exclude_one") String excludeOne,
            @Param("exclude_two") String excludeTwo,
            @Param("exclude_three") String excludeThree
    );
    
/*    @Select("select * " +
            "from dcinside_list a join product_synonym_dic b on a.board_title like concat('%',b.product_synonym,'%') " +
            "where b.product_name=#{product_name} " +
            "and a.board_title like concat('%',#{content_like},'%') " +
            "and a.board_title not like concat('%',#{exclude_one},'%')" +
            " and a.board_title not like concat('%',#{exclude_two},'%') " +
            "and a.board_title not like concat('%',#{exclude_three},'%') group by board_num union "
            + "select * " +
            "from dcinside_list a join product_synonym_dic b on a.board_title like concat('%',b.product_synonym,'%') " +
            "where b.product_name=#{product_name} " +
            "and a.board_title like concat('%',#{content_like},'%') " +
            "and a.board_title not like concat('%',#{exclude_one},'%')" +
            " and a.board_title not like concat('%',#{exclude_two},'%') " +
            "and a.board_title not like concat('%',#{exclude_three},'%') group by board_num")
            */
    
   
    



    @Select("select  count(*) as total, 'ppompu' as type from ppomppu_list\n" +
            "union\n" +
            "select count(*) as total, 'dcinside' as type from dcinside_list\n" +
            "union \n" +
            "select count(*) as total, 'jihumom' as type from momcafe_list where category = 1\n" +
            "union \n" +
            "select  count(*) as total, 'momsholic' as type from momcafe_list where category =2")
    public List<Map<String,Object>> countBoardByType();
















}
