import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../modules/Recipe";
import {RecipeServiceService} from "../../services/recipe-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  recipes: Recipe[] = [];
  categories: string[] = [];

  selectedCategory: string | null = null;
  constructor(private recipeService: RecipeServiceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.categories = this.getCategories();

    this.route.paramMap.subscribe(params => {
      const category = params.get('category');

      if(category) {
        this.selectedCategory = category;
      } else {
        this.selectedCategory = null;
      }
    });
  }

  getCategories(): string[] {
    const categories: string[] = [];

    for(const recipe of this.recipes) {
      if(!categories.includes(recipe.category)) {
        categories.push(recipe.category);
      }
    }

    return categories;
  }

  getRecipesByCategory(category: string): Recipe[] {
    return this.recipes.filter(recipe => recipe.category === category)
  }

  get recipesToShow(): Recipe[] {
    if(this.selectedCategory) {
      return this.getRecipesByCategory(this.selectedCategory);
    } else {
      return this.recipes;
    }
  }
  selectCategory(category: string | null): void {
    this.selectedCategory = category;
  }

}
