package com.kshrd.service.impl;

import com.kshrd.Utility.Pagination;
import com.kshrd.entity.AdvancedSearchParams;
import com.kshrd.entity.Board;
import com.kshrd.repository.DataMonitorRepository;
import com.kshrd.service.DataMonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Teckchun on 10/24/17.
 */
@Service
public class DataMonitorServiceimpl implements DataMonitorService {

    @Autowired
    DataMonitorRepository dataMonitorRepository;

   @Override
   public List<Map<String, Object>> getBoards(Board board, Pagination pagination) {
	// TODO Auto-generated method stub
	   System.out.println("count board "+dataMonitorRepository.countBoards(board));
	  if(pagination!=null) {
		  pagination.setTotalCount(dataMonitorRepository.countBoards(board));
	  }
	  
	return dataMonitorRepository.getBoards(board, pagination);
   }
   
   @Override
public List<Map<String, Object>> getGraphData(Board board) {
	// TODO Auto-generated method stub
	   System.out.println("service board "+board.toString());
	return dataMonitorRepository.getBoardsForGraph(board);
}
   
   @Override
	public List<Map<String, Object>> advancedSearch(AdvancedSearchParams advancedSearchParams, Pagination pagination) {
		// TODO Auto-generated method stub
	   
	   // like this, so in service I call method 2 neng jol , 1 bos jol paginatioin how about this query
	    pagination.setTotalCount(dataMonitorRepository.countAdvancedSearchBoard(advancedSearchParams));
		System.out.println("ADVANCED SEARCH TOTAL COUNT "+dataMonitorRepository.countAdvancedSearchBoard(advancedSearchParams));
	    return dataMonitorRepository.advancedSearch(advancedSearchParams,pagination);
	}

   
   // TODO: trend graph
   
   @Override
   public List<Map<String, Object>> trendGraph(AdvancedSearchParams advancedSearchParams) {
	// TODO Auto-generated method stub
	return dataMonitorRepository.trendGraph(advancedSearchParams);
   }
   
   
   
   
   
   
   
    @Override
    public List<Map<String, Object>> getPpommpuContent(String productName, String contentLike, String excludeOne, String excludeTwo, String excludeThree) {
        return dataMonitorRepository.getPpommpuContent(productName,contentLike,excludeOne,excludeTwo,excludeThree);
    }

    @Override
    public List<Map<String, Object>> getDCInsideContent(String productName, String contentLike, String excludeOne, String excludeTwo, String excludeThree) {
        return dataMonitorRepository.getDCInside(productName,contentLike,excludeOne,excludeTwo,excludeThree);
    }
    
	

    @Override
    public List<Map<String, Object>> countBoardByType() {
        return dataMonitorRepository.countBoardByType();
    }
    
    
}
