import styles from './CinemaAdd.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faPen, faPlus, faTable, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import CinemaRoom from './CinemaRoom';
import CinemaSeat from './CinemaSeat';
import { useLocation } from 'react-router-dom';
import { GetAreaApi } from '~/service/AreaService';
import Loading from '~/components/Loading';
import { toast } from 'react-toastify';
import { CreateCinemaApi, GetCinemaIdApi } from '~/service/CinemaService';
import { useAuth } from '~/components/Context/AuthContext';
import { GetCinemaRoomApi } from '~/service/CinemaServiceRoom';

const cx = classNames.bind(styles);
function CinemaAdd() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cinemaId } = location.state || {};
    const { state } = useAuth();
    const { token } = state;
    const queryParams = new URLSearchParams(location.search);
    const initialPage = Math.max(1, Number(queryParams.get('page')) || 1);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const [formData, setFormData] = useState({
        name_cinema: '',
        address: '',
        status: 1,
        area_id: 0,
    });

    const [area, setArea] = useState(null);
    const [cinemaRoom, setCinemaRoom] = useState(null);
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        const getArea = async () => {
            try {
                const getArea = await GetAreaApi();
                setArea(getArea.result);
            } catch (error) {
                console.log('Error get area');
            }
        };

        const getCinemaRoom = async () => {
            try {
                const res = await GetCinemaRoomApi(null, cinemaId, currentPage - 1, 8);
                if (res) {
                    setCinemaRoom(res);
                }
            } catch (error) {
                console.log('Error get cinema room');
            }
        };

        const getcinemaId = async () => {
            if (cinemaId) {
                try {
                    const res = await GetCinemaIdApi(cinemaId);
                    if (res && res.result) {
                        setFormData({
                            name_cinema: res.result.name,
                            address: res.result.address,
                            area_id: res.result.areaId,
                            status: res.result.status,
                        });
                    }
                } catch (error) {
                    navigate(routes.CinemaManagement);
                }
            }
        };

        getArea();
        getcinemaId();
        getCinemaRoom();
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        setCurrentPage(newPage);
        navigate(`?page=${newPage}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'status' ? value : name === 'area_id' ? Number(value) : value,
        }));
    };

    const validate = () => {
        if (!formData.name_cinema.trim()) {
            return 'Cinema name is required.';
        }
        if (!formData.address.trim()) {
            return 'Address is required.';
        }
        if (formData.status === undefined || formData.status === null) {
            return 'Status must be selected.';
        }
        if (formData.area_id === 0) {
            return 'Area must be selected.';
        }
        return null;
    };

    const handleReturn = () => {
        navigate(routes.CinemaManagement);
    };

    // hiện dialog creat room + seat
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isDialogSeatOpen, setDialogSeatOpen] = useState(false);

    const handleLoginClick = (id) => {
        console.log('ID được truyền vào:', id);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleSeatClick = (id) => {
        console.log('ID được truyền vào:', id);
        setRoomId(id);
        setDialogSeatOpen(true);
    };

    const handleCloseSeatDialog = () => {
        setDialogSeatOpen(false);
    };

    const handleCreateCinema = async () => {
        if (validate()) {
            toast.warning(validate());
            return;
        }
        const data = {
            name_cinema: formData.name_cinema,
            address: formData.address,
            status: formData.status,
            area_id: formData.area_id,
        };
        if (!cinemaId) {
            const res = await CreateCinemaApi(data, token);
            if (res) {
                toast.success(res.message);
            }
        } else {
            toast.success('Cập nhật ok');
        }
    };

    if (!area) {
        return <Loading />;
    }
    return (
        <div>
            <div className={cx('nav')}>
                Quản lý rạp / Danh sách rạp / <span>{cinemaId ? 'Sửa rạp chiếu' : 'Tạo rạp phim'}</span>
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('ctn')}>
                    <div className={cx('btn')}>
                        <button className={cx('btn_ex')} onClick={handleReturn}>
                            <FontAwesomeIcon icon={faAngleLeft} className={cx('icon_btn')} />
                            Quay lại
                        </button>
                        {/* <button className={cx('btn_add')}>
                            <FontAwesomeIcon icon={faPlus} className={cx('icon_btn')} />
                            Tạo rạp chiếu
                        </button> */}
                    </div>
                    <div className={cx('list')}>
                        <button className={cx('btn_delete')}>
                            <FontAwesomeIcon icon={faTrash} className={cx('icon_btn')} />
                            Xóa rạp chiếu
                        </button>
                    </div>
                </div>

                <div className={cx('form-container')}>
                    <div className={cx('form-group')}>
                        <label htmlFor="name_cinema">Tên rạp chiếu:</label>
                        <input
                            type="text"
                            id="name_cinema"
                            name="name_cinema"
                            value={formData.name_cinema}
                            onChange={handleChange}
                            className={cx('input')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="address">Địa chỉ chi tiết:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={cx('input')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="status">Trạng thái:</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={cx('select')}
                        >
                            <option value="1">Mở cửa</option>
                            <option value="0">Đóng cửa</option>
                            <option value="2">Đang bảo trì</option>
                        </select>
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="area_id">Khu vực:</label>
                        <select
                            id="area_id"
                            name="area_id"
                            value={formData.area_id}
                            onChange={handleChange}
                            className={cx('select')}
                        >
                            <option value={0}>Chọn khu vực</option>
                            {area.map((data) => (
                                <option key={data.id} value={data.id}>
                                    {data.areaName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className={cx('submit-button')} onClick={handleCreateCinema}>
                        {cinemaId ? 'Lưu' : 'Thêm mới'}
                    </button>
                </div>

                {cinemaId && (
                    <div className={cx('list')}>
                        <div className={cx('title')}>
                            <p>Danh sách phòng chiếu</p>
                            <div className={cx('btn_list')}>
                                <button onClick={() => handleLoginClick(cinemaId)}>
                                    <FontAwesomeIcon icon={faPlus} className={cx('icon_btn')} />
                                    Tạo phòng chiếu
                                </button>
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow className={cx('bgr')}>
                                        <TableCell className={cx('stt')}>
                                            <div className={cx('title_tb')}>STT</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Tên phòng</div>
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
                                    {cinemaRoom &&
                                        cinemaRoom.result.map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    <div className={cx('stt_center', 'title_tb')}>
                                                        {index + 1 + cinemaRoom?.currentPage * cinemaRoom?.pageSize}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>{row.name}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>{row.createdDate}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        {row.status === 0
                                                            ? 'Hoạt động'
                                                            : row.status === 1
                                                            ? 'Dừng hoạt động'
                                                            : 'Đang bảo trì'}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('seat')}>
                                                            <FontAwesomeIcon
                                                                icon={faTable}
                                                                onClick={() => handleSeatClick(row.id)}
                                                            />
                                                        </button>
                                                        <button
                                                            className={cx('pen')}
                                                            onClick={() => handleLoginClick(row.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </button>
                                                        <button className={cx('delete')}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className={cx('pagination')}>
                            {cinemaRoom && cinemaRoom.totalPages > 1 && (
                                <PaginationS
                                    currentPage={cinemaRoom.currentPage}
                                    totalPages={cinemaRoom.totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>

                        <CinemaRoom open={isDialogOpen} handleClose={handleCloseDialog} cinemaId={cinemaId} />
                        {roomId && (
                            <CinemaSeat open={isDialogSeatOpen} handleClose={handleCloseSeatDialog} roomId={roomId} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CinemaAdd;
