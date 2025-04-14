package com.foundly.app2.dto;

import lombok.Data;

@Data
public class FoundItemReportRequest {
    private Integer userId;
    private Integer categoryId;
    private String itemName;
    private String description;
    private String location;
    private String dateLostOrFound; // format: "yyyy-MM-dd HH:mm"
    private String imageUrl;
    private Boolean handoverToSecurity;
    private String name;
    // Conditional fields depending on handoverToSecurity
    private String securityId;      // only if handoverToSecurity is true
    private String securityName;    // only if handoverToSecurity is true
    private String pickupMessage;   // only if handoverToSecurity is false
}
