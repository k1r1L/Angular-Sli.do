import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuth = false;

  isAuthChanged = new Subject<boolean>();
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  get isAuth() {
    return this._isAuth;
  }

  initializeAuthState() {
    this.afAuth.authState.subscribe((userState) => {
      if(userState) {
        this._isAuth = true;
        this.isAuthChanged.next(true);
      } else {
        this._isAuth = false;
        this.isAuthChanged.next(false);
      }
    });
  }

  signUpUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        this.router.navigate([ '/login' ]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loginUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        // debugger;
        // this._isAuth = true;
        // this.isAuthChanged.next(true);
        this.router.navigate([ '/user' ]);
        localStorage.setItem('email', userData.user.email);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  logout() {
    // this._isAuth = false;
    // this.isAuthChanged.next(false);
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate([ '/' ]);
  }
}