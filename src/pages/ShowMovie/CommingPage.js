import { useState, useEffect } from 'react';
import { MovieShowNowApi, MovieAreaShowNowApi } from '~/service/MovieService';
import Loading from '~/components/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import CommingSoon from '~/layouts/components/ShowMovies/CommingSoon';

function Coming() {
    const [resC, setResC] = useState(null);
    const [selectedArea, setSelectedArea] = useState(() => {
        const storedArea = sessionStorage.getItem('selectedArea');
        return storedArea ? JSON.parse(storedArea).id : null;
    });
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

    const handleAreaChange = (newArea) => {
        setSelectedArea(newArea);
    };

    useEffect(() => {
        getMovieShowNow();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, selectedArea]);

    const getMovieShowNow = async () => {
        try {
            if (!selectedArea) {
                const comming = await MovieShowNowApi(1, currentPage - 1, 8);
                setResC(comming);
            } else {
                const comming = await MovieAreaShowNowApi(selectedArea, 1, currentPage - 1, 8);
                setResC(comming);
            }
        } catch (error) {
            console.log('Error fetching movie data:', error);
        }
    };

    if (!resC) {
        return <Loading />;
    }

    return (
        <div>
            <CommingSoon
                showComingApi={resC}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                onAreaChange={handleAreaChange}
            />
        </div>
    );
}

export default Coming;
