import {Component, OnInit} from '@angular/core';
import {Category, Recipe} from "../../modules/Recipe";
import {RecipeServiceService} from "../../services/recipe-service.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  recipes: Recipe[] = [];
  categories: Category[] = [];

  constructor(private recipeService: RecipeServiceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      // this.categories = this.getCategories();
    });

    this.getCategories();
  }



  getCategories() {
    this.recipeService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
        error => {
        console.error('Failed to get categories: ', error);
      }
    )
  }

  getRecipesForCategory(categoryId: number): void {
    this.recipeService.getRecipesByCategory(categoryId).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      },
      error => {
        console.error('Failed to get Recipes: ', error);
      }
    )
  }

  getAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      },
      error => {
        console.error('Failed to get all recipes: ', error);
      }
    )
  }

}
