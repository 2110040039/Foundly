package com.foundly.app2.repository;

import com.foundly.app2.entity.ItemReports;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemReportsRepository extends JpaRepository<ItemReports, Integer> {

    // Custom query method to find ItemReports by ItemStatus
    List<ItemReports> findByItemStatus(ItemReports.ItemStatus itemStatus);
}
