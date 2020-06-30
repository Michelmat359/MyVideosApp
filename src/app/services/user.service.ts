import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private rootUrl = 'http://localhost:8080/myvideos';
  private token: string;
  private user: User;

  constructor(private http: HttpClient) {
    console.log('LoginService Init()');
  }
  
  
  getSessionToken(): string {
    return this.token;
  }

  getSessionUser(): User {
    return this.user;
  }

  login(email: string, password: string): Promise<boolean> {
    console.log(`[UserService] login(${email})`);
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.rootUrl}/sessions`, {
          email: email,
          password: password
        })
        .subscribe(
          (data: { userId: string; token: string }) => {
            this.token = data.token;
            let url = `${this.rootUrl}/users/${data.userId}`;
            this.http.get(url, { params: { token: this.token } }).subscribe(
              (user: User) => {
                this.user = user;
                resolve(true);
              },
              err => reject(err)
            );
          },
          err => {
            console.log(
              `[UserService] login(${email}) ERROR: ` + JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  logout(): Promise<void> {
    console.log(`[UserService] logout()`);
    return new Promise((resolve, reject) => {
      this.token = null;
      this.user = null;
      resolve();
    });
  }

  addUser(user: User): Promise<User> {
    console.log(`[UserService] createUser(${user.email})`);
    return new Promise((resolve, reject) => {
      this.http.post(`${this.rootUrl}/users`, user).subscribe(
        (user: User) => {
          console.log(`[UserService] createUser(${user.email}) SUCCESS.`);
          this.user = user;
          resolve(user);
        },
        err => {
          console.log(
            `[UserService] createUser(${user.email}) ERROR: ` +
              JSON.stringify(err)
          );
          reject(err);
        }
      );
    });
  }

  updateUser(user: User): Promise<User> {
    console.log("[UserService] updateUser(" + JSON.stringify(user) + ")");
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.rootUrl}/users/${this.user.id}`, user, {
          params: { token: this.token }
        })
        .subscribe(
          (user: User) => {
            this.user = user;
            resolve(user);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  findUserById(id: string): Promise<User> {
    console.log(`[UserService] findUserById(${id})`);
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.rootUrl}/users/${id}`, { params: { token: this.token } })
        .subscribe(
          (data: any) => {
            console.log(`[UserService] findUserById(${id}) SUCCESS.`);
            let user = this.clone(data.items[0]);
            resolve(user);
          },
          err => {
            console.log(
              `[UserService] findUserById(${id}) ERROR: ` + JSON.stringify(err)
            );
            reject(err);
          }
        );
    });
  }

  private clone(user: any): User {
    let clone: User = {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname
    };

    console.log("[UserService] clone() => " + JSON.stringify(clone));
    return clone;
  }

}

