import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StoreComponent } from './components/store/store.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetaildPageComponent } from './components/detaild-page/detaild-page.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GraphComponent } from './components/graph/graph.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'game/:id', component: DetaildPageComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'graph', component: GraphComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
