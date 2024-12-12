import styles from './ComboManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import ComboAdd from './ComboAdd';
import { formatVND } from '~/utils/vndPrice';
import { confirmAction } from '~/components/ConfirmAction/ConfirmAction';
import { useLocation } from 'react-router-dom';
import DropDownSearch from '~/components/DropDownSearch';

const cx = classNames.bind(styles);

function ComboManagement({ ...props }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [cinemaValue, setCinemaValue] = useState([]);
    const [itemId, setItemId] = useState(null);
    const cinemaId = queryParams.get('cinema');

    useEffect(() => {
        if (props.cinemas && props.cinemas.length > 0) {
            const genreValues = props.cinemas.map((data) => ({
                value: data.id,
                name: data.name,
            }));
            setCinemaValue(genreValues);
        }
    }, [props.cinemas]);

    const handleOpenClick = (id) => {
        setItemId(id);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setItemId(null);
    };

    const handleDeleteClick = async (id) => {
        const confirm = confirmAction();
        // if (confirm) {
        //     const res = DeleteScheduleApi(id, token);
        //     if (res) {
        //         toast.success(res.result);
        //     }
        // }
    };

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý combo / <span>Danh sách combo</span>
            </div>
            <div className={cx('wrapper')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={cx('ctn-search', 'margin')}>
                        <DropDownSearch
                            searchName={'Chọn rạp chiếu'}
                            data={cinemaValue}
                            name={'cinema'}
                            width="180px"
                        />
                    </div>
                    {props.cinemaId && (
                        <div className={cx('btn')}>
                            <button onClick={() => handleOpenClick(null)}>
                                <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                                Tạo combo
                            </button>
                        </div>
                    )}
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
                                        <div className={cx('title_tb')}>Tên combo</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Mô tả</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Giá bán</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Thao tác</div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.combos &&
                                    props.combos.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <div className={cx('stt_center', 'title_tb')}>{index + 1}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>{row.name}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <div className={cx('title_tb')}>{row.description}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('status_title')}>
                                                        {formatVND(row.price)}
                                                    </button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb', 'flex')}>
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
                        {props.combos && props.combos.length < 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                Không có bộ phim nào
                            </div>
                        )}
                    </TableContainer>

                    {/* {props.combos && props.combos.length > 0 && (
                        <div className={cx('pagination')}>
                            <PaginationS />
                        </div>
                    )} */}
                </div>
            </div>

            <ComboAdd
                open={isDialogOpen}
                handleClose={handleCloseDialog}
                comboId={itemId}
                cinemaId={cinemaId}
                setLoadList={props.setLoadList}
            />
        </div>
    );
}

export default ComboManagement;
