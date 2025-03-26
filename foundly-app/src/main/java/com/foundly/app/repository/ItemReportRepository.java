package com.foundly.app.repository;

import com.foundly.app.entity.ItemReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemReportRepository extends JpaRepository<ItemReport, Long> {
}
