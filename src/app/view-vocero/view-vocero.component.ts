import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { pagesToggleService } from '../@pages/services/toggler.service';
import { ContactModel } from '../models/contact.model';
import { RegisterService } from '../services/register.service';
import { AuthService } from '../services/auth.service';
import { LoginResponseModel } from '../models/LoginResponse.model';

@Component({
  selector: 'app-view-vocero',
  templateUrl: './view-vocero.component.html',
  styleUrls: ['./view-vocero.component.scss'],
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
export class ViewVoceroComponent implements OnInit, AfterViewInit, OnDestroy {

  configLiveWidgetDesarrollo;
  indexWidgetDesarrollo = 0;

  configLiveWidgetContactos;
  indexWidgetContactos = 0;

  configLiveWidgetRegContactos;
  indexWidgetRegContactos = 0;

  configLiveWidgetBrochure;
  indexWidgetBrochure = 0;

  contacts: Array<ContactModel> = [];
  voceroInfo: LoginResponseModel;

  constructor (public _togglerService: pagesToggleService, private _registerService: RegisterService,
               private _auth: AuthService) {
  }


  ngOnInit () {

    this.configLiveWidgetDesarrollo = {

      direction: 'horizontal',
      autoplay: {
        delay: 5000
      }
    };


    this.configLiveWidgetRegContactos = {

      direction: 'horizontal',
      autoplay: {
        delay: 5000
      }
    };


    this.configLiveWidgetContactos = {
      direction: 'horizontal',
      autoplay: {
        delay: 5000
      }
    };

    this.voceroInfo = this._auth.loggedInfo.getValue();

    this._registerService.GetContacts().subscribe(
      resp => {
        this.contacts = resp;
      }
    );

  }

  ngAfterViewInit (): void {
    setTimeout(() => {
      this._togglerService.toggleAnimateEnter(false);
    }, 1000);
  }

  ngOnDestroy (): void {
    this._togglerService.toggleAnimateEnter(true);
  }
}



