import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from '../../../../../../services/department.service';
@Component({
  selector: 'app-snams',
  templateUrl: './snams.component.html',
  styleUrl: './snams.component.scss'
})
export class SnamsComponent {
  filteredEmployees: any[] = [];
    selectedEmployee: any = null;

    constructor(
      private router: Router,
      private elementRef: ElementRef,
      private employeesService: DepartmentService,
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
      this.fetchSNAMSEmployees();
    }

    goBack() {
      this.router.navigateByUrl('/dashboard/distribution');
    }

    fetchSNAMSEmployees() {
      this.employeesService.getSNAMSEmployees().subscribe(data => {
        this.filteredEmployees = data;
        console.log('SNAMS Employees:', this.filteredEmployees);
        this.cdr.detectChanges(); // Ensures UI updates correctly
      });
    }
  }

