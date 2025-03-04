import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('departmentDistribution') departmentChartRef!: ElementRef;
  chartDepartment: Chart | null = null;
  showContent = true;
  private dataSubscription!: Subscription;

  // Predefined departments to ensure consistency
  private departmentLabels = ['SBA', 'SEA', 'SOC', 'SAS', 'SNAMS', 'SED', 'SHTM', 'CCJEF'];

  constructor(private firestore: AngularFirestore) {}

  ngAfterViewInit(): void {
    // Subscribe to real-time updates from Firestore
    this.dataSubscription = this.firestore.collection('employees').valueChanges().subscribe(data => {
      this.updateChart(data);
    });
  }

  updateChart(data: any[]) {
    const departmentCounts: { [key: string]: number } = {};

    // Initialize department counts to 0
    this.departmentLabels.forEach(dept => departmentCounts[dept] = 0);

    // Count employees per department
    data.forEach((employee: any) => {
      const department = employee.department;
      if (this.departmentLabels.includes(department)) {
        departmentCounts[department] += 1;
      }
    });

    const labels = this.departmentLabels;
    const values = this.departmentLabels.map(dept => departmentCounts[dept]);

    if (this.chartDepartment) {
      this.chartDepartment.destroy();
    }

    if (this.departmentChartRef?.nativeElement) {
      const ctx = this.departmentChartRef.nativeElement as HTMLCanvasElement;
      this.chartDepartment = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: values,
            backgroundColor: ['#cc9933', '#cc3300', '#FF9900', '#663333', '#006600', '#003366', '#cc3366', '#800080']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.chartDepartment) {
      this.chartDepartment.destroy();
    }
  }
}
