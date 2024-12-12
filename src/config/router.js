const routes = {
    home: '/',
    profile: '/Profile',
    booking: '/Booking',

    //movie
    Showing: '/showing',
    ComingSoon: '/coming-soon',
    MovieDetail: '/Movie-detail',
    confirmation: '/Booking/confirmation',

    // admin
    Admin: '/Admin',
    CinemaManagement: '/Admin/CinemaManagement',
    CinemaAdd: '/Admin/CinemaManagement/add',
    CinemaRoom: '/Admin/CinemaManagement/list-room',
    ListMovie: '/Admin/MovieManagement/list-movie',
    ListSchedule: '/Admin/ScheduleManagement/list-schedule',
    ListGenre: '/Admin/GenreManagement/list-genre',
    ListCombo: '/Admin/GenreManagement/list-combo',
    ListBooking: '/Admin/GenreManagement/list-booking',
    ListUser: '/Admin/GenreManagement/list-user',
    ListRole: '/Admin/GenreManagement/list-role',
    revenueMovie: '/Admin/revenue_movie',
    revenueCinema: '/Admin/revenue_cinema',
    MovieAdd: '/Admin/MovieManagement/add',
    ListPromotion: '/Admin/PromotionManagement/list-genre',
    ListActor: '/Admin/ActorManagement/list-genre',

    ListArea: '/Admin/CinemaManagement/list-area',
};

export default routes;
