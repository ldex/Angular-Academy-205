import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home.component';
import { AdminComponent } from './shared/admin.component';
import { ContactComponent } from './shared/contact.component';
import { ErrorComponent } from './shared/error.component';

const routes: Routes = [
  { path: "", redirectTo:"/home", pathMatch:"full" },
  { path: "home", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: "contact", component: ContactComponent },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
