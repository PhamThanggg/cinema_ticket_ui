import { useEffect, useState } from 'react';
import ListMovie from '~/layouts/admin/MovieManagement/ListMovie';
import { GetMovieSearchApi } from '~/service/MovieService';
import { useLocation, useNavigate } from 'react-router-dom';

function ListMoviePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        getMovieList();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        queryParams.set('page', newPage);

        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const getMovieList = async () => {
        const nameMovie = queryParams.get('nameMovie');
        const status = queryParams.get('status');
        const genreId = queryParams.get('genreId');
        const maxPrice = queryParams.get('maxPrice');

        const data = {
            page: currentPage - 1,
            limit: 10,
            nameMovie: nameMovie || '',
            status: status ? parseInt(status, 10) : null,
            genreId: genreId ? parseInt(genreId, 10) : null,
            maxPrice: maxPrice ? parseInt(maxPrice, 10) : null,
        };

        const res = await GetMovieSearchApi(data);

        if (res) {
            setMovies(res);
        }
    };

    return <ListMovie movies={movies} currentPage={currentPage} handlePageChange={handlePageChange} />;
}

export default ListMoviePage;
