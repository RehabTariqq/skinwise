export type Category = 'Acne and Pores' | 'Skin Texture' | 'Skin Appearance' | 'Other Concerns';
export interface SkinConcern {
  id: string; name: string; category: Category; description: string;
  characteristics: string[]; possibleFactors: string[]; generalCare: string[];
  relatedIngredients: string[]; irritants: string[]; areas: string[]; professionalAdvice: string;
}
export interface Ingredient {
  id: string; name: string; what: string; uses: string[]; concerns: string[]; precautions: string[]; usage: string;
}
export interface Article { id: string; title: string; summary: string; body: string[] }
export interface JournalEntry { id: string; date: string; concernId: string; notes: string; createdAt: number }
export type FavType = 'concern' | 'ingredient' | 'article';
export interface Favorite { type: FavType; id: string }
export interface QuizAnswers { skinType: string; concernId: string; area: string; duration: string; observations: string[] }
