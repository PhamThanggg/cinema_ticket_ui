import Home from '~/pages/Home';
import Profile from '~/pages/ProfilePage';
import Booking from '~/pages/Booking';
import Showing from '~/pages/ShowMoviePage/ShowingPage';
import Coming from '~/pages/ShowMoviePage/CommingPage';
import MovieDetail from '~/pages/MovieDetail';
import Confirmation from '~/pages/Booking/ConfirmationPage/ConfirmationPage';
import config from '~/config';
import AdminPage from '~/pages/Admin/AdminHomePage';
import CinemaManagementPage from '~/pages/Admin/CinemaManagementPage/CinemaManagementPage';
import CinemaAdd from '~/pages/Admin/CinemaManagementPage/CinemaAddPage';
import ListRoomPage from '~/pages/Admin/CinemaManagementPage/ListRoomPage';
import ListMoviePage from '~/pages/Admin/MovieManagementPage/ListMoviePage';
import GenreManagementPage from '~/pages/Admin/GenreManagementPage';
import ScheduleManagementPage from '~/pages/Admin/ScheduleManagementPage';
import RevenueCinemaPage from '~/pages/Admin/AdminHomePage/RevenueCinemaPage';
import RevenueMoviePage from '~/pages/Admin/AdminHomePage/RevenueMoviePage';
import MovieAddPage from '~/pages/Admin/MovieManagementPage/MovieAddPage/MovieAddPage';
import ComboManagementPage from '~/pages/Admin/ComboManagementPage';
import BookingManagementPage from '~/pages/Admin/BookingManagementPage';
import UserManagementPage from '~/pages/Admin/UserManagementPage';
import RoleManagementPage from '~/pages/Admin/RoleManagementPage';
import AreaManagementPage from '~/pages/Admin/AreaManagementPage';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.Showing, component: Showing },
    { path: config.routes.ComingSoon, component: Coming },
    { path: config.routes.MovieDetail, component: MovieDetail },
];

const privateRoutes = [
    { path: config.routes.profile, component: Profile },
    { path: config.routes.booking, component: Booking },
    { path: config.routes.confirmation, component: Confirmation },
];

export const adminRoutes = [
    { path: config.routes.Admin, component: AdminPage },
    { path: config.routes.CinemaManagement, component: CinemaManagementPage },
    { path: config.routes.CinemaAdd, component: CinemaAdd },
    { path: config.routes.CinemaRoom, component: ListRoomPage },
    { path: config.routes.ListMovie, component: ListMoviePage },
    { path: config.routes.ListGenre, component: GenreManagementPage },
    { path: config.routes.ListSchedule, component: ScheduleManagementPage },
    { path: config.routes.revenueCinema, component: RevenueCinemaPage },
    { path: config.routes.revenueMovie, component: RevenueMoviePage },
    { path: config.routes.MovieAdd, component: MovieAddPage },
    { path: config.routes.ListCombo, component: ComboManagementPage },
    { path: config.routes.ListBooking, component: BookingManagementPage },
    { path: config.routes.ListUser, component: UserManagementPage },
    { path: config.routes.ListRole, component: RoleManagementPage },
    { path: config.routes.ListArea, component: AreaManagementPage },
];

export { publicRoutes, privateRoutes };
