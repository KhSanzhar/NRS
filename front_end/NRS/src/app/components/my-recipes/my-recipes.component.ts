import {Component, OnInit} from '@angular/core';
import { RecipeServiceService } from "../../services/recipe-service.service";
import { Recipe} from "../../modules/Recipe";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit{

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeServiceService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.getMyRecipes();
  }

  getMyRecipes(): void {
    this.recipeService.getMyRecipes().subscribe(
      recipes => {
        this.recipes = recipes;
      }
    )
  }

  deleteRecipe(id: number | null): void {
    if (confirm("Вы уверены, что хотите удалить этот рецепт?") && id !== null) {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
      });
    }
  }



}
