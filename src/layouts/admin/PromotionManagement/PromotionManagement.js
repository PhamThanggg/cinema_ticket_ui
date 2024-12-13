import styles from './PromotionManagement.module.scss';
import classNames from 'classnames/bind';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PaginationS from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { confirmAction } from '~/components/ConfirmAction/ConfirmAction';
import { useAuth } from '~/components/Context/AuthContext';
import { toast } from 'react-toastify';
import SearchBar from '~/components/SearchBar';
import DropDown from '~/components/DropDown';
import { DeletePromotionApi } from '~/service/PromotionService';
import PromotionAdd from './PromotionAdd';
import PromotionInfoAdd from './PromotionInfoAdd';

const cx = classNames.bind(styles);

function PromotionManagement({ promotions, currentPage, handlePageChange, ...props }) {
    const { state } = useAuth();
    const { token } = state;
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isDialogOpenInfo, setDialogOpenInfo] = useState(false);
    const [promotion, setPromotion] = useState(null);

    const handleOpenClick = (promotion) => {
        if (promotion) {
            setPromotion(promotion);
        }
        setDialogOpen(true);
    };

    const handleOpenInfoClick = (promotion) => {
        if (promotion) {
            setPromotion(promotion);
        }
        setDialogOpenInfo(true);
    };

    const handleOpenPromtioClick = (promotion) => {
        if (promotion && promotion.promotionType === 'CODE') {
            setPromotion(promotion);
            setDialogOpen(true);
        }

        if (promotion && promotion.promotionType === 'INFO') {
            setPromotion(promotion);
            setDialogOpenInfo(true);
        }
    };

    const handleDeleteClick = async (id) => {
        const confirm = await confirmAction();
        if (confirm) {
            const res = await DeletePromotionApi(id, token);
            if (res) {
                props.setLoadList((prev) => !prev);
                toast.success(res.result);
            }
        }
    };

    const handleCloseDialog = () => {
        setPromotion(null);
        setDialogOpen(false);
        setDialogOpenInfo(false);
    };

    const statusValue = [
        {
            value: 1,
            name: 'Còn hạn',
        },
        {
            value: 2,
            name: 'Hết hạn',
        },
    ];

    const promotionType = [
        {
            value: 'CODE',
            name: 'Nhập mã code',
        },
        {
            value: 'INFO',
            name: 'Thông tin',
        },
    ];

    return (
        <div>
            <div className={cx('nav')}>
                Quản lý thể loại / <span>Danh sách thể loại</span>
            </div>
            <div className={cx('wrapper')}>
                <div>
                    <div className={cx('btn')}>
                        <div>
                            <button className={cx('button')} onClick={() => handleOpenClick(null)}>
                                <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                                Tạo code
                            </button>
                            <button
                                className={cx('button')}
                                onClick={() => handleOpenInfoClick(null)}
                                style={{ marginLeft: '10px' }}
                            >
                                <FontAwesomeIcon icon={faPlus} className={cx('btn-icon')} />
                                Tạo khuyến mãi
                            </button>
                        </div>
                        <div className={cx('display_flex')}>
                            <DropDown searchName={'Loại khuyến mãi'} data={promotionType} name={'promotionType'} />
                            <DropDown searchName={'Chọn trạng thái'} data={statusValue} name={'status'} />
                            <SearchBar name={'name'} label="Nhập tên khuyến mãi" />
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
                                            <div className={cx('title_tb')}>Tên khuyến mãi</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Loại khuyến mãi</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Ngày bắt đầu</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={cx('title_tb')}>Ngày kết thúc</div>
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
                                    {promotions &&
                                        promotions.result &&
                                        promotions.result.map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    <div className={cx('stt_center', 'title_tb')}>
                                                        {promotions.pageSize * (currentPage - 1) + index + 1}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className={cx('title_tb')}>{row.name}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        {row.promotionType === 'CODE'
                                                            ? 'Nhập mã code'
                                                            : row.promotionType === 'INFO'
                                                            ? 'Thông tin'
                                                            : ''}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('time_title')}>{row.startDate}</button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('time_title')}>{row.endDate}</button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button className={cx('status_title')}>
                                                            {new Date(row.endDate) > new Date() ? 'Còn hạn' : 'Hết hạn'}
                                                        </button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cx('title_tb')}>
                                                        <button
                                                            className={cx('pen')}
                                                            onClick={() => handleOpenPromtioClick(row)}
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
                            {promotions && promotions.result && promotions.result.length < 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                    Không có khuyến mãi nào
                                </div>
                            )}
                        </TableContainer>
                        {promotions && promotions.result && promotions.result.length > 0 && (
                            <div className={cx('pagination')}>
                                <PaginationS
                                    currentPage={currentPage}
                                    totalPages={promotions?.totalPages || 0}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PromotionAdd
                open={isDialogOpen}
                handleClose={handleCloseDialog}
                promotion={promotion}
                setLoadList={props.setLoadList}
            />

            <PromotionInfoAdd
                open={isDialogOpenInfo}
                handleClose={handleCloseDialog}
                promotion={promotion}
                setPromotion={setPromotion}
                setLoadList={props.setLoadList}
            />
        </div>
    );
}

export default PromotionManagement;
