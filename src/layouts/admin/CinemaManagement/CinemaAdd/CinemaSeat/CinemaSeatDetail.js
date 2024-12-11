import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './CinemaSeatDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '~/components/Context/AuthContext';
import { toast } from 'react-toastify';
import { CreateSeat, DeleteSeat, UpdateSeat } from '~/service/SeatService';
import { confirmAction } from '~/components/ConfirmAction/ConfirmAction';

const cx = classNames.bind(styles);

function CinemaSeatDetail({ open, handleClose, ...props }) {
    const { state } = useAuth();
    const { token } = state;
    const [formData, setFormData] = useState({
        name: '',
        seatType: 1,
        status: 1,
        row: '',
        column: '',
    });

    useEffect(() => {
        const getSeat = async () => {
            if (props.seat) {
                setFormData({
                    name: props.seat.name,
                    seatType: props.seat.seatType.id,
                    status: props.seat.status,
                    row: props.seat.row,
                    column: props.seat.colum,
                });
            } else {
                setFormData({
                    name: '',
                    seatType: 1,
                    status: 1,
                    row: '',
                    column: '',
                });
            }
        };

        getSeat();
    }, [props.seat]);

    const validate = () => {
        if (!formData.name.trim()) {
            return 'Tên ghế là bắt buộc.';
        }
        if (formData.seatType === undefined || formData.seatType === null) {
            return 'Vui lòng chọn loại ghế.';
        }
        if (formData.status === undefined || formData.status === null) {
            return 'Vui lòng chọn trạng thái ghế.';
        }
        if (!formData.row.trim()) {
            return 'Tên hàng là bắt buộc.';
        }
        if (!formData.column.trim()) {
            return 'Tên cột là bắt buộc.';
        }

        return null;
    };

    const handleAddClick = async () => {
        if (validate()) {
            toast.warning(validate());
            return;
        }

        const data = {
            name_seat: formData.name,
            id_seat_type: formData.seatType,
            status: formData.status,
            row_seat: formData.row,
            column_seat: formData.column,
            id_cinema_room: props.roomId,
        };

        if (props.seat) {
            const updatedSeat = await UpdateSeat(data, props.seat.id, token);
            if (updatedSeat) {
                props.setSeatData((prevList) =>
                    prevList.map((seat) => (seat.id === updatedSeat.result.id ? updatedSeat.result : seat)),
                );

                toast.success('Cập nhật thành công');
            }
        } else {
            const res = await CreateSeat(data, token);
            if (res) {
                props.setSeatData((prevList) => [...prevList, res.result]);
                toast.success('Thêm ghế thành công');
                props.handleCloseDialog();
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'status' ? value : name === 'seatType' ? Number(value) : value,
        }));
    };

    const handleDeleteClick = async () => {
        if (props.seat && props.seat.id) {
            const confirm = await confirmAction();
            if (confirm) {
                const res = await DeleteSeat(props.seat.id, token);
                if (res) {
                    props.setSeatData((prevList) => prevList.filter((seat) => seat.id !== props.seat.id));
                    toast.success('Xóa ghế thành công');
                    props.handleCloseDialog();
                }
            }
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
                        zIndex: 1001,
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
                <div className={cx('title_ctn_glb')}>
                    <div className={cx('title')}>{props.seat ? 'Sửa thông tin ghế' : 'Thêm ghế'}</div>
                    <div className={cx('star_title_glb')}>
                        (dấu <span className={cx('star_css_glb')}>*</span> là trường bắt buộc)
                    </div>
                </div>

                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Tên ghế <span className={cx('star_css_glb')}>*</span>
                        </label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập tên"
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Chọn loại Ghế: <span className={cx('star_css_glb')}>*</span>
                        </label>
                        <select
                            className={cx('input', 'select')}
                            name="seatType"
                            value={formData.seatType}
                            onChange={handleChange}
                        >
                            <option value="1">Ghế thường</option>
                            <option value="2">Ghế vip</option>
                            <option value="3">Ghế đôi</option>
                        </select>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Chọn trạng thái ghế: <span className={cx('star_css_glb')}>*</span>
                        </label>
                        <select
                            className={cx('input', 'select')}
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="1">Hoạt động</option>
                            <option value="2">Khoảng trắng</option>
                            <option value="3">Xóa mềm</option>
                        </select>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Hàng <span className={cx('star_css_glb')}>*</span>
                        </label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập tên hàng"
                                name="row"
                                value={formData.row}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Cột <span className={cx('star_css_glb')}>*</span>
                        </label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                placeholder="Nhập tên cột"
                                name="column"
                                value={formData.column}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('btn_center')}>
                    <button className={cx('btn_save')} onClick={handleAddClick}>
                        Lưu
                    </button>
                    {props.seat && props.seat.id && (
                        <button className={cx('btn_delete')} onClick={handleDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} className={cx('icon_btn')} />
                            Xóa ghế
                        </button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CinemaSeatDetail;
