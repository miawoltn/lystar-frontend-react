import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import {
    ToastContainer,
} from 'react-toastify';

//const Dashboards = lazy(() => import('../../Pages/Dashboards'));

const Student = lazy(() => import('../../Pages/Students'))

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
                            Please wait while we load all the Dashboards examples
                            <small>Because this is a demonstration, we load at once all the Dashboards examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/student" component={Student}/>
            </Suspense>

            <Route exact path="/" render={() => (
                <Redirect to="/student/admission"/>
            )}/>
            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;