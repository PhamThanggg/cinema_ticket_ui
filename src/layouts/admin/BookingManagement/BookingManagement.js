import styles from './BookingManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import DropDown from '~/components/DropDown';
import SearchBar from '~/components/SearchBar';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatVND } from '~/utils/vndPrice';
import { formatToApiTime } from '~/utils/dateFormatter';
import DropDownSearch from '~/components/DropDownSearch';
import { GetAreaApi } from '~/service/AreaService';

const cx = classNames.bind(styles);

function BookingManagement({ ...props }) {
    const [cinemaValue, setCinemaValue] = useState([]);
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [area, setArea] = useState([]);

    const statusValue = [
        {
            value: 1,
            name: 'Đã hủy',
        },
        {
            value: 2,
            name: 'Đã thanh toán',
        },
    ];

    useEffect(() => {
        if (props.cinemas && props.cinemas.length > 0) {
            const cinemaValues = props.cinemas.map((data) => ({
                value: data.id,
                name: data.name,
            }));
            setCinemaValue(cinemaValues);
        }
    }, [props.cinemas]);

    useEffect(() => {
        const getArea = async () => {
            const res = await GetAreaApi();
            if (res && res.result) {
                const data = res.result.map((item) => ({
                    value: item.id,
                    name: item.areaName,
                }));
                setArea(data);
            }
        };
        getArea();
    }, []);

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setDate(selectedDate);

        if (selectedDate) {
            queryParams.set('date', selectedDate);
        } else {
            queryParams.delete('date');
        }

        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý hóa đơn / <span>Danh sách hóa đơn</span>
            </div>
            <div className={cx('wrapper')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={cx('ctn-search')}>
                        <DropDownSearch searchName={'Chọn khu vực'} data={area} name={'areaId'} width="180px" />
                        <DropDownSearch
                            searchName={'Chọn rạp chiếu'}
                            data={cinemaValue}
                            name={'cinema'}
                            width="180px"
                        />
                        <DropDownSearch
                            searchName={'Chọn trạng thái'}
                            data={statusValue}
                            name={'status'}
                            width="145px"
                        />
                        <div className={cx('ctn-input')}>
                            <input type="date" className={cx('input')} onChange={handleDateChange} />
                        </div>
                        <SearchBar label={'Mã đơn hàng'} name={'invoiceId'} />
                        <SearchBar label={'Tên phim'} name={'movieName'} />
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
                                    <TableCell className={cx('mdh')}>
                                        <div className={cx('title_tb')}>Mã đơn</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Tên phim</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Rạp</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Phòng</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Suất chiếu</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Trạng thái</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={cx('title_tb')}>Tổng tiền</div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.invoices &&
                                    props.invoices.result.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <div className={cx('stt_center', 'title_tb')}>
                                                    {props.invoices.pageSize * (props.currentPage - 1) + index + 1}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('stt_center', 'title_tb')}>{row.id}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>{row.schedule.movies.nameMovie}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    {row.schedule.cinemaRooms.cinema.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>{row.schedule.cinemaRooms.name}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('time_title')}>
                                                        {formatToApiTime(row.schedule.startTime)} -{' '}
                                                        {formatToApiTime(row.schedule.endTime)}
                                                    </button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('status_title')}>
                                                        {row.status === 1 ? 'Đã thanh toán' : 'Đã hủy'}
                                                    </button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb', 'detail')}>
                                                    {formatVND(row.totalAmount)}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        {props.invoices && props.invoices.result.length < 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                Không có hóa đơn nào
                            </div>
                        )}
                    </TableContainer>

                    {props.invoices && props.invoices.result.length > 0 && (
                        <div className={cx('pagination')}>
                            <PaginationS
                                currentPage={props.currentPage}
                                totalPages={(props.invoices && props.invoices?.totalPages) || 0}
                                onPageChange={props.handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingManagement;
