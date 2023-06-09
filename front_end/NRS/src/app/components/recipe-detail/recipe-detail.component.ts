import {Component, OnInit} from '@angular/core';
import {RecipeServiceService} from "../../services/recipe-service.service";
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../modules/Recipe";
import {Comments} from "../../modules/Comments";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe | undefined;

  comments: Comments[] | undefined;
  updatedRecipe: Recipe | undefined;

  constructor(private recipeService: RecipeServiceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipeById(id).subscribe((recipe) => {
      this.recipe = recipe;
    });

    if (this.recipe) {
      this.recipe.id = id;

      this.recipeService.getCommetsOfRecipe(this.recipe.id).subscribe((comments) => {
        this.comments = comments;
      });
    }
  }



}
