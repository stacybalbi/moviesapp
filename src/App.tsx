import { AppRouter } from "./Routes/AppRoutes";
import { FavoriteContext, FavoriteContextStateType } from "./Contexts";
import { useReducer } from "react";
import { FavoriteReducers } from "./Services/reducers";

const initialState: FavoriteContextStateType = {
    favoriteMovies: [],
};

const App = () => {
    const [state, dispatch] = useReducer(FavoriteReducers as any, initialState);
    return (
        <FavoriteContext.Provider value={{ state: Object(state) , dispatch }}>
            <AppRouter />
        </FavoriteContext.Provider>
    );
};

export default App;
