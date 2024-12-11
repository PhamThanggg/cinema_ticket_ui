import classNames from 'classnames/bind';
import styles from './Movie.module.scss';
import styleGrid from '~/components/GlobalStyles/Grid.module.scss';
import ItemMovie from './ItemMovie';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/router';

const cx = classNames.bind(styles);
const cw = classNames.bind(styleGrid);

function Movie({ movieType, showBuyTicketButton, movieData, status }) {
    const navigate = useNavigate();

    const handleShowMore = () => {
        if (status === 0) {
            navigate(routes.Showing);
        } else {
            navigate(routes.ComingSoon);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cw('grid', 'wide')}>
                <div className={cx('ctn')}>
                    <div className={cx('wrapper-btn')}>
                        <div className={cx('showing')}>
                            <p className={cx('showing-name')}>{movieType}</p>
                        </div>
                        <div className={cx('more-item')}>
                            <Button text className={cx('btn-more')} onClick={handleShowMore}>
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
