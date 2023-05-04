import { Injectable } from '@angular/core';
import {Category, Recipe} from '../modules/Recipe';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  private apiUrl = "http://localhost:8000/home";

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getCategories(): Observable<Category[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<Category[]>(`${this.apiUrl}/category/`, {headers});
  }
  getRecipes(): Observable<Recipe[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes/`, {headers});
  }

  addRecipe(recipe: Recipe, selectedFile: File) {
    const formData = new FormData();
    formData.append('name', recipe.title);
    formData.append('categories', JSON.stringify(recipe.category));
    formData.append('description', recipe.description);
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('steps', JSON.stringify(recipe.steps));
    formData.append('image', selectedFile, selectedFile.name);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    // for (const key of formData.keys()) {
    //   console.log(key);
    // }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<Recipe>(`${this.apiUrl}/recipes/`, formData, {
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

  getRecipesByCategory(categoryId: number): Observable<Recipe[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    // const url = 'http://localhost:8000/category/?category=${categoryId}'
    return this.http.get<Recipe[]>(`${this.apiUrl}/category/?category=${categoryId}`);
    // return this.http.get<Recipe[]>(url, {headers});
  }

  getAllRecipes(): Observable<Recipe[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes/`, {headers});
  }
}
