import { Injectable } from '@angular/core';
import {Category, Recipe} from '../modules/Recipe';
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
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

  getMyRecipes(): Observable<Recipe[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Recipe[]>(`${this.apiUrl}/my-recipes/`, {headers});
  }

// , selectedFile: File
  addRecipe(recipe: Recipe) {
    const payload = {
      name: recipe.title,
      categories: recipe.category,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      // image: selectedFile
    };


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<Recipe>(`${this.apiUrl}/recipes/`, JSON.stringify(payload), {
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

  getRecipeById(id: number): Observable<Recipe> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    const url = `${this.apiUrl}/recipes/${id}/`;
    return this.http.get<Recipe>(url, { headers });
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

  updateRecipe(id: number, updatedRecipe: Recipe): Observable<Recipe> {
    const headers = new HttpHeaders({
      'Content_Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.put<Recipe>(`${this.apiUrl}/recipes/${id}`, updatedRecipe, {headers});
  }
}
