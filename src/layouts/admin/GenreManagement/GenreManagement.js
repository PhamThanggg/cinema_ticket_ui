import styles from './GenreManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import GenreAdd from './GenreAdd';
import { confirmAction } from '~/components/ConfirmAction/ConfirmAction';
import { DeleteGenreApi } from '~/service/GenreService';
import { useAuth } from '~/components/Context/AuthContext';
import { toast } from 'react-toastify';
import SearchBar from '~/components/SearchBar';

const cx = classNames.bind(styles);

function GenreManagement({ genres, currentPage, handlePageChange, ...props }) {
    const { state } = useAuth();
    const { token } = state;
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [genreList, setGenreList] = useState(null);
    const [genreId, setGenreId] = useState(null);

    useEffect(() => {
        setGenreList(genres.result);
    }, [genres]);

    const handleOpenClick = (id) => {
        if (id) {
            setGenreId(id);
        }
        setDialogOpen(true);
    };

    const handleDeleteClick = async (id) => {
        const confirm = confirmAction();
        if (confirm) {
            const res = DeleteGenreApi(id, token);
            if (res) {
                toast.success(res.result);
            }
        }
    };

    const handleCloseDialog = () => {
        setGenreId(null);
        setDialogOpen(false);
    };

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý thể loại / <span>Danh sách thể loại</span>
            </div>
            <div className={cx('wrapper')}>
                <div>
                    <div className={cx('btn')}>
                        <button className={cx('button')} onClick={() => handleOpenClick(null)}>
                            <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                            Tạo thể loại
                        </button>
                        <div className={cx('display_flex')}>
                            <SearchBar name={'name'} label="Nhập thể loại" />
                        </div>
                    </div>
                    <div className={cx('list')}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow className={cx('bgr')}>
                                        <TableCell className={cx('stt')}>
                                            <div className={cx('title_tb', 'stt_center')}>STT</div>
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
                                    {genreList &&
                                        genreList.map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    <div className={cx('stt_center', 'title_tb')}>
                                                        {genres.pageSize * (currentPage - 1) + index + 1}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('time_title')}>{row.name}</button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('status_title')}>
                                                            {row.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
                                                        </button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button
                                                            className={cx('pen')}
                                                            onClick={() => handleOpenClick(row.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </button>
                                                        <button
                                                            className={cx('delete')}
                                                            onClick={() => handleDeleteClick(row.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {genreList && genreList.length < 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                    Không có thể loại nào
                                </div>
                            )}
                        </TableContainer>
                        {genreList && genreList.length > 0 && (
                            <div className={cx('pagination')}>
                                <PaginationS
                                    currentPage={currentPage}
                                    totalPages={genres?.totalPages || 0}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <GenreAdd
                open={isDialogOpen}
                handleClose={handleCloseDialog}
                setGenreList={setGenreList}
                genreId={genreId}
                setLoadList={props.setLoadList}
            />
        </div>
    );
}

export default GenreManagement;
