<div>
	Dear <strong>${user}</strong>, 
	
	Welcome to 
	<security:authorize access="hasPermission(null,'READ') or hasPermission('#targetDomainObject','DELETE')">
	<p>DBA Page.</p>
	</security:authorize>
	<a href="<c:url value="/logout" />">Logout</a>
</div>