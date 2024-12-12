import { Dialog, DialogContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './UserAdd.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { GetRoleApi } from '~/service/RolePremissionService';
import { useAuth } from '~/components/Context/AuthContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { AddRoleApi } from '~/service/UserAPI';

const cx = classNames.bind(styles);

function UserAdd({ open, handleClose, ...props }) {
    const { state } = useAuth();
    const [role, setRole] = useState([]);
    const [roleSelected, setRoleSelected] = useState([]);

    useEffect(() => {
        const getRoleApi = async () => {
            const res = await GetRoleApi(state.token);
            if (res && res.result) {
                setRole(res.result);
            }
        };

        if (props.user && props.user.roles && props.user.roles.length > 0) {
            setRoleSelected(props.user.roles.map((role) => ({ value: role.id, label: role.name })));
        }

        getRoleApi();
    }, [props.user]);

    const handleSave = async () => {
        if (roleSelected.length < 1) {
            toast.warning('Vui lòng chọn ít nhất 1 vai trò!');
            return;
        }

        const data = {
            roleIds: roleSelected.map((role) => role.value),
        };

        const res = await AddRoleApi(props.user.id, data, state.token);
        if (res) {
            props.setLoadList((prev) => !prev);
            toast.success('Thêm thành công');
        }
    };

    const handleChangeRole = (selected) => {
        setRoleSelected(selected);
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
                <div className={cx('title')}>Thêm quyền cho tài khoản</div>
                <div className={cx('form')}>
                    <div className={cx('ctn-input')}>
                        <label className={cx('label')}>Chọn quyền:</label>
                        <Select
                            id="role"
                            name="role"
                            options={
                                role &&
                                role.map((actor) => ({
                                    value: actor.id,
                                    label: actor.name,
                                }))
                            }
                            isMulti
                            value={roleSelected}
                            onChange={handleChangeRole}
                            placeholder="Tìm kiếm và chọn..."
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
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
                    <div style={{ fontSize: '15px' }}>Danh sách vai trò của hệ thống</div>
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
                            {role &&
                                role.map((row, index) => (
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

export default UserAdd;
