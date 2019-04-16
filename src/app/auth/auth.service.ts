import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { alert } from 'tns-core-modules/ui/dialogs';
import { User } from "./user.model";

const FIREBASE_API_KEY = 'AIzaSyB6OvfualQIwAJHZHwL01Hk9W4cs8KVhfU';

interface AuthResponse {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string
    localId: string;
}

@Injectable({ providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}
     signUp(email: string, password: string) {
      return  this.http.post<AuthResponse>(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`
        , {email: email, password: password, returnSecureToken: true}).pipe(catchError(errorRes => {
            this.handleError(errorRes.error.error.message);
            return throwError(errorRes);
        }),
        tap(resData => {
            if (resData && resData.idToken) {
                const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
                const user = new User(email, resData.localId, resData.idToken, expirationDate);
            }
        })
        );
    }
    login(email: string, password: string) {
        return this.http.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`
        , {email: email, password: password, returnSecureToken: true}).pipe(catchError(errorRes => {
            this.handleError(errorRes.error.error.message);
            return throwError(errorRes);
        }));
    }

    private handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'EMAIL_EXISTS':
                alert('This email address exists already!');
                break;
            case 'INVALID_PASSWORD':
            alert('Your password is invalid!');
                break;
            default:
            alert('Authentication failed, check your credentials');
                break;
        }

    }
}
