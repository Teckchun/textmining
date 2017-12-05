package com.kshrd.controller.rest;

import com.kshrd.Utility.*;
import com.kshrd.entity.AdvancedSearchParams;
import com.kshrd.entity.Board;
import com.kshrd.repository.DataMonitorRepository;
import com.kshrd.service.DataMonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Timestamp;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Teckchun on 10/24/17.
 */

@RestController
@RequestMapping("/rest/data-monitoring")
public class DataMonitorRestController {
    @Autowired
    DataMonitorService dataMonitorService;

//    @RequestMapping(value = "/getBoards", method = RequestMethod.GET, headers = "Accept=application/json")
    


//    @GetMapping("/getPpommpuContent")
//    public ResponseEntity<ResponseList<Map<String,Object>>> getPpommpu(
//                                                    @RequestParam(value="product_name" ,required = false) String productName,
//                                                    @RequestParam(value="content_like" ,required = false) String contentLike,
//                                                    @RequestParam(value="exclude_one" ,required = false) String exclude_one,
//                                                                            @RequestParam(value="exclude_two" ,required = false) String exclude_two,
//                                                    @RequestParam(value="exclude_three" ,required = false) String exclude_three){
//
//       // System.out.println(productName+"||"+contentLike+"||"+exclude_one+"||"+exclude_two+"||"+exclude_three);
//        ResponseList<Map<String,Object>> list = new ResponseList<>();
//        HttpStatus status = HttpStatus.OK;
//        try {
//
//            List<Map<String, Object>> map = dataMonitorService.getPpommpuContent(productName, contentLike, exclude_one,exclude_two,exclude_three);
//
//            if (!map.isEmpty()) {
//                list = new ResponseList.ResponseListSuccess<>(
//                        HttpMessage.success(Table.BOARD + "(s)", Transaction.Success.RETRIEVE), true, map,
//                        null);
//            } else {
//                list = new ResponseList.ResponseListFailure<>(
//                        HttpMessage.fail(Table.BOARD + "(s)", Transaction.Fail.RETRIEVE), false,
//                        ResponseHttpStatus.RECORD_NOT_FOUNT);
//            }
//
//        }catch(Exception e){
//            e.printStackTrace();
//        }
//
//
//        System.out.println("COUNT => "+list.getData().size());
//        return new ResponseEntity<ResponseList<Map<String,Object>>>(list, status);
//    }

//    @GetMapping("/getDCInsideContent")
//    public ResponseEntity<ResponseList<Map<String,Object>>> getDCInside(
//            @RequestParam(value="product_name" ,required = false) String productName,
//            @RequestParam(value="content_like" ,required = false) String contentLike,
//            @RequestParam(value="exclude_one" ,required = false) String exclude_one,
//            @RequestParam(value="exclude_two" ,required = false) String exclude_two,
//            @RequestParam(value="exclude_three" ,required = false) String exclude_three){
//
//        System.out.println(productName+"||"+contentLike+"||"+exclude_one+"||"+exclude_two+"||"+exclude_three);
//        ResponseList<Map<String,Object>> list = new ResponseList<>();
//        HttpStatus status = HttpStatus.OK;
//        try {
//
//            List<Map<String, Object>> map = dataMonitorService.getDCInsideContent(productName, contentLike, exclude_one,exclude_two,exclude_three);
//
//            if (!map.isEmpty()) {
//                list = new ResponseList.ResponseListSuccess<>(
//                        HttpMessage.success(Table.BOARD + "(s)", Transaction.Success.RETRIEVE), true, map,
//                        null);
//            } else {
//                list = new ResponseList.ResponseListFailure<>(
//                        HttpMessage.fail(Table.BOARD + "(s)", Transaction.Fail.RETRIEVE), false,
//                        ResponseHttpStatus.RECORD_NOT_FOUNT);
//            }
//
//        }catch(Exception e){
//            e.printStackTrace();
//        }
//
//
//        System.out.println("COUNT => "+list.getData().size());
//        return new ResponseEntity<ResponseList<Map<String,Object>>>(list, status);
//    }
    
    
/*    @GetMapping("/getAllContent")
    public ResponseEntity<ResponseList<Map<String,Object>>> getAllContent(
                                                    @RequestParam(value="product_name" ,required = false) String productName,
                                                    @RequestParam(value="content_like" ,required = false) String contentLike,
                                                    @RequestParam(value="exclude_one" ,required = false) String exclude_one,
                                                                            @RequestParam(value="exclude_two" ,required = false) String exclude_two,
                                                    @RequestParam(value="exclude_three" ,required = false) String exclude_three){

        System.out.println(productName+"||"+contentLike+"||"+exclude_one+"||"+exclude_two+"||"+exclude_three);
        ResponseList<Map<String,Object>> list = new ResponseList<>();
        HttpStatus status = HttpStatus.OK;
        try {

            List<Map<String, Object>> map = dataMonitorService.getAllType(advancedSearchParams);

            if (!map.isEmpty()) {
                list = new ResponseList.ResponseListSuccess<>(
                        HttpMessage.success(Table.BOARD + "(s)", Transaction.Success.RETRIEVE), true, map,
                        null);
            } else {
                list = new ResponseList.ResponseListFailure<>(
                        HttpMessage.fail(Table.BOARD + "(s)", Transaction.Fail.RETRIEVE), false,
                        ResponseHttpStatus.RECORD_NOT_FOUNT);
            }

        }catch(Exception e){
            e.printStackTrace();
        }


        System.out.println("COUNT => "+list.getData().size());
        return new ResponseEntity<ResponseList<Map<String,Object>>>(list, status);
    }
    
    */
    @GetMapping("/getBoards")
    public ResponseEntity<ResponseList<Map<String,Object>>> getBaords(Board board,Pagination page) {
  
    	
    	ResponseList<Map<String,Object>> list = new ResponseList<>();
        HttpStatus status = HttpStatus.OK;
        try {

        		Map<String,Object> responseMap = new HashMap<>();
            List<Map<String, Object>> map =null;
            
            
            map = dataMonitorService.getBoards(board,page);
            responseMap.put("boards",list);
            if(page!=null) {
			responseMap.put("page",page);
            }
            
           

            if (!map.isEmpty()) {
                list = new ResponseList.ResponseListSuccess<>(
                        HttpMessage.success(Table.BOARD + "(s)", Transaction.Success.RETRIEVE), true, map,
                        page);
            } else {
                list = new ResponseList.ResponseListFailure<>(
                        HttpMessage.fail(Table.BOARD + "(s)", Transaction.Fail.RETRIEVE), false,
                        ResponseHttpStatus.RECORD_NOT_FOUNT);
            }

        }catch(Exception e){
            e.printStackTrace();
        }

        //System.out.println(list.getData().toString());
      //  System.out.println("COUNT => "+list.getData().size());
        return new ResponseEntity<ResponseList<Map<String,Object>>>(list, status);
    }
    
