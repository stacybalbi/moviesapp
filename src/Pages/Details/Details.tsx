import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import services from '../../Services/BaseServices';
import { environment } from '../../Config';
import { FavoriteContext } from '../../Contexts';
import { useContext } from 'react';
import { Box } from '@mui/material';


export const Details = () => {
	const { idMovies } = useParams();
	const { data, error, isLoading } = useQuery<any, Error>("details", () => services.findOne(idMovies));

	const { state, dispatch} = useContext(FavoriteContext);

	const handleFavorite = (id: Number) => {
    state.favoriteMovies.includes(Number(id)) 
      ? dispatch({ type: 'REMOVE_FAVORITE', payload: id })
      : dispatch({ type: 'ADD_FAVORITE', payload: id });
  }

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	const {
		overview,
		poster_path,
		title,
		id,
		vote_average
	} = data?.data

	return (
		<Box sx={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			maxWidth: "100%",
			paddingTop: "50px",
			flexDirection: "column"
		}}>
			<h1>Details</h1>
			<Card sx={{ maxWidth: '500px' }}>
				<CardMedia
					component="img"
					height="140"
					image={`${environment.getImageUrl}${poster_path}`}
					alt="PhotoOfTheMovieOnThePag"
				/>
				<CardContent>
					<Typography paragraph variant="h5" component="div">
						{title} 
						<Button size="small"
							onClick={() => handleFavorite(id)}
						>{
							state.favoriteMovies.includes(Number(idMovies)) ? <StarIcon color={'warning'} /> : <StarBorderIcon />
						}</Button>
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{overview}
					</Typography>
					<hr/>
					<Typography variant="body2" sx={{ width:"100%", textAlign:"end"}} color="text.secondary">
						Average: {vote_average}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">
						<Link style={{textDecoration: "none"}} to={`/`}>Back</Link>
					</Button>
					
				</CardActions>
			</Card>
		</Box>
	)
}