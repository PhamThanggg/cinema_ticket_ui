import styles from './ComboManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import ComboAdd from './ComboAdd';
import DropDown from '~/components/DropDown';
import { formatVND } from '~/utils/vndPrice';

const cx = classNames.bind(styles);

function ComboManagement({ ...props }) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [cinemaValue, setCinemaValue] = useState([]);

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
        console.log('ID được truyền vào:', id);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleDetailClick = (id) => {};

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý combo / <span>Danh sách combo</span>
            </div>
            <div className={cx('wrapper')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={cx('ctn-search', 'margin')}>
                        <DropDown searchName={'Chọn rạp chiếu'} data={cinemaValue} name={'cinema'} />
                    </div>
                    <div className={cx('btn')}>
                        <button onClick={handleOpenClick}>
                            <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                            Tạo thể loại
                        </button>
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

            <ComboAdd open={isDialogOpen} handleClose={handleCloseDialog} />
        </div>
    );
}

export default ComboManagement;
