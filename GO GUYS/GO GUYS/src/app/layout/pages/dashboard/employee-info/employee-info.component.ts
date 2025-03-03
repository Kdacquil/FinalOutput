import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Employee {
  id: string;
  firstname?: string;
  middleName?: string;
  lastname?: string;
  fullName?: string;
  email?: string;
  personalEmail?: string;
  employmentDate?: string;
  employmentType?: string;
  department?: string;
  major?: string;
  profileImageUrl?: string;
  status?: string;
  effectiveDate?: string;
}

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
  searchQuery: string = '';
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isEditing: boolean = false;
  availableMajors: string[] = [];

  /** ✅ Departments Object */
  departments: Record<string, string> = {
    "SOC": "School Of Computing",
    "SBA": "School Of Business and Accountancy",
    "SEA": "School Of Engineering and Architecture",
    "SAS": "School Of Arts and Sciences",
    "SHTM": "School Of Hospitality and Tourism Management",
    "SED": "School Of Education",
    "SNAMS": "School Of Nursing and Allied Medical Sciences",
    "CCJEF": "College of Criminal Justice Education and Forensics"
  };

  /** ✅ Extract department keys dynamically */
  departmentKeys = Object.keys(this.departments);

  /** 🔹 Define Majors for Each Department */
  majorsByDepartment: Record<string, string[]> = {
    "SOC": [
      "Bachelor of Science in Information Technology",
      "Bachelor of Science in Entertainment and Multimedia Computing with Specialization in Digital Animation",
      "Bachelor of Science in Computer Science",
      "Bachelor of Science in Cybersecurity",
      "Bachelor of Science in Cyber Security + Professional Science Master’s in CyberSecurity",
      "Master in Information Technology",
      "Professional Science Master’s in Cybersecurity"
    ],
    "SBA": [
      "Bachelor of Science in Business Administration",
      "Bachelor of Science in Accountancy",
      "Bachelor of Science in Internal Auditing",
      "Bachelor of Science in Management Accounting",
      "Bachelor of Science in Aviation Management",
      "Master of Business Administration",
      "Doctor of Business Administration",
      "Green MBA in Leadership for a Sustainable Economy",
      "Master in Public Administration",
      "Master of Science in Accountancy"
    ],
    "SEA": [
      "Bachelor of Science in Aeronautical Engineering",
      "Bachelor of Science in Architecture",
      "Bachelor of Science in Civil Engineering",
      "Bachelor of Science in Electrical Engineering",
      "Bachelor of Science in Mechanical Engineering",
      "Bachelor of Science in Computer Engineering",
      "Bachelor of Science in Electronics Communication Engineering",
      "Bachelor of Science in Industrial Engineering"
    ],
    "SHTM": [
      "Bachelor of Science in Hospitality Management - Accommodations & Lodging Operations",
      "Bachelor of Science in Tourism Management - Travel & Tour Operations",
      "Bachelor of Science in International Gastronomy"
    ],
    "SNAMS": [
      "Bachelor of Science in Nursing",
      "Bachelor of Science in Radiologic Technology",
      "Bachelor of Science in Medical Technology"
    ],
    "CCJEF": [
      "Bachelor of Science in Criminology",
      "Bachelor of Forensic Science"
    ],
    "SED": [
      "Bachelor in Elementary Education (BEED)",
      "Bachelor of Special Needs Education (BSNED)",
      "Bachelor of Physical Education (BPEd)",
      "Bachelor of Secondary Education Major in English",
      "Bachelor of Secondary Education Major in Filipino",
      "Bachelor of Secondary Education Major in Mathematics",
      "Bachelor of Secondary Education Major in Science",
      "Bachelor of Secondary Education Major in Social Studies",
      "Bachelor of Secondary Education Major in Religious and Values Education"
    ],
    "SAS": [
      "Bachelor of Arts in Communication",
      "Bachelor of Science in Psychology",
      "Communication Arts"
    ]
  };

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.loadEmployees();
  }

  /** 🔹 Load Employees from Firestore */
  loadEmployees() {
    this.firestore.collection<Employee>('employees').valueChanges({ idField: 'id' }).subscribe(employeeData => {
      this.firestore.collection<Employee>('offboarding').valueChanges({ idField: 'id' }).subscribe(offboardingData => {

        this.employees = employeeData.map(emp => {
          const offboardDetails = offboardingData.find(off => off.id === emp.id) || {
            status: 'Active',
            personalEmail: 'N/A',
            effectiveDate: 'N/A'
          };

          return {
            ...emp,
            status: offboardDetails.status,
            personalEmail: offboardDetails.personalEmail,
            effectiveDate: offboardDetails.effectiveDate,
            fullName: `${emp.firstname} ${emp.middleName || ''} ${emp.lastname}`.trim()
          };
        });

        this.filteredEmployees = [...this.employees];
      });
    });
  }

  /** 🔍 **Search Employee by Last Name & ID** */
  searchEmployee(query: string) {
    const lowerQuery = query.toLowerCase();

    this.filteredEmployees = this.employees.filter(emp => {
      const lastNameMatch = emp.lastname?.toLowerCase().startsWith(lowerQuery);
      const idMatch = emp.id.toString().includes(lowerQuery);
      return lastNameMatch || idMatch;
    });
  }

  openModal(employee: Employee) {
    this.selectedEmployee = { ...employee };
    this.updateMajors();
  }

  closeModal() {
    this.selectedEmployee = null;
    this.isEditing = false;
  }

  enableEditing() {
    this.isEditing = true;
  }

  updateMajors() {
    if (this.selectedEmployee?.department) {
      this.availableMajors = this.majorsByDepartment[this.selectedEmployee.department] || [];
    } else {
      this.availableMajors = [];
    }
  }

  async saveUpdate() {
    if (!this.selectedEmployee) {
      alert("No employee selected.");
      return;
    }

    try {
      await this.firestore.collection('employees').doc(this.selectedEmployee.id).update({
        firstname: this.selectedEmployee.firstname,
        middleName: this.selectedEmployee.middleName,
        lastname: this.selectedEmployee.lastname,
        personalEmail: this.selectedEmployee.personalEmail,
        email: this.selectedEmployee.email,
        employmentDate: this.selectedEmployee.employmentDate,
        employmentType: this.selectedEmployee.employmentType,
        department: this.selectedEmployee.department,
        major: this.selectedEmployee.major
      });

      alert("Employee information updated successfully!");
      this.isEditing = false;
      this.loadEmployees();
    } catch (error) {
      alert("Failed to update employee details.");
    }
  }
}
