import { Injectable } from '@angular/core';
import { Recipe } from '../modules/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  private recipes: Recipe[] = [];

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  addRecipe(recipe: Recipe): void{
    recipe.id = this.recipes.length + 1;
    this.recipes.push(recipe);
  }



  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }
  deleteRecipe(recipe: Recipe): void{
    const index = this.recipes.indexOf(recipe);
    if(index >= 0) {
      this.recipes.splice(index, 1)
    }
  }
}
