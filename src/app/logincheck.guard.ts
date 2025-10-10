import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const logincheckGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  let fn = localStorage.getItem("firstName");
  console.log("check:",fn)
  if (fn == undefined || fn == null || fn == "") {
    
    toastr.error('Unauthorized access', 'Error');

    // Redirect to login page
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }

};
