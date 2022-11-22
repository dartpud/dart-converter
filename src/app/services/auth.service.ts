import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenRequest } from '../models/token.request';
import { TokenResponse } from '../models/token.response';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  token(request: TokenRequest): Observable<TokenResponse> {
    return this._http.post<TokenResponse>(`${environment.api}/auth/token`, request);
  }

  createSession(tokenModel: TokenResponse): void {
    this.accessToken = tokenModel.access_token;
    this.user = tokenModel.user;
  }

  clearSession(): void {
    localStorage.clear();
  }

  get accessToken(): string {
    const response = localStorage.getItem('accessToken');
    return response || '';
  }

  set accessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  get user(): UserModel {
    try {
      const userString = localStorage.getItem('user');

      if (userString == null) {
        return new UserModel();
      }

      const response = JSON.parse(userString);
      return response;
    }
    catch {
      return new UserModel();
    }
  }

  set user(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
