import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { AuditLogService } from './audit-log.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private collectionName = 'employees';

  constructor(
    private firestore: AngularFirestore,
    private auditLogService: AuditLogService
  ) {}

  getOnboardedEmployees(): Observable<Employee[]> {
    return this.firestore.collection<Employee>(this.collectionName, ref =>
      ref.where('status', '==', 'Active')
    ).valueChanges({ idField: 'id' });
  }

  getOffboardedEmployees(): Observable<Employee[]> {
    return this.firestore.collection<Employee>(this.collectionName, ref =>
      ref.where('status', '==', 'Offboarded')
    ).valueChanges({ idField: 'id' });
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.firestore.collection<Employee>(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  async onboardEmployee(employeeData: Partial<Employee>): Promise<any> {
    try {
      const enrichedData = {
        ...employeeData,
        status: 'Active',
        onboardingDate: new Date(),
      };

      const docRef = await this.firestore.collection(this.collectionName).add(enrichedData);

      // Add to onboarding collection
      await this.firestore.collection('onboarding').doc(docRef.id).set({
        employeeId: docRef.id,
        ...enrichedData
      });

      await this.auditLogService.logAction('ONBOARD_EMPLOYEE', `New employee added: ${docRef.id}`, 'Successful');
      return { success: true, employeeId: docRef.id };
    } catch (error: any) {
      await this.auditLogService.logAction('ONBOARD_EMPLOYEE', `Failed: ${error.message}`, 'Failed');
      throw error;
    }
  }

  async updateEmployee(employeeId: string, updatedData: Partial<Employee>): Promise<void> {
    try {
      await this.firestore.collection(this.collectionName).doc(employeeId).update(updatedData);
      await this.auditLogService.logAction('UPDATE_EMPLOYEE', `Updated: ${employeeId}`, 'Successful');
    } catch (error: any) {
      await this.auditLogService.logAction('UPDATE_EMPLOYEE', `Failed: ${error.message}`, 'Failed');
      throw error;
    }
  }
}
