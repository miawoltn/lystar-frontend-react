import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import {
    ToastContainer,
} from 'react-toastify';

//const Dashboards = lazy(() => import('../../Pages/Dashboards'));

const Student = lazy(() => import('../../Pages/Students'))
const Academics = lazy(() => import('../../Pages/Academics'))

// const Widgets = lazy(() => import('../../Pages/Widgets'));
// const Elements = lazy(() => import('../../Pages/Elements'));
// const Components = lazy(() => import('../../Pages/Components'));
// const Charts = lazy(() => import('../../Pages/Charts'));
// const Forms = lazy(() => import('../../Pages/Forms'));
// const Tables = lazy(() => import('../../Pages/Tables'));

const AppMain = () => {

    return (
        <Fragment>

            {/* Dashboards */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Lytstar
                            <small>Please wait while the app loads...</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/student" component={Student}/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Lytstar
                            <small>Please wait while the app loads...</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/academics" component={Academics}/>
            </Suspense>

            <Route exact path="/" render={() => (
                <Redirect to="/student/admission"/>
            )}/>
            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;