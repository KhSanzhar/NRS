import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomeComponent } from './components/home/home.component';
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import {FormsModule} from "@angular/forms";
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth.guard";
import {TokenInterceptor} from "./services/token.interceptor";
import { AccountComponent } from './components/account/account.component';
import { CategoryRecipesComponent } from './components/category-recipes/category-recipes.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    MyRecipesComponent,
    RecipesComponent,
    AboutUsComponent,
    SignUpComponent,
    AddRecipeComponent,
    RecipeDetailComponent,
    SignInComponent,
    AccountComponent,
    CategoryRecipesComponent,
    CommentsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [AuthService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
