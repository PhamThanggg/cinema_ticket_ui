import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './TicketDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';

const cx = classNames.bind(styles);

function TicketDetail({ open, handleClose }) {
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
                            src="https://cdn.galaxycine.vn/media/2024/8/5/pilot-500_1722847726956.jpg"
                            alt=""
                        />
                    </div>
                    <div className={cx('title')}>Chàng Nữ Phi Công</div>
                    <div className={cx('title-pd')}>
                        2D phụ đề <span className={cx('age')}>T16</span>
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('order-detail')}>
                        <p className={cx('order-txt')}>
                            Galaxy Huynh Tan Phat <span className={cx('order-cinema')}>- Rạp 4</span>
                        </p>
                        <p className={cx('order-time')}>
                            Suất: 14:00 - <span>thứ hai</span>, 02/09/2024
                        </p>
                        <p></p>
                    </div>
                    <div className={cx('img-qr')}>
                        <img
                            className={cx('qr')}
                            src="https://cdn.galaxycine.vn/media/qrcode/2024/9/21/qrcode_WR38KQW.png"
                            alt=""
                        />
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('seat')}>Ghế - F5, F6</div>
                    <div className={cx('line')}></div>
                    <div className={cx('id-price')}>
                        <div>Mã vé</div>
                        <div>Giá</div>
                    </div>
                    <div className={cx('id-price-detail')}>
                        <div>WR38KQW</div>
                        <div>210.000 ₫</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default TicketDetail;
