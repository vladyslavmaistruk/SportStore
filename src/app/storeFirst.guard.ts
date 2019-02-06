import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {StoreComponent} from './store/store.component';

@Injectable()
export class StoreFirstGuard {
  private firstNavigation = true;
  
  constructor(private router: Router) {}
  
  canActivate(rout: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.firstNavigation) {
      this.firstNavigation = false;
      if (rout.component !== StoreComponent) {
        this.router.navigateByUrl('/');
        return false;
      }
    }
    return true;
  }
}
