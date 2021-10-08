import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import axios, { AxiosInstance } from 'axios';

export interface GetOptions {
  url: string
}

export interface GetUser {
  email: string,
  password: string
}

export interface User {
  _id: string,
  email: string,
  userId: string
}

export interface Login {
  email: string,
  password: string
}

export interface Todo {
  userId: string,
  id: string,
  title: string,
  completed: boolean
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(private todo: HttpClient, errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
    this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        "X-Initialized-At": Date.now().toString()
      }
    });
  }

  getData(): Observable<object> {
    // return axios.get('https://jsonplaceholder.typicode.com/todos');
    return this.todo.get('https://jsonplaceholder.typicode.com/todos');
  }

  async get<T>(options: GetOptions): Promise<T> {
    try {

      let axiosResponse = await this.axiosClient.request<T>({
        method: "get",
        url: options.url,
      });
      return (axiosResponse.data);

    } catch (error) {
      return (Promise.reject(this.normalizeError(error)));
    }
  }

  async getTodo(): Promise<Observable<Object>> {

    let todoData: Observable<Object> = await axios.get('https://jsonplaceholder.typicode.com/todos',)
    return (todoData);

  }

  async getUser(data: Login): Promise<Observable<User>> {

    let userData: Observable<User> = await axios.get(`http://localhost:5000/login?email=${data.email}.com&password=${data.password}`)

    return userData;

  }

  async signUp() {
    try {
      let userData = await axios.post('http://localhost:5000/signup?email=ajith@gmail.com&password=test1234')
      return userData.data;
    } catch (error) {
      console.log(error);
      return (this.normalizeError(error));
    }
  }

  normalizeError(error: any): Object {
    this.errorHandler.handleError(error);
    return ({
      code: "Unknown Error",
      message: "An unexpected error occured"
    });
  }
}
