package com.foundly.app2.dto;

import com.foundly.app2.entity.ItemReports.ItemStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class LostItemPreviewDTO {
 private String itemName;
 private String description;
 private String location;
 private String categoryName;
 private LocalDateTime dateReported;
 private LocalDateTime dateLostOrFound;
 private String imageUrl;
 private ItemStatus itemStatus;
}
