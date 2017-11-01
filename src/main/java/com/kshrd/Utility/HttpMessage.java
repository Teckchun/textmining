package com.kshrd.Utility;

public class HttpMessage {
	/**
	 * RESPONSE MESSAGE WITH THE SUCCESSFULL TRANSACTION
	 * @param objectName
	 * @param transaction
	 * @return objectName has been transaction successfully.
	 */
	public static String success(String objectName, String transaction){
		return objectName + " has been " + transaction + " successfully."; 
	}
	
	/**
	 *  RESPONSE MESSAGE WITH THE SUCCESSFULL TRANSACTION
	 * @param objectName
	 * @param transaction
	 * @param id
	 * @return objectName has been transaction successfully with # id.
	 */
	public static String success(String objectName, String transaction, int id){
		return objectName + " has been " + transaction + " successfully with # " + id + "."; 
	}

	/**
	 * RESPONSE MESSAGE WITH THE FAIL TRANSACTION
	 * @param objectName
	 * @param transaction
	 * @return objectName coulnd not transaction.
	 */
	public static String fail(String objectName, String transaction){
		return objectName + " could not " + transaction + ".";
	}
	
	/**
	 * RESPONSE MESSAGE WITH THE FAIL TRANSCTION
	 * @param objectName
	 * @param transaction
	 * @param id
	 * @return objectName could not transaction with # id.
	 */
	public static String fail(String objectName, String transaction, int id){
		return objectName + " could not " + transaction + " with # " + id + ".";
	}
	
	/**
	 * RESPONSE MESSAGE WITH INTERNAL SERVER ERROR
	 */
	public static String INTERNAL_SERVER_ERROR = "Something is broken. Please contact to developers team!";

	/**
	 * RESPONSE MESSAGE WITH ERROR SERVERSIDE
	 */
	public static String ERROR = "There are some error from serverside."; 
	
	public static String OPERATION_FAIL = "Operation failed";

	public static String FAILED_TO_REGISTER_EMAIL = "Could not register user with this email.";
	
	public static String FAILED_TO_REGISTER_PHONE_NUMBER = "Could not register user with this phone number.";
	
	public static String FAILED_TO_ACTIVE_ACCOUNT = "Your account is inactive! Please go to your email to active your account!";
	
	public static String SUCCEED_TO_REGISTER_ACCOUNT = "Register success!";
	
	public static String FAILED_TO_LOGIN_WITH_SESSION_ACTIVE = "Sorry, It seems you have used this account on another device!\nPlease logout from another device.";
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * RETRIEVE DATA FROM SERVER WITH DATA FOUND
	 */
	public static String FOUND = "Record(s) found."; 
	

	 
	

	/**
	 * RETRIEVE DATA FROM SERVER WITHOUT DATA FOUND
	 */
	public static String NOT_FOUND = "Record(s) not found.";
	

	


	


	public static String ACCOUNT_DELETED = "Your account has been deleted."; 


	public static String ACCOUNT_LOCKED = "Your account is locked."; 

}