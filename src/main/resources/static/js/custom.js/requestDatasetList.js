
	var request = function() {

		return {	

			//콤마찍기
			comma : function(str) {
			    str = String(str);
				return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');				
			},
						
			getDataCounts : function() {
				
				$(function() {	
					$.ajax({
						type: "POST",
						crossDomain: true,
						dataType: "json",
						contentType:"application/x-www-form-urlencoded; charset=utf-8",
						url: "../controller/oops.php",
						data : {
							"module"		:	"getDataCounts"
						},
						success: function(data) {							
							var jsonData = JSON.stringify(data);
							var jsonData = JSON.parse(jsonData);
							console.log(jsonData);
							if (jsonData) {	
								$("#ppCount").html(request.comma(jsonData[0].ppCount));
								$("#dcCount").html(request.comma(jsonData[0].dcCount));
								$("#jmCount").html(request.comma(jsonData[0].jmCount));
								$("#mhCount").html(request.comma(jsonData[0].mhCount));
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
			},

			init : function() {
				var table_id = "#dataset_list";
					accounting_data_table.init(table_id,100);	

				request.get_list();
			},
			
			getDataList : function() {	

				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				var category = $("#category").val();
				var keyword = $("#keyword").val();

				$(function() {	
					$.ajax({
						type: "POST",
						crossDomain: true,
						dataType: "json",
						contentType:"application/x-www-form-urlencoded; charset=utf-8",
						url: "../controller/oops.php",
						data : {
							"module"	:	"getDataList",
							"category"	:	category,
							"startDate" :	startDate,
							"endDate"	:	endDate,
							"keyword"	:	keyword
						},
						success: function(data) {							
							var jsonData = JSON.stringify(data);
							var jsonData = JSON.parse(jsonData);
							
							if (jsonData) {	
								$('#datasetList').DataTable().clear().destroy();
//								$('#dataset_list *').remove();							
								
								var no=0;
								var html, html_merge;
								for(var i=0; i<jsonData.length; i++) {										
									no = no+1;							
									html = "<tr>";								
									html += "<td class=\"text-center\">" + no + "</td>";								
									html += "<td class=\"text-center\">" + jsonData[i].category + "</td>";
									html += "<td class=\"text-center\">" + jsonData[i].boardTitle + "</td>";
									html += "<td class=\"text-center\"><a href=\""+jsonData[i].url+"\" target=\"_blank\">" + jsonData[i].url + "</a></td>";
									html += "<td class=\"text-center\">" + jsonData[i].boardView + "</td>";
									html += "<td class=\"text-center\">" + jsonData[i].replyCount + "</td>";
									html += "<td class=\"text-center\">" + jsonData[i].boardDate + "</td>";
									html += "</tr>";
									html_merge += html;								
								}							
								$("#dataset_list").append(html_merge);
												
								var table_id = "#dataset_list";
								accounting_data_table.init(table_id,100);					

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