package com.foundly.app2.repository;

import com.foundly.app2.entity.ItemReports;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemReportsRepository extends JpaRepository<ItemReports, Integer> {

    // Custom query method to find ItemReports by ItemStatus
    List<ItemReports> findByItemStatus(ItemReports.ItemStatus itemStatus);

    // Custom query method to find ItemReports by ItemType
    List<ItemReports> findByType(ItemReports.Type itemType);
}