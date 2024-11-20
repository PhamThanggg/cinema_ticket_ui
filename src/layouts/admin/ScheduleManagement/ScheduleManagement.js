import styles from './ScheduleManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ScheduleAdd from './ScheduleAdd';

const cx = classNames.bind(styles);

function ScheduleManagement() {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenClick = (id) => {
        console.log('ID được truyền vào:', id);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    const rows = [
        { id: 1, name: 'John Doe', age: 30, occupation: 'Software Engineer' },
        { id: 2, name: 'Jane Smith', age: 25, occupation: 'Designer' },
        { id: 3, name: 'Mike Johnson', age: 35, occupation: 'Project Manager' },
    ];

    const handleDetailClick = (id) => {};

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý thể loại / <span>Danh sách thể loại</span>
            </div>
            <div className={cx('wrapper')}>
                <div>
                    <div className={cx('btn')}>
                        <button onClick={handleOpenClick}>
                            <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                            Tạo thể loại
                        </button>
                    </div>

                    <div className={cx('ctn-search')}>
                        <div className={cx('ctn-input')}>
                            <label className={cx('label')}>Rạp chiếu:</label>
                            <select className={cx('input', 'select')}>
                                <option value="1">Area 1</option>
                                <option value="2">Area 2</option>
                                <option value="3">Area 3</option>
                                <option value="3">Area 3</option>
                                <option value="3">Area 3</option>
                                <option value="3">Area 3</option>
                            </select>
                        </div>

                        <div className={cx('ctn-input')}>
                            <label className={cx('label')}>Phòng chiếu:</label>
                            <select className={cx('input', 'select')}>
                                <option value="1">Area 1</option>
                                <option value="2">Area 2</option>
                                <option value="3">Area 3</option>
                                <option value="3">Area 3</option>
                                <option value="3">Area 3</option>
                                <option value="3">Area 3</option>
                            </select>
                        </div>

                        <div className={cx('ctn-input')}>
                            <label className={cx('label')}>Ngày chiếu:</label>
                            <input type="date" className={cx('input')} />
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
                                            <div className={cx('title_tb')}>ID</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Tên thể loại</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Trạng thái</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Thao tác</div>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <div className={cx('stt_center', 'title_tb')}>{row.id}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>{row.name}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('time_title')}>{row.occupation}</button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('status_title')}>{row.occupation}</button>
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
                            <PaginationS />
                        </div>
                    </div>
                </div>
            </div>

            <ScheduleAdd open={isDialogOpen} handleClose={handleCloseDialog} />
        </div>
    );
}

export default ScheduleManagement;
