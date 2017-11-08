package com.kshrd.service;

import com.kshrd.Utility.Pagination;
import com.kshrd.entity.AdvancedSearchParams;
import com.kshrd.entity.Board;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Teckchun on 10/24/17.
 */

public interface DataMonitorService {

    // TODO: 10/24/17 get All board by title
    public List<Map<String, Object>> getBoards(Board board,Pagination pagination);
    
    
    

    // TODO: 10/24/17 get content advanced search
    public List<Map<String,Object>> getPpommpuContent(
                                                    String productName,
                                                    String contentLike,
                                                    String excludeOne,
                                                    String excludeTwo,
                                                    String excludeThree);
    public List<Map<String,Object>> getDCInsideContent(
            String productName,
            String contentLike,
            String excludeOne,
            String excludeTwo,
            String excludeThree);
    
    public List<Map<String,Object>> advancedSearch(AdvancedSearchParams advancedSearchParams,Pagination page);
  
    

    // TODO: 10/25/17 count
    public List<Map<String,Object>> countBoardByType();
    
    

}
