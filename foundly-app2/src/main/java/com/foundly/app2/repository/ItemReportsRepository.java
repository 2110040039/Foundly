package com.foundly.app2.repository;

import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.Category; // Import the Category entity
import com.foundly.app2.entity.User; // Import the User entity
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import java.util.List;

@Repository
public interface ItemReportsRepository extends JpaRepository<ItemReports, Integer> {

    // Custom query method to find ItemReports by ItemStatus
    List<ItemReports> findByItemStatus(ItemReports.ItemStatus itemStatus);

    // Custom query method to find ItemReports by ItemType
    List<ItemReports> findByType(ItemReports.Type itemType);
    
    // Custom query method to filter ItemReports based on various criteria
    @Query("SELECT i FROM ItemReports i WHERE " +
            "(:id IS NULL OR i.itemId = :id) AND " +
            "(:location IS NULL OR i.location = :location) AND " +
            "(:itemStatus IS NULL OR i.itemStatus = :itemStatus) AND " +
            "(:category IS NULL OR i.category = :category) AND " +
            "(:user IS NULL OR i.user = :user) AND " +
            "(:type IS NULL OR i.type = :type)") // Add type condition
    List<ItemReports> findByFilters(@Param("id") Integer id,
                                     @Param("location") String location,
                                     @Param("itemStatus") ItemReports.ItemStatus itemStatus,
                                     @Param("category") Category category,
                                     @Param("user") User user,
                                     @Param("type") ItemReports.Type type); // Add type parameter

    // Custom query method to update the item status
    @Query("UPDATE ItemReports i SET i.itemStatus = :itemStatus WHERE i.itemId = :itemId")
    @Modifying
    void updateItemStatus(@Param("itemId") Integer itemId, @Param("itemStatus") ItemReports.ItemStatus itemStatus);
}