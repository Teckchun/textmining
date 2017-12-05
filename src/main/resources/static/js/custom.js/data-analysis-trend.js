var 	REQUEST_URL = "http://localhost:8080/rest";
//35.201.252.181:11008
//localhost:8080
var request = function(){
	return{
		// TODO: getBoards
		advancedSearch:function(){
			request.generateGraph();
			//request.generatePie();
			
			$('#datasetList').DataTable().clear().destroy();
			 var startDate = $("#startDate").val();
			 var endDate = $("#endDate").val();
			 var category = $("#category").val();
			 var keyword = $("#keyword").val();
			 if(keyword === ''){
				 alert("Title can not be empty");
				 return false;
			 }

	    	//TODO: initialization data for passing to server!
	    	var filter = function filterData(){
	            var settings = $("#datasetList").dataTable().fnSettings();
	            console.log('datatable_settings: ', settings);
	            
	            //TODO: find sorted column
	            console.log(settings.aLastSort[0]);
	            var sort = {
	            	col: settings.aLastSort[0].col,
	            	dir: settings.aLastSort[0].dir,
	            	colName: null
	            };
	            settings.aoColumns.forEach(function(column, index){
	            	if(sort.col == index) sort.colName = column.mData;
	            });
	            
	            console.log('end date=> ', endDate);
	          
	            
	            //TODO: prepare data for passing to server!
	            var obj = {
	            		  		"draw" : settings.iDraw,
			                "page" : (settings._iDisplayStart / settings._iDisplayLength) + 1,
			                "limit": settings._iDisplayLength,
			                "boardTitle":keyword,
				       		"startDate":startDate,
				       		"endDate":endDate,
				       		"type":type,
				       		"boardTitle" : settings.oPreviousSearch.sSearch
	            };
	            console.log('filter', obj);
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
	        var keywordsVal = $("#keyword").val();
	        var mustKeywordsVal = $("#must_keyword").val();
	       	var excludeKeywordsVal = $("#except_keyword").val(); 
	       	
	       	
	       	
	        var keywords = $("#keyword").serializeArray();
	       
	        
	        var mustKeywords = $("#must_keyword").serializeArray();
	        var excludeKeywords = $("#except_keyword").serializeArray();
	        
	        var concat = "?";
	       
	        keywords[0].value.split(',').forEach(function(a,i){
	        	concat+="keywords=" +a;
	        		if(i<=a.length){
	            		concat += "&"
	            	}
	        })
	        
	         mustKeywords[0].value.split(',').forEach(function(a,i){
	        	concat+="mustKeywords=" +a;
	        		if(i<=a.length){
	            		concat += "&"
	            	}
	        })
	        
	        excludeKeywords[0].value.split(',').forEach(function(a, i){
	        
	        	concat += "excludeKeywords=" + a;
	        	
	        	if(i<=a.length){
	        		concat += "&"
	        	}
	        	
	        });
	        
	        concat+="startDate="+startDate+"&endDate="+endDate;
	        console.log('trednd= ?     ', concat)
	        
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
	            stateSave: true,
	            //TODO: 
	            "ajax":{
	            	"url" : REQUEST_URL+'/data-monitoring/advancedSearch'+concat,
	            	"data":filter,
	            	//TODO: Custom parameter sent to server!
	            	
	            	//TODO: Custom return parameter from server!
	            	"dataFilter": function(response){
	            		    var response = jQuery.parseJSON(response);
	            	
	            		  
	            		    	console.log(response);
			     	            for(i in response.data){
			     	           		console.log(response.data[i].type);
			     	           		if(response.data[i].type=="jihumom"){
			     	           			response.data[i].type = "지후맘카페"
			     	           		}else if(response.data[i].type=="momsholic"){
			     	           		response.data[i].type = "맘스홀릭카페"
			     	           		}else if(response.data[i].type=="dcinside"){
			     	           		response.data[i].type = "디시인사이드"
			     	           		}else{
			     	           		response.data[i].type = "뽐뿌"
			     	           		}
			     	           		
			     	           	}
			     	          
			     	            
			     	            //TODO: response pattern for DATATABLE
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
     		            { "data": "board_num" },
     		            { "data": "type" },
     		            { "data": "board_title" },
     		            { "data": "board_url","render": function(data, type, row, meta){
     		               if(type === 'display'){
     		                  data = '<a href="' + data + '" target="_blank">' + data + '</a>';
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
			 console.log('generate graph calling...');
			 $("#graph_container").hide();
			 var startDate = $("#startDate").val();
			 var endDate = $("#endDate").val();
			 var category = $("#category").val();
			 var keyword = $("#keyword").val();
			 var type = $('#category').find(":selected").val();
			
	            
	            //TODO: prepare data for passing to server!
			 var type = ["뽐뿌","디시인사이드","지후맘카페","맘스홀릭카페"];
		        var keywordsVal = $("#keyword").val();
		        var mustKeywordsVal = $("#must_keyword").val();
		       	var excludeKeywordsVal = $("#except_keyword").val(); 
		       	
		       	
		       	
		        var keywords = $("#keyword").serializeArray();
		       
		        
		        var mustKeywords = $("#must_keyword").serializeArray();
		        var excludeKeywords = $("#except_keyword").serializeArray();
		        
		        var concat = "?";
		       
		        keywords[0].value.split(',').forEach(function(a,i){
		        	concat+="keywords=" +a;
		        		if(i<=a.length){
		            		concat += "&"
		            	}
		        })
		        
		         mustKeywords[0].value.split(',').forEach(function(a,i){
		        	concat+="mustKeywords=" +a;
		        		if(i<=a.length){
		            		concat += "&"
		            	}
		        })
		        
		        excludeKeywords[0].value.split(',').forEach(function(a, i){
		        
		        	concat += "excludeKeywords=" + a;
		        	
		        	if(i<=a.length){
		        		concat += "&"
		        	}
		        	
		        });
		        
		        concat+="startDate="+startDate+"&endDate="+endDate;
			
	           // show loading
	            $("#loading").show();
	          	var all=[],dcinside =[],jihumom =[], ppomppu = [],momsholic=[];
	          
				  
	          	console.log('concat url=> ',REQUEST_URL+'/data-monitoring/trendGraphData'+concat);
			 $.ajax({
				    url: REQUEST_URL+'/data-monitoring/trendGraphData'+concat,
				    type: 'GET',
				    async: true,
				    dataType: "json",
				    success: function (response) {
				    		
				    				$("#loading").hide();
				    				
				    				console.log('graph ajax response: ',response);
			     	           if(response.data.length>0)
			     	        		$("#graph_container").show();
				    			
			     	      		
			     	           else
			     	      		$("#resultdiv").hide();
			     	      		
			     	              var rows = response.data; 
			     	        
			    
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
			     	      		
			     	      			 var occurences_all = all.reduce(function (r, row) {
				     	                  r[row.board_date] = ++r[row.board_date] || 1;
				     	                  return r;
				     	              }, {});
				     	       
				     	              var result_all = Object.keys(occurences_all).map(function (key) {
				     	                  return { key: key, value: occurences_all[key],type:type };
				     	              });
				     	              console.log('result=>  all ',all.length);
				     	       
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
			     	              console.log('pp occurences=> ',occurenes_ppomppu);
			     	              
	
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
	
			     	              //container.innerHTML='';
			     	           
			     	          
					     	       
					     	      var options = {
									        title: {
									            text: '[사이트별 추이]',
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
					 
				     	            
				     	            // TODO: momsholic
				     	           var data1=[];
				     	           for (var i = 0; i<result_momsholic.length; i++) {
				     	        	   			console.log('result momsholiccc=> ', result_momsholic.length);
				     	        	   		
				     	        	   			options.xAxis.categories.push(result_momsholic[i].key);
					     	                data1.push(result_momsholic[i].value);
				     	        	   		
				     	        	   		
						     	    };
						     	    console.log('data1=> ',data1)
						     	    if(data1.length>0){
						     	    	 options.series.push({
					     	            		name :'맘스홀릭카페',
					     	            		data: data1
						     	           });
						     	    }
				     	           
				     	           //TODO: dcinside
				     	           var data2=[];
				     	           for (var i = 0; i<result_dcinside.length; i++) {
				     	        	   		console.log('dc loop => ', result_dcinside[i].key);
				     	        	   		options.xAxis.categories.push(result_dcinside[i].key);
				     	                data2.push(result_dcinside[i].value);
						     	  
				     	            };
				     	            
				     	            console.log('data2 => ',data2)
				     	            
				     	           if(data2.length>0){
				     	        	  options.series.push({
				     	            		name :'디시인사이드',
				     	            		data: data2
				     	            });
				     	           }
				     	           //TODO: ppomppu
				     	          var data3=[];
				     	           for (var i = 0; i<result_ppomppu.length; i++) {
				     	        	   		console.log('pp loop => ', result_ppomppu[i].key);
				     	        	   		options.xAxis.categories.push(result_ppomppu[i].key);
				     	                data3.push(result_ppomppu[i].value);
						     	    };
						     	    console.log('data3 ',data3);
				     	           if(data3.length>0){
				     	        	  options.series.push({
				     	            		name :'뽐뿌',
				     	            		data: data3
				     	            });
				     	           }
				     	           //TODO: jihumom
				     	          var data4=[];
					     	         
				     	           for (var i = 0; i<result_jihumom.length; i++) {
				     	        	   		options.xAxis.categories.push(result_jihumom[i].key);	
				     	                data4.push(result_jihumom[i].value);
						     	    };
				     	          if(data4.length>0){
				     	        	 options.series.push({
				     	            		name :'지후맘카페',
				     	            		data: data4
				     	            });
				     	          }
					     	     
					     	     console.log('categories=> ',options.xAxis.categories);
					     	     console.log('series=> ',options.series);
					     	   
					     	     // end type all
					     	     
					     	     
					     	    
					     	 
			     	           $('#line_container').highcharts(options);
			     	           //PIE
			     	           
			     	          var options = {
					     	    		 chart: {
					     	    	        plotBackgroundColor: null,
					     	    	        plotBorderWidth: null,
					     	    	        plotShadow: false,
					     	    	        type: 'pie'
					     	    	    },
					     	    	    title: {
					     	    	        text: ''
					     	    	    },
					     	    	    tooltip: {
					     	    	        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					     	    	    },
					     	    	    plotOptions: {
					     	    	        pie: {
					     	    	            allowPointSelect: true,
					     	    	            cursor: 'pointer',
					     	    	            dataLabels: {
					     	    	                enabled: false
					     	    	            },
					     	    	    			
					     	    	            
					     	    	        }
					     	    	    },
									       
									       
									        series: [
									        	{

								    	            showInLegend: true,
									    	        colorByPoint: true,
									    	        data: [{
									    	        		
									    	            name: dcinside.length>0?'디시인사이드':'',
									    	            y: dcinside.length
									    	        }, 
									    	        {
									    	            name: ppomppu.length>0?'뽐뿌':'',
									    	            y: ppomppu.length>0?ppomppu.length:0,
									    	         
									    	        }, {
									    	            name: jihumom.length>0?'지후맘카페':'',
									    	            y: jihumom.length>0?jihumom.length:0
									    	        }, {
									    	            name: momsholic.length>0?'맘스홀릭카페':'',
									    	            y: momsholic.length
									    	        }]
									    	    }
									        ]
									    
									    };

					     	     
					     	     
					     	    
					     	 
			     	           $('#pie_container').highcharts(options);
			     	           
			     	           
			     	           //PIE
		 
				        
				    }
				  });
	
		}

	}
		
}();