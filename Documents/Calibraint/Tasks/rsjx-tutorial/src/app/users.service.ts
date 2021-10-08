import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


export interface Users {
  email: string,
  password: string
}

export interface User {
  _id: string,
  email: string,
  userId: string
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private url: string = 'assets/users.json'

  constructor(private users: HttpClient) { }

  getUsers(): Observable<Users[]> {
    return this.users.get<Users[]>(this.url);

  }

  login(data: Users): Observable<User> {
    console.log(data)
    return this.users.get<User>(`http://localhost:5000/login?email=${data.email}&password=${data.password}`);
  }
}
