import classNames from 'classnames/bind';
import styles from './CommingSoon.module.scss';
import styleGrid from '~/components/GlobalStyles/Grid.module.scss';
import ItemMovie from '~/layouts/components/Movie/ItemMovie';
import PaginationS from '~/components/Pagination';
import ShowMovies from '../ShowMovies';

const cx = classNames.bind(styles);
const cw = classNames.bind(styleGrid);

function CommingSoon({ showComingApi, currentPage, handlePageChange, onAreaChange }) {
    return (
        <ShowMovies onAreaChange={onAreaChange}>
            <div className={cx('wrapper')}>
                <div className={cw('grid', 'wide')}>
                    <div className={cx('ctn')}>
                        <div className={cw('row')}>
                            {showComingApi.result.map((item, index) => (
                                <ItemMovie
                                    key={index}
                                    showBuyTicketButton={false}
                                    movieItemData={item}
                                    movieId={item.id}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={cx('pagination')}>
                        <PaginationS
                            currentPage={currentPage}
                            totalPages={showComingApi.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </ShowMovies>
    );
}

export default CommingSoon;
