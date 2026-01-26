import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
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
import { GraphComponent } from './components/admin-panel/tabs/graph/graph.component';
import { SlideshowModule } from './models/slideshow/slideshow.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DashboardComponent } from './components/admin-panel/tabs/dashboard/dashboard.component';
import { UsersComponent } from './components/admin-panel/tabs/users/users.component';
import { ContactComponent } from './components/admin-panel/tabs/contact/contact.component';
import { GamesComponent } from './components/admin-panel/tabs/games/games.component';
import { CartSummaryComponent } from './components/cart/cart-summary/cart-summary.component';
import { CartItemsComponent } from './components/cart/cart-items/cart-items.component';
import { ProductComponent } from './components/cart/product/product.component';
import { AIComponent } from './components/ai/ai.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountProfileComponent } from './components/settings/tabs/account-profile/account-profile.component';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactUsComponent,
    UsersComponent,
    CartSummaryComponent,
    ProductComponent,
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
    MatTabsModule,
    DetaildPageComponent,
    SlideshowModule,
    NgxChartsModule,
    GraphComponent,
    HttpClientModule,
    AccountProfileComponent,
    NavbarComponent,
    WelcomeComponent,
    AIComponent,
    DashboardComponent,
    GamesComponent,
    ContactComponent,
    AdminPanelComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    SettingsComponent,
    CartItemsComponent,
    ProfileComponent,
    InputTextModule,
    CardModule,
    ButtonModule,
    CheckoutComponent,
  ],

  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
