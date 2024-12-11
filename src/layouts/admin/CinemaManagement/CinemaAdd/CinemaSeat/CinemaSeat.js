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
    const [seat, setSeat] = useState(null);
    const [groupedSeats, setGroupedSeats] = useState({});

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

    useEffect(() => {
        if (seatData) {
            const grouped = seatData.reduce((acc, seat) => {
                if (!acc[seat.row]) {
                    acc[seat.row] = [];
                }

                acc[seat.row].push(seat);
                return acc;
            }, {});

            setGroupedSeats(grouped);
        }
    }, [seatData]);

    // hiện dialog seat
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleLoginClick = (seat) => {
        setSeat(seat);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSeat(null);
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
                            zIndex: 1000,
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
                                                return seat.status === 1 ? (
                                                    <button
                                                        className={cx(
                                                            'seat',
                                                            seat.seatType.id === 2
                                                                ? 'vip'
                                                                : seat.seatType.id === 3
                                                                ? 'double'
                                                                : '',
                                                        )}
                                                        key={seat.id}
                                                        onClick={() => handleLoginClick(seat)}
                                                    >
                                                        {seat.seatType.id === 3 ? 'x-y' : seat.name}
                                                    </button>
                                                ) : seat.status === 2 ? (
                                                    <button
                                                        className={cx('seat-space')}
                                                        key={seat.id}
                                                        onClick={() => handleLoginClick(seat)}
                                                    >
                                                        --
                                                    </button>
                                                ) : (
                                                    <button
                                                        className={cx('seat-space')}
                                                        key={seat.id}
                                                        onClick={() => handleLoginClick(seat)}
                                                    >
                                                        X
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
                                    <div className={cx('status')}>
                                        <div> -- </div>
                                        <span className={cx('status-name')}>Khoảng trắng</span>
                                    </div>
                                    <div className={cx('status')}>
                                        <div>X</div>
                                        <span className={cx('status-name')}>Ghế bị xóa</span>
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
                                        <div className={cx('type-color', 'double')}>x - y</div>
                                        <span className={cx('type-name')}>Ghế đôi</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: '1px' }}></div>
                        </div>
                    </div>

                    <div className={cx('btn_center')}>
                        <button className={cx('btn_save')} onClick={() => handleLoginClick(null)}>
                            Thêm ghế
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            <CinemaSeatDetail
                open={isDialogOpen}
                handleClose={handleCloseDialog}
                setSeatData={setSeatData}
                seat={seat}
                roomId={roomId}
                handleCloseDialog={handleCloseDialog}
            />
        </div>
    );
}

export default CinemaSeat;
