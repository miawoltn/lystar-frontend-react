import React, {Fragment, Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import EntryFrom from './EntryForm';

export default class StudentAdmission extends Component {
    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                        <div>
                        <PageTitle
                            heading="Admission"
                            subheading="Add a new student"
                            icon="pe-7s-add-user icon-gradient bg-mean-fruit"
                        />
                        <EntryFrom />
                        </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
