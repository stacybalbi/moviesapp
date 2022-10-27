import { createContext } from "react";

export type FavoriteContextStateType = {
	favoriteMovies: any[];
}

export const FavoriteContext = createContext({} as any);