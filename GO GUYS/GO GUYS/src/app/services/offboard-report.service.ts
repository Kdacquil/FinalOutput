import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffboardingReportService {
  constructor(private firestore: AngularFirestore) {}

  getEmployees(): Observable<any[]> {
    return this.firestore.collection('offboarding').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };  // ✅ Include Firestore ID
        })
      )
    );
  }
}
