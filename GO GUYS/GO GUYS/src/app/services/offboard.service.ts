import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { OffboardData } from '../models/offboard.model';

@Injectable({
  providedIn: 'root'
})
export class OffboardService {
  constructor(private firestore: AngularFirestore) {}

  /** 🔹 Fetch Active Employees */
  getEmployees(): Observable<any[]> {
    return this.firestore.collection('employees').valueChanges({ idField: 'id' });
  }

  /** 🔹 Save Offboarding Data */
  async saveOffboardingData(employeeId: string, data: OffboardData): Promise<void> {
    try {
      // ✅ Save to 'offboarding' collection
      await this.firestore.collection('offboarding').doc(employeeId).set({
        ...data,
        timestamp: new Date()
      });

      // ✅ Update the employee status to 'Offboarded' (but keep them in Employee Info)
      await this.firestore.collection('employees').doc(employeeId).update({
        status: 'Offboarded',
        offboardingDate: new Date()
      });

      console.log(`✅ Employee ${data.employeeName} successfully offboarded!`);
    } catch (error) {
      console.error("❌ Offboarding Error:", error);
      throw error;
    }
  }
}
