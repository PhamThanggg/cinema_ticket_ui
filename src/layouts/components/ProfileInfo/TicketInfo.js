import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import TicketDetail from './TicketDetail';
import PaginationItem from '@mui/material/PaginationItem';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const cx = classNames.bind(styles);

function TicketInfo({ invoiceData }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleTicketDetailClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    console.log(invoiceData);

    return (
        <div>
            <TicketDetail open={isDialogOpen} handleClose={handleCloseDialog} />

            <div className={cx('rounded')}>
                {invoiceData &&
                    invoiceData.map((data, index) => (
                        <div className={cx('card__item__ticket')}>
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
                                            Galaxy Huynh Tan Phat <span className={cx('order-cinema')}>- Rạp 4</span>
                                        </p>
                                        <p className={cx('order-time')}>
                                            14:00 - <span>thứ hai</span>, 02/09/2024
                                        </p>
                                        <p></p>
                                    </div>
                                    <span className={cx('order-btn')} onClick={handleTicketDetailClick}>
                                        Chi tiết
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                <div className={cx('pagination')}>
                    <Stack spacing={2}>
                        <Pagination
                            count={100}
                            size={isMobile ? 'small' : 'large'}
                            renderItem={(item) => <PaginationItem {...item} />}
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    fontSize: {
                                        xs: '12px',
                                        sm: '14px',
                                        md: '16px',
                                    },
                                    '& svg': {
                                        fontSize: {
                                            xs: '16px',
                                            sm: '18px',
                                            md: '20px',
                                        },
                                    },
                                    margin: '0 0px',
                                },
                            }}
                        />
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default TicketInfo;
