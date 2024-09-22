import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Booking from '~/pages/Booking';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.booking, component: Booking },
];

const privateRoutes = [{ path: config.routes.profile, component: Profile }];

export { publicRoutes, privateRoutes };
