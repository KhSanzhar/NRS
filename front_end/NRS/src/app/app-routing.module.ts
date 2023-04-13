import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from "./components/home/home.component";
import { MyRecipesComponent } from "./components/my-recipes/my-recipes.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'my-recipes', component: MyRecipesComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