    @GetMapping("/getGraphData")
    public ResponseEntity<ResponseList<Map<String,Object>>> getGraphData(Board board) {
    	
    	System.out.println("BOARD=>> "+board.getEndDate());
    	
    	ResponseList<Map<String,Object>> list = new ResponseList<>();
        HttpStatus status = HttpStatus.OK;
        try {

        		Map<String,Object> responseMap = new HashMap<>();
            List<Map<String, Object>> map =null;
            
            
            map = dataMonitorService.getGraphData(board);
            responseMap.put("boards",list);
           
            if (!map.isEmpty()) {
                list = new ResponseList.ResponseListSuccess<>(
                        HttpMessage.success(Table.BOARD + "(s)", Transaction.Success.RETRIEVE), true, map,null);
            } else {
                list = new ResponseList.ResponseListFailure<>(
                        HttpMessage.fail(Table.BOARD + "(s)", Transaction.Fail.RETRIEVE), false,
                        ResponseHttpStatus.RECORD_NOT_FOUNT);
            }

        }catch(Exception e){
            e.printStackTrace();
        }

        //System.out.println(list.getData().toString());
       // System.out.println("COUNT => "+list.getData().size());
        return new ResponseEntity<ResponseList<Map<String,Object>>>(list, status);
    }
    
    
    
    
    @GetMapping("/advancedSearch")
    public ResponseEntity<ResponseList<Map<String,Object>>> advancedSearch(AdvancedSearchParams advancedSearchParams,
    		Pagination page)
                                                    {
   	System.out.println(advancedSearchParams.getEndDate());
    	//System.out.println("limit "+page.getLimit() +"offset"+ page.getOffset());
    	
    	ResponseList<Map<String,Object>> list = new ResponseList<>();
        HttpStatus status = HttpStatus.OK;
        try {

        		Map<String,Object> responseMap = new HashMap<>();
            List<Map<String, Object>> map = dataMonitorService.advancedSearch(advancedSearchParams,page);
            responseMap.put("boards",list);
            responseMap.put("page",page);
            
           

            if (!map.isEmpty()) {
                list = new ResponseList.ResponseListSuccess<>(
                        HttpMessage.success(Table.BOARD + "(s)", Transaction.Success.RETRIEVE), true, map,
                        page);
            } else {
                list = new ResponseList.ResponseListFailure<>(
                        HttpMessage.fail(Table.BOARD + "(s)", Transaction.Fail.RETRIEVE), false,
                        ResponseHttpStatus.RECORD_NOT_FOUNT);
            }

        }catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<ResponseList<Map<String,Object>>>(list, status);
    }
    
