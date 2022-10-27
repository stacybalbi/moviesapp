import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FavoriteContext } from '../../Contexts';
import { environment } from '../../Config';

interface ICardProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const Cards = <T extends ICardProps>({
  id,
  poster_path,
  title,
  vote_average,
}: T) => {
  const { state, dispatch} = useContext(FavoriteContext);

  const handleFavorite = () => {
    state.favoriteMovies.includes(id) 
      ? dispatch({ type: 'Deleted_Favorite', payload: id })
      : dispatch({ type: 'Add_Favorite', payload: id });
  }


  return (
    <Card sx={{ maxWidth: 270}}>
      <CardMedia
        component="img"
        height="400"
        image={`${environment.getImageUrl}${poster_path}`}
        alt="PhotoOfTheMovieOnThePage"
      />
      <CardContent>

        <Typography paragraph variant="h5" component="div">
          {title} 
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Average: {vote_average}
        </Typography>

      </CardContent>
      
      <CardActions>
        <Button size="small">
          <Link style={{textDecoration: "none"}} to={`/details/${id}`}>Details</Link>
        </Button>
        <Button size="small"
          onClick={handleFavorite}
        >{
          state.favoriteMovies.includes(id) ? <StarIcon color={'warning'} /> : <StarBorderIcon />
        }</Button>
      </CardActions>
    </Card>
  );
}