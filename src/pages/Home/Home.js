import Slider from './Slider';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Movie from '~/layouts/components/Movie';
import Promotion from './Promotion';
import { useEffect, useState } from 'react';
import { MovieShowNowApi } from '~/service/MovieService';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Home() {
    const movieType = 'Phim Đang Chiếu';
    const movieType2 = 'Phim Sắp Chiếu';
    const [res, setRes] = useState(null);
    const [resC, setResC] = useState(null);

    useEffect(() => {
        getMovieShowNow();
    }, []);

    const getMovieShowNow = async () => {
        try {
            const showNowApi = await MovieShowNowApi(1, 0, 4);
            const comming = await MovieShowNowApi(0, 0, 4);

            setRes(showNowApi);
            setResC(comming);
        } catch (error) {
            console.log('Error fetching movie data:', error);
        }
    };

    if (!res || !resC) {
        return <Loading />;
    }

    return (
        <div className={cx('wrapper')}>
            <Slider />
            <div className={cx('wrapper-movie')}>
                <Movie movieType={movieType} showBuyTicketButton={true} movieData={res.result} status={0} />
                <Movie movieType={movieType2} showBuyTicketButton={false} movieData={resC.result} status={1} />
                <Promotion />
            </div>
        </div>
    );
}

export default Home;
