package com.websystique.springsecurity.restcontroller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.websystique.springsecurity.model.User;
import com.websystique.springsecurity.service.UserService;


@Path("/rest")
@Component
public class UserRestController {
	
	
	@Autowired
	private UserService userService;
	
	
	
	@GET
    @Path("/user/{id}")
    @Produces("application/json")
    public Response getUserById(@PathParam("id") int id) {
    	User user = userService.findById(id);
        return Response.ok(user).build();
    }
	
	@GET
    @Path("/user")
    @Produces("application/json")
    public Response getUserByName(@QueryParam("name") String name) {
    	User user = userService.findBySso(name);
        return Response.ok(user).build();
    }


}
