import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './CinemaSeat.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { GetSeatRoomApi } from '~/service/SeatService';
import Loading from '~/components/Loading';
import CinemaSeatDetail from './CinemaSeatDetail';

const cx = classNames.bind(styles);

function CinemaSeat({ open, handleClose, roomId }) {
    const [seatData, setSeatData] = useState(null);

    useEffect(() => {
        const getRoomSeat = async () => {
            if (roomId) {
                const data = await GetSeatRoomApi(roomId);

                if (data && data.result) {
                    setSeatData(data.result);
                }
            }
        };

        getRoomSeat();
    }, [roomId]);

    if (seatData) {
        var groupedSeats = seatData.reduce((acc, seat) => {
            if (!acc[seat.row]) {
                acc[seat.row] = [];
            }

            acc[seat.row].push(seat);
            return acc;
        }, {});
    }

    // hiện dialog seat
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleLoginClick = (id) => {
        console.log('ID được truyền vào:', id);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    if (!seatData) {
        return <Loading />;
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                className={cx('wrapper')}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '1000px',
                            top: '-10%',
                            minHeight: '550px',
                        },
                    },
                }}
            >
                <DialogContent className={cx('ctn-item')}>
                    <button className={cx('btn-close')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    <div className={cx('title')}>Cập nhật ghế phòng chiếu</div>
                    <div className={cx('form')}>
                        <div className={cx('cinema-seat')}>
                            <div style={{ height: '10px' }}></div>

                            {Object.entries(groupedSeats).length > 0 &&
                                Object.entries(groupedSeats).map(([row, seats]) => (
                                    <div className={cx('seat-info')} key={row}>
                                        <div className={cx('column')}>{row}</div>
                                        <div className={cx('row')}>
                                            {seats.map((seat) => {
                                                return (
                                                    <button
                                                        className={cx('seat')}
                                                        key={seat.id}
                                                        onClick={() => handleLoginClick(seat.id)}
                                                    >
                                                        {seat.name}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <div className={cx('column')}>{row}</div>
                                    </div>
                                ))}

                            <div className={cx('screen')}>Màn hình</div>
                            <div className={cx('line')}></div>
                            <div className={cx('seat-status')}>
                                <div className={cx('ctn-status')}>
                                    <div className={cx('status')}>
                                        <div className={cx('status-color')}></div>
                                        <span className={cx('status-name')}>Ghế đã bán</span>
                                    </div>
                                    <div className={cx('status')}>
                                        <div className={cx('status-color', 'pink')}></div>
                                        <span className={cx('status-name')}>Ghế đang chọn</span>
                                    </div>
                                </div>

                                <div className={cx('seat-type')}>
                                    <div className={cx('type')}>
                                        <div className={cx('type-color')}></div>
                                        <span className={cx('type-name')}>Ghế đơn</span>
                                    </div>
                                    <div className={cx('type')}>
                                        <div className={cx('type-color', 'vip')}></div>
                                        <span className={cx('type-name')}>Ghế vip</span>
                                    </div>
                                    <div className={cx('type')}>
                                        <div className={cx('type-color', 'double')}></div>
                                        <span className={cx('type-name')}>Ghế đôi</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: '1px' }}></div>
                        </div>
                    </div>

                    <div className={cx('btn_center')}>
                        <button className={cx('btn_save')}>Lưu</button>
                    </div>
                </DialogContent>
            </Dialog>

            <CinemaSeatDetail open={isDialogOpen} handleClose={handleCloseDialog} />
        </div>
    );
}

export default CinemaSeat;
