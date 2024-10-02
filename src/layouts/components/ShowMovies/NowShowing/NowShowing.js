import classNames from 'classnames/bind';
import styles from './NowShowing.module.scss';
import styleGrid from '~/components/GlobalStyles/Grid.module.scss';
import ItemMovie from '~/layouts/components/Movie/ItemMovie';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const cx = classNames.bind(styles);
const cw = classNames.bind(styleGrid);

function NowShowing() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className={cx('wrapper')}>
            <div className={cw('grid', 'wide')}>
                <div className={cx('ctn')}>
                    <div className={cw('row')}>
                        <ItemMovie showBuyTicketButton={true} />
                        <ItemMovie showBuyTicketButton={true} />
                        <ItemMovie showBuyTicketButton={true} />
                        <ItemMovie showBuyTicketButton={true} />
                        <ItemMovie showBuyTicketButton={true} />
                    </div>
                </div>
                <div className={cx('pagination')}>
                    <Stack spacing={2}>
                        <Pagination
                            count={100}
                            size={isMobile ? 'small' : 'large'}
                            renderItem={(item) => <PaginationItem {...item} />}
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    fontSize: {
                                        xs: '12px',
                                        sm: '14px',
                                        md: '16px',
                                    },
                                    '& svg': {
                                        fontSize: {
                                            xs: '16px',
                                            sm: '18px',
                                            md: '20px',
                                        },
                                    },
                                    margin: '0 0px',
                                },
                            }}
                        />
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default NowShowing;
