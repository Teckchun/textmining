package com.kshrd.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.security.Timestamp;
import java.sql.Date;

/**
 * Created by Teckchun on 10/24/17.
 */
public class Board {
	
	//@JsonProperty("board_index")
	private int boardIndex;

    //@JsonProperty("board_view")
    private int boardView;

    //@JsonProperty("board_title")
    private String boardTitle;

    //@JsonProperty("board_recommand")
    private String boardRecommand;
    
    //@JsonProperty("board_url")
    private String boardUrl;

    //@JsonProperty("insert_date")
    private Date startDate;
    

    //@JsonProperty("end_date")
    private Date endDate;
    
    
    

    //@JsonProperty("type")
    private String type;
    
    private String hasPage;
    
    
    
   
  

	public String getHasPage() {
		return hasPage;
	}

	public void setHasPage(String hasPage) {
		this.hasPage = hasPage;
	}

	public int getBoardIndex() {
		return boardIndex;
	}

	public void setBoardIndex(int boardIndex) {
		this.boardIndex = boardIndex;
	}

	public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getBoardView() {
        return boardView;
    }

    public void setBoardView(int boardView) {
        this.boardView = boardView;
    }

    public String getBoardTitle() {
        return boardTitle;
    }

    public void setBoardTitle(String boardTitle) {
        this.boardTitle = boardTitle;
    }

    public String getBoardRecommand() {
        return boardRecommand;
    }

    public void setBoardRecommand(String boardRecommand) {
        this.boardRecommand = boardRecommand;
    }

   

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

	public String getBoardUrl() {
		return boardUrl;
	}

	public void setBoardUrl(String boardUrl) {
		this.boardUrl = boardUrl;
	}

	@Override
	public String toString() {
		return "Board [boardIndex=" + boardIndex + ", boardView=" + boardView + ", boardTitle=" + boardTitle
				+ ", boardRecommand=" + boardRecommand + ", boardUrl=" + boardUrl + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", type=" + type + "]";
	}

	
	

	
	

    
}
