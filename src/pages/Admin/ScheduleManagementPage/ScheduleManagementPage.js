import ScheduleManagement from '~/layouts/admin/ScheduleManagement';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetAllCinemaApi } from '~/service/CinemaApi';
import { GetAllCinemaRoomApi } from '~/service/CinemaServiceRoom';

function ScheduleManagementPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [cinemas, setCinema] = useState(null);
    const [rooms, setRooms] = useState(null);
    const cinemaId = queryParams.get('cinema');

    useEffect(() => {
        getCinemaList();
    }, []);

    useEffect(() => {
        getCinemaRoomList();
    }, [cinemaId]);

    const getCinemaList = async () => {
        const res = await GetAllCinemaApi();
        if (res) {
            setCinema(res.result);
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

    return <ScheduleManagement cinemas={cinemas} rooms={rooms} />;
}

export default ScheduleManagementPage;
