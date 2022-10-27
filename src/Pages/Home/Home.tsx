import services from "../../Services/BaseServices";
import { useQuery } from "react-query";
import Box from '@mui/material/Box';
import { Cards } from "../../Components";
import { Alert, AlertTitle, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { FavoriteContext } from "../../Contexts";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

export const Home = () => {

	const { state } = useContext(FavoriteContext);
	const onSuccess = () => console.log("success");
	const onError = () => console.log("error");

	const { data, error, isLoading } = useQuery<any, Error>("details", () => services.findAll(), {
		onSuccess,
		onError,
	});

	const dataResult = data?.data.results;

	console.log(state)

	const [isFavorite, setIsFavorite] = useState(false);

	const renderFavorite = (event: any) => {
		setIsFavorite(event.target.checked);
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	return (
		<>
			<Box 
			display="flex" 
			flexDirection="row" 
			justifyContent="space-evenly" 
			alignItems="center"
			sx={{paddingTop: "40px"}}>

				<Typography variant="h4" component="h1">
				<LocalMoviesIcon fontSize="large"/> 
				Movie App
				<LocalMoviesIcon fontSize="large"/>
				</Typography>

				<FormGroup>
					<FormControlLabel control={<Checkbox />} label="Favorite Movies" onChange={e => renderFavorite(e)} />
				</FormGroup>
			</Box>

			<Box 
					sx={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-evenly",
						alignItems: "top",
						paddingTop: "40px",
						width: "87%" ,
                        margin: "auto"
					}}
					> 
					{
						isFavorite 
						? 
						!state.favoriteMovies.length 
						? <Alert severity="info" sx={{width: '50%'}}>
								<AlertTitle>Alert!</AlertTitle>
								Message — <strong>No favorites!</strong>
							</Alert> 
						: dataResult?.filter((item: any) => state.favoriteMovies.includes(item.id))
							.map((item: any) => (
								<Box key={item.id} sx={{paddingTop: 3}}>
									<Cards key={item.id} {...item } />
								</Box>
							)) 
						: dataResult?.map((item: any) => (
							<Box key={item.id} sx={{paddingTop: 3}}>
								<Cards key={item.id} {...item} />
							</Box>
						))
					}
			</Box>
		</>
	)
}