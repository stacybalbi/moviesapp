import { FavoriteContextStateType } from "../../../Contexts";

export const FavoriteReducers = (state: FavoriteContextStateType, action: any) => {
	
	switch (action.type) {
		case 'Add_Favorite': {
			return {
				...state,
				favoriteMovies: [...state.favoriteMovies, action.payload]
			};
		}
		case 'Deleted_Favorite':
			return {
				...state,
				favoriteMovies: state.favoriteMovies.filter(movie => movie !== action.payload)
			}
		default:
			return state;
	}
}