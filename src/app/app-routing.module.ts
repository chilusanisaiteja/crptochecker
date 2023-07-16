import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrptolistComponent } from './crptolist/crptolist.component';
import { CrptdetailsComponent } from './crptdetails/crptdetails.component';

const routes: Routes = [
  { path: '', redirectTo: 'crptlist', pathMatch: 'full' },
  { path: 'crptlist', component: CrptolistComponent },
  { path: 'crptdetail/:id', component: CrptdetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
