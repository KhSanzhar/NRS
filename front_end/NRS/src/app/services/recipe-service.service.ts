import { Injectable } from '@angular/core';
import {Category, Recipe} from '../modules/Recipe';
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, Observable, of} from "rxjs";
import {Comments} from "../modules/Comments";

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
      name: recipe.name,
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

  deleteRecipe(id: number | null): Observable<Recipe> {

    if(id == null)
      return of();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    const url = `${this.apiUrl}/recipes/${id}`;
    return this.http.delete<Recipe>(url, {headers});
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
    return this.http.get<Recipe[]>(`${this.apiUrl}/category/${categoryId}`, {headers});
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


  getCommetsOfRecipe(id: number): Observable<Comments[]> {
    const headers = new HttpHeaders({
      'Content_Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Comments[]>(`${this.apiUrl}/recipes/${id}/comment/`, {headers});
  }

  addComment(id: number, comment: string): Observable<Comments> {
    const headers = new HttpHeaders({
      'Content_Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<Comments>(`${this.apiUrl}/recipes/${id}/comment`, comment, {headers});
  }

  deleteComment(id: number): Observable<Comments> {
    const headers = new HttpHeaders({
      'Content_Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete<Comments>(`${this.apiUrl}/recipes/0/comment/${id}`, {headers});
  }
}
