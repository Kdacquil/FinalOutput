import { Component, OnInit } from '@angular/core';
import { OffboardingReportService } from '../../../../services/offboard-report.service';

@Component({
  selector: 'app-offboarding-report',
  templateUrl: './offboarding-report.component.html',
  styleUrls: ['./offboarding-report.component.scss']
})
export class OffboardingReportComponent implements OnInit {
  searchQuery: string = ''; // 🔍 Search input for last name or ID
  selectedDate: string = ''; // 📅 Date input for filtering
  employees: any[] = [];
  filteredEmployees: any[] = [];

  constructor(private offboardingReportService: OffboardingReportService) {}

  ngOnInit() {
    this.fetchOffboardingEmployees();
  }

  /** 🔹 Fetch only Offboarded Employees */
  fetchOffboardingEmployees() {
    this.offboardingReportService.getEmployees().subscribe(
      (data) => {
        console.log("🔍 Raw Firestore Data:", data); // ✅ Debugging Log

        this.employees = data
          .filter(emp => emp.status === 'Offboarded')
          .map(emp => {
            let fullName = emp.employeeName || "Unknown";
            let nameParts = fullName.split(" ");
            let firstName = nameParts[0] || "";
            let middleName = nameParts.length > 2 ? nameParts[1] : "";
            let lastName = nameParts.length > 2 ? nameParts[2] : nameParts[1] || "";

            return {
              ...emp,
              firstname: firstName.trim(),
              middleName: middleName.trim(),
              lastname: lastName.trim(),
              fullName: fullName.trim(),
              offboardingReason: emp.offboardingReason || 'N/A',
              effectiveDate: emp.effectiveDate || '' // ✅ Ensure effectiveDate is available
            };
          });

        console.log("✅ Processed Employees:", this.employees);
        this.filteredEmployees = [...this.employees];
      },
      (error) => {
        console.error('❌ Error fetching offboarding records:', error);
      }
    );
  }

  /** 🔍 **Search by Last Name, Employee ID & Date** */
  searchEmployee() {
    const lowerQuery = this.searchQuery.toLowerCase().trim();
    const selectedDate = this.selectedDate.trim(); // 📅 Get selected date

    this.filteredEmployees = this.employees.filter(emp => {
      const lastNameMatch = emp.lastname.toLowerCase().startsWith(lowerQuery);
      const idMatch = emp.employeeId?.toString().startsWith(lowerQuery);
      const dateMatch = selectedDate ? emp.effectiveDate === selectedDate : true;

      return (lastNameMatch || idMatch) && dateMatch;
    });

    console.log("🔍 Filtered Employees:", this.filteredEmployees);
  }
}
