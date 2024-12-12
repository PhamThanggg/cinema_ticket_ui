import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './RoleAdd.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '~/components/Context/AuthContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { CreateRoleApi, UpdateRoleApi } from '~/service/RolePremissionService';

const cx = classNames.bind(styles);

function RoleAdd({ open, handleClose, ...props }) {
    const { state } = useAuth();
    const [role, setRole] = useState([]);
    const [permissionSelected, setPermissionSelected] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        des: '',
    });

    console.log(props.role);
    useEffect(() => {
        if (props.role) {
            setFormData({
                name: props.role.name,
                des: props.role.description,
            });
            if (props.role.permissions.length > 0) {
                setPermissionSelected(
                    props.role.permissions.map((permission) => ({ value: permission.id, label: permission.name })),
                );
            }
        } else {
            setFormData({
                name: '',
                des: '',
            });
            setPermissionSelected([]);
        }
    }, [props.role]);

    const validate = () => {
        if (!formData.name.trim()) {
            return 'Tên vai trò là bắt buộc.';
        }

        return null;
    };

    const handleSave = async () => {
        if (validate()) {
            toast.warning(validate());
            return;
        }

        const data = {
            name: formData.name,
            description: formData.des,
            permissionIds: permissionSelected.map((role) => role.value),
        };

        if (props.role) {
            const res = await UpdateRoleApi(props.role.id, data, state.token);
            if (res) {
                props.setLoadList((prev) => !prev);
                toast.success('Cập nhật thành công');
            }
        } else {
            const res = await CreateRoleApi(data, state.token);
            if (res) {
                props.setLoadList((prev) => !prev);
                toast.success('Thêm thành công');
            }
        }
    };

    const handleChangeRole = (selected) => {
        setPermissionSelected(selected);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'status' ? value : name === 'area_id' ? Number(value) : value,
        }));
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
                        maxWidth: '1000px',
                        top: '0%',
                        minHeight: '250px',
                    },
                },
            }}
        >
            <DialogContent className={cx('ctn-item')}>
                <button className={cx('btn-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={cx('title')}>Thêm vai trò</div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>
                            Tên vai trò <span className={cx('star_css_glb')}>*</span>
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
                        <label className={cx('label')}>Chọn quyền:</label>
                        <Select
                            id="role"
                            name="role"
                            options={
                                props.permissions &&
                                props.permissions.map((actor) => ({
                                    value: actor.id,
                                    label: actor.name,
                                }))
                            }
                            isMulti
                            value={permissionSelected}
                            onChange={handleChangeRole}
                            placeholder="Tìm kiếm và chọn..."
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                    </div>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Mô tả</label>
                        <div className={cx('input')}>
                            <input
                                className={cx('input-txt')}
                                type="text"
                                name="des"
                                value={formData.des}
                                onChange={handleChange}
                                placeholder="Nhập mô tả"
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('btn_center')}>
                    <button className={cx('btn_close')} onClick={handleClose}>
                        Hủy
                    </button>

                    <button className={cx('btn_save')} onClick={handleSave}>
                        Lưu
                    </button>
                </div>

                <TableContainer component={Paper} className={cx('margin')}>
                    <div style={{ fontSize: '15px' }}>Danh sách quyền hệ thống</div>
                    <Table>
                        <TableHead>
                            <TableRow className={cx('bgr')}>
                                <TableCell className={cx('stt')}>
                                    <div className={cx('title_tb')}>STT</div>
                                </TableCell>
                                <TableCell>
                                    <div className={cx('title_tb')}>Tên vai trò</div>
                                </TableCell>
                                <TableCell>
                                    <div className={cx('title_tb')}>Mô tả</div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.permissions &&
                                props.permissions.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            <div className={cx('stt_center', 'title_tb')}>{index + 1}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>{row.name}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>{row.description}</div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
}

export default RoleAdd;
