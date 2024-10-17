import classNames from 'classnames/bind';
import styles from './NowShowing.module.scss';
import styleGrid from '~/components/GlobalStyles/Grid.module.scss';
import ItemMovie from '~/layouts/components/Movie/ItemMovie';
import PaginationS from '~/components/Pagination';
import ShowMovies from '../ShowMovies';

const cx = classNames.bind(styles);
const cw = classNames.bind(styleGrid);

function NowShowing({ showNowApi, currentPage, handlePageChange, onAreaChange }) {
    return (
        <ShowMovies onAreaChange={onAreaChange}>
            <div className={cx('wrapper')}>
                <div className={cw('grid', 'wide')}>
                    <div className={cx('ctn')}>
                        <div className={cw('row')}>
                            {showNowApi.result.map((item, index) => (
                                <ItemMovie
                                    key={index}
                                    showBuyTicketButton={true}
                                    movieItemData={item}
                                    movieId={item.id}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={cx('pagination')}>
                        <PaginationS
                            currentPage={currentPage}
                            totalPages={showNowApi.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </ShowMovies>
    );
}

export default NowShowing;
