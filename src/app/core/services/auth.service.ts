import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuth = false;

  isAuthChanged = new Subject<boolean>();
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar
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
      .then(() => {
        this.router.navigate([ '/login' ]);
      })
      .catch((error) => {
        this.snackbar.open(error.message, 'Undo', {
          duration: 3000
        });
      });
  }

  loginUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this.router.navigate([ '/user' ]);
        localStorage.setItem('email', userData.user.email);
      })
      .catch((error) => {
        this.snackbar.open(error.message, 'Undo', {
          duration: 3000
        });
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