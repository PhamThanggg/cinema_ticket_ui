import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routers';
import { AuthProvider, useAuth } from '~/components/Context/AuthContext';

import { DefaultLayout } from '~/layouts';

function AppRoutes() {
    const { state } = useAuth();

    return (
        <Routes>
            {publicRoutes.map((route, index) => {
                let Layout = DefaultLayout;
                if (route.layout) {
                    Layout = route.layout;
                } else if (route.layout === null) {
                    Layout = Fragment;
                }

                const Page = route.component;
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}

            {/* Private Routes */}
            {privateRoutes.map((route, index) => {
                let Layout = DefaultLayout;
                if (route.layout) {
                    Layout = route.layout;
                } else if (route.layout === null) {
                    Layout = Fragment;
                }

                const Page = route.component;
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            state.isAuthenticated ? (
                                <Layout>
                                    <Page />
                                </Layout>
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                );
            })}
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <AppRoutes />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
