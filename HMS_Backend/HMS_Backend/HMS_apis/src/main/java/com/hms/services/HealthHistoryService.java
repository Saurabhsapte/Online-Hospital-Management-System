package com.hms.services;

import java.util.List;

import com.hms.payloads.HealthHistoryDto;

public interface HealthHistoryService {

			//add appointment ( create )
			HealthHistoryDto addAppointment(HealthHistoryDto healthDto,Integer patientId);
			
			// get Appointment History
			List<HealthHistoryDto> getAppointmentHistoryBypatient(Integer patientId);

			//get health history by patient
			List<HealthHistoryDto> getHealthHistoryBypatient(Integer patientId);

			// delete( cancel health history )
			void deleteHealthHistory(Integer healthId);

			//get single medicine
			HealthHistoryDto getHealthHistoryById(Integer healthId);
			
			//allocate ward and bed
			HealthHistoryDto updatePatientWard(HealthHistoryDto healthDto,Integer wardId);

			//Discharge Patient
			HealthHistoryDto dischargePatient(Integer healthId);

			// update payment by accountant
			HealthHistoryDto updateHealthHistoryPayment(Integer Id,Double amt);
			
			//update (doctor)
			HealthHistoryDto updateHealthHistory(HealthHistoryDto healthDto, Boolean admitStatus);
			
			HealthHistoryDto getHealthHistoryByPaymentStatus(Integer patientId);
			
}