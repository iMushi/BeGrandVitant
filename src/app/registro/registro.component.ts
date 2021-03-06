import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { pagesToggleService } from '../@pages/services/toggler.service';
import emailMask from 'text-mask-addons/dist/emailMask';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('enterAnimation', [
      state('loading', style({
        opacity: '0',
        transform: 'translateY(8%)'
      })),
      state('ready', style({
        opacity: '1',
        transform: 'translateY(0)'
      })),
      transition('loading => ready', animate('500ms cubic-bezier(0.1, 0.0, 0.2, 1)'))
    ])
  ]
})
export class RegistroComponent implements OnInit, AfterViewInit, OnDestroy {

  name;
  lastName;
  phoneNumber;
  password;
  email;

  mask = {
    telephone: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    name: Array(50).fill(/^[a-zA-Z\s]*$/),
    password: Array(50).fill(/^[a-zA-Z\s.1-9]*$/),
    emailMask: emailMask
  };

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';


  constructor (public _togglerService: pagesToggleService, private _registerService: RegisterService
    , private _router: Router) {
  }

  ngOnInit () {
  }

  ngAfterViewInit (): void {
    setTimeout(() => {
      this._togglerService.toggleAnimateEnter(false);
    }, 1000);
  }

  ngOnDestroy (): void {
    this._togglerService.toggleAnimateEnter(true);
  }

  createAccount (form: NgForm) {
    if (form.valid) {

      const {name, lastName, phoneNumber, password, email} = this;

      this._registerService.RegisterUser({
        name, lastName, phoneNumber, password, email
      }).subscribe(
        resp => {

          this._togglerService._messageBridge.next({
            type: 'success', msg: 'Te has registrado correctamente',
            options: {
              Position: 'top-right',
              Style: 'simple',
              PauseOnHover: true,
              Title: 'Exito',
              Duration: 5000
            }
          });

          this._router.navigate(['/Login']);
        }
      );
    }
  }
}
