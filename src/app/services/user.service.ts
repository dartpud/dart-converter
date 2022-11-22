import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  create(user: UserModel): Observable<void> {
    return this._http.post<void>(`${environment.api}/user`, user);
  }

  update(user: UserModel): Observable<void> {
    return this._http.put<void>(`${environment.api}/user`, user);
  }

  getAll(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(`${environment.api}/user/${environment.id_application}`);
  }

  getById(idUser: number): Observable<UserModel> {
    return this._http.get<UserModel>(`${environment.api}/user/${idUser}/${environment.id_application}`);
  }

  delete(user: UserModel): Observable<void> {
    return this._http.delete<void>(`${environment.api}/user/${user.id_user}/${environment.id_application}`);
  }
}
