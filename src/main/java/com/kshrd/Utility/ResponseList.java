package com.kshrd.Utility;

import java.util.Collections;
import java.util.List;

public class ResponseList<T> extends Response {
	/*
	 * RESPONSE LIST CLASS USING WITH MULTIPLE OBJECT
	 */

	private List<T> data;
	
	private Pagination pagination;
	
	public static class ResponseListSuccess<T> extends ResponseList<T> {
		public ResponseListSuccess(String message, boolean status, List<T> data, Pagination pagination) {
			super.setMessage(message);
			super.setStatus(status);
			super.setData(data);
			super.setPagination(pagination);
		}
	}
	
	
	public static class ResponseListFailure<T> extends ResponseList<T> {
		private Error error;
		
		public ResponseListFailure(String message, boolean status, ResponseHttpStatus error) {
			super.setMessage(message);
			super.setStatus(status);
			super.setData(Collections.emptyList());
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
	
	
	/**
	 * @return the data
	 */
	public List<T> getData() {
		return data;
	}

	/**
	 * @param data the data to set
	 */
	public void setData(List<T> data) {
		this.data = data;
	}

	/**
	 * @return the pagination
	 */
	public Pagination getPagination() {
		return pagination;
	}

	/**
	 * @param pagination the pagination to set
	 */
	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "ResponseList [data=" + data + ", pagination=" + pagination + "]";
	}

}
