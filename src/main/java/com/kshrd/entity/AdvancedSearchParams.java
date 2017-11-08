package com.kshrd.entity;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;

public class AdvancedSearchParams {
	
	private String[] keywords;
	private String[] mustKeywords;
	private String[] excludeKeywords;
	 //@JsonProperty("insert_date")
    private Date startDate;
    

    //@JsonProperty("end_date")
    private Date endDate;
    
	
	
	
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String[] getKeywords() {
		return keywords;
	}
	public void setKeywords(String[] keywords) {
		this.keywords = keywords;
	}
	public String[] getMustKeywords() {
		return mustKeywords;
	}
	public void setMustKeywords(String[] mustKeywords) {
		this.mustKeywords = mustKeywords;
	}
	public String[] getExcludeKeywords() {
		return excludeKeywords;
	}
	public void setExcludeKeywords(String[] excludeKeywords) {
		this.excludeKeywords = excludeKeywords;
	}
	@Override
	public String toString() {
		return "AdvancedSearchParams [keywords=" + Arrays.toString(keywords) + ", mustKeywords="
				+ Arrays.toString(mustKeywords) + ", excludeKeywords=" + Arrays.toString(excludeKeywords)
				+ ", startDate=" + startDate + ", endDate=" + endDate + "]";
	}

	
	
	
	
	
	
	

}
