import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'aashramshalakhamgaon',
  },
  {
    path: 'about-us',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About Us',
  },
  {
    path: 'schools',
    loadComponent: () =>
      import('./pages/school-list/school-list.component').then((m) => m.SchoolListComponent),
    title: 'Schools',
  },
  {
    path: 'schools/:id',
    loadComponent: () =>
      import('./pages/school-detail/school-detail.component').then((m) => m.SchoolDetailComponent),
    title: 'School details',
  },
  {
    path: 'teachers',
    loadComponent: () =>
      import('./pages/teacher-list/teacher-list.component').then((m) => m.TeacherListComponent),
    title: 'Teachers',
  },
  {
    path: 'teachers/:id',
    loadComponent: () =>
      import('./pages/teacher-detail/teacher-detail.component').then(
        (m) => m.TeacherDetailComponent,
      ),
    title: 'Teacher profile',
  },
  { path: '**', redirectTo: '' },
];
