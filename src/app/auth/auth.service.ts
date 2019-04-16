import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const FIREBASE_API_KEY = 'AIzaSyB6OvfualQIwAJHZHwL01Hk9W4cs8KVhfU';

@Injectable({ providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}
    signUp(email: string, password: string) {
        this.http.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`
        , {email: email, password: password, returnSecureToken: true}).subscribe(resData => {
            console.log(resData);
        });
    }
    login(email: string, password: string) {

    }
}
