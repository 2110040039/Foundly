package com.foundly.app2.dto;

import java.time.LocalDateTime;

import com.foundly.app2.entity.FoundItemDetails;
import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.Transactions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemReportResponse {

    private Long itemid;
    private String itemName;
    private String description;
    private String location;
    private String imageUrl;
    private String category;
    private LocalDateTime dateReported;
    private LocalDateTime dateLostOrFound;
    private String itemStatus;
    private String type;
    private String transactionStatus;

    // FoundItemDetails (included only if type is FOUND)
    private String securityId;
    private String securityName;
    private String pickupMessage;

    public static ItemReportResponse fromEntity(ItemReports item, Transactions transaction) {
        FoundItemDetails details = item.getFoundItemDetails();

        return ItemReportResponse.builder()
                .itemid(item.getItemId() != null ? item.getItemId().longValue() : null)
                .itemName(item.getItemName())
                .description(item.getDescription())
                .location(item.getLocation())
                .imageUrl(item.getImageUrl())
                .category(item.getCategory() != null ? item.getCategory().getCategoryName() : "Uncategorized")
                //.dateReported(item.getDateReported())
                .dateLostOrFound(item.getDateLostOrFound())
                .itemStatus(item.getItemStatus() != null ? item.getItemStatus().toString() : "UNKNOWN")
                .type(item.getType() != null ? item.getType().toString() : "UNKNOWN")
                .transactionStatus(transaction != null ? transaction.getTransactionStatus().toString() : null)
                .securityId(details != null ? details.getSecurityId() : null)
                .securityName(details != null ? details.getSecurityName() : null)
                .pickupMessage(details != null ? details.getPickupMessage() : null)
                .build();
    }
    public static ItemReportResponse fromEntity(ItemReports item) {
        return fromEntity(item, null); // pass null when no transaction is available
    }

}