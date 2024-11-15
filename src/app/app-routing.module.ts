import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { CvFormComponent } from './components/cv-form/cv-form.component';

const routes: Routes = [
  { path: '', component: CvListComponent }, // Home: CV List
  { path: 'create', component: CvFormComponent }, // Add New CV
  { path: 'edit/:id', component: CvFormComponent }, // Edit CV
  { path: '**', redirectTo: '' }, // Redirect invalid routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
