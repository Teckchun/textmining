//http://localhost:8080/rest
    var REQUEST_URL={
    		server:'http://35.201.252.181:11008/rest',
    		local:'http://localhost:8080/rest'
    } 
    

	var request = function() {

		return {	
			// TODO: initial data
			init:function(){
			
				 var startDate = $("#startDate").val();
				 var endDate = $("#endDate").val();
				 var category = $("#category").val();
				 var keyword = $("#keyword").val();
				 // get selected category
				 var type = $('#category').find(":selected").val();
				 //TODO: initialization data for passing to server!
				 var filter = function filterData(){
		            var settings = $("#datasetList").dataTable().fnSettings();
		        //    console.log('datatable_settings: init ', settings);
		            
		            //TODO: find sorted column
		        //    console.log(settings.aLastSort[0]);
		            var sort = {
		            	col: settings.aLastSort[0].col,
		            	dir: settings.aLastSort[0].dir,
		            	colName: null
		            };
		            settings.aoColumns.forEach(function(column, index){
		            	if(sort.col == index) sort.colName = column.mData;
		            });
		        //    console.log('start end date', startDate + endDate)
		        //    console.log("type inside request", type);
		            
		            var yesterday = (function(d){ d.setDate(d.getDate()-1); return d})(new Date)
		            $('#startDate').datepicker('setDate', yesterday);
		            $('#endDate').datepicker('setDate', yesterday);
		            
		            //TODO: prepare data for passing to server!
		            var obj = {
		                "draw" : settings.iDraw,
		                "page" : (settings._iDisplayStart / settings._iDisplayLength) + 1,
		                "limit": settings._iDisplayLength,
		                "boardTitle":keyword,
			       		"startDate":$('#startDate').val(),
			       		"endDate":$('#endDate').val(),
			       		"type":type,
			       		"boardTitle" : settings.oPreviousSearch.sSearch
		            };
		        //    console.log('filter', obj);
		            return obj;
		        };
		        /* Extend with date sort plugin */
	            $.extend($.fn.dataTableExt.oSort, {
	                "date-custom-pre": function ( a ) {
	                    var customDate = a.split('/');
	                    return (customDate[2] + customDate[1] + customDate[0]) * 1;
	                },
	                "date-custom-asc": function ( a, b ) {
	                    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	                },
	                "date-custom-desc": function ( a, b ) {
	                    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	                }
	            } );
	           
		        App.datatables();
		        //TODO: advance datatable initialization
		        var table = $('#datasetList').DataTable({
		        		columnDefs: [
	                    { type: 'date-custom', targets: [4] }
	                ],
	                "ordering": false,
	                "searching": false,
		            "processing": true,
		            "serverSide": true,
		            "fnPreDrawCallback": function() { 
		           // 	$(".se-pre-con").fadeIn(500);
		        			
		            	},
		            	"fnDrawCallback": function() {
		            	//	$(".se-pre-con").fadeOut(500);
		            		
		            	},
		            //TODO: 
		            "lengthMenu": [[10, 20, 30,50, 70, 100], [10, 20, 30, 50, 70, 100]],
		            //TODO:
		            //TODO: 
		            stateSave: false,
		            //TODO: 
		            "ajax":{
		            	"url" : REQUEST_URL.local+'/data-monitoring/getBoards',
		            	//TODO: Custom parameter sent to server!
		            	"data": filter,
		            	//TODO: Custom return parameter from server!
		            	"dataFilter": function(response){
		     	            var response = jQuery.parseJSON(response);
		     	           // var type = ["뽐뿌","디시인사이드","지후맘카페","맘스홀릭카페"];

		     	     //       console.log(response);
		     	           //TODO: response pattern for DATATABLE
		     	            
		     	           	for(i in response.data){
		     	    //       		console.log(response.data[i].type);
		     	           		if(response.data[i].type=="jihumom"){
		     	           			response.data[i].type = "지후맘카페"
		     	           		}else if(response.data[i].type=="momsholic"){
		     	           		response.data[i].type = "지후맘카페"
		     	           		}
		     	           		else if(response.data[i].type=="dcinside"){
		     	           		response.data[i].type = "디시인사이드"
		     	           		}else if(response.data[i].type=="ppomppu"){
		     	           		response.data[i].type = "뽐뿌"
		     	           		}
		     	           		
		     	           	}
		     	           
		     	           var jsonDatatable;
		     	           	if(response.pagination!=null){
		     	           			var jsonDatatable = {
				     	            	"draw" : response.pagination.draw,
				     	            	"recordsTotal": response.pagination.total_count,
				     	            	"recordsFiltered": response.pagination.total_count,
				     	            	"data": response.data
				     	            
				     	            };
		     	           	}else{
		     	           	  jsonDatatable = {
				     	            	"draw" :1,
				     	            	"recordsTotal": 0,
				     	            	"recordsFiltered": 0,
				     	            	"data": response.data
				     	            
				     	            };
		     	           	}
		     	           	
		     	        

		     	            
		     	            return JSON.stringify(jsonDatatable); // return JSON string
		     	        }
		            },
		            
		            //TODO: 
		            "columns": [
	     		            { "data": "board_index" },
	     		            { "data": "type" },
	     		            { "data": "board_title" },
	     		            { "data": "board_url","render": function(data, type, row, meta){
	     		               if(type === 'display'){
	     		                  data = '<a href="' + data + ' "  target="_blank"">' + data + '</a>';
	     		              }

	     		              return data;
	     		           } },
	     		            { "data": "board_recommand" },
	     		            { "data": "board_view" },
	     		            { "data": "board_date" }
	     		    ]
		            
		       
		        });
		        /* Add placeholder attribute to the search input */
	            $('.dataTables_filter input').attr('placeholder', '검색');
		    
		        
		        //TODO: TextBox Search
		    	// Setup - add a text input to each footer cell
		        $('#example tfoot th').each( function () {
		            var title = $(this).text();
		            $(this).html( '<div class="ui input"><input class="ui input" type="text" placeholder="Search '+title+'" /></div>' );
		        } );

		        
		        
		        
		        
			},
			
			// TODO: generate graph
			generateGraph:function(){
				$("#resultdiv").hide();
				
				 console.log('generate graph calling...');
				 var startDate = $("#startDate").val();
				 var endDate = $("#endDate").val();
				 var category = $("#category").val();
				 var keyword = $("#keyword").val();
				 var type = $('#category').find(":selected").val();
				
		            
		            //TODO: prepare data for passing to server!
		            var obj = {
		                "boardTitle":keyword,
			       		"startDate":$('#startDate').val(),
			       		"endDate":$('#endDate').val(),
			       		"type":type
		            };
				
		           // show loading
		            $("#loading").show();
		          	var all=[],dcinside =[],jihumom =[], ppomppu = [],momsholic=[];
					  
				 $.ajax({
					    url: REQUEST_URL.local+'/data-monitoring/getGraphData',
					    type: 'GET',
					    async: true,
					    dataType: "json",
					    data: obj,
					    success: function (response) {
					    	
					    
					
					    				$("#loading").hide();
					    				$("#container").show();
					    				console.log('graph ajax response: ',response);
				     	           if(response.data.length>0)
				     	      		$("#resultdiv").show();
				     	           else
				     	      		$("#resultdiv").hide();
				     	      		
				     	              var rows = response.data; // 
				     	              console.log('graph rowss=> ',rows);
				    
				     	      	for(r in rows){
							    		all.push(rows[r]);
							    		if(rows[r].type=="dcinside"){
							    			dcinside.push(rows[r]);	
							    		}else if(rows[r].type=="jihumom"){
							    			jihumom.push(rows[r]);
							    		}else if(rows[r].type=="momsholic"){
							    			momsholic.push(rows[r]);
							    		}else if(rows[r].type=="ppomppu"){
							    			ppomppu.push(rows[r]);
							    		}
							    	}
							
				     	              // TODO: create occurences and value of graph
				     	      		
				     	      			 var occurences = rows.reduce(function (r, row) {
					     	                  r[row.board_date] = ++r[row.board_date] || 1;
					     	                  return r;
					     	              }, {});
					     	         // console.log('occurences=> ',occurences);
					     	              
			
					     	              var result = Object.keys(occurences).map(function (key) {
					     	                  return { key: key, value: occurences[key],type:type };
					     	              });
					     	              console.log('result=>  all ',rows.length);
					     	             
				     	      		
				     	             
				     	              
				     	              
				     	             var occurenes_momsholic = momsholic.reduce(function (r, row) {
				     	                  r[row.board_date] = ++r[row.board_date] || 1;
				     	                  return r;
				     	              }, {});
				     	            //  console.log('occurences=> ',occurenes_momsholic);
				     	              
		
				     	              var result_momsholic = Object.keys(occurenes_momsholic).map(function (key) {
				     	                  return { key: key, value: occurenes_momsholic[key] };
				     	              });
				     	            //  console.log('result momsholic=> ',result_momsholic);
				     	             var occurenes_dcinside = dcinside.reduce(function (r, row) {
				     	                  r[row.board_date] = ++r[row.board_date] || 1;
				     	                  return r;
				     	              }, {});
				     	            //  console.log('occurences=> ',occurenes_dcinside);
				     	              
		
				     	              var result_dcinside = Object.keys(occurenes_dcinside).map(function (key) {
				     	                  return { key: key, value: occurenes_dcinside[key] };
				     	              });
				     	              
				     	              console.log('ppomppu=> ',ppomppu);
				     	              
				     	              var occurenes_ppomppu = ppomppu.reduce(function (r, row) {
				     	            	  	  console.log('row.board_date => ', row.board_date);
				     	                  r[row.board_date] = ++r[row.board_date] || 1;
				     	                  return r;
				     	              }, {});
				     	              console.log('occurences=> ',occurenes_ppomppu);
				     	              
		
				     	              var result_ppomppu = Object.keys(occurenes_ppomppu).map(function (key) {
				     	                  return { key: key, value: occurenes_ppomppu[key] };
				     	              });
				     	              
				     	             var occurenes_jihumom = jihumom.reduce(function (r, row) {
				     	                  r[row.board_date] = ++r[row.board_date] || 1;
				     	                  return r;
				     	              }, {});
				     	              console.log('occurences=> ',occurenes_jihumom);
				     	              
		
				     	              var result_jihumom = Object.keys(occurenes_jihumom).map(function (key) {
				     	                  return { key: key, value: occurenes_jihumom[key] };
				     	              });
				     	             
				     	              console.log('type=> ', type);
		
				     	              container.innerHTML='';
				     	           
				     	          
						     	       
						     	      var options = {
										        title: {
										            text: '[검색어 추이]',
										        },
										        xAxis: {
										            categories: []
										        },
										        yAxis: {
										            title: {
										                text: ''
										            }
										        },
										       
										        series: [], 
										        legend: {
						     	                    layout: 'vertical',
						     	                    align: 'right',
						     	                    verticalAlign: 'middle'
						     	                },responsive: {
						     	                    rules: [{
						     	                        condition: {
						     	                            maxWidth: 500
						     	                        },
						     	                        chartOptions: {
						     	                            legend: {
						     	                                layout: 'horizontal',
						     	                                align: 'center',
						     	                                verticalAlign: 'bottom'
						     	                            }
						     	                        }
						     	                    }]
						     	                }
										    };
				     	              
						     	      // TODO: loop to put data in categories and xAxis
						     	     var data = []
						     	     options.xAxis.categories = []
						     	     options.series = []
						     	     
						     	     if(type=="all"){
						     	    	 
						     	    	 	// TODO: all
							     	    	for (var i = 0; i<result.length; i++) {
						     	    			options.xAxis.categories.push(result[i].key);
						     	    			data.push(result[i].value);
						     	    		};
						     	    
				     	          			     	            
					     	            options.series.push({
					     	            		name :'전체',
					     	            		data: data
					     	            });
					     	            
					     	            // TODO: momsholic
					     	           var data1=[];
					     	           for (var i = 0; i<result_momsholic.length; i++) {
					     	        	   		options.xAxis.categories.push(result_momsholic[i].key);
					     	                data1.push(result_momsholic[i].value);
							     	    };
					     	           options.series.push({
				     	            		name :'맘스홀릭카페',
				     	            		data: data1
					     	           });
					     	           
					     	           //TODO: dcinside
					     	           var data2=[];
					     	           for (var i = 0; i<result_dcinside.length; i++) {
					     	        	   		console.log('dc loop => ', result[i].key);
					     	        	   		options.xAxis.categories.push(result_dcinside[i].key);
					     	                data2.push(result_dcinside[i].value);
							     	  
					     	            };
					     	           options.series.push({
				     	            		name :'디시인사이드',
				     	            		data: data2
				     	            });
					     	           //TODO: ppomppu
					     	          var data3=[];
					     	           for (var i = 0; i<result_ppomppu.length; i++) {
					     	        	   		console.log('loop => ', result[i].key);
					     	        	   		options.xAxis.categories.push(result_ppomppu[i].key);
					     	                data3.push(result_ppomppu[i].value);
							     	    };
					     	           options.series.push({
				     	            		name :'뽐뿌',
				     	            		data: data3
				     	            });
					     	           //TODO: jihumom
					     	          var data4=[];
						     	         
					     	           for (var i = 0; i<result_jihumom.length; i++) {
					     	        	   		options.xAxis.categories.push(result_jihumom[i].key);	
					     	                data4.push(result_jihumom[i].value);
							     	    };
					     	           options.series.push({
				     	            		name :'지후맘카페',
				     	            		data: data4
				     	            });
						     	     }
						     	     // end type all
						     	     
						     	     if(type=="momsholic"){
						     	    	 	var data1=[];
						     	           for (var i = 0; i<result_momsholic.length; i++) {
						     	        	   		options.xAxis.categories.push(result_momsholic[i].key);
						     	                data1.push(result_momsholic[i].value);
								     	    };
						     	           options.series.push({
					     	            		name :'맘스홀릭카페',
					     	            		data: data1
					     	            });
						     	     }
						     	     
						     	     if(type=="dcinside"){
						     	    	 	var data2=[];
						     	           for (var i = 0; i<result_dcinside.length; i++) {
						     	        	   		options.xAxis.categories.push(result_dcinside[i].key);
						     	                data2.push(result_dcinside[i].value);
								     	  
						     	            };
						     	           options.series.push({
					     	            		name :'디시인사이드',
					     	            		data: data2
					     	            });
						     	     }
						     	     
						     	     if(type=="ppomppu"){
						     	    	 	var data3=[];
						     	           for (var i = 0; i<result_ppomppu.length; i++) {
						     	        	   		options.xAxis.categories.push(result_ppomppu[i].key);
						     	        	   		console.log('pp type value = > ',result[i].key)
						     	                
						     	        	   		console.log('pp type value = > ',result_ppomppu[i].value)
						     	                data3.push(result_ppomppu[i].value);
								     	    };
						     	           options.series.push({
					     	            		name :'뽐뿌',
					     	            		data: data3
					     	            });
						     	     }
						     	     
						     	     if(type=="jihumom"){
						     	    	 	var data4=[];
						     	         
						     	           for (var i = 0; i<result_jihumom.length; i++) {
						     	        	   		options.xAxis.categories.push(result_jihumom[i].key);	
						     	                data4.push(result_jihumom[i].value);
								     	    };
						     	           options.series.push({
					     	            		name :'지후맘카페',
					     	            		data: data4
					     	            });
						     	           
						     	     }
						     	   
						     	    		
				     	            
				     	           
						     	          
				     	          
				     	           
				     	         
				     	           
				     	           
				     	           
				     	           $('#container').highcharts(options);
				     	           
				     	           
				     	           
				     	           console.log('type=> ',type);
				     	              
				     	              var rows = response.data;
						              var occurences2 = rows.reduce(function (r, row) {
						                  r[row.board_date] = ++r[row.board_date] || 1;
						                  return r;
						              }, {});

						              var result2 = Object.keys(occurences2).map(function (key) {
						            	  
						            	  	console.log("graph result2 = > key : ",key)
						            	  
						                  return { key: key, value: occurences2[key] };
						              });


				     	           
				     	           
//					    		  for(i in result){
//				            	  console.log('i=> ',result[i].key)
//				            	  	if(result[i].type=="dcinside"){
//				            	  		result[i].type = "디시인사이드";
//				            	  	}else if(result[i].type=="ppomppu"){
//				            	  		result[i].type = "뽐뿌";
//				            	  	}else if(result2[i].type=="momsholic"){
//				            	  		result[i].type = "맘스홀릭카페";
//				            	  	}
//				            	  	else if(result2[i].type=="jihumom"){
//				            	  		result[i].type = "지후맘카페";
//				            	  	}else{
//				            	  		result[i].type = "전체";
//				            	  	}
//				            	  
//				              }
					    		  
					    		  $("#dataCount").html("");
					    			
					              	 $("#dataCount").append('<div class="alert alert-warning" role="alert" onclick="alert(\'11\')">'+
					                  				 '<strong>'+'전체'+':'+rows.length+'</strong>'+
					              				 '</div>'+
					              				'<div class="alert alert-warning" role="alert">'+
				                  				 '<strong>'+'맘스홀릭카페'+':'+momsholic.length+'</strong>'+
				              				 '</div>'+
				              				'<div class="alert alert-warning" role="alert">'+
			                  				 '<strong>'+'디시인사이드'+':'+dcinside.length+'</strong>'+
			              				 '</div>'+
				              				'<div class="alert alert-warning" role="alert">'+
			                  				 '<strong>'+'뽐뿌'+':'+ppomppu.length+'</strong>'+
			              				 '</div>'+
				              				'<div class="alert alert-warning" role="alert">'+
			                  				 '<strong>'+'지후맘카페'+':'+jihumom.length+'</strong>'+
			              				 '</div>'
					                   		
					                   		);
//					              for(i=0; i<response.data.length; i++){
//					            	  	
//					              	 $("#dataCount").append('<div class="alert alert-warning" role="alert">'+
//					                  				 '<strong>'+response.data[i].type+':'+response.data.length+'</strong>'+
//					              				 '</div>'
//					                   		
//					                   		);
//					              }
				              
				              
				              
					        
					        
					    }
					  });
		
			},
			
			//TODO: count numbers of boards in each category
			getDataCounts: function(){
				$(function(){
					    
//				        statistic
				        $.ajax({
				            url: REQUEST_URL.local+'/data-monitoring/count'

				        }).done(function(res) {
				            data = res.total;
							//var type = ["뽐뿌","디시인사이드","지후맘카페","맘스홀릭카페"];
				            for(i in res.data){
				            	if(res.data[i].type=="ppompu"){
				            		res.data[i].type = "뽐뿌";
				            		
				            	}else if(res.data[i].type=="dcinside"){
				            		res.data[i].type = "디시인사이드";
				            	}else if(res.data[i].type=="jihumom"){
				            		res.data[i].type = "지후맘카페";
				            	}else if(res.data[i].type=="momsholic"){
				            		res.data[i].type = "맘스홀릭카페";
				            	}
				            }
				            
				            for(var i =0; i<res.data.length;i++){
				                $("#statistic").append('<div class="col-sm-6 col-lg-3">'+
				    					'<a href="javascript:void(0)" class="widget widget-hover-effect2">'+
				    						'<div class="widget-extra themed-background">'+
				    							'<h4 class="widget-content-light"><strong>'+res.data[i].type+'</strong></h4>'+
				    						'</div>'+
				    						'<div class="widget-extra-full themed-color-dark" style="background-color: #fff;">'+
				    						'<span class="h2 themed-color-dark animation-expandOpen" id="ppCount">'+res.data[i].total.toLocaleString()+'건'+'</span ></div>'+
				    					'</a>'+
				    				'</div>');


				            }
				        });
				        
				        
				        
				        
				})
			}
			,
			// TODO: getBoards
			getBoards:function(){
				$('#datasetList').DataTable().clear().destroy();
				 request.generateGraph();
				  
			        
				 var startDate = $("#startDate").val();
				 var endDate = $("#endDate").val();
				 var category = $("#category").val();
				 var keyword = $("#keyword").val();
				 var type = $('#category').find(":selected").val();
			    	
		    	//TODO: initialization data for passing to server!
		    	var filter = function filterData(){
		            var settings = $("#datasetList").dataTable().fnSettings();
		      //      console.log('datatable_settings: ', settings);
		            
		            //TODO: find sorted column
		      //      console.log(settings.aLastSort[0]);
		            var sort = {
		            	col: settings.aLastSort[0].col,
		            	dir: settings.aLastSort[0].dir,
		            	colName: null
		            };
		            settings.aoColumns.forEach(function(column, index){
		            	if(sort.col == index) sort.colName = column.mData;
		            });
		          
		       //     console.log("type in request => ",type);
		            //TODO: prepare data for passing to server!
		            var obj = {
		                "draw" : settings.iDraw,
		                "page" : (settings._iDisplayStart / settings._iDisplayLength) + 1,
		                "limit": settings._iDisplayLength,
		                "boardTitle":keyword,
			       		"startDate":startDate,
			       		"endDate":endDate,
			       		"type":$('#category').find(":selected").val(),
			       		"board_title" : settings.oPreviousSearch.sSearch
		            };
		      //      console.log('filter', obj);
		            return obj;
		        };
		        /* Extend with date sort plugin */
	            $.extend($.fn.dataTableExt.oSort, {
	                "date-custom-pre": function ( a ) {
	                    var customDate = a.split('/');
	                    return (customDate[2] + customDate[1] + customDate[0]) * 1;
	                },
	                "date-custom-asc": function ( a, b ) {
	                    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	                },
	                "date-custom-desc": function ( a, b ) {
	                    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	                }
	            } );
		        App.datatables();
		        var type = ["뽐뿌","디시인사이드","지후맘카페","맘스홀릭카페"];
		        //TODO: advance datatable initialization
		        var table = $('#datasetList').DataTable({
		        		columnDefs: [
	                    { type: 'date-custom', targets: [4] }
	                ],
	                "ordering": false,
	                "searching": false,
		            "processing": true,
		            "serverSide": true,
		            "fnPreDrawCallback": function() { 
		            //	$(".se-pre-con").fadeIn(500);
		        			
		            	},
		            	"fnDrawCallback": function() {
		            	//	$(".se-pre-con").fadeOut(500);
		            		
		            	},
		            //TODO: 
		            "lengthMenu": [[10, 20, 30,50, 70, 100], [10, 20, 30, 50, 70, 100]],
		            //TODO:
		            //TODO: 
		            stateSave: false,
		            //TODO: 
		            "ajax":{
		            	"url" : REQUEST_URL.local+'/data-monitoring/getBoards',
		            	//TODO: Custom parameter sent to server!
		            	"data": filter,
		            	//TODO: Custom return parameter from server!
		            	"dataFilter": function(response){
		            		    var response = jQuery.parseJSON(response);
		            		    if(response.data.length<=0){
		            		    		var jsonDatatable = {
		            		    				"sEcho": 1,
		            		    			    "iTotalRecords": "0",
		            		    			    "iTotalDisplayRecords": "0",
		            		    			    "aaData": []
						     	            };
		            		    		return JSON.stringify(jsonDatatable);
		            		    	
		            		    }
		            		    else{
		            	
		            		    		  for(i in response.data){
				     	           		console.log("RESPONSE TYPE = > ",response.data[i].type);
				     	           	if(response.data[i].type=="jihumom"){
				     	           			response.data[i].type = "지후맘카페"
				     	           		}else if(response.data[i].type=="momsholic"){
				     	           		response.data[i].type = "맘스홀릭카페"	
				     	           		}else if(response.data[i].type=="dcinside"){
				     	           		response.data[i].type = "디시인사이드"
				     	           		}else if(response.data[i].type=="ppomppu"){
				     	           		response.data[i].type = "뽐뿌"
				     	           		}
				     	           		
				     	           	}
				     	          
				     	            //TODO: response pattern for DATATABLE
				     	            var jsonDatatable = {
				     	            "draw" : response.pagination.draw, 
				     	            	"recordsTotal": response.pagination.total_count,
				     	            	"recordsFiltered": response.pagination.total_count,
				     	            	"data": response.data
				     	            
				     	            };
				     	            return JSON.stringify(jsonDatatable); // return JSON string
		            		    }
		     	            
		     	        }
		            },
		            //TODO: 
		            "columns": [
	     		            { "data": "board_index" },
	     		            { "data": "type" },
	     		            { "data": "board_title" },
	     		            { "data": "board_url","render": function(data, type, row, meta){
	     		               if(type === 'display'){
	     		                  data = '<a href="' + data + '"  target="_blank">' + data + '</a>';
	     		              }

	     		              return data;
	     		            } },
	     		            { "data": "board_recommand" },
	     		            { "data": "board_view" },
	     		            { "data": "board_date" }
	     		    ]
		            
		       
		        });
		        /* Add placeholder attribute to the search input */
	            $('.dataTables_filter input').attr('placeholder', '검색');
		    
		        
		        //TODO: TextBox Search
		    	// Setup - add a text input to each footer cell
		        $('#example tfoot th').each( function () {
		            var title = $(this).text();
		            $(this).html( '<div class="ui input"><input class="ui input" type="text" placeholder="Search '+title+'" /></div>' );
		        } );
		  
		        
				
				
				
				
			}
				
		}
	}();
	
//	$("#btn_keyword").click(function(){
//		request.generateGraph();
//	})
	$("#frmSearch").on('submit', function(e){
	    e.preventDefault();
	   
	 
	});
	function btnDownload(idx) {
		$('#popupDownload').empty();
		$("#modal_add_contents").modal("show");
		var ifmDownload = "<iframe src=\"http://1.246.219.212:19000/download?dataSetUID="+idx+"\" id=\"ifm\" width=\"400\" height=\"200\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" style=\"margin-left: 50px;\"></iframe>";
		$("#popupDownload").append(ifmDownload);
	}
	
	
	$("#keyword").keyup(function(event) {
	    if (event.keyCode === 13) {
	        $("#btn_keyword").click();
	    }
	});
	