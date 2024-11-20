import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './CinemaSeatDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CinemaSeatDetail({ open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className={cx('wrapper')}
            sx={{
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        width: '100%',
                        maxWidth: '400px',
                        top: '-10%',
                        minHeight: '450px',
                    },
                },
            }}
            s
        >
            <DialogContent className={cx('ctn-item')}>
                <button className={cx('btn-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={cx('title')}>Sửa thông tin ghế</div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Tên ghế</label>
                        <div className={cx('input')}>
                            <input className={cx('input-txt')} type="text" placeholder="Nhập tên" value={''} />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Chọn loại Ghế:</label>
                        <select className={cx('input', 'select')}>
                            <option value="1">Area 1</option>
                            <option value="2">Area 2</option>
                            <option value="3">Area 3</option>
                        </select>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Chọn trạng thái ghế:</label>
                        <select className={cx('input', 'select')}>
                            <option value="1">Area 1</option>
                            <option value="2">Area 2</option>
                            <option value="3">Area 3</option>
                        </select>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Hàng</label>
                        <div className={cx('input')}>
                            <input className={cx('input-txt')} type="text" placeholder="Nhập tên hàng" value={''} />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Cột</label>
                        <div className={cx('input')}>
                            <input className={cx('input-txt')} type="text" placeholder="Nhập tên cột" value={''} />
                        </div>
                    </div>
                </div>

                <div className={cx('btn_center')}>
                    <button className={cx('btn_save')}>Lưu</button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CinemaSeatDetail;
