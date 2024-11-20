import styles from './ListMovie.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/router';
import { useState } from 'react';
import SearchBar from '~/components/SearchBar';
import DropDown from '~/components/DropDown';

const cx = classNames.bind(styles);
function ListMovie({ movies, currentPage, handlePageChange }) {
    const navigate = useNavigate();
    const [selectedRowId, setSelectedRowId] = useState(null);

    const handleMovieAdd = () => {
        navigate(routes.MovieAdd);
    };

    const handleDetailClick = (id) => {
        setSelectedRowId(id);
        navigate(routes.CinemaRoom, { state: { id } }); //const { movieId } = location.state || {};
    };

    console.log(movies);

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý phim / <span>Danh sách phim</span>
            </div>
            <div className={cx('wrapper')}>
                <div>
                    <div className={cx('btn')}>
                        <div>
                            <button onClick={handleMovieAdd}>
                                <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                                Tạo phim
                            </button>
                        </div>

                        <div className={cx('display_flex')}>
                            <DropDown searchName={'Chọn trạng thái'} />
                            <DropDown searchName={'Chọn thể loại'} />
                            <SearchBar />
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
                                            <div className={cx('title_tb')}>Tên phim </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Thời lượng chiếu</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Thể loại</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Ngày bắt đầu chiếu</div>
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
                                    {movies &&
                                        movies.result &&
                                        movies.result.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    <div className={cx('stt_center', 'title_tb')}>{row.id}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>{row.nameMovie}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>{row.duration} phút</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        {row.genres.map((data) => (
                                                            <button key={data.id} className={cx('genre_title')}>
                                                                {data.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('time_title')}>{row.premiereDate}</button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('status_title')}>
                                                            {row.status === 1
                                                                ? 'Đang chiếu'
                                                                : row.status === 0
                                                                ? 'Sắp chiếu'
                                                                : 'Dừng chiếu'}
                                                        </button>
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
                                currentPage={currentPage}
                                totalPages={movies?.totalPages || 0}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListMovie;
