import styles from './AreaManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { confirmAction } from '~/components/ConfirmAction/ConfirmAction';
import { useAuth } from '~/components/Context/AuthContext';
import { toast } from 'react-toastify';
import SearchBar from '~/components/SearchBar';
import AreaAdd from './AreaAdd';
import { DeleteAreaApi } from '~/service/AreaService';

const cx = classNames.bind(styles);

function AreaManagement({ areas, currentPage, handlePageChange, ...props }) {
    const { state } = useAuth();
    const { token } = state;
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [areaList, setAreaList] = useState(null);
    const [area, setArea] = useState(null);

    useEffect(() => {
        setAreaList(areas.result);
    }, [areas]);

    const handleOpenClick = (area) => {
        if (area) {
            setArea(area);
        }
        setDialogOpen(true);
    };

    const handleDeleteClick = async (id) => {
        const confirm = confirmAction();
        if (confirm) {
            const res = await DeleteAreaApi(id, token);
            if (res) {
                toast.success(res.result);
                props.setLoadList((prev) => !prev);
            }
        }
    };

    const handleCloseDialog = () => {
        setArea(null);
        setDialogOpen(false);
    };

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý rạp / <span>Danh sách khu vực</span>
            </div>
            <div className={cx('wrapper')}>
                <div>
                    <div className={cx('btn')}>
                        <button className={cx('button')} onClick={() => handleOpenClick(null)}>
                            <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                            Tạo khu vực
                        </button>
                        <div className={cx('display_flex')}>
                            <SearchBar name={'name'} label="Nhập tên khu vực" />
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
                                            <div className={cx('title_tb')}>Tên khu vực</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Thao tác</div>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {areaList &&
                                        areaList.map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    <div className={cx('stt_center', 'title_tb')}>
                                                        {areas.pageSize * (currentPage - 1) + index + 1}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('time_title')}>{row.areaName}</button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button
                                                            className={cx('pen')}
                                                            onClick={() => handleOpenClick(row)}
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
                            {areaList && areaList.length < 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                    Không có khu vực nào
                                </div>
                            )}
                        </TableContainer>
                        {areaList && areaList.length > 0 && (
                            <div className={cx('pagination')}>
                                <PaginationS
                                    currentPage={currentPage}
                                    totalPages={areas?.totalPages || 0}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AreaAdd open={isDialogOpen} handleClose={handleCloseDialog} area={area} setLoadList={props.setLoadList} />
        </div>
    );
}

export default AreaManagement;
