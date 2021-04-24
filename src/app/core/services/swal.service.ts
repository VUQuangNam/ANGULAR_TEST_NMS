import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  success(title: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  error(title: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  info(title: string) {
    Swal.fire({
      icon: 'info',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  warning(title: string) {
    Swal.fire({
      icon: 'warning',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
