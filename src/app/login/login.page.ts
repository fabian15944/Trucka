import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../Services/login.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('passwordEyeRegister, { read: ElementRef }') passwordEye: ElementRef;
  // Seleccionamos el elemento con el nombre que le pusimos con el #
  passwordTypeInput = 'password';
  usuario: string;
  password: string;

  encargado: any;
  sucursal;
  correoValidacion= "";
  bool:boolean;
  constructor(public login: LoginService, private router: Router,) {
    this.usuario = '',
      this.password = ''
  }
 

  logear() {
    if (this.usuario === '' || this.password === '') {
      this.NoUser()
    } else {
      this.login.Logear(this.usuario, this.password)
    }
  }



  NoUser() {
    Swal.fire({
      title: 'Atencion!',
      text: 'Ingreza tu usuario y contraseña',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
    this.router.navigate(['login']);
  }



  togglePasswordMode() {
    //cambiar tipo input
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    //obtener el input
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    //obtener el indice de la posición del texto actual en el input
    const inputSelection = nativeEl.selectionStart;
    //ejecuto el focus al input
    nativeEl.focus();
    //espero un milisegundo y actualizo la posición del indice del texto
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);

  }



  ngOnInit() {
  }

}
