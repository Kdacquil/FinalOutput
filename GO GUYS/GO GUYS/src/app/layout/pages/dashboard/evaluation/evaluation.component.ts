import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../../../../interfaces/evaluation.interface';
import { EvaluationService } from '../../../../services/evaluation.service';
import { OnboardingReportService } from '../../../../services/onboarding-report.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  selectedEmployee: any = null;
  evaluationHistory: Evaluation[] = [];
  evaluatedEmployees: Set<string> = new Set();
  loading = false;
  searchQuery: string = '';

  evaluationCriteria = [
    { description: 'Possesses necessary credentials and certifications', category: 'QUALIFICATIONS & COMPETENCE', rating: 0, points: 0 },
    { description: 'Demonstrates subject expertise', category: 'QUALIFICATIONS & COMPETENCE', rating: 0, points: 0 },
    { description: 'Aligns lesson plans with the curriculum', category: 'QUALIFICATIONS & COMPETENCE', rating: 0, points: 0 },
    { description: 'Integrates technology into teaching', category: 'QUALIFICATIONS & COMPETENCE', rating: 0, points: 0 },
    { description: 'Participates in professional development', category: 'QUALIFICATIONS & COMPETENCE', rating: 0, points: 0 },

    { description: 'Engages students effectively', category: 'TEACHING EFFECTIVENESS', rating: 0, points: 0 },
    { description: 'Maintains structured classroom management', category: 'TEACHING EFFECTIVENESS', rating: 0, points: 0 },
    { description: 'Adapts methods to diverse learning needs', category: 'TEACHING EFFECTIVENESS', rating: 0, points: 0 },
    { description: 'Uses appropriate assessments and feedback', category: 'TEACHING EFFECTIVENESS', rating: 0, points: 0 },
    { description: 'Handles discipline fairly and professionally', category: 'TEACHING EFFECTIVENESS', rating: 0, points: 0 },

    { description: 'Communicates effectively with all stakeholders', category: 'COMMUNICATION & COLLABORATION', rating: 0, points: 0 },
    { description: 'Builds strong interpersonal relationships', category: 'COMMUNICATION & COLLABORATION', rating: 0, points: 0 },
    { description: 'Provides constructive feedback to students', category: 'COMMUNICATION & COLLABORATION', rating: 0, points: 0 },
    { description: 'Participates actively in school activities', category: 'COMMUNICATION & COLLABORATION', rating: 0, points: 0 },
    { description: 'Resolves conflicts professionally', category: 'COMMUNICATION & COLLABORATION', rating: 0, points: 0 },

    { description: 'Meets deadlines and responsibilities', category: 'WORK ETHICS & PROFESSIONALISM', rating: 0, points: 0 },
    { description: 'Maintains reliability and punctuality', category: 'WORK ETHICS & PROFESSIONALISM', rating: 0, points: 0 },
    { description: 'Follows ethical practices and policies', category: 'WORK ETHICS & PROFESSIONALISM', rating: 0, points: 0 },
    { description: 'Responds well to constructive criticism', category: 'WORK ETHICS & PROFESSIONALISM', rating: 0, points: 0 },
    { description: 'Recommended for continued employment or promotion', category: 'WORK ETHICS & PROFESSIONALISM', rating: 0, points: 0 }
  ];

  constructor(
    private onboardingReportService: OnboardingReportService,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit() {
    this.onboardingReportService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = [...this.employees];
    });

    this.loadEvaluatedEmployees();
  }

  filterEmployees() {
    const query = this.searchQuery?.toLowerCase().trim() || '';

    this.filteredEmployees = this.employees.filter(emp =>
      emp.lastname?.toLowerCase().startsWith(query) // Match only the first letter
    );
  }

  openModal(employee: any) {
    if (!employee?.id) {
      alert('Employee ID is missing. Please try again.');
      return;
    }

    this.selectedEmployee = {
      ...employee,
      name: `${employee.firstname} ${employee.lastname}`
    };

    this.loadEvaluationHistory(employee.id);
  }



  closeModal() {
    this.selectedEmployee = null;
    this.resetForm();
  }

  loadEvaluationHistory(employeeId: string) {
    if (!employeeId) return;

    this.loading = true;
    this.evaluationService.getEvaluations(employeeId).subscribe(
      (history: Evaluation[]) => {
        this.evaluationHistory = history.map(item => ({
          ...item,
          date: item.date instanceof Timestamp ? item.date.toDate() : new Date(item.date),
        }));
        this.loading = false;
      },
      () => (this.loading = false)
    );
  }

  onRatingChange(criterion: any, event: any) {
    const rating = +event.target.value;
    criterion.rating = rating;
    criterion.points = rating;
  }

  validateForm(): boolean {
    return this.evaluationCriteria.every(c => c.rating > 0);
  }

  submitEvaluation() {
    if (!this.selectedEmployee?.id) return;

    if (this.evaluatedEmployees.has(this.selectedEmployee.id)) {
      alert('You have already evaluated this employee.');
      return;
    }

    if (!this.validateForm()) {
      alert('Please answer all evaluation questions before submitting.');
      return;
    }

    const evaluation: Evaluation = {
      employeeId: this.selectedEmployee.id,
      employeeName: `${this.selectedEmployee.firstname} ${this.selectedEmployee.lastname}`,
      criteria: this.evaluationCriteria.map(c => ({
        description: c.description,
        rating: c.rating,
        points: c.points,
        category: c.category
      })),
      totalPoints: this.calculateTotalPoints(),
      date: new Date()
    };

    this.loading = true;
    this.evaluationService.saveEvaluation(evaluation)
      .then(() => {
        alert('Evaluation saved successfully!');
        this.evaluatedEmployees.add(this.selectedEmployee.id);
        this.closeModal();
      })
      .catch(() => alert('Failed to save evaluation.'))
      .finally(() => (this.loading = false));
  }

  calculateTotalPoints(): number {
    return this.evaluationCriteria.reduce((sum, c) => sum + c.points, 0);
  }

  resetForm() {
    this.evaluationCriteria.forEach(criterion => {
      criterion.rating = 0;
      criterion.points = 0;
    });
  }

  loadEvaluatedEmployees() {
    this.evaluationService.getUserEvaluatedEmployees().subscribe((evaluated: Iterable<string> | null | undefined) => {
      this.evaluatedEmployees = new Set(evaluated);
    });
  }
}
