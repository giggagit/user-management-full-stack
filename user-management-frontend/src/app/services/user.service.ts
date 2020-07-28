import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = '//localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  public getUserDetail(id: number): Observable<User> {
    return this.http.get<User>(this.userUrl + '/' + id);
  }

  public creatUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user);
  }

  public updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.userUrl + '/' + id, user);
  }

  public deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.userUrl + '/' + id);
  }

}
