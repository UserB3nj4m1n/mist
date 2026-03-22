import { Component, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';

import { TranslocoService } from '@jsverse/transloco';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-settings-tab',
  standalone: true,
  templateUrl: './settings-tab.html',
  styleUrl: './settings-tab.css',
  imports: [
    DividerModule,
    FloatLabelModule,
    InputTextModule,
    CardModule,
    ToggleSwitchModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    SelectModule,
    InputGroupModule,
    InputNumberModule,
  ],
})
export class SettingsTab implements OnInit {
  checked: boolean = false;
  settings: boolean = false;
  selectedCity: City | undefined;

  ngOnInit() {
    this.checked = false;
    this.settings = false;
    const currentLang = this.translocoService.getActiveLang();
    this.selectedCity = this.cities.find(
      (c) => c.code.toLowerCase() === currentLang.toLowerCase(),
    );
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }

  cities: City[] = [
    { name: 'Spanish', code: 'es' },
    { name: 'English', code: 'en' },
  ];

  private translocoService = inject(TranslocoService);

  get activeLang() {
    return this.translocoService.getActiveLang();
  }

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
