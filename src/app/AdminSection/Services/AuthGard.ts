import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './../../AdminSection/Services/AuthService';
import { AuthenticationVM } from '../ViewModels/AuthenticationVM';

@Injectable()
export class AuthGard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const authVM: AuthenticationVM = this.authService.GetAuthData();
        if (authVM.IsAuth) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
