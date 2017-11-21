http://localhost:8080/rest

console.log('advanced search')
    var REQUEST_URL={
    		server:'http://35.201.252.181:11008/rest',
    		local:'http://localhost:8081/rest'
    } 
    
	
	var request = function() {
	

		return {	
			init:function(){
				console.log('init');

				 	
				
			
			        
			},
			
			// TODO: getBoards
			advancedSearch:function(){
	
				
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
		        
		        concat+="startDate="+startDate+"&endDate"+endDate;
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
		            	"url" : REQUEST_URL.local+'/data-monitoring/advancedSearch'+concat,
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
	
	request.init();

	function btnDownload(idx) {
		$('#popupDownload').empty();
		$("#modal_add_contents").modal("show");
		var ifmDownload = "<iframe src=\"http://1.246.219.212:19000/download?dataSetUID="+idx+"\" id=\"ifm\" width=\"400\" height=\"200\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" style=\"margin-left: 50px;\"></iframe>";
		$("#popupDownload").append(ifmDownload);
	}

//	$( "#btn_keyword" ).click(function() {			
//		request.getDataList();
//	});
	
	
	