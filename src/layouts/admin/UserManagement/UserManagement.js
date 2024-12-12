import styles from './UserManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { useEffect, useState } from 'react';
import SearchBar from '~/components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import UserAdd from './UserAdd';
import { confirmAction } from '~/components/ConfirmAction/ConfirmAction';
import { toast } from 'react-toastify';
import { DeleteUser } from '~/service/UserAPI';
import { useAuth } from '~/components/Context/AuthContext';
import DropDownSearch from '~/components/DropDownSearch';
import { GetRoleApi } from '~/service/RolePremissionService';

const cx = classNames.bind(styles);

function UserManagement({ ...props }) {
    const { state } = useAuth();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState([]);

    useEffect(() => {
        const getArea = async () => {
            const res = await GetRoleApi(state.token);
            if (res && res.result) {
                const data = res.result.map((item) => ({
                    value: item.id,
                    name: item.name,
                }));
                setRole(data);
            }
        };
        getArea();
    }, []);

    const handleLoginClick = (user) => {
        setUser(user);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setUser(null);
    };

    const handleDeleteRoomClick = async (id) => {
        const confirm = await confirmAction();
        if (confirm) {
            const res = await DeleteUser(id, state.token);
            if (res) {
                props.setLoadList((prev) => !prev);
                toast.success('Xóa người dùng thành công');
            }
        }
    };

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý người dùng / <span>Danh sách người dùng</span>
            </div>
            <div className={cx('wrapper')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* <div className={cx('btn')}>
                        <button onClick={handleOpenClick}>
                            <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                            Tạo thể loại
                        </button>
                    </div> */}

                    <div className={cx('ctn-search')}>
                        <DropDownSearch searchName={'Chọn vai trò'} data={role} name={'roleId'} />
                        <SearchBar label={'Tên người dùng'} name={'name'} />
                        <SearchBar label={'Email người dùng'} name={'email'} />
                    </div>
                </div>

                <div className={cx('list')}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className={cx('bgr')}>
                                    <TableCell className={cx('stt')}>
                                        <div className={cx('title_tb')}>STT</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Họ và tên</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Email</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Số điện thoại</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Giới tính</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Vai trò</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Thao tác</div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.users &&
                                    props.users.result.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <div className={cx('stt_center', 'title_tb')}>
                                                    {props.users.pageSize * (props.currentPage - 1) + index + 1}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>{row.fullName}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('time_title')}>{row.email}</button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('status_title')}>{row.phone}</button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('genre_title')}>{row.gender}</button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    {row.roles.map((role, index) => (
                                                        <button
                                                            className={cx('time_title')}
                                                            style={{ margin: '0 2px' }}
                                                        >
                                                            {role.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {/* <div
                                                    onClick={() => handleDetailClick(row.id)}
                                                    className={cx('title_tb', 'detail')}
                                                >
                                                    Xem chi tiết
                                                </div> */}
                                                <div className={cx('title_tb')}>
                                                    {/* <button className={cx('seat')}>
                                                        <FontAwesomeIcon
                                                            icon={faTable}
                                                            onClick={() => handleSeatClick(row.id)}
                                                        />
                                                    </button> */}
                                                    <button className={cx('pen')} onClick={() => handleLoginClick(row)}>
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </button>
                                                    <button
                                                        className={cx('delete')}
                                                        onClick={() => handleDeleteRoomClick(row.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={cx('pagination')}>
                        <PaginationS
                            currentPage={props.currentPage}
                            totalPages={(props.users && props.users?.totalPages) || 0}
                            onPageChange={props.handlePageChange}
                        />
                    </div>
                </div>
            </div>

            <UserAdd open={isDialogOpen} handleClose={handleCloseDialog} user={user} setLoadList={props.setLoadList} />
        </div>
    );
}

export default UserManagement;
