//http://localhost:8080/rest
    var REQUEST_URL={
    		server:'http://35.201.252.181:11008/rest',
    		local:'http://35.201.252.181:11008/rest'
    } 
    

	var request = function() {

		return {	
			// TODO: initial data
			init:function(){
				//$(".se-pre-con").fadeIn(500);
				
				
				
				
				 var startDate = $("#startDate").val();
				 var endDate = $("#endDate").val();
				 var category = $("#category").val();
				 var keyword = $("#keyword").val();
				 // get selected category
				 var type = $('#category').find(":selected").val();
				 //TODO: initialization data for passing to server!
				 var filter = function filterData(){
		            var settings = $("#datasetList").dataTable().fnSettings();
		            console.log('datatable_settings: init ', settings);
		            
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
		            console.log('start end date', startDate + endDate)
		            console.log("type inside request", type);
		            
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

		     	            console.log(response);
		     	           //TODO: response pattern for DATATABLE
		     	            
		     	           	for(i in response.data){
		     	           		console.log(response.data[i].type);
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
		     	           	
		     	           
		     	            
		     	          
		     	            
		     	            // GRAPH
		     	           if(response.data.length>0)
		     	      		$("#resultdiv").show();
		     	      	else
		     	      		$("#resultdiv").hide();
		     	      		
		     	              var rows = response.data;

		     	              var occurences = rows.reduce(function (r, row) {
		     	                  r[row.insert_date] = ++r[row.insert_date] || 1;
		     	                  return r;
		     	              }, {});

		     	              var result = Object.keys(occurences).map(function (key) {
		     	                  return { key: key, value: occurences[key] };
		     	              });



		     	              container.innerHTML='';
		     	              
		     	              console.log(result)
		     	              
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
								        series: [{
								            name: '건수',
								            data: []
								        }],  /*legend: {
				     	                    layout: 'vertical',
				     	                    align: 'right',
				     	                    verticalAlign: 'middle'
				     	                },*/responsive: {
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
		     	              
		     	             for (var i = 0; i<result.length; i++) {
		     	                options.xAxis.categories.push(result[i].key);
		     	                options.series[0].data.push(result[i].value);
		     	            };
		     	           $('#container').highcharts(options);
		     	            
		     	          /*   Highcharts.chart('container', {

		     	                title: {
		     	                    text: 'Solar Employment Growth by Sector, 2010-2016'
		     	                },

		     	                subtitle: {
		     	                    text: 'Source: thesolarfoundation.com'
		     	                },

		     	                yAxis: {
		     	                    title: {
		     	                        text: 'Number of Employees'
		     	                    }
		     	                },
		     	                legend: {
		     	                    layout: 'vertical',
		     	                    align: 'right',
		     	                    verticalAlign: 'middle'
		     	                },

		     	                plotOptions: {
		     	                    series: {
		     	                        label: {
		     	                            connectorAllowed: false
		     	                        },
		     	                        pointStart: 2010
		     	                    }
		     	                },

		     	                series:data,

		     	                responsive: {
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

		     	            });*/
		     	              /*Morris.Line({
		     	                  // ID of the element in which to
		     	                  // draw the chart.
		     	                  element : 'container',

		     	                  // Chart data records -- each
		     	                  // entry in this array
		     	                  // corresponds to a point
		     	                  // on the chart.
		     	                  data : result,

		     	                  // The name of the data record
		     	                  // attribute that contains
		     	                  // x-values.
		     	                  xkey : [ 'key' ],

		     	                  // A list of names of data
		     	                  // record attributes that
		     	                  // contain y-values.
		     	                  ykeys : [ 'value' ],
		     	                  xmin : 1,
		     	                  xmax : 12,
		     	                  // Labels for the ykeys -- will
		     	                  // be displayed when you hover
		     	                  // over the
		     	                  // chart.
		     	                  labels : [ '검색건수' ],

		     	                  xLabels : [ '날짜' ],
		     	                  lineColors : [ '#0b62a4' ],
		     	                  parseTime : false,

		     	                  // Disables line smoothing
		     	                  smooth : true,
		     	                  resize : true
		     	              });*/




		     	              var rows = response.data;

		     	              var occurences2 = rows.reduce(function (r, row) {
		     	                  r[row.type] = ++r[row.type] || 1;
		     	                  return r;
		     	              }, {});

		     	              var result2 = Object.keys(occurences2).map(function (key) {
		     	                  return { key: key, value: occurences2[key] };
		     	              });

		     	              console.log("result2=> ",result2)
		     	              var type = ["뽐뿌","디시인사이드","지후맘카페"];
		     	              $("#dataCount").html("");
		     	              for(i=0; i<result2.length; i++){
		     	              
		     	              	
		     	              	
		     	              	 $("#dataCount").append('<div class="alert alert-warning" role="alert">'+
		     	                  				 '<strong>'+type[i]+':'+result2[i].value+'</strong>'+
		     	              				 '</div>'
		     	                   		
		     	                   		);
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
	     		            { "data": "insert_date" }
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
			
			//TODO: count numbers of boards in each category
			getDataCounts: function(){
				$(function(){
					    
//				        statistic
				        $.ajax({
				            url: REQUEST_URL.local+'/data-monitoring/count'

				        }).done(function(res) {
				            console.log("res ",res);
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
//				
				//$(".se-pre-con").fadeIn(500);
//			    	$('#startDate').datepicker('setDate', new Date(2017, 9, 10));
//				$('#endDate').datepicker('setDate', new Date(2017, 9, 22));
//				$("#keyword").val("갤s7"); 
			        
				 var startDate = $("#startDate").val();
				 var endDate = $("#endDate").val();
				 var category = $("#category").val();
				 var keyword = $("#keyword").val();
				 var type = $('#category').find(":selected").val();
			    	
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
		          
		            console.log("type in request => ",type);
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
				     	           // GRAPH
					     	           if(response.data.length>0)
					     	      		$("#resultdiv").show();
					     	      	else
					     	      		$("#resultdiv").hide();
					     	      		
					     	              var rows = response.data;

					     	              var occurences = rows.reduce(function (r, row) {
					     	                  r[row.insert_date] = ++r[row.insert_date] || 1;
					     	                  return r;
					     	              }, {});

					     	              var result = Object.keys(occurences).map(function (key) {
					     	                  return { key: key, value: occurences[key] };
					     	              });



					     	              container.innerHTML='';

					     	              /*Morris.Line({
					     	                  // ID of the element in which to
					     	                  // draw the chart.
					     	                  element : 'container',

					     	                  // Chart data records -- each
					     	                  // entry in this array
					     	                  // corresponds to a point
					     	                  // on the chart.
					     	                  data : result,

					     	                  // The name of the data record
					     	                  // attribute that contains
					     	                  // x-values.
					     	                  xkey : [ 'key' ],

					     	                  // A list of names of data
					     	                  // record attributes that
					     	                  // contain y-values.
					     	                  ykeys : [ 'value' ],
					     	                  xmin : 1,
					     	                  xmax : 12,
					     	                  // Labels for the ykeys -- will
					     	                  // be displayed when you hover
					     	                  // over the
					     	                  // chart.
					     	                  labels : [ '검색건수' ],

					     	                  xLabels : [ '날짜' ],
					     	                  lineColors : [ '#0b62a4' ],
					     	                  parseTime : false,

					     	                  // Disables line smoothing
					     	                  smooth : true,
					     	                  resize : true
					     	              });*/
					     	             var options = {
					     	            		 title: {
											            text: '[검색어 추이]',
											        }, xAxis: {
											            categories: []
											        },
											        yAxis: {
											            title: {
											                text: '검색건수'
											            }
											        },
											        series: [{
											            name: '날짜',
											            data: []
											        }],  /*legend: {
							     	                    layout: 'vertical',
							     	                    align: 'right',
							     	                    verticalAlign: 'middle'
							     	                },*/responsive: {
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
					     	              
					     	             for (var i = 0; i<result.length; i++) {
					     	                options.xAxis.categories.push(result[i].key);
					     	                options.series[0].data.push(result[i].value);
					     	               //options.series[1].data.push((result[i].value+6));
						     	            
					     	             };
					     	           $('#container').highcharts(options);




					     	              var rows = response.data;

					     	              var occurences2 = rows.reduce(function (r, row) {
					     	                  r[row.type] = ++r[row.type] || 1;
					     	                  return r;
					     	              }, {});

					     	              var result2 = Object.keys(occurences2).map(function (key) {
					     	                  return { key: key, value: occurences2[key] };
					     	              });

					     	              console.log("result2=> ",result2)
					     	              var type = ["뽐뿌","디시인사이드","지후맘카페"];
					     	              $("#dataCount").html("");
					     	              for(i=0; i<result2.length; i++){
					     	              
					     	              	
					     	              	
					     	              	 $("#dataCount").append(
					     	                   		'<div class="alert alert-warning" role="alert">'+
					     	                  				 '<strong>'+type[i]+':'+result2[i].value+'</strong>'+
					     	              				 '</div>'
					     	                  				 )
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
	     		            { "data": "insert_date" }
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
		     
		   	  	// Apply the search
//		        table.columns().every( function () {
//		            var self = this;
//		            $( 'input', this.footer() ).on( 'keyup change', function () {
//		                if ( self.search() !== this.value ) {
//		                	self.search( this.value ).draw();
//		                }
//		            } );
//		        } );
		   	  	//TODO: End Search Block
		        
				
				
				
				
			}
				
		}
	}();
	$("#frmSearch").on('submit', function(e){
	    e.preventDefault();
	   request.getBoards();
	});
	function btnDownload(idx) {
		$('#popupDownload').empty();
		$("#modal_add_contents").modal("show");
		var ifmDownload = "<iframe src=\"http://1.246.219.212:19000/download?dataSetUID="+idx+"\" id=\"ifm\" width=\"400\" height=\"200\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" style=\"margin-left: 50px;\"></iframe>";
		$("#popupDownload").append(ifmDownload);
	}
	
	