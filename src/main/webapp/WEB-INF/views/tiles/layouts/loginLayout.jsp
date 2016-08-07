<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>



<html>

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title><tiles:getAsString name="title" /></title>
<link href="<c:url value='/static/css/bootstrap.css' />"
	rel="stylesheet"></link>
<link href="<c:url value='/static/css/internal.css' />" rel="stylesheet"></link>
<link href="<c:url value='/static/fonts/fonts.css' />" rel="stylesheet"></link>
<link href="<c:url value='/static/css/font-awesome.min.css' />"
	rel="stylesheet"></link>
<link href="<c:url value='/static/css/animate.css' />" rel="stylesheet"></link>
<script src="<c:url value='/static/js/jquery-2.1.4.min.js' />"></script>
<script src="<c:url value='/static/js/bootstrap.min.js' />"></script>

<style>
.header {
	width: 100%;
	border-bottom: 7px solid #31708f;
	padding: 1% 0;
}

.thin1 {
	color: #009688;
	font-weight: bold;
}

.navbar-default .navbar-nav>.active>a, .navbar-default .navbar-nav>.active>a:hover,
	.navbar-default .navbar-nav>.active>a:focus {
	color: #ffffff;
	background-color: transparent;
	text-shadow: rgb(96, 210, 252) 0px 0px 6px;
	outline: none;
}
</style>


</head>


 
<body>
		<header id="header">
			<tiles:insertAttribute name="header" />
		</header>
	
			
		<section id="login-content">
			<tiles:insertAttribute name="body" />
		</section>
		
		<footer id="footer">
			<tiles:insertAttribute name="footer" />
		</footer>
</body>
</html>