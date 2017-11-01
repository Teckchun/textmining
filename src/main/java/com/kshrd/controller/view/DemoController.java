package com.kshrd.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Teckchun on 10/10/17.
 */
@Controller
public class DemoController {

    @GetMapping("/")
    public String index(){
        return "/index";
    }

    @GetMapping("/detail")
    public String detail(){

        return "/detail";
    }

    @GetMapping("/category")
    public String category(){
        return "/category";
    }

    @GetMapping("/category1")
    public String category1(){
        return "/category1";
    }

    @GetMapping("/data-analysis")
    public String dataAnalysis(){
        return "/data_analysis";
    }

    @GetMapping("/data-analysis2")
    public String dataAnalysis2(){
        return "/data-analysis2";
    }



}
