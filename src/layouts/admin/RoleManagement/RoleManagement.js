import styles from './RoleManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import RoleAdd from './RoleAdd';
import { confirmAction } from '~/components/ConfirmAction/ConfirmAction';
import SearchBar from '~/components/SearchBar';
import { DeleteRoleApi } from '~/service/RolePremissionService';
import { toast } from 'react-toastify';
import { useAuth } from '~/components/Context/AuthContext';

const cx = classNames.bind(styles);

function RoleManagement({ ...props }) {
    const { state } = useAuth();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [role, setRole] = useState(null);

    const handleLoginClick = (role) => {
        setRole(role);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setRole(null);
    };

    const handleDeleteRoleClick = async (id) => {
        const confirm = await confirmAction();
        if (confirm) {
            const res = await DeleteRoleApi(id, state.token);
            if (res) {
                props.setLoadList((prev) => !prev);
                toast.success('Xóa vai trò thành công');
            }
        }
    };

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý quyền / <span>Danh sách vai trò</span>
            </div>
            <div className={cx('wrapper')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={cx('btn')}>
                        <button onClick={() => handleLoginClick(null)}>
                            <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                            Tạo vai trò
                        </button>
                    </div>

                    <div className={cx('ctn-search')}>
                        <SearchBar label={'Tên vai trò'} name={'name'} />
                    </div>
                </div>

                <div className={cx('list')}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className={cx('bgr')}>
                                    <TableCell className={cx('stt')}>
                                        <div className={cx('stt_center', 'title_tb')}>STT</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Tên vai trò</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Mô tả</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Thao tác</div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.roles &&
                                    props.roles.result.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <div className={cx('stt_center', 'title_tb')}>
                                                    {props.roles.pageSize * (props.currentPage - 1) + index + 1}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>{row.name}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>{row.description}</div>
                                            </TableCell>
                                            <TableCell>
                                                {row.name !== 'ADMIN' && row.name !== 'USER' && (
                                                    <div className={cx('title_tb')}>
                                                        <button
                                                            className={cx('pen')}
                                                            onClick={() => handleLoginClick(row)}
                                                        >
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </button>
                                                        <button
                                                            className={cx('delete')}
                                                            onClick={() => handleDeleteRoleClick(row.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={cx('pagination')}>
                        <PaginationS
                            currentPage={props.currentPage}
                            totalPages={(props.roles && props.roles?.totalPages) || 0}
                            onPageChange={props.handlePageChange}
                        />
                    </div>
                </div>
            </div>

            <RoleAdd
                open={isDialogOpen}
                handleClose={handleCloseDialog}
                role={role}
                setLoadList={props.setLoadList}
                permissions={props.permissions}
            />
        </div>
    );
}

export default RoleManagement;
