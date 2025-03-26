package com.foundly.app.controller;

import com.foundly.app.entity.ItemReturnRequest;
import com.foundly.app.service.ItemReturnRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/item-requests")
public class ItemReturnRequestController {
    @Autowired
    private ItemReturnRequestService requestService;

    @PostMapping("/create")
    public ResponseEntity<ItemReturnRequest> createRequest(@RequestBody ItemReturnRequest request) {
        return ResponseEntity.ok(requestService.saveRequest(request));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ItemReturnRequest>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemReturnRequest> getRequestById(@PathVariable Long id) {
        Optional<ItemReturnRequest> request = requestService.getRequestById(id);
        return request.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}
