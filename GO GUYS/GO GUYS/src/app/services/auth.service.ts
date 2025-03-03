import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(map(user => !!user));
  }

  async login(email: string, password: string) {
    try {
      const result = await this.auth.signInWithEmailAndPassword(email, password);
      if (!result.user) {
        return { success: false, message: 'Login failed. Please try again.' };
      }

      if (!result.user.emailVerified) {
        await result.user.sendEmailVerification();
        await this.auth.signOut();
        return { success: false, message: 'Email not verified. Verification email sent.' };
      }

      return { success: true, message: 'Login successful' };
    } catch (error: any) {
      return { success: false, message: this.getAuthErrorMessage(error) };
    }
  }

  async resendVerificationEmail() {
    try {
      const user = await this.auth.currentUser;
      if (!user) {
        return { success: false, message: 'No user is currently logged in.' };
      }

      await user.sendEmailVerification();
      return { success: true, message: 'Verification email sent successfully!' };
    } catch (error: any) {
      return { success: false, message: this.getAuthErrorMessage(error) };
    }
  }

  async resetPassword(email: string) {
    try {
      await this.auth.sendPasswordResetEmail(email);
      return { success: true, message: 'Password reset email sent!' };
    } catch (error: any) {
      return { success: false, message: this.getAuthErrorMessage(error) };
    }
  }

  async getCurrentUser(): Promise<any> {
    return await this.auth.currentUser;
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  private getAuthErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/invalid-credential':
        return 'Incorrect email or password.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Wrong password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Try again later.';
      case 'auth/requires-recent-login':
        return 'This action requires you to log in again.';
      default:
        return 'An error occurred. Please try again.';
    }
  }
}
