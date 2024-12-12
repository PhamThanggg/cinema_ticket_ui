import GenreManagement from '~/layouts/admin/GenreManagement';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GenreSearchApi, GetGenreApi } from '~/service/GenreService';
import Loading from '~/components/Loading';

function PromotionManagementPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [genres, setGenres] = useState(null);
    const [loadList, setLoadList] = useState(true);

    useEffect(() => {
        getGenreList();
    }, [currentPage, location, loadList]);

    const handlePageChange = (newPage) => {
        queryParams.set('page', newPage);

        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const getGenreList = async () => {
        const name = queryParams.get('name');

        const data = {
            page: currentPage - 1,
            limit: 10,
            name: name || '',
        };

        const res = await GenreSearchApi(data);

        if (res) {
            setGenres(res);
        }
    };

    if (!genres) {
        return <Loading />;
    }

    return (
        <GenreManagement
            genres={genres}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            setLoadList={setLoadList}
        />
    );
}

export default PromotionManagementPage;
