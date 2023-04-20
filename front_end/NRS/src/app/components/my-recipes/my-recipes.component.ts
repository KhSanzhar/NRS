import {Component, OnInit} from '@angular/core';
import { RecipeServiceService } from "../../services/recipe-service.service";
import { Recipe} from "../../modules/Recipe";

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit{

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeServiceService) {
  }
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
