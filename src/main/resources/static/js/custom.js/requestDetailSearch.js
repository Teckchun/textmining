
	var request = function() {

		return {	

			//콤마찍기
			comma : function(str) {
			    str = String(str);
				return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');				
			},

			init : function() {
				var table_id = "#dataset_list";
					accounting_data_table.init(table_id,100);	

//				request.get_list();
			},
			
			popup_contents : function(str) {
				
				$("#modal_popup_content").modal("show");
				$("#popup_board_content").val("");
				$("#popup_board_content").val(str);
				

			}, 
			
			getDataList : function() {	

				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				var keyword = $("#keyword").val();
				var must_keyword = $("#must_keyword").val();
				var except_keyword = $("#except_keyword").val();

//				if (keyword == "") {
//					alert("검색어는 필수 입력사항 입니다.");
//					return;
//					return false;
//				}
				
				$(function() {	
					$.ajax({
						type: "POST",
						crossDomain: true,
						dataType: "json",
						contentType:"application/x-www-form-urlencoded; charset=utf-8",
						url: "../controller/oops.php",
						data : {
							"module"			:	"getDetailList",
							"startDate"			:	startDate,
							"endDate"			:	endDate,
							"keyword"			:	keyword,
							"includeword"		:	must_keyword,
							"exceptword"	:	except_keyword
						},
						success: function(data) {							
							var jsonData = JSON.stringify(data);
							var jsonData = JSON.parse(jsonData);
							console.log(jsonData);
							if (jsonData) {	
								$('#datasetList').DataTable().clear().destroy();
//								$('#dataset_list *').remove();							
								
								var no=0;
								var html, html_merge;
								for(var i=0; i<jsonData.length; i++) {										
									no = no+1;							
									html = "<tr>";								
									html += "<td class=\"text-center\">" + no + "</td>";								
									html += "<td class=\"text-center\">" + jsonData[i].cont_type + "</td>";
									html += "<td class=\"text-center\">" + jsonData[i].board_num + "</td>";
									html += "<td class=\"text-center\">" + jsonData[i].board_title + "</td>";
									html += "<td class=\"text-center\"><a href=\"javascript:request.popup_contents('"+ jsonData[i].content +"')\"><button type=\"button\" class=\"btn btn-xs btn-warning\"><i class=\"fa fa-eye\"></i> 자세히</button></a></td>";
									html += "<td class=\"text-center\">" + jsonData[i].product_name + "</a></td>";

									html += "<td class=\"text-center\">" + jsonData[i].content_date + "</td>";
									html += "</tr>";
									html_merge += html;								
								}							
								$("#dataset_list").append(html_merge);
												
								var table_id = "#dataset_list";
								accounting_data_table.init(table_id,100);					

							} else {
								$('#datasetList').DataTable().clear().destroy();
							}
						},						
						error:function(request,status,error){
							if (request.responseText == "SESSION_TIMEOUT") {
								session.logout();
							} else {
								alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
							}
						},
						complete: function() { }
					})
				})
			}

		}
	}();

	function btnDownload(idx) {
		$('#popupDownload').empty();
		$("#modal_add_contents").modal("show");
		var ifmDownload = "<iframe src=\"http://1.246.219.212:19000/download?dataSetUID="+idx+"\" id=\"ifm\" width=\"400\" height=\"200\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" style=\"margin-left: 50px;\"></iframe>";
		$("#popupDownload").append(ifmDownload);
	}


//	$( "#extractDataset" ).change(function() {		
//		request.getYearList();
//		request.getFilterList();
//		request.getIndicatorList();
//	});
//
	$( "#btn_keyword" ).click(function() {			
		request.getDataList();
	});