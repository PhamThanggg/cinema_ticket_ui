// import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MovieDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function MovieDetail() {
    // const location = useLocation();
    // const { movieId } = location.state || {};

    const [showTrailer, setShowTrailer] = useState(false);

    const handlePlayTrailer = () => {
        setShowTrailer(true);
    };

    const handleCloseTrailer = () => {
        setShowTrailer(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('trailer')} onClick={handlePlayTrailer}>
                <div className={cx('overlay', 'left')}></div>
                <img
                    className={cx('trailer_img')}
                    src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg"
                    alt=""
                />
                <FontAwesomeIcon className={cx('icon')} icon={faCirclePlay} />
            </div>

            {showTrailer && (
                <div className={cx('trailer-popup')} onClick={handleCloseTrailer}>
                    <div className={cx('trailer-container')} onClick={(e) => e.stopPropagation()}>
                        <iframe
                            width="1080"
                            height="480"
                            src={'https://www.youtube.com/embed/EjnPaUaWeWg'}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button onClick={handleCloseTrailer} className={cx('close-trailer')}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                </div>
            )}

            <div style={{ height: '100px' }}>
                <div>
                    <div>
                        <img
                            src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg"
                            alt=""
                        />
                        <div>
                            <h2>Transformers Một</h2>
                            <div>
                                <p>104 phút</p>
                                <p>27/9/2024</p>
                            </div>
                            <div>8.5 (199 votes)</div>
                            <div>
                                Quốc gia: <span>Mỹ</span>
                            </div>
                            <div>
                                Nhà sản xuất: <span>Thang Pham</span>
                            </div>
                            <div>
                                <div>Thể loại</div>
                                <div>Hành động</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
