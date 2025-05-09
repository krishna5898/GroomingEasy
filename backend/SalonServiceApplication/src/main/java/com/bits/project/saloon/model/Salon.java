package com.bits.project.saloon.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Salon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String salonLoginId;
    private String name;
    private String address;
    private String ownerName;
    private String contactNumber;
    private String grievanceEmailId;
    private String emailId;
    private String registrationNo;
    @Column(name = "pincode")
    private int pinCode;
}
