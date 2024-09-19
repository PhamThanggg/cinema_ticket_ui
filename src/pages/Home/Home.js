import Slider from './Slider';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Movie from '~/layouts/components/Movie';
import Promotion from './Promotion';

const cx = classNames.bind(styles);

function Home() {
    const movieType = 'Phim Đang Chiếu';
    const movieType2 = 'Phim Sắp Chiếu';

    return (
        <div className={cx('wrapper')}>
            <Slider />
            <div className={cx('wrapper-movie')}>
                <Movie movieType={movieType} />
                <Movie movieType={movieType2} />
                <Promotion />
            </div>
        </div>
    );
}

export default Home;
