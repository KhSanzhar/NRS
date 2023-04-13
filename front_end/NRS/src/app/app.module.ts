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


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    MyRecipesComponent,
    RecipesComponent,
    AboutUsComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
