import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'store', component: StoreComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
