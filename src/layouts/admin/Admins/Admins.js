import classNames from 'classnames/bind';
import style from './Admins.module.scss';
import { ApexChart } from './Chart/Chart';
import BasicLineChart from './Chart/LineChart';

const cx = classNames.bind(style);

function Admins() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                DashBoards / <span>Tổng quan</span>
            </div>
            <div className={cx('ctn')}>
                <div className={cx('statistic')}>
                    <div className={cx('block_one', 'blue')}>
                        <div className={cx('block_margin')}>
                            <div className={cx('name')}>Doanh thu theo ngày (15-11-2024)</div>
                            <div className={cx('count')}>760.000</div>
                        </div>
                    </div>
                    <div className={cx('block', 'green')}>
                        <div className={cx('block_margin')}>
                            <div className={cx('name')}>Khách hàng mới (15-11-2024)</div>
                            <div className={cx('count')}>760.000</div>
                        </div>
                    </div>
                    <div className={cx('block', 'orange')}>
                        <div className={cx('block_margin')}>
                            <div className={cx('name')}>Tổng vé bán ra (15-11-2024)</div>
                            <div className={cx('count')}>760.000</div>
                        </div>
                    </div>
                    <div className={cx('block', 'pink')}>
                        <div className={cx('block_margin')}>
                            <div className={cx('name')}>Tổng doanh thu (15-11-2024)</div>
                            <div className={cx('count')}>760.000</div>
                        </div>
                    </div>
                </div>
                <div className={cx('chart')}>
                    <ApexChart />

                    <BasicLineChart />
                </div>
                <div className={cx('list')}></div>
            </div>
        </div>
    );
}

export default Admins;
