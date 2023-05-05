import { Component, OnInit } from '@angular/core';
import { RecipeServiceService } from '../../services/recipe-service.service';
import { Router } from '@angular/router';
import { Recipe, Category, Ingredient } from '../../modules/Recipe';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe = {
    name: '',
    category: [],
    description: '',
    ingredients: [],
    steps: [],
    image: ''
  };

  categories: Category[] = [];

  selectedFile: File | null | undefined;
  constructor(private recipeService: RecipeServiceService, private router: Router) {}

  selectedCategory: Category = {
    id: 0,
    name: ''
  };

  addIngredient() {
    this.recipe.ingredients.push({ name: '', amount: '' });
  }

  removeIngredient() {
    if (this.recipe.ingredients.length > 1) {
      this.recipe.ingredients.pop();
    }
  }
  addStep() {
    this.recipe.steps.push('');
  }

  removeStep() {
    if (this.recipe.steps.length > 1) {
      this.recipe.steps.pop();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.recipeService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      error => {
        console.error('Failed to get Categories: ', error);
      }
    );
  }

  // onSubmit() {
  //   if (this.selectedFile) {
  //     this.recipe.category = [this.selectedCategory];
  //     this.recipeService.addRecipe(this.recipe, this.selectedFile).subscribe(
  //       (event: HttpEvent<Recipe>) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           if (event.total) {
  //             console.log('Upload progress: ', Math.round(event.loaded / event.total * 100) + '%');
  //           }
  //         } else if (event.type === HttpEventType.Response) {
  //           console.log('Recipe added successfully: ', event.body);
  //           this.router.navigate(['/my-recipes']);
  //           // show success message
  //         }
  //       },
  //       (error) => {
  //         console.error('Failed to add recipe:', error);
  //         // show error message
  //       }
  //     );
  //   } else {
  //     console.error('Please select an image file.');
  //     // show error message
  //   }
  // }

  onSubmit() {
    this.recipe.category = [this.selectedCategory];
    this.recipeService.addRecipe(this.recipe).subscribe(
      (response) => {
        console.log('Recipe added successfully: ', response);
        this.router.navigate(['/my-recipes']);
      },
      error => {
        console.error('Failed to add recipe: ', error);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/my-recipes']);
  }
}
