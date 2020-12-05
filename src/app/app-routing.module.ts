import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { 
    path: 'home/login', 
    loadChildren: './login/login.page#LoginPage'
  },
  { 
    path: 'home/fullpost', 
    loadChildren: './fullpost/fullpost.page#FullpostPage'
  },
  { 
    path: 'home/filter', 
    loadChildren: './filter/filter.page#FilterPage'
  },
  { 
    path: 'home/loading', 
    loadChildren: './loading/loading.page#LoadingPage'
  },
  { 
    path: 'home/postavke', 
    loadChildren: './postavke/postavke.page#PostavkePage'
  },
   { 
    path: 'home/pitanja', 
    loadChildren: './pitanja/pitanja.page#PitanjaPage'
  },
  { 
    path: 'home/profile', 
    loadChildren: './profile/profile.page#ProfilePage'
  },
  { 
    path: 'home/search', 
    loadChildren: './search/search.page#SearchPage'
  },
  { 
    path: 'home/chat', 
    loadChildren: './chat/chat.page#ChatPage'
  },
  { 
    path: 'home/tutorial', 
    loadChildren: './tutorial/tutorial.page#TutorialPage'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
