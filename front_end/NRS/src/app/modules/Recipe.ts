interface Ingredient {
  name: string;
  amount: string;
}
export interface Recipe {
  id: number;
  title: string;
  category: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  image: string;
}
