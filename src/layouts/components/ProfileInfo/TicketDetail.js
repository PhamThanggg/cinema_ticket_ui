import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './TicketDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import { formatToApiTime, getDayOfWeek } from '~/utils/dateFormatter';
import { useEffect, useState } from 'react';
import { formatVND } from '~/utils/vndPrice';
import { useAuth } from '~/components/Context/AuthContext';
import { GetQRCodeApi } from '~/service/QRCodeService';

const cx = classNames.bind(styles);

function TicketDetail({ open, handleClose, ...props }) {
    const { state } = useAuth();
    const [vipTickets, setVipTickets] = useState([]);
    const [regularTickets, setRegularTickets] = useState([]);
    const [coupleTickets, setCoupleTickets] = useState([]);
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
        if (props.invoice) {
            filterTickets(props.invoice.tickets);
        }

        // qr
        const getQR = async () => {
            if (props.invoice) {
                const res = await GetQRCodeApi(props.invoice.id, props.invoice.id + '', state.token);
                if (res) {
                    const base64String = arrayBufferToBase64(res);
                    const qrCodeImage = `data:image/png;base64,${base64String}`;
                    setQrCode(qrCodeImage);
                }
            }
        };

        getQR();
    }, [props.invoice]);

    const arrayBufferToBase64 = (buffer) => {
        const binary = String.fromCharCode(...new Uint8Array(buffer));
        return window.btoa(binary);
    };

    const filterTickets = (tickets) => {
        const vip = tickets.filter((ticket) => ticket.cinemaSeat.seatType.id === 2);
        const regular = tickets.filter((ticket) => ticket.cinemaSeat.seatType.id === 1);
        const couple = tickets.filter((ticket) => ticket.cinemaSeat.seatType.id === 3);

        setVipTickets(vip);
        setRegularTickets(regular);
        setCoupleTickets(couple);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className={cx('wrapper')}
            sx={{
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        width: '100%',
                        maxWidth: '350px',
                        top: '0',
                        height: '100%',
                    },
                },
            }}
        >
            <DialogContent className={cx('ctn-item')}>
                <button className={cx('btn-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={cx('form')}>
                    <div className={cx('wr-icon')}>
                        <img
                            className={cx('icon-bd')}
                            src={props.invoice?.schedule?.movies?.images[0]?.imageUrl || ''}
                            alt=""
                        />
                    </div>
                    <div className={cx('title')}>{props.invoice?.schedule?.movies?.nameMovie}</div>
                    <div className={cx('title-pd')}>
                        2D phụ đề <span className={cx('age')}>T{props.invoice?.schedule?.movies?.ageLimit}</span>
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('order-detail')}>
                        <p className={cx('order-txt')}>
                            {props.invoice?.schedule?.cinemaRooms.cinema.name}{' '}
                            <span className={cx('order-cinema')}>- {props.invoice?.schedule?.cinemaRooms.name}</span>
                        </p>
                        <p className={cx('order-time')}>
                            Suất: {formatToApiTime(props.invoice?.schedule?.startTime)} -{' '}
                            <span>{getDayOfWeek(props.invoice?.schedule?.screeningDate)}</span>,{' '}
                            {props.invoice?.schedule?.screeningDate}
                        </p>
                        <p></p>
                    </div>
                    {qrCode && (
                        <div className={cx('img-qr')}>
                            <img className={cx('qr')} src={qrCode} alt="" />
                        </div>
                    )}
                    <div className={cx('line')}></div>
                    {regularTickets.length > 0 &&
                        regularTickets.map((data, index) => (
                            <div className={cx('seat')} key={index}>
                                Ghế thường: {data.cinemaSeat.name} {index + 1 < regularTickets.length && ', '}
                            </div>
                        ))}
                    {vipTickets.length > 0 &&
                        vipTickets.map((data, index) => (
                            <div className={cx('seat')} key={index}>
                                Ghế vip: {data.cinemaSeat.name} {index + 1 < regularTickets.length && ', '}
                            </div>
                        ))}
                    {coupleTickets.length > 0 &&
                        coupleTickets.map((data, index) => (
                            <div className={cx('seat')} key={index}>
                                Ghế đôi: {data.cinemaSeat.name} {index + 1 < regularTickets.length && ', '}
                            </div>
                        ))}
                    <div className={cx('line')}></div>
                    <div className={cx('id-price')}>
                        <div>Mã đơn hàng</div>
                        <div>Tổng tiền</div>
                    </div>
                    <div className={cx('id-price-detail')}>
                        <div>{props.invoice?.id}</div>
                        <div>{formatVND(props.invoice?.totalAmount)}</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default TicketDetail;
