package com.websystique.springsecurity.model;

public enum UserProfileType {
	USER("USER"),
	SALES("SALES"),
	ADMIN("ADMIN");
	
	String userProfileType;
	
	private UserProfileType(String userProfileType){
		this.userProfileType = userProfileType;
	}
	
	public String getUserProfileType(){
		return userProfileType;
	}
	
}
