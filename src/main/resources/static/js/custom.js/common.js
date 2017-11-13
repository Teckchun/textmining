$(document).ready(function() { 
	
	$('#startDate').datepicker('setDate', new Date());
	$('#endDate').datepicker('setDate', new Date());
	//date_minus();
	//setTimeout(function(){ date_minus();  }, 0);

//	var page_url = location.pathname; 	
//	var filename = page_url.substring(page_url.lastIndexOf('/')+1);
//
//	if (filename == "requestDatasetList.php") {		
//		setTimeout(function(){ request.getDataList();  }, 100);
//	} 

	


});

var comFunc = function() {
	
	return {
		
		grawlNoti : function(growlType, growltitle, growlcontents, delay) {
			$.bootstrapGrowl('<h4>'+growltitle+'</h4> <p>' + growlcontents + '</p>', {
				type: growlType,
				delay: delay,
				allow_dismiss: true
			});	
		},

		addOptionList : function(div_id, value, title) {
			$("#" + div_id).append("<option value=" + value + ">" + title + "</option>");	
		}

	}
}();


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


function date_minus() {	
	
	var startDate = document.getElementById("startDate").value;
	var startDate = new Date(startDate);
	var startDate_newdate = new Date(startDate);
		startDate_newdate.setDate(startDate_newdate.getDate() - 1);

	var dd = startDate_newdate.getDate();
    var mm = startDate_newdate.getMonth() + 1;
    var y = startDate_newdate.getFullYear();

	var startDate = y + '-' + mm + '-' + dd;
	var startDate = document.getElementById("startDate").value = startDate;
	var startDate = new Date(startDate);
	
	//endDate 계산
	var endDate = document.getElementById("endDate").value;
	var endDate = new Date(endDate);
	var endDate_newdate = new Date(endDate);
		endDate_newdate.setDate(endDate_newdate.getDate() - 1);

	var dd = endDate_newdate.getDate();
    var mm = endDate_newdate.getMonth() + 1;
    var y = endDate_newdate.getFullYear();

	var endDate = y + '-' + mm + '-' + dd;
	var endDate = document.getElementById("endDate").value = endDate;

	$('#startDate').datepicker('setDate', startDate);
	$('#endDate').datepicker('setDate', endDate);
	
	var tab_type = $("#tabItemType").val();
	var page_url = location.pathname; 	
	var filename = page_url.substring(page_url.lastIndexOf('/')+1);

//	if (filename == "requestDatasetList.php") {		
//		request.getDataList();	
//	} 
}


function week_plus(){
	var startDate = document.getElementById("startDate").value;
	var startDate = new Date(startDate);
	var startDate_newdate = new Date();
	if(localStorage.startDate!=undefined){
		console.log('!=undefine')
		var myDate = new Date(localStorage.endDate)
		//localStorage.startDate = myDate;
		//myDate = Date.parse(localStorage.startDate)
		console.log('myDate', myDate);
		startDate_newdate.setDate(myDate);
	//	console.log('startDate new date ', startDate_newdate);
	}else{
		console.log('undefinedddd')
		startDate_newdate.setDate(startDate_newdate.getDate() + 1);
	}

	var dd = startDate_newdate.getDate();
    var mm = startDate_newdate.getMonth() + 1;
    var y = startDate_newdate.getFullYear();
    
 // TODO: save StartDate to localStorage
	localStorage.startDate=startDate;
	console.log('startDate ',localStorage.getItem('startDate'));
	var startDate = y + '-' + mm + '-' + dd;
	
	
	
	//endDate 계산
	var endDate = document.getElementById("endDate").value;
	var endDate = new Date(endDate);
	var endDate_newdate = new Date(endDate);
		endDate_newdate.setDate(endDate_newdate.getDate() + 7);
	var dd = endDate_newdate.getDate();
    var mm = endDate_newdate.getMonth() + 1;
    var y = endDate_newdate.getFullYear();
	var endDate = y + '-' + mm + '-' + dd;
	
	// TODO: save StartDate to localStorage
	localStorage.endDate=endDate;
	console.log('endDate ',localStorage.getItem('endDate'));
	
	
	var tab_type = $("#tabItemType").val();
	var page_url = location.pathname; 	
	var filename = page_url.substring(page_url.lastIndexOf('/')+1);
	
	$('#startDate').datepicker('setDate', startDate);
	$('#endDate').datepicker('setDate', endDate);
	
	
}

