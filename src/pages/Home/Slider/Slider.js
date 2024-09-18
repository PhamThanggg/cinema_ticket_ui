import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './Slider.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Slide() {
    const images = [
        'https://cdn.galaxycine.vn/media/2024/9/9/tim-kiem-tai-nang-am-phu-2048-sneak-_1725856218383.jpg',
        'https://cdn.galaxycine.vn/media/2024/8/29/2048_1724920527246.jpg',
        'https://cdn.galaxycine.vn/media/2024/9/9/cam-2048_1725872495016.jpg',
        'https://cdn.galaxycine.vn/media/2024/9/9/shopee-pay-1_1725853205539.jpg',
    ];

    const settings = {
        dots: true, // Hiển thị các chấm tròn để chuyển ảnh
        infinite: true, // Cho phép vòng lặp lại slider
        speed: 500, // Tốc độ chuyển ảnh
        slidesToShow: 1, // Số ảnh hiển thị mỗi lần
        slidesToScroll: 1, // Số ảnh cuộn mỗi lần
        autoplay: true, // Tự động chuyển ảnh
        autoplaySpeed: 3000, // Thời gian giữa các lần chuyển ảnh (3000ms = 3 giây)
    };

    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <a className={cx('image-link')} href={'/'} key={index}>
                        <div className={cx('slides')}>
                            <img src={image} alt={`Slide ${index + 1}`} className={cx('image')} />
                        </div>
                    </a>
                ))}
            </Slider>
        </div>
    );
}

export default Slide;
