package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoundItemRequest {
    private Integer userId;
    private Integer categoryId;
    private String itemName;
    private String description;
    private String location;
    private String imageUrl;
    private boolean handoverToSecurity; // true = given to security, false = kept with finder
    private String securityId;
    private String securityName;
    private String pickupMessage;
}
