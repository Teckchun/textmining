function m_login() {
	var login_id = $("#login_id").val();
	var login_password = $("#login_password").val(); 

	if (login_id == "") { commonFunc.grawlNoti("danger", "경고", "아이디를 넣어주세요.", "2500"); return ""; }
	if (login_password == "") { commonFunc.grawlNoti("danger", "경고", "비밀번호를 넣어주세요.", "2500"); return ""; }

	$(function() {	
		$.ajax({
			type: "POST",
			crossDomain: true,
			dataType: "text",
			contentType:"application/x-www-form-urlencoded; charset=utf-8",
			url: "../controller/oops.php",
			data : {
				"module"	:	"m_login",
				"login_id"	:	login_id,
				"login_password" : login_password
			},
			success: function(data) 
			{	
				if (data == "SUCCESS") {									
					location.href="accounting.php";
				} else {
					commonFunc.grawlNoti("danger", "경고", data, "2500"); return "";
				}
			},						
			error:function(request,status,error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				alert(request.responseText);
			},
			complete: function() { }
		})
	})
}

$(document).ready(function(){
	$("#login_id").keypress(function (e) {
        if (e.which == 13){
           m_login();  // 실행할 이벤트
        }
    });
    $("#login_password").keypress(function (e) {
        if (e.which == 13){
           m_login();  // 실행할 이벤트
        }
    });
});