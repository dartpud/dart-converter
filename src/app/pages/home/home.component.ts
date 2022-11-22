import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserViewModel } from 'src/app/viewmodel/user.viewmodel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userLogged: UserModel;

  userList: UserViewModel[] = [];

  columns: string[] = ['id', 'username', 'password', 'id_application', 'actions'];

  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.userLogged = this._authService.user;

    this.loadUserList();
  }

  loadUserList(): void {
    this._userService.getAll().subscribe({
      next: (response) => {
        this.userList = response.map(user => {
          return {
            ...user,
            isEdit: false,
            isAdd: false,
            changePassword: false,
            hidePassword: true
          }
        });
      },

      error: (error) => {
        alert('Erro ao buscar usuários cadastrados.');
      }
    });
  }

  editUser(user: UserViewModel): void {
    if (!user.changePassword || !user.password) {
      user.password = null;
    }

    this._userService.update(user).subscribe({
      next: () => {
        alert('Usuário editado com sucesso.');
        window.location.reload();
      },

      error: (error: HttpErrorResponse) => {
        if (error.status == 412) {
          alert(error.error);
        }
      }
    })
  }

  addUser(user: UserViewModel): void {
    this._userService.create(user).subscribe({
      next: () => {
        alert('Usuário criado com sucesso.');
        window.location.reload();
      },

      error: (error: HttpErrorResponse) => {
        if (error.status == 412) {
          alert(error.error);
        }
      }
    })
  }

  addRow(): void {
    const newRow: UserViewModel = {
      changePassword: true,
      hidePassword: true,
      isAdd: true,
      isEdit: false,
      id_application: environment.id_application,
      password: '',
      username: ''
    };

    this.userList = [
      ...this.userList,
      newRow
    ];
  }

  deleteUser(user: UserViewModel): void {
    if (user.id_user == this.userLogged.id_user) {
      alert('Não é possível excluir o usuário que você está logado.');
    }
    else {
      const continueToDelete = confirm('Tem certeza que deseja excluir esse usuário?');

      if (continueToDelete) {
        this._userService.delete(user).subscribe({
          next: () => {
            alert('Usuário excluído com sucesso.');
            window.location.reload();
          },
          
          error: (error) => {
            alert('Erro ao excluir usuário.');
          }
        });
      }
    }
  }


}
