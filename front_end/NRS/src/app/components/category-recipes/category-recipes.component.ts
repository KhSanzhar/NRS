import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../modules/Recipe";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeServiceService} from "../../services/recipe-service.service";

@Component({
  selector: 'app-category-recipes',
  templateUrl: './category-recipes.component.html',
  styleUrls: ['./category-recipes.component.css']
})
export class CategoryRecipesComponent implements OnInit{


  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeServiceService, private route: ActivatedRoute) {

  }
  categoryId: number = 0;
  ngOnInit() {
    const categoryIdString = this.route.snapshot.paramMap.get('id');
    this.categoryId = categoryIdString ? +categoryIdString : 0;
    this.getRecipesForCategory();
  }

  getRecipesForCategory(): void{
    this.recipeService.getRecipesByCategory(this.categoryId).subscribe(
      recipes => {
        this.recipes = recipes;
      },
      error => {
        console.error('Failed to get Recipes: ', error);
      }
    )
  }
}
