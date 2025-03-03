export interface Employee {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  personalEmail?: string; // ✅ Added from Offboarding
  employmentDate: string;
  employmentType: string;
  department: string;
  profileImageUrl?: string;
  status: 'Active' | 'Offboarded'; // ✅ Added
  effectiveDate?: string; // ✅ Added from Offboarding
  notification?: string;
  documents?: string;
}
