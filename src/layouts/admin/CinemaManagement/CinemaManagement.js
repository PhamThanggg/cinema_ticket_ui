import styles from './CinemaManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '~/config/router';
import { useEffect, useState } from 'react';
import DropDownSearch from '~/components/DropDownSearch';
import DropDown from '~/components/DropDown';
import SearchBar from '~/components/SearchBar';
import { GetAreaApi } from '~/service/AreaService';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
function CinemaManagement({ ...prop }) {
    const [area, setArea] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        getArea();
        setLoading(false);
    }, []);

    const handleCinemaAdd = () => {
        navigate(routes.CinemaAdd);
    };

    const handleDetailClick = (cinemaId) => {
        const params = new URLSearchParams(location.search);
        params.set('cinemaId', cinemaId);

        setSelectedRowId(cinemaId);
        navigate(`${routes.CinemaAdd}?${params.toString()}`, { state: { cinemaId } });
    };

    const data = [
        { value: 1, name: 'Đóng cửa' },
        { value: 2, name: 'Mở cửa' },
        { value: 3, name: 'Bảo trì' },
    ];

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý rạp / <span>Danh sách rạp</span>
            </div>
            <div className={cx('wrapper')}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={cx('btn')}>
                            <button onClick={handleCinemaAdd}>
                                <FontAwesomeIcon icon={faPlus} className={cx('btn_icon')} />
                                Tạo rạp chiếu
                            </button>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center' }}>
                            <DropDown searchName={'Chọn trạng thái'} data={data} name={'status'} />
                            <DropDownSearch searchName={'Chọn khu vực'} data={area} name={'areaId'} />
                            <SearchBar name="name" label={'Nhập tên rạp'} />
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
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('time_title')}>{row.createdDate}</button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('status_title')}>
                                                            {row.status === 0
                                                                ? 'Đóng cửa'
                                                                : row.status === 1
                                                                ? 'Mở cửa'
                                                                : 'Bảo trì'}
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
                            {prop.cinemas && prop.cinemas.result.length < 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>Không có rạp chiếu nào</div>
                            )}
                        </TableContainer>
                        {prop.cinemas && prop.cinemas.result.length > 0 && (
                            <div className={cx('pagination')}>
                                <PaginationS
                                    currentPage={prop.currentPage}
                                    totalPages={prop.cinemas.totalPages}
                                    onPageChange={prop.handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CinemaManagement;
