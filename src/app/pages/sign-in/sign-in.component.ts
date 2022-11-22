import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenRequest } from 'src/app/models/token.request';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  hide: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  trySignIn(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const formValue = this.form.getRawValue();

      const request: TokenRequest = {
        username: formValue.username,
        password: formValue.password,
        id_application: environment.id_application
      };

      this._authService.token(request).subscribe({
        next: (response) => {
          this._authService.createSession(response);
          this._router.navigate(['/home']);
        },

        error: (error: HttpErrorResponse) => {
          if (error.status == 412) {
            alert(error.error)
          }
        }
      });
    }
  }

  trySignUp(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const formValue = this.form.getRawValue();

      const request: UserModel = {
        username: formValue.username,
        password: formValue.password,
        id_application: environment.id_application
      };

      this._userService.create(request).subscribe({
        next: (response) => {
          alert('Usuário cadastrado com sucesso')
        },

        error: (error: HttpErrorResponse) => {
          if (error.status == 412) {
            alert(error.error)
          }
        }
      });
    }
  }

}
