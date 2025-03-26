package com.foundly.app.service;

import com.foundly.app.entity.ItemReport;
import com.foundly.app.entity.User;
import com.foundly.app.repository.ItemReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ItemReportService {
    @Autowired
    private ItemReportRepository itemReportRepository;

    public ItemReport saveItemReport(ItemReport itemReport) {
        return itemReportRepository.save(itemReport);
    }

    public List<ItemReport> getAllItems() {
        return itemReportRepository.findAll();
    }

	 public ItemReport findById(Long id) {
	        return itemReportRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
	    }

}
