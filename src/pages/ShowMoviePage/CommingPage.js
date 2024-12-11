import { useState, useEffect } from 'react';
import { MovieAreaShowNowApi } from '~/service/MovieService';
import Loading from '~/components/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import CommingSoon from '~/layouts/components/ShowMovies/CommingSoon';

function Coming() {
    const [resC, setResC] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`?page=${newPage}`);
    };

    useEffect(() => {
        getMovieShowNow();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, location]);

    const getMovieShowNow = async () => {
        const areaId = queryParams.get('areaId');
        const genreId = queryParams.get('genreId');
        const name = queryParams.get('name');
        try {
            const comming = await MovieAreaShowNowApi(areaId, 0, genreId, name, currentPage - 1, 8);
            setResC(comming);
        } catch (error) {
            console.log('Error fetching movie data:', error);
        }
    };

    if (!resC) {
        return <Loading />;
    }

    return (
        <div>
            <CommingSoon showComingApi={resC} currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    );
}

export default Coming;
