package com.bits.project.vendor.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.bits.project.vendor.model.VendorDetails;
import com.bits.project.vendor.repository.VendorDetailsRepository;

@Service
public class VendorDetailsService {

	@Autowired
	private VendorDetailsRepository vendorDetailsRepository;

	// Create a new vendor record
	public VendorDetails createVendor(VendorDetails vendorDetails) {
		if (!ObjectUtils.isEmpty(vendorDetails)) {

			String uuid = UUID.randomUUID().toString();
			vendorDetails.setLoginId("V" + vendorDetails.getRegistrationNumber().substring(0, 2)
					+ uuid.replace("-", "").substring(0, 5));

		}
		return vendorDetailsRepository.save(vendorDetails);
	}

	// Get all vendor records
	public List<VendorDetails> getAllVendors() {
		return vendorDetailsRepository.findAll();
	}

	// Get a vendor record by loginId
	public Optional<VendorDetails> getVendorByLoginId(String loginId) {
		return vendorDetailsRepository.findByLoginId(loginId);
	}

	// Update vendor details by loginId
	public Optional<VendorDetails> updateVendor(String loginId, VendorDetails updatedVendorDetails) {
		return vendorDetailsRepository.findByLoginId(loginId).map(existingVendor -> {
			existingVendor.setSalonName(updatedVendorDetails.getSalonName());
			existingVendor.setSalonAddress(updatedVendorDetails.getSalonAddress());
			existingVendor.setOwnerName(updatedVendorDetails.getOwnerName());
			existingVendor.setAadharNumber(updatedVendorDetails.getAadharNumber());
			existingVendor.setMobileNumber(updatedVendorDetails.getMobileNumber());
			existingVendor.setGrievanceEmailId(updatedVendorDetails.getGrievanceEmailId());
			existingVendor.setPincode(updatedVendorDetails.getPincode());
			return vendorDetailsRepository.save(existingVendor);
		});
	}

	// Delete a vendor record by loginId
	public boolean deleteVendor(String loginId) {
		Optional<VendorDetails> vendor = vendorDetailsRepository.findByLoginId(loginId);
		if (vendor.isPresent()) {
			vendorDetailsRepository.delete(vendor.get());
			return true;
		}
		return false;
	}
}
