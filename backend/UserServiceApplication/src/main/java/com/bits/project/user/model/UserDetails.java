package com.bits.project.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String preferredUsername;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private String mobileNumber;
    private String address;
    private String pincode;
    private String password;
}
