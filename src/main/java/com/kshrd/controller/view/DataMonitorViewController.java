package com.kshrd.controller.view;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
/**
 * Created by Teckchun on 10/24/17.
 */
@Controller
public class DataMonitorViewController {

    @GetMapping("/data-monitoring")
    public String category(){


        return "/data-monitoring";
    }


    @GetMapping("/advanced-search")
    public String advancedSearch(){

        return "/advanced-search";
    }
    
    @GetMapping("/data-analysis-compare")
    public String dataAnalysisCompare() {
    		return "/data-analysis-compare";
    }
    
    @GetMapping("/data-analysis-trend")
    public String dataAnalysisTrend() {
    		return "/data-analysis-trend";
    }
    
    @GetMapping("/data-analysis-assoc")
    public String dataAnalysisAssoc() {
    		return "/data-analysis-assoc";
    }
    
    




}
