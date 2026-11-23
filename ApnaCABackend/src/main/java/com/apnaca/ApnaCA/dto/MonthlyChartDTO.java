package com.apnaca.ApnaCA.dto;

import java.math.BigDecimal;

public class MonthlyChartDTO {

    private int year;
    private int month;
    private Double received;
    private Double spent;
    private Double net;

    public MonthlyChartDTO(
            int year,
            int month,
            Double received,
            Double spent,
            Double net) {
        this.year = year;
        this.month = month;
        this.received = received;
        this.spent = spent;
        this.net = net;
    }

    public int getYear() {
        return year;
    }

    public int getMonth() {
        return month;
    }

    public Double getReceived() {
        return received;
    }

    public Double getSpent() {
        return spent;
    }

    public Double getNet() {
        return net;
    }
}