    // TODO: trend graph
    @GetMapping("/trendGraphData")
    public ResponseEntity<ResponseList<Map<String,Object>>> advancedSearchGraph(AdvancedSearchParams advancedSearchParams){ 	
    System.out.println("PARAMS=> "+advancedSearchParams.toString());
    	ResponseList<Map<String,Object>> list = new ResponseList<>();
        HttpStatus status = HttpStatus.OK;
        try {

        		Map<String,Object> responseMap = new HashMap<>();
            List<Map<String, Object>> map = dataMonitorService.trendGraph(advancedSearchParams);
            responseMap.put("boards",list);
    
            
           

            if (!map.isEmpty()) {
                list = new ResponseList.ResponseListSuccess<>(
                        HttpMessage.success(Table.BOARD + "(s)", Transaction.Success.RETRIEVE), true, map,
                        null);
            } else {
                list = new ResponseList.ResponseListFailure<>(
                        HttpMessage.fail(Table.BOARD + "(s)", Transaction.Fail.RETRIEVE), false,
                        ResponseHttpStatus.RECORD_NOT_FOUNT);
            }

        }catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<ResponseList<Map<String,Object>>>(list, status);
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseList<Map<String,Object>>> countBoardByType(){

        ResponseList<Map<String,Object>> list = new ResponseList<>();
        HttpStatus status = HttpStatus.OK;
        try {

            List<Map<String, Object>> map = dataMonitorService.countBoardByType();
            if (!map.isEmpty()) {
                list = new ResponseList.ResponseListSuccess<>(
                        HttpMessage.success(Table.BOARD + "(s)", Transaction.Success.RETRIEVE), true, map,
                        null);
            } else {
                list = new ResponseList.ResponseListFailure<>(
                        HttpMessage.fail(Table.BOARD + "(s)", Transaction.Fail.RETRIEVE), false,
                        ResponseHttpStatus.RECORD_NOT_FOUNT);
            }

        }catch(Exception e){
            e.printStackTrace();
        }


       // System.out.println("COUNT => "+list.getData().size());
        return new ResponseEntity<ResponseList<Map<String,Object>>>(list, status);
    }


}
