import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StoreComponent } from './components/store/store.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetaildPageComponent } from './components/detaild-page/detaild-page.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GraphComponent } from './components/admin-panel/tabs/graph/graph.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DashboardComponent } from './components/admin-panel/tabs/dashboard/dashboard.component';
import { UsersComponent } from './components/admin-panel/tabs/users/users.component';
import { ContactComponent } from './components/admin-panel/tabs/contact/contact.component';
import { GamesComponent } from './components/admin-panel/tabs/games/games.component';
import { AdminGuard } from './guards/admin.guard';
import { CartItemsComponent } from './components/cart/cart-items/cart-items.component';
import { AIComponent } from './components/ai/ai.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountProfileComponent } from './components/settings/tabs/account-profile/account-profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'game/:id', component: DetaildPageComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartItemsComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'contacts', component: ContactComponent },
      { path: 'games', component: GamesComponent },
      { path: 'graph', component: GraphComponent },
    ],
  },
  { path: 'ai', component: AIComponent },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [{ path: 'account-profile', component: AccountProfileComponent }],
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
