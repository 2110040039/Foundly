package com.foundly.app2.repository;

import com.foundly.app2.entity.FoundItemDetails;
import com.foundly.app2.entity.ItemReports;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FoundItemDetailsRepository extends JpaRepository<FoundItemDetails, Integer> {
    Optional<FoundItemDetails> findByItem(ItemReports item);
}
