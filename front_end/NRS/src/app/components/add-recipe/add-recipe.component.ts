import {Component, OnInit} from '@angular/core';
import {RecipeServiceService} from "../../services/recipe-service.service";
import {Router} from "@angular/router";
import {Recipe} from "../../modules/Recipe";
import {HttpEvent, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit{
  recipe: Recipe = {
    title: '',
    category: '',
    description: '',
    ingredients: [],
    instructions: [],
    image: ''
  }

  selectedFile: File | null | undefined;
  constructor(private recipeService: RecipeServiceService, private router: Router) {

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }


  ngOnInit(): void {
  }

  onSubmit(){
    // this.recipeService.addRecipe(this.recipe).subscribe(
    //   recipe => {
    //     console.log('Recipe added successfully: ', recipe);
    //     this.router.navigate(['/my-recipes']);
    //   },
    //   error => {
    //     console.error('Error adding recipe: ', error);
    //   }
    // );

    if (this.selectedFile) {
      this.recipeService.addRecipe(this.recipe, this.selectedFile)
        .subscribe((event: HttpEvent<Recipe>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total)
            {
              console.log('Upload progress: ', Math.round(event.loaded / event.total * 100) + '%');
            }
          } else if (event.type === HttpEventType.Response) {
            console.log('Recipe added successfully: ', event.body);
            // show success message
          }
        });
    } else {
      console.error('Please select an image file.');
      // show error message
    }
  }


  cancel(): void {
    this.router.navigate(['/my-recipes']);
  }

  // onFileSelected(event: Event): void {
  //   this.selectedFile = event.target.files[0];
  // }

}

