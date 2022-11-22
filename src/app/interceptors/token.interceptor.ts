import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize, Observable, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _ngxSpinnerService: NgxSpinnerService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this._ngxSpinnerService.show();

        if (request.url.includes('token')) {
            return next.handle(request)
                .pipe(
                    finalize(() => {
                        this._ngxSpinnerService.hide();
                    })
                );
        }
        else {
            const accessToken = this._authService.accessToken;

            if (accessToken) {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${accessToken}` }
                });
            }

            return next.handle(request).pipe(
                tap({
                    next: () => null,
                    error: (err: HttpErrorResponse) => {

                        if (err.status == 401) {
                            this._authService.clearSession();
                            this._router.navigate(['/sign-in']);
                        }

                        return throwError(err);
                    }
                }),
                finalize(() => {
                    this._ngxSpinnerService.hide();
                })
            );
        }
    }
}