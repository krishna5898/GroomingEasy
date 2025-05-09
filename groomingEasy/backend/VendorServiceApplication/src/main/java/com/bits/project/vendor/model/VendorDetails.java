package com.bits.project.vendor.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class VendorDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String registrationNumber;
    private String salonName;
    private String salonAddress;
    private String ownerName;
    @Column(unique = true, nullable = false)
    private String aadharNumber;
    private String mobileNumber;
    private String grievanceEmailId;
    private String pincode;
    private String loginId;
    private String password;
}
