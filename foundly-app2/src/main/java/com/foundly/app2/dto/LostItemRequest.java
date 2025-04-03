package com.foundly.app2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LostItemRequest {
    private Integer userId;
    private Integer categoryId;
    private String itemName;
    private String description;
    private String location;
    private String imageUrl;
}
