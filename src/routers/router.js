import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import config from '~/config';

const publicRoutes = [{ path: config.routes.home, component: Home }];

const privateRoutes = [{ path: config.routes.profile, component: Profile }];

export { publicRoutes, privateRoutes };
