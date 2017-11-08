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
	  pagination.setTotalCount(dataMonitorRepository.countBoards(board));
	return dataMonitorRepository.getBoards(board, pagination);
   }
   
   @Override
	public List<Map<String, Object>> advancedSearch(AdvancedSearchParams advancedSearchParams, Pagination pagination) {
		// TODO Auto-generated method stub
	    pagination.setTotalCount(dataMonitorRepository.countAdvancedSearchBoard(advancedSearchParams));
		return dataMonitorRepository.advancedSearch(advancedSearchParams,pagination);
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
