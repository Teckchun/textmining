package com.kshrd.entity;

import java.util.Arrays;
import java.util.List;

public class AdvancedSearchParams {
	
	private String[] keywords;
	private String[] mustKeywords;
	private String[] excludeKeywords;
	
	
	
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
				+ Arrays.toString(mustKeywords) + ", excludeKeywords=" + Arrays.toString(excludeKeywords) + "]";
	}
	
	
	
	
	

}
