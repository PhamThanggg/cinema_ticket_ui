import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Booking from '~/pages/Booking';
import Showing from '~/pages/ShowMovie/ShowingPage';
import Coming from '~/pages/ShowMovie/CommingPage';
import MovieDetail from '~/pages/MovieDetail';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.booking, component: Booking },
    { path: config.routes.Showing, component: Showing },
    { path: config.routes.ComingSoon, component: Coming },
    { path: config.routes.MovieDetail, component: MovieDetail },
];

const privateRoutes = [{ path: config.routes.profile, component: Profile }];

export { publicRoutes, privateRoutes };
