package com.foundly.app2.repository;

import com.foundly.app2.entity.ItemReports;
import com.foundly.app2.entity.ItemReports.Type;
import com.foundly.app2.entity.Category;
import com.foundly.app2.entity.User;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

@Repository
public interface ItemReportsRepository extends JpaRepository<ItemReports, Integer> {

    // ✅ Get all items by status (e.g. NOT_FOUND, WITH_SECURITY, etc.)
    List<ItemReports> findByItemStatus(ItemReports.ItemStatus itemStatus);

    // ✅ Get all items by type (LOST or FOUND)
    List<ItemReports> findByType(ItemReports.Type itemType);

    // ✅ Get limited preview of lost or found items, sorted by most recent
    List<ItemReports> findByTypeOrderByDateReportedDesc(Type type, Pageable pageable);

    // ✅ Flexible filtering method for search and filters
//    @Query("SELECT i FROM ItemReports i WHERE " +
//            "(:id IS NULL OR i.itemId = :id) AND " +
//            "(:location IS NULL OR i.location = :location) AND " +
//            "(:itemStatus IS NULL OR i.itemStatus = :itemStatus) AND " +
//            "(:category IS NULL OR i.category = :category) AND " +
//            "(:user IS NULL OR i.user = :user) AND " +
//            "(:type IS NULL OR i.type = :type)")
//    List<ItemReports> findByFilters(@Param("id") Integer id,
//                                    @Param("location") String location,
//                                    @Param("itemStatus") ItemReports.ItemStatus itemStatus,
//                                    @Param("category") Category category,
//                                    @Param("user") User user,
//                                    @Param("type") ItemReports.Type type);

    // ✅ Update item status by item ID
    @Modifying
    @Query("UPDATE ItemReports i SET i.itemStatus = :itemStatus WHERE i.itemId = :itemId")
    void updateItemStatus(@Param("itemId") Integer itemId, @Param("itemStatus") ItemReports.ItemStatus itemStatus);
    @Query("SELECT i FROM ItemReports i WHERE i.user.userId = :userId")
    List<ItemReports> findByUserId(@Param("userId") Long userId);
    
    @Query("SELECT i FROM ItemReports i WHERE i.user.userId = :userId AND i.type = :type")
 // Optional: You can remove @Query if using derived query
    List<ItemReports> findByUser_UserIdAndType(Long userId, ItemReports.Type type);


}
