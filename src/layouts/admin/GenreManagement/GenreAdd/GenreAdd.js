import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './GenreAdd.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function GenreAdd({ open, handleClose }) {
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
                        minHeight: '250px',
                    },
                },
            }}
        >
            <DialogContent className={cx('ctn-item')}>
                <button className={cx('btn-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={cx('title')}>Tạo thể loại</div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Tên thể loại</label>
                        <div className={cx('input')}>
                            <input className={cx('input-txt')} type="text" placeholder="Nhập tên" />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Chọn trạng thái:</label>
                        <select className={cx('input', 'select')}>
                            <option value="1">Area 1</option>
                            <option value="2">Area 2</option>
                            <option value="3">Area 3</option>
                            <option value="3">Area 3</option>
                            <option value="3">Area 3</option>
                            <option value="3">Area 3</option>
                        </select>
                    </div>
                </div>

                <div className={cx('btn_center')}>
                    <button className={cx('btn_close')}>Hủy</button>

                    <button className={cx('btn_save')}>Lưu</button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default GenreAdd;
