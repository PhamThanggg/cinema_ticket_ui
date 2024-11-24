import styles from './UserManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { useState } from 'react';
import ScheduleAdd from './UserAdd';
import SearchBar from '~/components/SearchBar';

const cx = classNames.bind(styles);

function UserManagement({ ...props }) {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    // const handleOpenClick = (id) => {
    //     console.log('ID được truyền vào:', id);
    //     setDialogOpen(true);
    // };

    const handleDetailClick = (id) => {};

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý thể loại / <span>Danh sách thể loại</span>
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
                                                <div
                                                    onClick={() => handleDetailClick(row.id)}
                                                    className={cx('title_tb', 'detail')}
                                                >
                                                    Xem chi tiết
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

            <ScheduleAdd open={isDialogOpen} handleClose={handleCloseDialog} />
        </div>
    );
}

export default UserManagement;
