import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetAllCinemaApi } from '~/service/CinemaApi';
import BookingManagement from '~/layouts/admin/BookingManagement';
import { GetInvoiceSearchApi } from '~/service/InvocieService';
import { useAuth } from '~/components/Context/AuthContext';

function BookingManagementPage() {
    const { state } = useAuth();
    const { token } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [cinemas, setCinema] = useState(null);
    const [invoices, setInvoices] = useState(null);

    useEffect(() => {
        removeQueryParams();
        getCinemaList();
    }, []);

    useEffect(() => {
        getInvoiceList();
    }, [currentPage, location]);

    const getCinemaList = async () => {
        const res = await GetAllCinemaApi();
        if (res) {
            setCinema(res.result);
        }
    };

    const removeQueryParams = () => {
        const currentParams = new URLSearchParams(location.search);

        currentParams.delete('movieName');
        currentParams.delete('invoiceId');
        currentParams.delete('status');
        currentParams.delete('cinema');
        currentParams.delete('date');

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

    const getInvoiceList = async () => {
        const movieName = queryParams.get('movieName');
        const invoiceId = queryParams.get('invoiceId');
        const status = queryParams.get('status');
        const cinemaId = queryParams.get('cinema');
        const date = queryParams.get('date');

        const data = {
            page: currentPage - 1,
            limit: 10,
            movieName: movieName || '',
            date: date || '',
            invoiceId: invoiceId && !isNaN(parseInt(invoiceId, 10)) ? parseInt(invoiceId, 10) : null,
            status: status ? parseInt(status, 10) - 1 : null,
            cinemaId: cinemaId ? parseInt(cinemaId, 10) : null,
        };

        const res = await GetInvoiceSearchApi(data, token);

        if (res) {
            setInvoices(res);
        }
    };

    return (
        <BookingManagement
            cinemas={cinemas}
            invoices={invoices}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
        />
    );
}

export default BookingManagementPage;
