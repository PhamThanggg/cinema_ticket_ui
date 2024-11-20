import classNames from 'classnames/bind';
import styles from './BookinSeat.module.scss';
import { useEffect, useState } from 'react';
import { deleteSeatStatus, GetSeatApi, updateSeatStatus } from '~/service/SeatService';
import Loading from '~/components/Loading';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { formatDateToCustomFormat } from '~/utils/dateFormatter';
import { useAuth } from '~/components/Context/AuthContext';
import { GetSeatSelectApi } from '~/service/SeatService';

const cx = classNames.bind(styles);

function BookingSeat({ seatData, setSeatData, selectedSeats, setSelectedSeats, account }) {
    const { state } = useAuth();
    const { token } = state;
    const [schedule, setSchedule] = useState(JSON.parse(localStorage.getItem('schedule')) || '');

    useEffect(() => {
        getRoomSeat();

        // Kết nối với WebSocket sử dụng SockJS và STOMP
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        // Kết nối STOMP
        stompClient.connect({}, () => {
            console.log('Connected to WebSocket');
            // Subscribe tới topic '/topic/seats'
            stompClient.subscribe('/topic/seats', (message) => {
                const updatedSeats = JSON.parse(message.body);

                // Cập nhật danh sách ghế
                setSeatData((prevSeatData) => {
                    return prevSeatData.map(
                        (seat) => updatedSeats.find((updatedSeat) => updatedSeat.id === seat.id) || seat,
                    );
                });
            });
        });

        // Cleanup WebSocket khi component bị hủy
        return () => {
            if (stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        const getSeatSelect = async () => {
            if (schedule && schedule.ScheduleId) {
                const data = await GetSeatSelectApi(schedule.ScheduleId, token);

                if (data && data.result) {
                    setSelectedSeats(data.result);
                }
            }
        };

        getSeatSelect();
    }, []);

    const getRoomSeat = async () => {
        if (schedule && schedule.ScheduleId) {
            const data = await GetSeatApi(schedule.ScheduleId);

            if (data && data.result) {
                setSeatData(data.result);
            }
        }
    };

    if (seatData) {
        var groupedSeats = seatData.reduce((acc, seat) => {
            if (!acc[seat.row]) {
                acc[seat.row] = [];
            }

            acc[seat.row].push(seat);
            return acc;
        }, {});
    }

    const handleSeatClick = (seat) => {
        // Kiểm tra ghế đã được chọn hay chưa
        if (selectedSeats.length > 0 && selectedSeats.some((selectedSeat) => selectedSeat.id === seat.id)) {
            // Nếu đã chọn thì bỏ chọn
            setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat.id !== seat.id));

            // Xóa chọn ghế;
            deleteSeatStatus(seat.id, schedule.ScheduleId, token);
            if (!selectedSeats || selectedSeats.length === 1) {
                localStorage.removeItem('timestamp');
            }
        } else {
            // Nếu chưa chọn thì thêm vào danh sách
            setSelectedSeats([...selectedSeats, seat]);
            // cập nhật chọn ghế
            const now = new Date();
            const reservationTime = formatDateToCustomFormat(now);
            const date = new Date(Number(localStorage.getItem('timestamp')));
            let expiryTime = formatDateToCustomFormat(date);
            if (date < now) {
                const newExpiry = new Date(now.getTime() + 10 * 60 * 1000);
                expiryTime = formatDateToCustomFormat(newExpiry);
            }
            console.log(expiryTime);
            const seatIds = [];
            seatIds.push(seat.id);

            const data = {
                userId: account.id,
                seatIds: seatIds,
                scheduleId: schedule.ScheduleId,
                status: 0,
                reservation_time: reservationTime,
                expiry_time: expiryTime,
            };
            updateSeatStatus(data, token);
        }
    };

    if (!seatData) {
        return <Loading />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div className={cx('time')}>
                    <div className={cx('title-time')}>Đổi suất chiếu</div>
                    <button className={cx('btn-time')}>10:00</button>
                </div>
            </div>

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
                                            className={cx(
                                                'seat',
                                                {
                                                    active:
                                                        selectedSeats.length > 0 &&
                                                        selectedSeats.some(
                                                            (selectedSeat) => selectedSeat.id === seat.id,
                                                        ),
                                                },
                                                {
                                                    active_buy:
                                                        seat.seatReservations.length > 0 &&
                                                        seat.seatReservations[0].status === 1,
                                                },
                                                {
                                                    select:
                                                        seat.seatReservations.length > 0 &&
                                                        seat.seatReservations[0].status === 0 &&
                                                        seat.seatReservations[0].userId !== account.id &&
                                                        new Date(seat.seatReservations[0].expiry_time).getTime() >
                                                            new Date().getTime(),
                                                },
                                                {
                                                    active:
                                                        seat.seatReservations.length > 0 &&
                                                        seat.seatReservations[0].status === 0 &&
                                                        seat.seatReservations[0].userId === account.id &&
                                                        new Date(seat.seatReservations[0].expiry_time).getTime() >
                                                            new Date().getTime(),
                                                },
                                            )}
                                            key={seat.id}
                                            onClick={() => handleSeatClick(seat)}
                                            disabled={
                                                seat.seatReservations.length > 0 &&
                                                ((seat.seatReservations[0].userId !== account.id &&
                                                    seat.seatReservations[0].status === 0) ||
                                                    seat.seatReservations[0].status === 1)
                                            }
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
    );
}

export default BookingSeat;
