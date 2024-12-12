import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';
import AreaManagement from '~/layouts/admin/AreaManagement';
import { AreaSearchApi } from '~/service/AreaService';

function AreaManagementPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [areas, setAreas] = useState(null);
    const [loadList, setLoadList] = useState(true);

    useEffect(() => {
        getAreaList();
    }, [currentPage, location, loadList]);

    const handlePageChange = (newPage) => {
        queryParams.set('page', newPage);

        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const getAreaList = async () => {
        const name = queryParams.get('name');

        const data = {
            page: currentPage - 1,
            limit: 10,
            name: name || '',
        };

        const res = await AreaSearchApi(data);

        if (res) {
            setAreas(res);
        }
    };

    if (!areas) {
        return <Loading />;
    }

    return (
        <AreaManagement
            areas={areas}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            setLoadList={setLoadList}
        />
    );
}

export default AreaManagementPage;
