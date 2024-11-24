import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '~/components/Context/AuthContext';
import UserManagement from '~/layouts/admin/UserManagement';
import { getUserSearchApi } from '~/service/UserAPI';

function UserManagementPage() {
    const { state } = useAuth();
    const { token } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        removeQueryParams();
    }, []);

    useEffect(() => {
        getCinemaList();
    }, [currentPage, location]);

    const getCinemaList = async () => {
        const name = queryParams.get('name');
        const email = queryParams.get('email');
        const data = {
            page: currentPage - 1,
            limit: 10,
            name: name || '',
            email: email || '',
        };
        const res = await getUserSearchApi(data, token);

        if (res) {
            setUsers(res);
        }
    };

    const removeQueryParams = () => {
        const currentParams = new URLSearchParams(location.search);

        currentParams.delete('fullname');
        currentParams.delete('email');

        navigate(
            {
                pathname: location.pathname,
                search: currentParams.toString(),
            },
            { replace: true },
        );
    };

    const handlePageChange = (newPage) => {
        queryParams.set('page', newPage);

        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    return <UserManagement users={users} currentPage={currentPage} handlePageChange={handlePageChange} />;
}

export default UserManagementPage;
