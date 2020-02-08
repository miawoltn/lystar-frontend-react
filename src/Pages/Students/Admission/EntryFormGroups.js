import React, {Fragment} from 'react';
import {Field} from 'formik';
import {
    Col, Row, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';

// Pesonal Info
export const PersonalInfoFormGroup = (values, errors, touched) => {
    return (
        <Fragment>
 {/* <Formik
                    initialValues={{
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        gender: '',
                        dob: '',
                        address: '',
                        city: '',
                        _state: '',
                    }}
                    validationSchema={this.entrollmentSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400)
                    }}>
                     {({ errors, touched, values }) => (
                                            )} 

                  </Formik> */}
        </Fragment>
    );
}

// Parent/Guardian
export const ParentGuardianFormGroup = () => {
    return (
        <p></p>
    );
}