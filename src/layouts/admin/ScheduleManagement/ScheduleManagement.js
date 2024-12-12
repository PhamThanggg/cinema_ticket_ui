import styles from './ScheduleManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import ScheduleAdd from './ScheduleAdd';
import DropDown from '~/components/DropDown';
import { useLocation, useNavigate } from 'react-router-dom';
import { DeleteScheduleApi, ScheduleSearchApi } from '~/service/ScheduleApi';
import PaginationS from '~/components/Pagination';
import { formatToApiTime } from '~/utils/dateFormatter';
import { formatVND } from '~/utils/vndPrice';
import { confirmAction } from '~/components/ConfirmAction/ConfirmAction';
import { toast } from 'react-toastify';
import { useAuth } from '~/components/Context/AuthContext';
import DropDownSearch from '~/components/DropDownSearch';

const cx = classNames.bind(styles);

function ScheduleManagement({ ...props }) {
    const { state } = useAuth();
    const { token } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [areaValue, setAreaValue] = useState([]);
    const [cinemaValue, setCinemaValue] = useState([]);
    const [roomValue, setRoomValue] = useState([]);
    const [date, setDate] = useState('');
    const [schedule, setSchedule] = useState(null);
    const [scheduleId, setScheduleId] = useState(null);
    const [loadList, setLoadList] = useState(true);
    const cinema = queryParams.get('cinema');
    const roomId = queryParams.get('roomId');
    const screeningDate = queryParams.get('screeningDate');

    useEffect(() => {
        const getSchedule = async () => {
            if (cinema && roomId) {
                const res = await ScheduleSearchApi(roomId, screeningDate, currentPage - 1, 10);
                setSchedule(res);
            } else {
                setSchedule(null);
            }
        };

        getSchedule();
    }, [props.cinemas, props.rooms, roomId, date, loadList]);

    useEffect(() => {
        if (props.areas && props.areas.length > 0) {
            const areasValues = props.areas.map((data) => ({
                value: data.id,
                name: data.areaName,
            }));
            setAreaValue(areasValues);
        }

        if (props.cinemas && props.cinemas.length > 0) {
            const genreValues = props.cinemas.map((data) => ({
                value: data.id,
                name: data.name,
            }));
            setCinemaValue(genreValues);
        }

        if (props.rooms && props.rooms.length > 0) {
            const genreValues = props.rooms.map((data) => ({
                value: data.id,
                name: data.name,
            }));
            setRoomValue(genreValues);
        } else {
            setRoomValue([]);
        }
    }, [props.cinemas, props.rooms]);

    const handlePageChange = (newPage) => {
        queryParams.set('page', newPage);

        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setDate(selectedDate);

        if (selectedDate) {
            queryParams.set('screeningDate', selectedDate);
        } else {
            queryParams.delete('screeningDate');
        }

        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const handleOpenClick = (id) => {
        setScheduleId(id);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setScheduleId(null);
    };

    const handleDeleteClick = async (id) => {
        const confirm = await confirmAction();
        if (confirm) {
            const res = DeleteScheduleApi(id, token);
            if (res) {
                toast.success(res.result);
            }
        }
    };

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý suất chiếu / <span>Danh sách suất chiếu</span>
            </div>
            <div className={cx('wrapper')}>
                <div style={{ margin: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <div className={cx('ctn-search')}>
                        <DropDownSearch searchName={'Chọn khu vực'} data={areaValue} name={'area'} width="180px" />
                        <DropDownSearch
                            searchName={'Chọn rạp chiếu'}
                            data={cinemaValue}
                            name={'cinema'}
                            width="180px"
                        />
                        <DropDownSearch searchName={'Chọn phòng'} data={roomValue} name={'roomId'} width="180px" />

                        <div className={cx('ctn-input')}>
                            <label className={cx('label')}>Ngày chiếu:</label>
                            <input type="date" className={cx('input1')} value={date} onChange={handleDateChange} />
                        </div>
                    </div>

                    {cinema && roomId && (
                        <div className={cx('btn')}>
                            <button onClick={() => handleOpenClick(null)}>
                                <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                                Tạo suất chiếu
                            </button>
                        </div>
                    )}
                </div>
                {schedule && schedule.result && schedule.result.length > 0 ? (
                    <div className={cx('list')}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow className={cx('bgr')}>
                                        <TableCell className={cx('stt')}>
                                            <div className={cx('title_tb')}>STT</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Phòng chiếu</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Phim</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Ngày chiếu</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Suất chiếu</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Giá vé cơ bản</div>
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
                                    {schedule.result.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <div className={cx('stt_center', 'title_tb')}>
                                                    {schedule.pageSize * (currentPage - 1) + index + 1}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>{row.cinemaRooms.name}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>{row.movies.nameMovie}</div>
                                            </TableCell>
                                            <TableCell>
                                                <button className={cx('time_title')}>{row.screeningDate}</button>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('genre_title')}>
                                                        {formatToApiTime(row.startTime)} -{' '}
                                                        {formatToApiTime(row.endTime)}
                                                    </button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('time_title')}>{formatVND(row.price)}</button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={cx('title_tb')}>
                                                    <button className={cx('status_title')}>
                                                        {row.status === 1
                                                            ? 'Sắp chiếu'
                                                            : row.status === 2
                                                            ? 'Đang chiếu'
                                                            : 'Đã chiếu'}
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
                        </TableContainer>
                        {schedule.totalPages > 1 && (
                            <div className={cx('pagination')}>
                                <PaginationS
                                    currentPage={currentPage}
                                    totalPages={schedule?.totalPages || 0}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        Không có lịch chiếu nào vui lòng chọn phòng hoặc thời gian khác
                    </div>
                )}
            </div>
            <ScheduleAdd
                open={isDialogOpen}
                handleClose={handleCloseDialog}
                roomId={roomId}
                schedule={schedule}
                scheduleId={scheduleId}
                setSchedule={setSchedule}
                setLoadList={setLoadList}
            />
        </div>
    );
}

export default ScheduleManagement;
