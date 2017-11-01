	package com.kshrd.Utility;

public enum ResponseHttpStatus {

	// 2xxx Success
	// GET 200x
	OK(2000, "Success! Eyerything is working"),
	RETRIEVED_RECORD(2001, "Retrieves a specific record"),
	RETRIEVED_LIST_OF_RECORDS(2002, "Retrieves a list of records"),
	
	// POST 201x
	CREATED(2010, "New record has been created successfully"),
	REGISTER_SUCCEED(2011, "Successfully register an account"),
	LOGIN_SUCCEED(2011, "Successfully logged in"),
		
	// PUT/PATCH/DELETE 204x
	UPDATED(2041, "The specific record was successfully updated"),
	DELETED(2042, "The specific record was successfully daleted"),
	
	
	// --- 4xxx Client Error ---
	// POST 400x
	BAD_REQUEST(4000, "The request was invalid or cannot be served. The exact error should be explained in the error payload. E.g. „The JSON is not valid"),
	OPERATION_FAIL(4000, "Operation failed"),
	CREATION_FAILED(4001, "Unable to create record"),
	DELETE_FAILED(4001, "Unable to delete record"),
	UPDATE_FAILED(4001, "Unable to update record"),
	ACCOUNT_CREATION_FAILED(4042, "Account is locked."),
	ACCOUNT_SESSION_ACTIVE(4043, "Account logged in another device."),
	
	
	// Unauthorized - HTTP Response Code: 401x
	UNAUTHORIZED(4010, "The request requires an user authentication"),
	ACCOUNT_INACTIVE(4042, "Account is inactive."),
	
	// Forbidden - HTTP Response Code: 403x
	FORBIDDEN(4030, "The request is understood, but it has been refused or access is not allowed"),
	ACCOUNT_LOCKED(4012, "Account is locked."),
	
	// GET/DELTE 404x
	NOT_FOUND(4040, " There is no resource behind the URI"),
	RECORD_NOT_FOUNT(4041, "Record(s) not found"),
	RECORD_NOT_UPDATE(4041, "Record cound not found"),
	ACCOUNT_DELETED(4042, "Account has been deleted"),
	
	// Method Not Allowed - HTTP Response Code: 405x
	METHOD_NOT_ALLOWED(4050, "A request was made of a page using a request method not supported by that page"),
	
	// Not Acceptable - HTTP Response Code: 406x
	NOT_ACCEPTABLE(4060, "The server can only generate a response that is not accepted by the client"),
		
	//  Proxy Authentication Required - HTTP Response Code: 407x
	PROXY_AUTHENTICATION_REQUIRED(4070, "The client must first authenticate itself with the proxy"),
	
	// Request Timeout - HTTP Response Code: 408x
	REQUEST_TIMEOUT(4080, "The server timed out waiting for the request"),
	
	// Gone - HTTP Response Code: 410x
	GONE(4100, "The requested page is no longer available"),
	
	// Too Many Requests - HTTP Response Code: 429x
	TOO_MANY_REQUEST(4290, "The request cannot be served due to the rate limit having been exhausted for the resource"),
	

	
	
	// --- 5xxx Server Error ---
	// Internal Server Error - HTTP Response Code: 500x
	INTERNAL_SERVER_ERROR(5000, "Something is broken"),
	
	// Not Implemented - HTTP Response Code: 501x
	NOT_IMPLEMENTED(5010, "The server either does not recognize the request method, or it lacks the ability to fulfill the request"),
	
	// Bad Gateway - HTTP Response Code: 502x
	BAD_GATEWAY(5020, "The server was acting as a gateway or proxy and received an invalid response from the upstream server"),
	
	// Service Unavailable - HTTP Response Code: 503x
	SERVICE_UNAVAILABLE(5030, "The server is up, but overloaded with requests. Try again later!"),
	
	// Gateway Timeout - HTTP Response Code: 504x
	GATEWAY_TIMEOUT(5040, "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server"),
	
	// HTTP Version Not Supported - HTTP Response Code: 505x
	HTTP_VERSION_NOT_SUPPORTED(5050, "The server does not support the HTTP protocol version used in the request");
	

	private final int value;
	private final String reasonPhrase;

	ResponseHttpStatus(int value, String reasonPhrase) {
		this.value = value;
		this.reasonPhrase = reasonPhrase;
	}

	public int value() {
		return this.value;
	}

	public String getReasonPhrase() {
		return this.reasonPhrase;
	}
}
