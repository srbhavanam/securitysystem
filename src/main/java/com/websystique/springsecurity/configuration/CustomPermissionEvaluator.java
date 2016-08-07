package com.websystique.springsecurity.configuration;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websystique.springsecurity.model.Permission;
import com.websystique.springsecurity.model.UserProfile;
import com.websystique.springsecurity.service.UserService;


@Service("customPermissionEvaluator")
public class CustomPermissionEvaluator implements PermissionEvaluator {
	
	
	

	
	@Autowired
	private UserService userService;
	
	
	
	
	@Transactional(readOnly=true)
	public boolean hasPermission(Authentication authentication, Object targetDomain, Object permission) {
		boolean hasPermission = false;
		UserProfile profile = null;
		String username = "";
		Set<String> permissions = new HashSet<String>();
		if ( authentication != null &&  permission instanceof String){
		User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (user instanceof UserDetails) {
			username  = user.getUsername();
			com.websystique.springsecurity.model.User user2 =  userService.findBySso(username);
			Set<UserProfile> profiles =  user2.getUserProfiles();
			
			Iterator<UserProfile> iterator = profiles.iterator();
			while(iterator.hasNext()){
				 profile = iterator.next();
				break;
			}
			if(profile != null){
				Iterator<Permission> iterator2 = profile.getPermissions().iterator();
				while(iterator2.hasNext()){
					permissions.add(iterator2.next().getName());
				}
			}
			
		
			
			return permissions.contains(permission);
			}
			
		} 
		
		// TODO Auto-generated method stub
		return hasPermission;
	}

	public boolean hasPermission(Authentication arg0, Serializable arg1,
			String arg2, Object arg3) {
		// TODO Auto-generated method stub
		return false;
	}

}
