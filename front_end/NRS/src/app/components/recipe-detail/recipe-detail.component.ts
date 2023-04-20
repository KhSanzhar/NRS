import {Component, OnInit} from '@angular/core';
import {RecipeServiceService} from "../../services/recipe-service.service";
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../modules/Recipe";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe | undefined;

  constructor(private recipeService: RecipeServiceService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipe = this.recipeService.getRecipeById(id);
  }

}
