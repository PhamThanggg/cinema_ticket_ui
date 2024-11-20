import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './CinemaRoom.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { GetRoomTypeApi } from '~/service/RoomTypeService';
import { toast } from 'react-toastify';
import { CreateCinemaRoomApi } from '~/service/CinemaServiceRoom';
import { useAuth } from '~/components/Context/AuthContext';

const cx = classNames.bind(styles);

function CinemaRoom({ open, handleClose, cinemaId }) {
    const { state } = useAuth();
    const { token } = state;
    const [roomType, setRoomType] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        room_type: 0,
        status: 0,
        row: '',
        colunm: '',
    });

    useEffect(() => {
        const getRoomType = async () => {
            const res = await GetRoomTypeApi();
            if (res && res.result) {
                setRoomType(res.result);
            }
        };

        getRoomType();
    }, []);

    const validate = () => {
        if (!formData.name.trim()) {
            return 'Room name is required.';
        }
        if (formData.room_type === 0) {
            return 'Room type must be selected';
        }
        if (formData.status === undefined || formData.status === null) {
            return 'Status must be selected.';
        }
        if (!formData.row) {
            return 'Row is required.';
        }
        if (!formData.colunm) {
            return 'Colunm is required.';
        }
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'status' ? value : name === 'room_type' ? Number(value) : value,
        }));
    };

    const handleCreateCinema = async () => {
        if (validate()) {
            toast.warning(validate());
            return;
        }

        if (!cinemaId) {
            toast.warning('Cinema not found');
        }

        const data = {
            name_cinema_room: formData.name,
            status: formData.status,
            id_cinema: cinemaId,
            id_room_type: formData.room_type,
            row: formData.row,
            column: formData.colunm,
        };
        const res = await CreateCinemaRoomApi(data, token);

        if (res && res.result) {
            toast.success(res.message);
        }
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
                        maxWidth: '400px',
                        top: '-10%',
                        minHeight: '450px',
                    },
                },
            }}
        >
            <DialogContent className={cx('ctn-item')}>
                <button className={cx('btn-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={cx('title')}>Tạo phòng chiếu</div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Tên phòng chiếu</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập tên"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Chọn loại phòng:</label>
                        <select
                            className={cx('input', 'select')}
                            name="room_type"
                            value={formData.room_type}
                            onChange={handleChange}
                        >
                            <option key={0}>Chọn loại phòng</option>
                            {roomType &&
                                roomType.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Chọn trạng thái:</label>
                        <select
                            className={cx('input', 'select')}
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="0">Hoạt động</option>
                            <option value="1">Dừng hoạt động</option>
                            <option value="2">Đang bảo trì</option>
                        </select>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Nhập số ghế trong 1 hàng</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập số hàng"
                                name="row"
                                value={formData.row}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Nhập số ghế trong 1 cột</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập số cột"
                                name="colunm"
                                value={formData.colunm}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('btn_center')}>
                    <button className={cx('btn_save')} onClick={handleCreateCinema}>
                        Thêm mới
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CinemaRoom;
