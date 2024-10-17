import { useState, useEffect } from 'react';
import MovieDetails from '~/layouts/components/MovieDetails';
import { MovieDetailApi } from '~/service/MovieService';

import { useLocation } from 'react-router-dom';
import Loading from '~/components/Loading';
import { GetAreaApi } from '~/service/AreaService';

function MovieDetail() {
    const [movie, setMovie] = useState(null);
    const [area, setArea] = useState(null);
    const location = useLocation();
    const { movieId } = location.state || {};

    useEffect(() => {
        getMovie();
        getArea();

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

    const getArea = async () => {
        try {
            const getArea = await GetAreaApi();
            setArea(getArea);
        } catch (error) {
            console.log('Error get area');
        }
    };

    if (!movie || !area) {
        return <Loading />;
    }

    return (
        <div>
            <MovieDetails movieData={movie.result} areaData={area.result} />
        </div>
    );
}

export default MovieDetail;
