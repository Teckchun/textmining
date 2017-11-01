package com.kshrd.entity;

import java.sql.Date;

/**
 * Created by Teckchun on 10/24/17.
 */
public class ProductSynonymDic {

    private String pdsIndex;
    private String productSynonym;
    private String productName;
    private String productSerial;
    private Date insertDate;

    public String getPdsIndex() {
        return pdsIndex;
    }

    public void setPdsIndex(String pdsIndex) {
        this.pdsIndex = pdsIndex;
    }

    public String getProductSynonym() {
        return productSynonym;
    }

    public void setProductSynonym(String productSynonym) {
        this.productSynonym = productSynonym;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductSerial() {
        return productSerial;
    }

    public void setProductSerial(String productSerial) {
        this.productSerial = productSerial;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }
}
