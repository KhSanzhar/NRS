import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from "./components/home/home.component";
import { MyRecipesComponent } from "./components/my-recipes/my-recipes.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import {AddRecipeComponent} from "./components/add-recipe/add-recipe.component";
import {RecipeDetailComponent} from "./components/recipe-detail/recipe-detail.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {AuthGuard} from "./services/auth.guard";
import {AccountComponent} from "./components/account/account.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'my-recipes', component: MyRecipesComponent, canActivate: [AuthGuard]},
  {path: 'recipes', component: RecipesComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'add-recipe', component: AddRecipeComponent, canActivate: [AuthGuard]},
  {path: 'recipes/:category', component: RecipesComponent, canActivate: [AuthGuard]},
  {path: 'detail/:id', component: RecipeDetailComponent, canActivate: [AuthGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
