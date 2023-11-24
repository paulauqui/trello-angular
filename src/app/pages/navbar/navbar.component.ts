import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../../components/btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faClose,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    BtnComponent,
    OverlayModule,
    FontAwesomeModule,
    // faClose,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faClose = faClose;
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  isOpen: boolean = false;
  isOpenBody: boolean = false;

  constructor() {
    console.log(this.faClose);
  }
}
