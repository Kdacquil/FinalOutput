import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffboardService } from '../../../../services/offboard.service';
import { Employee } from '../../../../models/employee.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuditLogService } from '../../../../services/audit-log.service';

@Component({
  selector: 'app-offboard',
  templateUrl: './offboard.component.html',
  styleUrls: ['./offboard.component.scss'],
  standalone: false
})
export class OffboardComponent implements OnInit {
  offboardForm!: FormGroup;
  searchQuery: string = '';
  filteredEmployees: Employee[] = [];
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;

  constructor(
    private fb: FormBuilder,
    private offboardService: OffboardService,
    private firestore: AngularFirestore,
    private auditLogService: AuditLogService
  ) {}

  ngOnInit() {
    this.offboardForm = this.fb.group({
      effectiveDate: ['', Validators.required],
      offboardingReason: ['', Validators.required],  // ✅ Offboarding Reason (Resigned, Retired, Not Renewed)
      clearanceStatus: ['', Validators.required],
      certificationStatus: ['', Validators.required],
      personalEmail: ['', [Validators.required, Validators.email]],
      exitInterview: ['', Validators.required],
      recommendation: ['', Validators.required],
      recommendationComment: [''],
      automatedNotification: ['', Validators.required],
    });

    // 🔹 Load all employees from Firestore
    this.firestore.collection<Employee>('employees').valueChanges({ idField: 'id' })
      .subscribe(data => {
        this.employees = data;
      });
  }

  /** 🔍 Search Employees by Last Name or Employee ID */
  searchEmployees() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.id?.toString().includes(query) || employee.lastname.toLowerCase().includes(query)
    );
  }

  /** 🏷 Select an Employee and Reset Search */
  selectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.searchQuery = ''; // ✅ Clear search input
    this.filteredEmployees = []; // ✅ Hide search results
  }

  /** ✅ Submit Offboarding Data */
  async submitForm() {
    if (!this.selectedEmployee) {
      alert("❌ Please select an employee first!");
      return;
    }

    if (this.offboardForm.valid) {
      const offboardingData = {
        ...this.offboardForm.value,
        employeeId: this.selectedEmployee.id,
        employeeName: `${this.selectedEmployee.firstname} ${this.selectedEmployee.lastname}`,
        department: this.selectedEmployee.department || 'Unknown',
        profileImageUrl: this.selectedEmployee.profileImageUrl || '',
        status: 'Offboarded',
        timestamp: new Date()
      };

      try {
        await this.offboardService.saveOffboardingData(this.selectedEmployee.id, offboardingData);

        // ✅ Log to Audit Logs
        await this.auditLogService.logAction(
          'OFFBOARD_EMPLOYEE',
          `Employee ${this.selectedEmployee.firstname} ${this.selectedEmployee.lastname} was offboarded. Reason: ${offboardingData.offboardingReason}`,
          'Successful'
        );

        console.log("✅ Offboarding Successful!");
        alert("✅ Offboarding details submitted successfully!");
      } catch (error) {
        console.error("❌ Offboarding Error:", error);
        alert("❌ Error submitting offboarding details.");
      }
    } else {
      alert("⚠️ Please complete all required fields.");
    }
  }
}
