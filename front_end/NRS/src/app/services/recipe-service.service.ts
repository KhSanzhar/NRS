import { Injectable } from '@angular/core';
import { Recipe } from '../modules/Recipe';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  private apiUrl = "http://localhost:8000/home/recipes/";

  constructor(private http: HttpClient, private authService: AuthService) {
  }
  getRecipes(): Observable<Recipe[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Recipe[]>(this.apiUrl, {headers});
  }

  addRecipe(recipe: Recipe, selectedFile: File) {
    const formData = new FormData();
    formData.append('name', recipe.title);
    formData.append('category', recipe.category);
    formData.append('description', recipe.description);
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('instructions', JSON.stringify(recipe.instructions));
    formData.append('image', selectedFile, selectedFile.name);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<Recipe>(this.apiUrl, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteRecipe(id: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    const url = `${this.apiUrl}${id}/`;
    return this.http.delete<void>(url, {headers});
  }

  getRecipeById(id: number): Observable<Recipe | undefined> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Recipe>(url, { headers }).pipe(
      catchError(() => {
        return of(undefined);
      })
    );
  }
}
