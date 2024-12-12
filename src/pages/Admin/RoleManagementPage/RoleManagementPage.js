import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '~/components/Context/AuthContext';
import RoleManagement from '~/layouts/admin/RoleManagement';
import { GetPermissionApi, RoleSearchApi } from '~/service/RolePremissionService';

function RoleManagementPage() {
    const { state } = useAuth();
    const { token } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const [role, setRole] = useState(null);
    const [permissions, setPermissions] = useState(null);
    const [loadList, setLoadList] = useState(true);

    useEffect(() => {
        getRole();
    }, [currentPage, location, loadList]);

    useEffect(() => {
        getPermission();
    }, []);

    const getRole = async () => {
        const name = queryParams.get('name');
        const data = {
            page: currentPage - 1,
            limit: 10,
            name: name || '',
        };

        const res = await RoleSearchApi(data, token);
        if (res) {
            setRole(res);
        }
    };

    const getPermission = async () => {
        const res = await GetPermissionApi(token);
        if (res) {
            setPermissions(res.result);
        }
    };

    const handlePageChange = (newPage) => {
        queryParams.set('page', newPage);

        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    return (
        <RoleManagement
            roles={role}
            permissions={permissions}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            setLoadList={setLoadList}
        />
    );
}

export default RoleManagementPage;
