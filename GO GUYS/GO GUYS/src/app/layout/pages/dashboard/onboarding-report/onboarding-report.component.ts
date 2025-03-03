import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OnboardingReportService } from '../../../../services/onboarding-report.service';

@Component({
  selector: 'app-onboarding-report',
  templateUrl: './onboarding-report.component.html',
  styleUrls: ['./onboarding-report.component.scss'],
})
export class OnboardingReportComponent implements OnInit {
  searchQuery: string = '';
  selectedDate: string = ''; // Store selected date
  employees: any[] = [];
  filteredEmployees: any[] = [];

  constructor(
    private onboardingReportService: OnboardingReportService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.onboardingReportService.getEmployees().subscribe(data => {
      this.employees = data.filter(emp => emp.status !== 'Offboarded'); // ✅ Show only active employees
      this.filteredEmployees = [...this.employees];
    });
  }

  /** 🔍 **Search by Last Name, Employee ID, or Employment Date (Year, Month, Day)** */
  searchEmployee() {
    const query = this.searchQuery.toLowerCase();
    const selectedDate = this.selectedDate;

    this.filteredEmployees = this.employees.filter(emp => {
      const lastNameMatch = emp.lastname?.toLowerCase().startsWith(query);
      const idMatch = emp.id?.toString().includes(query);

      let dateMatch = false;
      if (selectedDate && emp.employmentDate) {
        const empDate = new Date(emp.employmentDate);
        const selectedDateObj = new Date(selectedDate);

        // ✅ Match by Year, Month, or Exact Date
        const yearMatch = empDate.getFullYear() === selectedDateObj.getFullYear();
        const monthMatch = empDate.getMonth() === selectedDateObj.getMonth();
        const dayMatch = empDate.getDate() === selectedDateObj.getDate();

        if (selectedDate.length === 4) {
          dateMatch = yearMatch; // Searching only by year
        } else if (selectedDate.length === 7) {
          dateMatch = yearMatch && monthMatch; // Searching by year + month
        } else {
          dateMatch = yearMatch && monthMatch && dayMatch; // Searching by full date
        }
      }

      return lastNameMatch || idMatch || dateMatch;
    });
  }
}