function date_plus() {			
	var startDate = document.getElementById("startDate").value;
	var startDate = new Date(startDate);
	var startDate_newdate = new Date(startDate);
		startDate_newdate.setDate(startDate_newdate.getDate() + 1);
	var dd = startDate_newdate.getDate();
    var mm = startDate_newdate.getMonth() + 1;
    var y = startDate_newdate.getFullYear();
	var startDate = y + '-' + mm + '-' + dd;
	
	//endDate 계산
	var endDate = document.getElementById("endDate").value;
	var endDate = new Date(endDate);
	var endDate_newdate = new Date(endDate);
		endDate_newdate.setDate(endDate_newdate.getDate() + 1);
	var dd = endDate_newdate.getDate();
    var mm = endDate_newdate.getMonth() + 1;
    var y = endDate_newdate.getFullYear();
	var endDate = y + '-' + mm + '-' + dd;
	
	var tab_type = $("#tabItemType").val();
	var page_url = location.pathname; 	
	var filename = page_url.substring(page_url.lastIndexOf('/')+1);
	
	$('#startDate').datepicker('setDate', startDate);
	$('#endDate').datepicker('setDate', endDate);

	if (filename == "requestDatasetList.php") {		
		request.getDataList();	
	} 
}

function today() {
	$('#startDate').datepicker('setDate', new Date());
	$('#endDate').datepicker('setDate', new Date());

	var tab_type = $("#tabItemType").val();
	var page_url = location.pathname; 	
	var filename = page_url.substring(page_url.lastIndexOf('/')+1);

	if (filename == "requestDatasetList.php") {		
		request.getDataList();	
	} 
}

function formatDate(date) {
	var mymonth = date.getMonth()+1;
	var myweekday = date.getDate();
	return (mymonth + "-" + myweekday);
}

function printWeek() {
	
	var now = new Date();
	var nowDayOfWeek = now.getDay();
	var nowDay = now.getDate();
	var nowMonth = now.getMonth();
	var nowYear = now.getYear();
		nowYear += (nowYear < 2000) ? 1900 : 0;
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
	var sDate = formatDate(weekStartDate);
	var eDate = formatDate(weekEndDate);
		sDate = sDate.split("-");
	if(sDate[1].length==1){sDate[1] = "0"+sDate[1];}
		eDate = eDate.split("-");
	if(eDate[1].length==1){eDate[1] = "0"+eDate[1];}	
		sDate = sDate[0]+"-"+sDate[1];
		eDate = eDate[0]+"-"+eDate[1];

	$('#startDate').datepicker('setDate', nowYear+"-"+sDate)
	$('#endDate').datepicker('setDate', nowYear+"-"+eDate)
		
	var tab_type = $("#tabItemType").val();
	
	

}


function printMonth(){
	var now = new Date();
	var nowDayOfWeek = now.getDay();
	var nowDay = now.getDate();
	var nowMonth = now.getMonth();
	var nowYear = now.getYear();
		nowYear += (nowYear < 2000) ? 1900 : 0;
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));

	var sDate = new Date(nowYear, nowMonth);
	var eDate = new Date(now.getYear(), now.getMonth()+1,0);
	sDate = formatDate(sDate);
	eDate = formatDate(eDate);


    sDate = sDate.split("-");
    if(sDate[1].length==1){sDate[1] = "0"+sDate[1];}
    eDate = eDate.split("-");
    if(eDate[1].length==1){eDate[1] = "0"+eDate[1];}
	
    sDate = sDate[0]+"-"+sDate[1];
    eDate = eDate[0]+"-"+eDate[1];

    $('#startDate').datepicker('setDate', nowYear+"-"+sDate)
	$('#endDate').datepicker('setDate', nowYear+"-"+eDate)

	var tab_type = $("#tabItemType").val();
	var page_url = location.pathname; 	
	var filename = page_url.substring(page_url.lastIndexOf('/')+1);

	if (filename == "requestDatasetList.php") {		
		request.getDataList();	
	} 
}

function get_input_date(type) {

	var startDate = $("#startDate").val();	
	var endDate = $("#endDate").val();	
	
	//날짜 차이 구하기
    var arr1 = startDate.split('-');
    var arr2 = endDate.split('-');
    var dat1 = new Date(arr1[0], arr1[1], arr1[2]);
    var dat2 = new Date(arr2[0], arr2[1], arr2[2]);

	var diff = dat2 - dat1;
    var currDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
    var currMonth = currDay * 30;// 월 만듬
    var currYear = currMonth * 12; // 년 만듬
	var result = diff/currDay;

	if (type != "get_today") {
		if (result < 6) {
			 printWeek();
			return "";
		}	
	}
	
	$.ajaxSettings.traditional = true;
	jQuery.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
		crossDomain: true,
		type: 'GET',		
		dataType: 'text',
		url: '../controller/custom.function.php',        
		data: {	
			"module"	: type,
			"startDate" : startDate,
			"endDate"	: endDate
		},
		success: function(data) {										
			var jsonData = JSON.parse(data);

			$('#startDate').datepicker('setDate', jsonData.r_startDate);
			$('#endDate').datepicker('setDate', jsonData.r_endDate);
			
			var tab_type = $("#tabItemType").val();
			var page_url = location.pathname; 	
			var filename = page_url.substring(page_url.lastIndexOf('/')+1);

			if (filename == "requestDatasetList.php") {		
				request.getDataList();	
			} 
			
		}
	});		
}
