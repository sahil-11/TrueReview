import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authService.getAuthenticated()) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};
