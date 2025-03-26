package com.foundly.app.repository;

import com.foundly.app.entity.ItemReturnRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemReturnRequestRepository extends JpaRepository<ItemReturnRequest, Long> {
}
