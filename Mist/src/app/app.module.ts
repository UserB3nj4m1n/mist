import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoreComponent } from './components/store/store.component';
import { LoginComponent } from './components/login/login.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from './firebase.config';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { DetaildPageComponent } from './components/detaild-page/detaild-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GraphComponent } from './components/graph/graph.component';
import { SlideshowModule } from './models/slideshow/slideshow.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DashboardComponent } from './components/admin-panel/tabs/dashboard/dashboard.component';
import { UsersComponent } from './components/admin-panel/tabs/users/users.component';
import { ContactComponent } from './components/admin-panel/tabs/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ContactUsComponent,
    AdminPanelComponent,
    DashboardComponent,
    UsersComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    StoreComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileComponent,
    MatTabsModule,
    DetaildPageComponent,
    SlideshowModule,
    NgxChartsModule,
    GraphComponent,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
