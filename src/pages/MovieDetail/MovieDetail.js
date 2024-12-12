import { useState, useEffect } from 'react';
import MovieDetails from '~/layouts/components/MovieDetails';
import { MovieDetailApi } from '~/service/MovieService';

import { useLocation } from 'react-router-dom';
import Loading from '~/components/Loading';

function MovieDetail() {
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const { movieId } = location.state || {};

    useEffect(() => {
        getMovie();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getMovie = async () => {
        try {
            const getMovie = await MovieDetailApi(movieId);

            setMovie(getMovie);
        } catch (error) {
            console.log('Error fetching movie data:', error);
        }
    };

    if (!movie) {
        return <Loading />;
    }

    return (
        <div>
            <MovieDetails movieData={movie.result} />
        </div>
    );
}

export default MovieDetail;
