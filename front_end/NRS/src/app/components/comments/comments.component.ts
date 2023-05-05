import { Component, OnInit } from '@angular/core';
import {RecipeServiceService} from "../../services/recipe-service.service";
import {Comments} from "../../modules/Comments";
import {Recipe} from "../../modules/Recipe";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  newCommentText = '';
  recipe: Recipe = { id: 0, title: '', category: [], description: '', ingredients: [], steps: [], image: '' };
  comments: Comments[] = [];

  constructor(private recipeService: RecipeServiceService) {}

  // ngOnInit(): void {
  //   this.recipe.id = Number(this.recipeService.getRecipeById().subscribe(
  //     recipe => {
  //       this.recipe.id = recipe.id
  //     },
  //     error => {
  //       console.error('Failed to get id of recipe: ', error);
  //     }
  //   ));
  //   this.recipeService.getRecipeById(this.recipe.id).subscribe(
  //     (recipe: Recipe) => {
  //     this.recipe = recipe;
  //   });
  //   this.recipeService.getCommetsOfRecipe(this.recipe.id).subscribe((comments) => {
  //     this.comments = comments;
  //   });
  // }

  ngOnInit(): void {
    const recipeId = this.recipe.id;
    if(recipeId)
    this.recipeService.getRecipeById(recipeId).subscribe(
      (recipe: Recipe) => {
        if (recipe && recipe.id) {
          this.recipe.id = recipe.id;
          this.recipeService.getCommetsOfRecipe(this.recipe.id).subscribe((comments) => {
            this.comments = comments;
          });
        } else {
          console.error('Failed to get id of recipe.');
        }
      },
      (error) => {
        console.error('Failed to get id of recipe: ', error);
      }
    );
  }

  addComment(): void {

    if(this.recipe.id)
    this.recipeService.addComment(this.recipe.id, this.newCommentText).subscribe(
      (comment: Comments) => {
        this.comments.push(comment);

      },
      (error: HttpErrorResponse) => {
        console.error('Failed to add comment:', error);
        // Show error message
      }

    );
  }

  deleteComment(commentId: number): void {
    this.recipeService.deleteComment(commentId).subscribe(
      () => {
        // Remove the deleted comment from the comments array
        this.comments = this.comments.filter((c) => c.id !== commentId);
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to add comment:', error);
        // Show error message
      }

    );
  }

}
