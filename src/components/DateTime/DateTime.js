import Slider from 'react-slick';

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
        const date = `${nextDate.getDate().toString().padStart(2, '0')}/${(nextDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`;

        next7Days.push({ name, date });
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

function DateTime({ count = 6 }) {
    // const [selectedDate, setSelectedDate] = useState(null);
    const days = getNext7Days();

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

    // const handleDateClick = (day) => {
    //     setSelectedDate(day.date);
    // };

    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                {days.map((day, index) => (
                    <div key={index} className={cx('slider-item')}>
                        <div className={cx('date-item')}>
                            <button className={cx('date')}>
                                <p className={cx('day-name')}>{day.name}</p>
                                <p className={cx('day-date')}>{day.date}</p>
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default DateTime;
