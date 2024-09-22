import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import TicketDetail from './TicketDetail';
import PaginationItem from '@mui/material/PaginationItem';

const cx = classNames.bind(styles);

function TicketInfo() {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleTicketDetailClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <TicketDetail open={isDialogOpen} handleClose={handleCloseDialog} />

            <div className={cx('rounded')}>
                <div className={cx('card__item__ticket')}>
                    <img
                        className={cx('image-card')}
                        alt=""
                        width="65"
                        height="72"
                        src="https://cdn.galaxycine.vn/media/2024/8/5/pilot-500_1722847726956.jpg"
                    />
                    <div className={cx('item__detail')}>
                        <div className={cx('title__content')}>
                            <h5 className={cx('text-base')}>Chàng Nữ Phi Công </h5>
                            <p className={cx('item__title')}>
                                <span className={cx('title-txt')}>2D Phụ Đề</span>
                                <span className={cx('title-block')}>T13</span>
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

                <div className={cx('pagination')}>
                    <Stack spacing={2}>
                        <Pagination
                            count={100}
                            size="large"
                            renderItem={(item) => (item.page === 5 ? null : <PaginationItem {...item} />)}
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
