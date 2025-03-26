package com.foundly.app.service;

import com.foundly.app.entity.ItemReturnRequest;
import com.foundly.app.repository.ItemReturnRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ItemReturnRequestService {
    @Autowired
    private ItemReturnRequestRepository requestRepository;

    public ItemReturnRequest saveRequest(ItemReturnRequest request) {
        return requestRepository.save(request);
    }

    public List<ItemReturnRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public Optional<ItemReturnRequest> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }
}
