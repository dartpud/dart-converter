import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged-container',
  templateUrl: './logged-container.component.html',
  styleUrls: ['./logged-container.component.scss']
})
export class LoggedContainerComponent implements OnInit {

  @Input() user: UserModel;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
  
  refresh(): void {
    window.location.reload();
  }

  exit(): void {
    this._authService.clearSession();
    this._router.navigate(['/sign-in'])
  }

}
