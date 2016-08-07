package com.websystique.springsecurity.model;

public enum PermissionType {
	
	READ("READ"),
	EDIT("EDIT"),
	CREATE("CREATE"),
	DELETE("DELETE");
	
	String permissionType;
	
	
	private PermissionType(String permissString){
		this.permissionType = permissString;
	}

	public String getPermissionType() {
		return permissionType;
	}

	

}
