import ScheduleManagement from '~/layouts/admin/ScheduleManagement';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetAllCinemaApi } from '~/service/CinemaApi';
import { GetAllCinemaRoomApi } from '~/service/CinemaServiceRoom';
import { GetAreaApi } from '~/service/AreaService';
import { GetCinemaAreaApi } from '~/service/CinemaService';

function ScheduleManagementPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [areas, setAreas] = useState(null);
    const [cinemas, setCinema] = useState(null);
    const [rooms, setRooms] = useState(null);
    const cinemaId = queryParams.get('cinema');
    const areaId = queryParams.get('area');

    useEffect(() => {
        removeQueryParams();
        getAreaList();
        getCinemaList();
    }, []);

    useEffect(() => {
        getCinemaAreaList();
    }, [areaId]);

    useEffect(() => {
        getCinemaRoomList();
    }, [cinemaId]);

    const getAreaList = async () => {
        const res = await GetAreaApi();
        if (res) {
            setAreas(res.result);
        }
    };

    const getCinemaList = async () => {
        const res = await GetAllCinemaApi();
        if (res) {
            setCinema(res.result);
        }
    };

    const getCinemaAreaList = async () => {
        if (areaId) {
            const res = await GetCinemaAreaApi(areaId);
            if (res) {
                setCinema(res.result);
            }
        } else {
            getCinemaList();
        }
    };

    const getCinemaRoomList = async () => {
        if (cinemaId) {
            const res = await GetAllCinemaRoomApi(cinemaId);

            if (res) {
                setRooms(res.result);
                queryParams.delete('roomId');
                navigate(`${location.pathname}?${queryParams.toString()}`);
            }
        }
    };

    const removeQueryParams = () => {
        queryParams.delete('cinema');
        queryParams.delete('screeningDate');
        queryParams.delete('area');
        queryParams.delete('roomId');

        navigate(
            {
                pathname: location.pathname,
            },
            { replace: true },
        );
    };

    return <ScheduleManagement areas={areas} cinemas={cinemas} rooms={rooms} />;
}

export default ScheduleManagementPage;
