import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

   constructor(private firestore: AngularFirestore) {}

   getCCJEFEmployees(): Observable<any[]> {
    return this.firestore
      .collection('employees', ref => ref.where('department', '==', 'CCJEF'))
      .valueChanges();
  }
  getSBAEmployees(): Observable<any[]> {
    return this.firestore
      .collection('employees', ref => ref.where('department', '==', 'SBA'))
      .valueChanges();
  }
  getSEAEmployees(): Observable<any[]> {
    return this.firestore
      .collection('employees', ref => ref.where('department', '==', 'SEA'))
      .valueChanges();
  }
  getSASEmployees(): Observable<any[]> {
    return this.firestore
      .collection('employees', ref => ref.where('department', '==', 'SAS'))
      .valueChanges();
  }
  getSHTMEmployees(): Observable<any[]> {
    return this.firestore
      .collection('employees', ref => ref.where('department', '==', 'SHTM'))
      .valueChanges();
  }
  getSOCEmployees(): Observable<any[]> {
    return this.firestore
      .collection('employees', ref => ref.where('department', '==', 'SOC'))
      .valueChanges();
  }
  getSEDEmployees(): Observable<any[]> {
    return this.firestore
      .collection('employees', ref => ref.where('department', '==', 'SED'))
      .valueChanges();
  }
  getSNAMSEmployees(): Observable<any[]> {
    return this.firestore
      .collection('employees', ref => ref.where('department', '==', 'SNAMS'))
      .valueChanges();
  }
}
