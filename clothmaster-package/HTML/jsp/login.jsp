<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>私家定制衣橱</title>

<!-- CSS + IMG HERE -->
<!-- CSS + IMG HERE -->

</head>
<body>

   <!--
   <center>
		<form id="loginform" action="profile/controller/login_controller.jsp">
			使用者名称:
    		<input type="text" name="userid" />
    		<br>
   			 密码:
    		<input type="password" name="password" />
    		<br>
    		<input type="submit" value="submit"/>
		</form>
	</center>
     -->

	<div id="loginbox">            
		<form id="loginform" class="form-vertical" action="profile/controller/login_controller.jsp" method="post">
			<div class="control-group normal_text"> <h3><img src="img/logo.png" alt="Logo" /> </h3></div>
			
                <div class="control-group">
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_lg"><i class="icon-user"> </i></span><input type="text" name="userid" placeholder="使用者名称" />
                        </div>
                    </div>
                </div>
                
                <div class="control-group">
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_ly"><i class="icon-lock"></i></span><input type="password" name="password" placeholder="密码" />                            
                        </div>
                    </div>
                </div>
                
                <div class="form-actions">
                    <span class="pull-left"><a href="#" class="flip-link btn btn-info" id="to-recover">忘记密码?</a></span>
                    <!-- <span class="pull-right"><a type="submit" href="profile/controller/login_controller.jsp" class="btn btn-success" >登入</a></span> -->
                    <span class="pull-right"><input type="submit" value="登入"></span>
                </div>
                
            </form>
            <%
            
            String msg = (String)session.getAttribute("login_message");
            
            if ( msg != null ) {
            	out.print(msg);
            	session.removeAttribute("login_message");
            }
            
            %>

	
            <!-- 忘記密碼
            
            <form id="recoverform" action="#" class="form-vertical">
				<p class="normal_text">请输入您的E-mail</p>
				
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_lo"><i class="icon-envelope"></i></span><input type="text" placeholder="E-mail address" />
                        </div>
                    </div>
               
                <div class="form-actions">
                    <span class="pull-left"><a href="#" class="flip-link btn btn-success" id="to-login">回到登出</a></span>
                    <span class="pull-right"><a class="btn btn-info"/>回复</a></span>
                </div>
            </form>
            
             -->

        </div>

</body>

<!-- JS HERE -->
<!-- JS HERE -->

</html>