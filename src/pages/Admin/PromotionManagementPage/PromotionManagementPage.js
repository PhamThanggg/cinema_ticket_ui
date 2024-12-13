import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '~/components/Context/AuthContext';
import Loading from '~/components/Loading';
import PromotionManagement from '~/layouts/admin/PromotionManagement';
import { PromotionSearchApi } from '~/service/PromotionService';

function PromotionManagementPage() {
    const { state } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [promotions, setPromotions] = useState(null);
    const [loadList, setLoadList] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPromotionList();
        setLoading(false);
    }, [currentPage, location, loadList]);

    const handlePageChange = (newPage) => {
        queryParams.set('page', newPage);

        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const getPromotionList = async () => {
        const name = queryParams.get('name');
        const promotionType = queryParams.get('promotionType');
        const status = queryParams.get('status');

        const data = {
            page: currentPage - 1,
            limit: 10,
            name: name || '',
            promotionType: promotionType || '',
            status: status || null,
        };

        const res = await PromotionSearchApi(data, state.token);

        if (res) {
            setPromotions(res);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <PromotionManagement
            promotions={promotions}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            setLoadList={setLoadList}
        />
    );
}

export default PromotionManagementPage;
