import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },

  { path: 'app', component: WhatsappComponent },
  { path: 'app/:id', component: WhatsappComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
