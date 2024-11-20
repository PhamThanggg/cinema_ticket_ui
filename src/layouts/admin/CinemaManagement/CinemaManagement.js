import styles from './CinemaManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/router';
import { useState } from 'react';

const cx = classNames.bind(styles);
function CinemaManagement({ ...prop }) {
    const navigate = useNavigate();
    const [selectedRowId, setSelectedRowId] = useState(null);

    const rows = [
        { id: 1, name: 'John Doe', age: 30, occupation: 'Software Engineer' },
        { id: 2, name: 'Jane Smith', age: 25, occupation: 'Designer' },
        { id: 3, name: 'Mike Johnson', age: 35, occupation: 'Project Manager' },
    ];

    const handleCinemaAdd = () => {
        navigate(routes.CinemaAdd);
    };

    const handleDetailClick = (cinemaId) => {
        setSelectedRowId(cinemaId);
        navigate(routes.CinemaAdd, { state: { cinemaId } });
    };

    console.log(prop.cinemas);

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý rạp / <span>Danh sách rạp</span>
            </div>
            <div className={cx('wrapper')}>
                <div>
                    <div className={cx('btn')}>
                        <button onClick={handleCinemaAdd}>
                            <FontAwesomeIcon icon={faPlus} className={cx('btn_icon')} />
                            Tạo rạp chiếu
                        </button>
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
                                            <div className={cx('title_tb')}>Tên rạp</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Địa chỉ</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Ngày tạo</div>
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
                                    {prop.cinemas &&
                                        prop.cinemas.result &&
                                        prop.cinemas.result.map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    <div className={cx('stt_center', 'title_tb')}>
                                                        {prop.cinemas.pageSize * prop.cinemas.currentPage + index + 1}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>{row.name}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>{row.address}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>{row.createdDate}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        {row.status === 0
                                                            ? 'Đóng cửa'
                                                            : row.status === 1
                                                            ? 'Mở cửa'
                                                            : 'Bảo trì'}
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
                                currentPage={prop.currentPage}
                                totalPages={prop.cinemas.totalPages}
                                onPageChange={prop.handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CinemaManagement;
