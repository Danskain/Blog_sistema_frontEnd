import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { UserRegister } from '../interfaces/userRegister';
import { LoginResponse } from '../interfaces/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/register'
  }

   signIn(userRegister: UserRegister): Observable<any> {

    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, userRegister);
   }

   login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.myAppUrl}api/login`, user)
   }
}
