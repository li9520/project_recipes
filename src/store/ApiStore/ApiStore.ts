import axios from 'axios';
import queryString from 'query-string';

const domen = 'https://api.spoonacular.com';
//export const API_KEY = "4ea0ec47d5fb42fea8b7520ea4838d26";
//export const API_KEY = "931e6ac38f474670b955e4fd766b8b9c";
export const API_KEY = '2593c1f9f006463c98678507137c57e2';

export const URLmap = {
  list: (params: {
    number: number;
    type: string;
    diet: string;
    offset: number;
    query: string;
    addRecipeNutrition: boolean;
  }) => `/recipes/complexSearch?${queryString.stringify(params)}`,

  recipe: (
    id: string,
    params: {
      includeNutrition: boolean;
    }
  ) => `/recipes/${id}/information?${queryString.stringify(params)}`,

  ingredientImg: (image?: string) => `https://spoonacular.com/cdn/ingredients_100x100/${image}`,
};

export enum HTTPMethod {
  GET = 'get',
}

export type ApiResponse<T> = {
  data: T | unknown;
  success: boolean;
};

export default class ApiStore {
  private _createUrl(endpoint: string) {
    return `${domen}${endpoint}&apiKey=${API_KEY}`;
  }
  async request<T>({ method, endpoint }: { method: HTTPMethod; endpoint: string }): Promise<ApiResponse<T>> {
    const result: ApiResponse<T> = {
      data: null,
      success: false,
    };
    try {
      const { data } = await axios({
        method: method,
        url: this._createUrl(endpoint),
      });
      result.data = data;
      result.success = true;
      return result;
    } catch (err) {
      return result;
    }
  }
}
