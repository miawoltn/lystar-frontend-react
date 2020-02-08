import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import logo from '../../lytstar.svg';
// import '../../App.css';

// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Components
import StudentAdmission from './Admission/';

const Student = ({match}) => (
            <Fragment>
            <AppHeader/>
            <div className="app-main">
                <AppSidebar/>
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Route path={`${match.url}/admission`} component={StudentAdmission}/>
                    </div>
                    {/* <AppFooter/> */}
                </div>
            </div>
        </Fragment>
)

export default Student;