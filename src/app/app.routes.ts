import {Routes} from '@angular/router';

import {About} from './pages/about/about';
import {Home} from './pages/home/home';
import {Contact} from './pages/contact/contact';
import {Welcome} from './pages/welcome/welcome';
import {UserProfile} from './pages/user-profile/user-profile';

export const routes: Routes = [
  {path: '', component: Welcome, pathMatch: 'full'},
  {path: 'home', component: Home},
  {path: 'about', component: About},
  {path: 'contact', component: Contact},
  {path: 'user-profile', component: UserProfile}
];
