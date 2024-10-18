import Home from '~/pages/Home';
import Profile from '~/pages/ProfilePage';
import Booking from '~/pages/Booking';
import Showing from '~/pages/ShowMoviePage/ShowingPage';
import Coming from '~/pages/ShowMoviePage/CommingPage';
import MovieDetail from '~/pages/MovieDetail';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.Showing, component: Showing },
    { path: config.routes.ComingSoon, component: Coming },
    { path: config.routes.MovieDetail, component: MovieDetail },
];

const privateRoutes = [
    { path: config.routes.profile, component: Profile },
    { path: config.routes.booking, component: Booking },
];

export { publicRoutes, privateRoutes };
