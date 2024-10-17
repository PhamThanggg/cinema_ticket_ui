import Slider from 'react-slick';
import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './DateTime.module.scss';

const cx = classNames.bind(styles);

// Hàm để lấy 7 ngày kể từ ngày hiện tại
const getNext7Days = () => {
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const today = new Date();
    const next7Days = [];

    for (let i = 0; i < 7; i++) {
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + i);

        // Lấy tên ngày và định dạng ngày (dd/MM)
        const name = i === 0 ? 'Hôm Nay' : daysOfWeek[nextDate.getDay()];
        const dateDisplay = `${nextDate.getDate().toString().padStart(2, '0')}/${(nextDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`;
        const date = `${nextDate.getDate().toString().padStart(2, '0')}/${(nextDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${nextDate.getFullYear()}`;

        next7Days.push({ name, date, dateDisplay });
    }

    return next7Days;
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button className={cx('slick-prev')} onClick={onClick}>
            &lt;
        </button>
    );
};

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <button className={cx('slick-next')} onClick={onClick}>
            &gt;
        </button>
    );
};

function DateTime({ count = 6, onDateSelect }) {
    const days = getNext7Days();
    const [selectedDate, setSelectedDate] = useState(days[0].date);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: count,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1239,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '-35px',
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '-37px',
                },
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '0px',
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '0px',
                },
            },
        ],
    };

    const handleDateClick = (day) => {
        if (day) {
            setSelectedDate(day);
            onDateSelect(day);
        } else {
            console.error('fullDate is undefined for:', day);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                {days.map((day, index) => (
                    <div key={index} className={cx('slider-item')}>
                        <div className={cx('date-item')}>
                            <button
                                className={cx('date', {
                                    'selected-date': selectedDate && selectedDate === day.date,
                                })}
                                onClick={() => handleDateClick(day.date)}
                            >
                                <p className={cx('day-name')}>{day.name}</p>
                                <p className={cx('day-date')}>{day.dateDisplay}</p>
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default DateTime;
