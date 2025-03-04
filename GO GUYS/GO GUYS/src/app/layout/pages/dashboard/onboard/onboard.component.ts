import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';

interface Employee {
  id: string;
  lastname: string;
  firstname: string;
  middlename: string;
  email: string;
  employmentDate: string;
  employmentType: string;
  department: string;
  major: string;
  notification: string;
  profileImageUrl: string;
  documentsSubmitted: string;
  timestamp: string;
}

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss'],
  standalone: false
})
export class OnboardComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileImage: string = 'picpro.jpg'; // Default profile image
  availableMajors: string[] = []; // Stores majors based on selected department
  employees: Employee[] = []; // Stores employees from Firestore

  formData: Employee = {
    id: '',
    lastname: '',
    firstname: '',
    middlename: '',
    email: '',
    employmentDate: '',
    employmentType: '',
    department: '',
    major: '',
    notification: '',
    profileImageUrl: '',
    documentsSubmitted: '',
    timestamp: new Date().toISOString()
  };

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.firestore.collection<Employee>('employees', ref => ref.orderBy('timestamp'))
      .valueChanges()
      .subscribe(data => {
        this.employees = data;
      }, error => {
        console.error('Error fetching employees:', error);
      });
  }

  updateMajors() {
    const majorsByDepartment: { [key: string]: string[] } = {
      SOC: [
        'Bachelor of Science in Information Technology',
        'Bachelor of Science in Entertainment and Multimedia Computing with Area of Specialization in Digital Animation',
        'Bachelor of Science in Computer Science',
        'Bachelor of Science in Cybersecurity',
        'Bachelor of Science in Cyber Security + Professional Science Master’s in CyberSecurity',
        'Master in Information Technology',
        'Professional Science Master’s in Cybersecurity'
      ],
      SBA: [
        'Bachelor of Science in Business Administration',
        'Bachelor of Science in Accountancy',
        'Bachelor of Science in Internal Auditing',
        'Bachelor of Science in Management Accounting',
        'Bachelor of Science in Aviation Management',
        'Master of Business Administration',
        'Doctor of Business Administration',
        'Green MBA in Leadership for a Sustainable Economy',
        'Master in Public Administration',
        'Master of Science in Accountancy'
      ],
      SEA: [
        'Bachelor of Science in Aeronautical Engineering',
        'Bachelor of Science in Architecture',
        'Bachelor of Science in Civil Engineering',
        'Bachelor of Science in Electrical Engineering',
        'Bachelor of Science in Mechanical Engineering',
        'Bachelor of Science in Computer Engineering',
        'Bachelor of Science in Electronics Communication Engineering',
        'Bachelor of Science in Industrial Engineering'
      ],
      SHTM: [
        'Bachelor of Science in Hospitality Management -Accommodations and Lodging Operations -Culinary Arts and Kitchen Operations -Restaurant and Food Services Operations',
        'Bachelor of Science in Tourism Management -Travel and Tour Operations -Destination Management -Events Management',
        'Bachelor of Science in International Gastronomy'
      ],
      SNAMS: [
        'Bachelor of Science in Nursing',
        'Bachelor of Science in Radiologic Technology',
        'Bachelor of Science in Medical Technology'
      ],
      CCJEF: [
        'Bachelor of Science in Criminology',
        'Bachelor of Forensic Science'
      ],
      SED: [
        'Bachelor in Elementary Education (BEED)',
        'Bachelor of Special Needs Education (BSNED)',
        'Bachelor of Physical Education (BPEd)',
        'Bachelor of Secondary Education Major in English',
        'Bachelor of Secondary Education Major in Filipino',
        'Bachelor of Secondary Education Major in Mathematics',
        'Bachelor of Secondary Education Major in Science',
        'Bachelor of Secondary Education Major in Social Studies',
        'Bachelor of Secondary Education Major in Religious and Values Education'
      ],
      SAS: [
        'Bachelor of Arts in Communication',
        'Bachelor of Science in Psychology',
        'Communication Arts'
      ]
    };

    this.availableMajors = majorsByDepartment[this.formData.department] || [];
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `profile-images/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.profileImage = url;
            this.formData.profileImageUrl = url;
          });
        })
      ).subscribe();
    }
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      try {
        const fullName = `${this.formData.firstname} ${this.formData.middlename} ${this.formData.lastname}`.trim();

        const existingEmployeesSnapshot = await this.firestore.collection('employees').ref.get();
        let isDuplicate = false;
        existingEmployeesSnapshot.forEach(doc => {
          const data = doc.data() as Employee | undefined;
          if (data && (data.id === this.formData.id || `${data.firstname} ${data.middlename} ${data.lastname}`.trim() === fullName)) {
            isDuplicate = true;
          }
        });

        if (isDuplicate) {
          alert('❌ Employee ID or Name already exists!');
          return;
        }

        await this.firestore.collection('employees').doc(this.formData.id).set({
          ...this.formData,
          timestamp: new Date().toISOString()
        });

        alert(`✅ Employee onboarded successfully!`);
        form.resetForm();
        this.profileImage = 'picpro.jpg';
        this.fetchEmployees(); // Refresh the employee list after adding

      } catch (error) {
        console.error('❌ Error:', error);
        alert('❌ Error saving employee data.');
      }
    } else {
      alert('⚠️ Please fill out all required fields.');
    }
  }
}
