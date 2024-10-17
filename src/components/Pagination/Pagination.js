import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PaginationS({ currentPage, totalPages, onPageChange }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Stack spacing={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    size={isMobile ? 'small' : 'large'}
                    onChange={(event, value) => onPageChange(value)}
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
    );
}

export default PaginationS;
