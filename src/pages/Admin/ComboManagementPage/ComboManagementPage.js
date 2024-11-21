import { useEffect, useState } from 'react';
import { GetItemApi } from '~/service/ItemService';
import { GetAllCinemaApi } from '~/service/CinemaApi';
import { useLocation } from 'react-router-dom';
import ComboManagement from '~/layouts/admin/ComboManagement';

function ComboManagementPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cinemaId = queryParams.get('cinema');

    const [combos, setCombos] = useState(null);
    const [cinemas, setCinemas] = useState(null);

    useEffect(() => {
        getCinemaList();
    }, []);

    useEffect(() => {
        getComboList();
    }, [cinemaId]);

    const getComboList = async () => {
        if (cinemaId) {
            const res = await GetItemApi(cinemaId);
            if (res) {
                setCombos(res.result);
            }
        }
    };

    const getCinemaList = async () => {
        const res = await GetAllCinemaApi();
        if (res) {
            setCinemas(res.result);
        }
    };
    return <ComboManagement combos={combos} cinemas={cinemas} />;
}

export default ComboManagementPage;
