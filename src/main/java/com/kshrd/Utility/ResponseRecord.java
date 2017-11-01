package com.kshrd.Utility;

public class ResponseRecord<T> extends Response {
	/*
	 * RESPONSE RECORD CLASS USING WITH SINGLE OBJECT
	 */

	private T data;

	public static class ResponseRecordSuccess<T> extends ResponseRecord<T> {
		
		public ResponseRecordSuccess(String message, boolean status, T data) {
			super.setMessage(message);
			super.setStatus(status);
			super.setData(data);
		}
	}
	
	@SuppressWarnings("rawtypes")
	public static class ResponseRecordFailure extends ResponseRecord {
		private Error error;
		
		public ResponseRecordFailure(String message, boolean status, ResponseHttpStatus error) {
			super.setMessage(message);
			super.setStatus(status);
			
			this.setError(new Error(error));
		}

		public static class Error {

			private int code;
			private String message;
			
			public Error(ResponseHttpStatus status) {
				super();
				this.code = status.value();
				this.message = status.getReasonPhrase();
			}

			public int getCode() {
				return code;
			}
			
			public void setCode(int code) {
				this.code = code;
			}
			
			public String getMessage() {
				return message;
			}
			
			public void setMessage(String message) {
				this.message = message;
			}
		}
		
		public Error getError() {
			return error;
		}

		public void setError(Error error) {
			this.error = error;
		}
	}
	
	
	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
}
