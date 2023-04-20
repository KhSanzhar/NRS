import {Component, OnInit} from '@angular/core';
import {RecipeServiceService} from "../../services/recipe-service.service";
import {Router} from "@angular/router";
import {Recipe} from "../../modules/Recipe";
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit{

  recipe: Recipe = {
    id: 0,
    title: '',
    description: '',
    category: '',
    ingredients: [],
    instructions: [],
    image: ''
  }
  constructor(private recipeService: RecipeServiceService, private router: Router) {
  }

  ngOnInit(): void {
  }

  addRecipe(): void {
    this.recipeService.addRecipe(this.recipe);
    this.router.navigate(['/my-recipes']);
  }

  cancel(): void {
    this.router.navigate(['/my-recipes']);
  }

  onFileSelected(event: any): void {

  }

}

