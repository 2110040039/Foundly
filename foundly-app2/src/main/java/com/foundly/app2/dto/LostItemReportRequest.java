package com.foundly.app2.dto;

import lombok.Data;

@Data
public class LostItemReportRequest {
    private Integer userId;
    private Integer categoryId;
    private String itemName;
    private String description;
    private String location;
    private String dateLostOrFound; // format: "yyyy-MM-dd HH:mm"
    private String imageUrl;
    private String name;
}
