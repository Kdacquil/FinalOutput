import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service'; // Import AuthService
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  constructor(private firestore: AngularFirestore, private authService: AuthService) {}

  async logAction(action: string, details: string, status: 'Successful' | 'Failed') {
    const user = await this.authService.getCurrentUser();

    if (!user) return;

    const logData = {
      userId: user.uid,
      email: user.email || 'Unknown Email',  // ✅ Using email instead of username
      action: action,
      details: details,
      status: status,
      timestamp: new Date()
    };

    return this.firestore.collection('auditLogs').add(logData);
  }

  getAuditLogs(): Observable<any[]> {
    return this.firestore.collection('auditLogs', ref => ref.orderBy('timestamp', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          return { id: a.payload.doc.id, ...data };
        }))
      );
  }
}
