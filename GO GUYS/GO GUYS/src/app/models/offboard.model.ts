export interface OffboardData {
  id?: number;
  employeeId: string;
  employeeName: string;
  effectiveDate: string;
  personalEmail: string;
  exitInterview: string;
  automatedNotification: string;
  clearanceStatus: string;
  certificationStatus: string;
  recommendation: string;
  recommendationComment: string;
  timestamp: Date;
  major?: string;
  status: 'pending' | 'completed';
  profileImageUrl?: string;
}
