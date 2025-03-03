import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from '../../../../../../services/department.service';
@Component({
  selector: 'app-sba',
  templateUrl: './sba.component.html',
  styleUrl: './sba.component.scss'
})
export class SbaComponent {
  filteredEmployees: any[] = [];
    selectedEmployee: any = null;

    constructor(
      private router: Router,
      private elementRef: ElementRef,
      private employeesService: DepartmentService,
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
      this.fetchSBAEmployees();
    }

    goBack() {
      this.router.navigateByUrl('/dashboard/distribution');
    }

    fetchSBAEmployees() {
      this.employeesService.getSBAEmployees().subscribe(data => {
        this.filteredEmployees = data;
        console.log('SBA Employees:', this.filteredEmployees);
        this.cdr.detectChanges(); // Ensures UI updates correctly
      });
    }
  }

