import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoClienteComponent } from './components/whatsapp/info-cliente/info-cliente.component';


const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },

  { path: 'user', component: InfoClienteComponent },
  { path: 'user/:id', component: InfoClienteComponent },
  // { path: 'app', component: ConvListComponent },
  // { path: 'app/:id', component: ConvListComponent },

  // { path: 'chat/:tkt', component: ChatWindowComponent },

  // zendeskInit
  // { path: 'whatsapp/:zdUser', component: ConvListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
