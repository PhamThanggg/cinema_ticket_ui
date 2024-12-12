import classNames from 'classnames/bind';
import styles from './BookinSeat.module.scss';
import { useEffect, useState } from 'react';
import { deleteSeatStatus, GetSeatApi, GetSeatBoughtApi, updateSeatStatus } from '~/service/SeatService';
import Loading from '~/components/Loading';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { formatDateToCustomFormat } from '~/utils/dateFormatter';
import { useAuth } from '~/components/Context/AuthContext';
import { GetSeatSelectApi } from '~/service/SeatService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function BookingSeat({ seatData, setSeatData, selectedSeats, setSelectedSeats, account }) {
    const { state } = useAuth();
    const { token } = state;
    const [schedule, setSchedule] = useState(JSON.parse(localStorage.getItem('schedule')) || '');
    const [selectedSeatBought, setSelectedSeatBought] = useState([]);
    const [selectedSeatAll, setSelectedSeatAll] = useState([]);

    useEffect(() => {
        getRoomSeat();

        // Kết nối với WebSocket sử dụng SockJS và STOMP
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        // Kết nối STOMP
        stompClient.connect({}, () => {
            console.log('Connected to WebSocket');
            stompClient.subscribe('/topic/seats', (message) => {
                const updatedSeats = JSON.parse(message.body);
                console.log(updatedSeats);
                setSeatData((prevSeatData) => {
                    return prevSeatData.map(
                        (seat) => updatedSeats.find((updatedSeat) => updatedSeat.id === seat.id) || seat,
                    );
                });
                setSelectedSeatAll((prevSeatAll) =>
                    prevSeatAll.filter(
                        (selectedSeat) => !updatedSeats.some((updatedSeat) => updatedSeat.id === selectedSeat.id),
                    ),
                );
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
                const data = await GetSeatSelectApi(schedule.ScheduleId, 0, token);
                const data2 = await GetSeatBoughtApi(schedule.ScheduleId, 1, token);

                if (data && data.result) {
                    setSelectedSeatAll(data.result);
                }
                if (data2 && data2.result) {
                    setSelectedSeatBought(data2.result);
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

    const handleSeatClick = async (seat) => {
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
            if (selectedSeats && selectedSeats.length >= 20) {
                toast.warning('Bạn chỉ được chọn tối đa 20 ghế trong 1 lần đặt!');
                return;
            }
            const now = new Date();
            const reservationTime = formatDateToCustomFormat(now);
            const date = new Date(Number(localStorage.getItem('timestamp')));
            let expiryTime = formatDateToCustomFormat(date);
            if (date < now) {
                const newExpiry = new Date(now.getTime() + 10 * 60 * 1000);
                expiryTime = formatDateToCustomFormat(newExpiry);
            }
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
            const res = await updateSeatStatus(data, token);
            if (res && res.result) {
                if (Array.isArray(res.result)) {
                    setSelectedSeats([...selectedSeats, ...res.result]);
                } else if (res) {
                    setSelectedSeats([...selectedSeats, res.result]);
                }
            }
        }
    };

    if (!seatData) {
        return <Loading />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div className={cx('time')}>
                    <div className={cx('title-time')}>Chọn ghế</div>
                    {/* <button className={cx('btn-time')}>10:00</button> */}
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
                                    return seat.status === 1 ? (
                                        <button
                                            className={cx(
                                                'seat',
                                                seat.seatType.id === 2 ? 'vip' : seat.seatType.id === 3 ? 'double' : '',
                                                {
                                                    active:
                                                        selectedSeats.length > 0 &&
                                                        selectedSeats.some(
                                                            (selectedSeat) => selectedSeat.id === seat.id,
                                                        ),
                                                },
                                                {
                                                    active_buy:
                                                        selectedSeatBought.length > 0 &&
                                                        selectedSeatBought.some(
                                                            (selectedSeat) =>
                                                                selectedSeat.seatReservations.status === 1 &&
                                                                selectedSeat.id === seat.id,
                                                        ),
                                                },
                                                {
                                                    select:
                                                        selectedSeatAll.length > 0 &&
                                                        selectedSeatAll.some(
                                                            (selectedSeat) =>
                                                                selectedSeat.seatReservations.status === 0 &&
                                                                selectedSeat.seatReservations.userId !== account.id &&
                                                                selectedSeat.id === seat.id &&
                                                                new Date(
                                                                    selectedSeat.seatReservations.expiry_time,
                                                                ).getTime() > new Date().getTime(),
                                                        ),
                                                },
                                                {
                                                    select:
                                                        seat.seatReservations &&
                                                        seat.seatReservations.status === 0 &&
                                                        seat.seatReservations.userId !== account.id &&
                                                        new Date(seat.seatReservations.expiry_time).getTime() >
                                                            new Date().getTime(),
                                                },
                                                {
                                                    active:
                                                        selectedSeats.length > 0 &&
                                                        selectedSeats.some(
                                                            (selectedSeat) =>
                                                                selectedSeat.seatReservations.status === 0 &&
                                                                selectedSeat.seatReservations.userId === account.id &&
                                                                selectedSeat.id === seat.id &&
                                                                new Date(
                                                                    selectedSeat.seatReservations.expiry_time,
                                                                ).getTime() > new Date().getTime(),
                                                        ),
                                                },
                                            )}
                                            key={seat.id}
                                            onClick={() => handleSeatClick(seat)}
                                            disabled={
                                                (selectedSeatAll.length > 0 &&
                                                    selectedSeatAll.some(
                                                        (selectedSeat) =>
                                                            selectedSeat.seatReservations.status === 0 &&
                                                            selectedSeat.seatReservations.userId !== account.id &&
                                                            selectedSeat.id === seat.id &&
                                                            new Date(
                                                                selectedSeat.seatReservations.expiry_time,
                                                            ).getTime() > new Date().getTime(),
                                                    )) ||
                                                (selectedSeatBought.length > 0 &&
                                                    selectedSeatBought.some(
                                                        (selectedSeat) =>
                                                            selectedSeat.seatReservations.status === 1 &&
                                                            selectedSeat.id === seat.id,
                                                    ))
                                            }
                                        >
                                            {seat.name}
                                        </button>
                                    ) : seat.status === 2 ? (
                                        <button className={cx('seat-space')} key={seat.id}></button>
                                    ) : (
                                        ''
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
