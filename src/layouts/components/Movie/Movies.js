import classNames from 'classnames/bind';
import styles from './Movie.module.scss';
import styleGrid from '~/components/GlobalStyles/Grid.module.scss';
import ItemMovie from './ItemMovie';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const cw = classNames.bind(styleGrid);

function Movie({ movieType, showBuyTicketButton, movieData }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cw('grid', 'wide')}>
                <div className={cx('ctn')}>
                    <div className={cx('wrapper-btn')}>
                        <div className={cx('showing')}>
                            <p className={cx('showing-name')}>{movieType}</p>
                        </div>
                        <div className={cx('more-item')}>
                            <Button text className={cx('btn-more')}>
                                Xem thêm
                            </Button>
                        </div>
                    </div>
                    <div className={cw('row')}>
                        {movieData.map((item, index) => (
                            <ItemMovie
                                key={index}
                                showBuyTicketButton={showBuyTicketButton}
                                movieItemData={item}
                                movieId={item.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;
