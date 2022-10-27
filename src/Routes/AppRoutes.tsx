import { Routes, Route } from "react-router-dom"
import { Home, Details } from "../Pages"

export const mainRoutes = [
	{
		path: "/",
		component: <Home />,
	},
	{
		path: "/details",
		component: <Details />,
	},
	{
		path: "/details/:idMovies",
		component: <Details />,
	},
	{
		path: "/*",
		component: <Home />,
	}
]

export const AppRouter = () => {
	return (
		<Routes>
			{mainRoutes.map((route, index) => <Route key={index} path={route.path} element={route.component} />)}
		</Routes>
	)
}