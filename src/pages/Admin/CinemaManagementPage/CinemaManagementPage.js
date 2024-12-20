import { useEffect, useState } from 'react';
import CinemaManagement from '~/layouts/admin/CinemaManagement';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';
import { GetCinemaApi } from '~/service/CinemaService';

function CinemaManagementPage() {
    const [cinemas, setCinemas] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const status = queryParams.get('status');
    const areaId = queryParams.get('areaId');
    const name = queryParams.get('name');

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`?page=${newPage}`);
    };

    useEffect(() => {
        const getCinema = async () => {
            const res = await GetCinemaApi(name, status - 1, areaId, currentPage - 1, 10);
            if (res) {
                setCinemas(res);
            }
        };

        getCinema();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, location, status, areaId, name]);

    if (!cinemas) {
        return <Loading />;
    }

    return (
        <div>
            <CinemaManagement cinemas={cinemas} currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    );
}

export default CinemaManagementPage;
