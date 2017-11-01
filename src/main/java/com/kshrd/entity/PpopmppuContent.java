package com.kshrd.entity;

import java.sql.Date;

/**
 * Created by Teckchun on 10/24/17.
 */
public class PpopmppuContent {

    private String ppomContIndex;
    private String boardNum;
    private String boardTitle;
    private String content;
    private Date contentDate;
    private Date insertDate;

    public String getPpomContIndex() {
        return ppomContIndex;
    }

    public void setPpomContIndex(String ppomContIndex) {
        this.ppomContIndex = ppomContIndex;
    }

    public String getBoardNum() {
        return boardNum;
    }

    public void setBoardNum(String boardNum) {
        this.boardNum = boardNum;
    }

    public String getBoardTitle() {
        return boardTitle;
    }

    public void setBoardTitle(String boardTitle) {
        this.boardTitle = boardTitle;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getContentDate() {
        return contentDate;
    }

    public void setContentDate(Date contentDate) {
        this.contentDate = contentDate;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }
}
