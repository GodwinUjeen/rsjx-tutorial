import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoService } from './todo.service'
import { UsersService } from './users.service'

export interface TodoData {
  userId: string,
  id: string,
  title: string,
  completed: boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rsjx-tutorial';
  private apiClient: TodoService;

  constructor(private todo: TodoService, private user: UsersService, apiClient: TodoService) {

    this.apiClient = apiClient;
    document.cookie = "XSRF-TOKEN=server-generated-token";

  }

  model: any = {};
  todoData!: TodoData;

  getData() {
    this.todo.getData().subscribe(
      res => {
        this.model = res;
        console.log(this.model)
      }
    );
  }

  getUsers() {
    this.user.getUsers().subscribe(user => console.log(user));
  }

  loginUser() {
    this.user.login({ email: 'ajith@gmail.com', password: 'test1234' })
      .subscribe(user => console.log(user._id))
  }

  public async loadTodos(): Promise<void> {
    try {
      this.todoData = await this.apiClient.get({
        url: 'https://jsonplaceholder.typicode.com/todos',
      });
      console.log('Axios');
      console.log(this.todoData);
    } catch (e) {
      console.error(e)
    }
  }

  async getTodo() {
    try {
      ( (await this.apiClient.getTodo()).subscribe(res=>console.log(res)))

    } catch (e) {
      console.error(e)
    }
  }

  async getUser() {
    try {
      let userData = (await this.apiClient.getUser({ email: 'ajith@gmail.com', password: 'test1234' }))
        .subscribe(res => console.log(res));
      console.log(userData);
    } catch (error) {
      console.error(error)
    }
  }

  async signUp() {
    try {
      let userData = await this.apiClient.signUp();
      console.log(userData);
    } catch (error) {
      console.error(error)
    }
  }

}
