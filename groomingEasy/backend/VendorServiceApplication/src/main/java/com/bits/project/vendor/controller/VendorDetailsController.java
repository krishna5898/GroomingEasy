package com.bits.project.vendor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bits.project.vendor.model.VendorDetails;
import com.bits.project.vendor.service.VendorDetailsService;

@RestController
@CrossOrigin(origins = "http://localhost:3001/")
@RequestMapping("/api/vendors") // Base URL for vendor APIs
public class VendorDetailsController {

    @Autowired
    private VendorDetailsService vendorDetailsService;

    // Create a new vendor record
    @PostMapping("/register")
    public ResponseEntity<VendorDetails> createVendor(@RequestBody VendorDetails vendorDetails) {
        VendorDetails newVendor = vendorDetailsService.createVendor(vendorDetails);
        return ResponseEntity.ok(newVendor);
    }

    // Get all vendor records
    @GetMapping
    public ResponseEntity<List<VendorDetails>> getAllVendors() {
        List<VendorDetails> vendors = vendorDetailsService.getAllVendors();
        return ResponseEntity.ok(vendors);
    }

    // Get a vendor record by loginId
    @GetMapping("/fetch/{loginId}")
    public ResponseEntity<VendorDetails> getVendorByLoginId(@PathVariable String loginId) {
        return vendorDetailsService.getVendorByLoginId(loginId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update vendor details by loginId
    @PutMapping("/update/{loginId}")
    public ResponseEntity<VendorDetails> updateVendor(
            @PathVariable String loginId, @RequestBody VendorDetails updatedVendorDetails) {
        return vendorDetailsService.updateVendor(loginId, updatedVendorDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a vendor record by loginId
    @DeleteMapping("/remove/{loginId}")
    public ResponseEntity<Void> deleteVendor(@PathVariable String loginId) {
        boolean isDeleted = vendorDetailsService.deleteVendor(loginId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
