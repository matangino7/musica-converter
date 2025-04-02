import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, user } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    this.loadUser(); // Load user on service initialization
    user(this.auth).subscribe(user => {
      if (user) {
        this.saveUser(user); // Save user after login
      } else {
        this.clearUser();
      }
    });
  }

  private saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
    this.userSubject.next(user);
  }

  private loadUser() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  private clearUser() {
    localStorage.removeItem('user'); // Remove user from localStorage
    this.userSubject.next(null);
  }

  async register(email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    this.saveUser(credential.user);
    return credential;
  }

  async login(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.saveUser(credential.user);
    return credential;
  }

  async googleLogin() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    this.saveUser(credential.user);
    return credential;
  }

  async logout() {
    await signOut(this.auth);
    this.clearUser();
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value; // Returns true if user exists
  }
}
