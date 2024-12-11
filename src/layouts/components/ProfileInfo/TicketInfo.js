import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';
import { useEffect, useState } from 'react';
import TicketDetail from './TicketDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '~/components/Context/AuthContext';
import { GetInvoiceApi } from '~/service/InvocieService';
import Loading from '~/components/Loading';
import PaginationS from '~/components/Pagination';
import { formatToApiTime, getDayOfWeek } from '~/utils/dateFormatter';
const cx = classNames.bind(styles);

function TicketInfo() {
    const { state } = useAuth();
    const { token } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [invoiceDetail, setInvoiceDetail] = useState(null);

    useEffect(() => {
        const getSeatSelect = async () => {
            const data = await GetInvoiceApi(currentPage - 1, 3, token);

            if (data) {
                setInvoice(data);
            }
        };
        setLoading(true);
        getSeatSelect();
        setLoading(false);
    }, [currentPage, location]);

    const handlePageChange = (newPage) => {
        queryParams.set('page', newPage);

        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const handleTicketDetailClick = (invoice) => {
        setInvoiceDetail(invoice);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setInvoiceDetail(null);
        setDialogOpen(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <TicketDetail open={isDialogOpen} handleClose={handleCloseDialog} invoice={invoiceDetail} />

            <div className={cx('rounded')}>
                {invoice &&
                    invoice.result &&
                    invoice.result.map((data, index) => (
                        <div className={cx('card__item__ticket')} key={index}>
                            <img
                                className={cx('image-card')}
                                alt=""
                                width="65"
                                height="72"
                                src={data?.schedule?.movies?.images[0]?.imageUrl || ''}
                            />
                            <div className={cx('item__detail')}>
                                <div className={cx('title__content')}>
                                    <h5 className={cx('text-base')}>{data?.schedule?.movies?.nameMovie || ''} </h5>
                                    <p className={cx('item__title')}>
                                        <span className={cx('title-txt')}>2D Phụ Đề</span>
                                        <span className={cx('title-block')}>
                                            T{data?.schedule?.movies?.ageLimit || ''}
                                        </span>
                                    </p>
                                </div>
                                <div className={cx('order')}>
                                    <div className={cx('order-detail')}>
                                        <p className={cx('order-txt')}>
                                            {data?.schedule?.cinemaRooms.cinema.name}{' '}
                                            <span className={cx('order-cinema')}>
                                                - {data?.schedule?.cinemaRooms.name}
                                            </span>
                                        </p>
                                        <p className={cx('order-time')}>
                                            {formatToApiTime(data?.schedule?.startTime)} -{' '}
                                            <span>{getDayOfWeek(data?.schedule?.screeningDate)}</span>,{' '}
                                            {data?.schedule?.screeningDate}
                                        </p>
                                        <p></p>
                                    </div>
                                    <span className={cx('order-btn')} onClick={() => handleTicketDetailClick(data)}>
                                        Chi tiết
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                <div className={cx('pagination')}>
                    <PaginationS
                        currentPage={currentPage}
                        totalPages={invoice?.totalPages || 0}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default TicketInfo;
