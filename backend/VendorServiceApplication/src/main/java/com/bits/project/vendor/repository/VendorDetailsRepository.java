package com.bits.project.vendor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bits.project.vendor.model.VendorDetails;

@Repository
public interface VendorDetailsRepository extends JpaRepository<VendorDetails, Long> {
    Optional<VendorDetails> findByLoginId(String loginId); // Query by loginId
}
