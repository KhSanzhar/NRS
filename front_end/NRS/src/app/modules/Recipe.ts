export interface Ingredient {
  name: string;
  amount: string;
}

export interface Category{
  id: number,
  name: string
}
export interface Recipe {
  id?: number;
  title: string;
  category: Category[];
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  image: string;
}
