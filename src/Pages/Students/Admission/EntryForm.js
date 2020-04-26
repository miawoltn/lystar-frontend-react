import React, { Fragment } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import { useForm } from 'react-hook-form';
import * as Yup from 'yup'; 
import axios from 'axios';
import {
    Col, Row, Card, CardBody, Form,
    CardTitle, Button, FormGroup, Label, Input, FormFeedback, CustomInput
} from 'reactstrap';


const entrollmentSchema = Yup.object().shape({
    firstName: Yup.string()
        .trim()
        .required('First Name is required')
        .min(2, 'Too short!')
        .max(50, 'Too long!'),
    lastName: Yup.string()
        .trim()
        .required('Last Name is required')
        .min(2, 'Too short!')
        .max(50, 'Too long!'),
    gender: Yup.string()
        .required('Gender is required'),
    dob: Yup.date()
        .required('Date of birth is required'),
    email: Yup.string()
        .email('Invalid email'),
});

export default function EntryForm() {

    const { register, handleSubmit, errors } = useForm({
        validationSchema: entrollmentSchema
    });
    const onSubmit = data => {
        console.log(data);
        let headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"

        }
        axios.post('https://192.168.0.33:44319/api/students', {
            name: {
                FirstName: data.firstName,
                LastName: data.lastName
            }, 
            DOB: data.dob,
            Gender: data.gender,
        }, headers)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
       
    }

    return (
        <Fragment>

            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Card className="main-card mb-3">
                    <CardBody>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            {/* Enrollment */}
                            <CardTitle>Enrollment Details</CardTitle>
                            <div className="divider" />
                            <Row form>
                                {/* Admission No */}
                                <Col>
                                    <FormGroup>
                                        <Label for="addmissionNo">Admission Number</Label>
                                        <Input type="text" name="addmissionNo"
                                            disabled />
                                    </FormGroup>
                                </Col>
                                {/* Session */}
                                <Col>
                                    <FormGroup>
                                        <Label for="session">Session</Label>
                                        <Input type="select" name="session" id="session">
                                            <option>2020</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                                {/* Class */}
                                <Col>
                                    <FormGroup>
                                        <Label for="studentClass">Class</Label>
                                        <Input type="select" name="studentClass" id="studentClaass">
                                            <option></option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                {/* Group */}
                                <Col>
                                    <FormGroup>
                                        <Label for="sutdentGroup">Group</Label>
                                        <Input type="select" name="sutdentGroup" >
                                            <option></option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                {/* Section */}
                                <Col>
                                    <FormGroup>
                                        <Label for="sutdentSection">Section</Label>
                                        <Input type="select" name="sutdentSection">
                                            <option></option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                {/* Admission Date */}
                                <Col>
                                    <FormGroup>
                                        <Label for="admissionDate">AdmissionDate</Label>
                                        <Input type="date" name="admissionDate"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* Student Info */}
                            <CardTitle>Personal Information</CardTitle>
                            <div className="divider" />
                            {/* <PersonalInfoFormGroup errors={errors} touched={touched} values={values} /> */}
                            <Row form>
                                {/* First Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="firstName">First Name*</Label>
                                        <Input type="text" name="firstName" innerRef={register}
                                            invalid={errors.firstName && true}
                                            placeholder="Enter student's first name" />
                                        <FormFeedback >{errors.firstName && errors.firstName.message}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                {/* Middle Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="middleName">Middle Name</Label>
                                        <Input type="text" name="middleName" id="middleName" innerRef={register}
                                            placeholder="Enter student's middle name" />
                                    </FormGroup>
                                </Col>
                                {/* Last Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="lastName">Last Name*</Label>
                                        <Input type="text" name="lastName" id="lastName" innerRef={register}
                                            invalid={errors.lastName && true}
                                            placeholder="Enter student's last name" />
                                        <FormFeedback>{errors.lastName && errors.lastName.message}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                {/* Gender */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="gender">Gender*</Label>
                                        <Input type="select" name="gender" id="gender" innerRef={register}
                                            invalid={errors.gender && true}
                                        >
                                            <option value="">Select...</option>
                                            <option value="0">Male</option>
                                            <option value="1">Female</option>
                                        </Input>
                                        <FormFeedback>{errors.gender && errors.gender.message}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                {/* Date of Birth */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="dob">Date of Birth*</Label>
                                        <Input type="date" name="dob" id="dob" innerRef={register}
                                            invalid={errors.dob && true}
                                        />
                                        <FormFeedback>{errors.dob && errors.dob.message}</FormFeedback>

                                    </FormGroup>
                                </Col>
                                {/* Eamil */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email"
                                            innerRef={register}
                                            invalid={errors.email && true}
                                        />
                                        <FormFeedback>{errors.email && errors.email.message}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                {/* Phone Number */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="phone">Phone Number</Label>
                                        <Input type="text" name="phone" id="phone"
                                            innerRef={register}
                                            invalid={errors.phone && true}
                                        />
                                        <FormFeedback>{errors.phone && errors.phone.message}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                {/* Blood Group */}
                                <Col>
                                    <FormGroup>
                                        <Label for="bloodGroup">Blood Group</Label>
                                        <Input type="select" name="bloodGroup" id="bloodGroup" innerRef={register} >
                                            <option value="">Select...</option>
                                            <option value="0">A+</option>
                                            <option value="1">A-</option>
                                            <option value="2">O+</option>
                                            <option value="3">O-</option>
                                            <option value="4">B+</option>
                                            <option value="5">B-</option>
                                            <option value="6">AB+</option>
                                            <option value="7">AB-</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                {/* Disorder */}
                                <Col>
                                    <FormGroup>
                                        <Label for="disorder">Disorder</Label>
                                        <Input type="select" name="disorder" id="disorder" innerRef={register} >
                                            <option value="">Select...</option>
                                            <option value="0">Normal</option>
                                            <option value="1">OCD</option>
                                            <option value="2">ADHD</option>
                                            <option value="3">ODD</option>
                                            <option value="4">AD</option>
                                            <option value="5">CD</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                {/* Religion */}
                                <Col>
                                    <FormGroup>
                                        <Label for="religion">Religion</Label>
                                        <Input type="select" name="religion" id="religion" innerRef={register} >
                                            <option value="">Select...</option>
                                            <option value="0">Islam</option>
                                            <option value="1">Christianity</option>
                                            <option value="2">Judaism</option>
                                            <option value="3">Others</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                 {/* Height */}
                                 <Col>
                                    <FormGroup>
                                        <Label for="height">Height (CM)</Label>
                                        <Input type="number" name="height" id="height" innerRef={register}
                                            invalid={errors.height && true}
                                        />
                                        <FormFeedback>{errors.height && errors.height.message}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                {/* Weight */}
                                <Col>
                                    <FormGroup>
                                        <Label for="weight">Weight (KG)</Label>
                                        <Input type="number" name="weight" id="weight" innerRef={register}
                                            invalid={errors.weight && true}
                                        />
                                        <FormFeedback>{errors.weight && errors.weight.message}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                {/* Photo */}
                                <Col>
                                    <FormGroup>
                                        <Label for="photo">Photo</Label>
                                        <CustomInput type="file" name="photo" id="photo" innerRef={register} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* Address Line 1 */}
                            <FormGroup>
                                <Label for="Address1">Address*</Label>
                                <Input type="text" name="Address1" id="Address1"
                                    placeholder="1234 Main St" innerRef={register} />
                            </FormGroup>
                            {/* Address Line2 */}
                            <FormGroup>
                                <Label for="Address2">Address 2</Label>
                                <Input type="text" name="Address2" id="Address2"
                                    placeholder="Apartment, studio, or floor" innerRef={register} />
                            </FormGroup>
                            <Row form>
                                {/* City */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="city">City</Label>
                                        <Input type="select" name="city" id="city" innerRef={register} >
                                            <option value="">Select...</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                {/* State */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="state">State</Label>
                                        <Input type="select" name="state" id="state" innerRef={register} >
                                            <option value="">Select...</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                {/* Zip Code */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="studentZip">Zip</Label>
                                        <Input type="text" name="studentZip" id="studentZip" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* Father's Info */}
                            <CardTitle>Parent/Guardian Information</CardTitle>
                            <div className="divider" />
                            <Row form>
                                {/* Father's First Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="fatherFirstName">Father's First Name</Label>
                                        <Input type="text" name="fatherFirstName" id="fatherFirstName" />
                                    </FormGroup>
                                </Col>
                                {/* Father's Middle Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="fatherMiddleName">Father's Middle Name</Label>
                                        <Input type="text" name="fatherMiddleName" id="fatherMiddleName" />
                                    </FormGroup>
                                </Col>
                                {/* Father's Last Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="fatherLastName">Father's Last Name</Label>
                                        <Input type="text" name="fatherLastName" id="fatherLastName" />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                {/* Father's Email */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="fatherEmail">Father's Email</Label>
                                        <Input type="email" name="fatherEmail" id="fatherEmail" />
                                    </FormGroup>
                                </Col>
                                {/* Father's Phone */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="fatherPhone">Father's Phone</Label>
                                        <Input type="text" name="fatherPhone" id="fatherPhone" />
                                    </FormGroup>
                                </Col>
                                {/* Father's Job */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="fatherJob">Father's Job</Label>
                                        <Input type="text" name="fatherJob" id="fatherJob" />
                                    </FormGroup>
                                </Col>
                                {/* Father's Photo */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="fatherPhoto">Father's Photo</Label>
                                        <CustomInput type="file" name="fatherPhoto" id="fatherPhoto" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="divider" />
                            {/* Mother's Info */}
                            <Row form>
                                {/* Mother's First Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="motherFirstName">Mother's First Name</Label>
                                        <Input type="text" name="motherFirstName" id="motherFirstName" />
                                    </FormGroup>
                                </Col>
                                {/* Mother's Middle Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="motherMiddleName">Mother's Middle Name</Label>
                                        <Input type="text" name="motherMiddleName" id="motherMiddleName" />
                                    </FormGroup>
                                </Col>
                                {/* Mother's Last Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="motherLastName">Mother's Last Name</Label>
                                        <Input type="text" name="motherLastName" id="motherLastName" />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row form>
                                {/* Mother's Email */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="motherEmail">Mother's Email</Label>
                                        <Input type="email" name="motherEmail" id="motherEmail" />
                                    </FormGroup>
                                </Col>
                                {/* Mother's Phone */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="motherPhone">Mother's Phone</Label>
                                        <Input type="text" name="motherPhone" id="motherPhone" />
                                    </FormGroup>
                                </Col>
                                {/* Mother's Job */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="motherJob">Mother's Job</Label>
                                        <Input type="text" name="motherJob" id="motherJob" />
                                    </FormGroup>
                                </Col>
                                {/* Mother's Photo */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="motherPhoto">Mother's Photo</Label>
                                        <CustomInput type="file" name="motherPhoto" id="motherPhoto" />
                                    </FormGroup>
                                </Col>
                            </Row>

                            {/* Guardian Options */}
                            <Row form>
                                <Col md={2}>
                                    <Label>Guardian same as: </Label>
                                </Col>
                                <Col md={1}>
                                    <CustomInput type="radio" name="gurdianFather" label="Father" />
                                </Col>
                                <Col md={1}>
                                    <CustomInput type="radio" name="gurdianMother" label="Mother" />
                                </Col>
                                <Col md={1}>
                                    <CustomInput type="radio" name="gurdianOther" label="Other" />
                                </Col>
                            </Row>
                            <div className="divider" />
                            {/* Guardian Info */}
                            <Row form>
                                {/* Guardian's First Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="guardianFirstName">Guardian's First Name</Label>
                                        <Input type="text" name="guardianFirstName" id="guardianFirstName" />
                                    </FormGroup>
                                </Col>
                                {/* Guardian's Middle Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="guardianMiddleName">Guardian's Middle Name</Label>
                                        <Input type="text" name="guardianMiddleName" id="guardianMiddleName" />
                                    </FormGroup>
                                </Col>
                                {/* Guardian's Last Name */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="guardianLastName">Guardian's Last Name</Label>
                                        <Input type="text" name="guardianLastName" id="guardianLastName" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                {/* Guardian's Email */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="guardianEmail">Guardian's Email</Label>
                                        <Input type="email" name="guardianEmail" id="guardianEmail" />
                                    </FormGroup>
                                </Col>
                                {/* Guardian's Phone */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="guardianPhone">Guardian's Phone</Label>
                                        <Input type="text" name="guardianPhone" id="guardianPhone" />
                                    </FormGroup>
                                </Col>
                                {/* Guardian's Job */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="guardianJob">Guardian's Job</Label>
                                        <Input type="text" name="guardianJob" id="guardianJob" />
                                    </FormGroup>
                                </Col>
                                {/* Guardian's Photo */}
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="guardianPhoto">Guardian's Photo</Label>
                                        <CustomInput type="file" name="guardianPhoto" id="guardianPhoto" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* Address Info */}
                            {/* Address Line 1 */}
                            <FormGroup>
                                <Label for="exampleAddress">Address*</Label>
                                <Input type="text" name="address" id="exampleAddress"
                                    placeholder="1234 Main St" />
                            </FormGroup>
                            {/* Address Line2 */}
                            <FormGroup>
                                <Label for="exampleAddress2">Address 2</Label>
                                <Input type="text" name="address2" id="exampleAddress2"
                                    placeholder="Apartment, studio, or floor" />
                            </FormGroup>
                            <Row form>
                                {/* City */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="city">City</Label>
                                        <Input type="text" name="city" id="city" />
                                    </FormGroup>
                                </Col>
                                {/* State */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="state">State</Label>
                                        <Input type="text" name="state" id="state" />
                                    </FormGroup>
                                </Col>
                                {/* Zip Code */}
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="zip">Zip</Label>
                                        <Input type="text" name="zip" id="zip" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* Education History */}
                            <CardTitle>Education History</CardTitle>
                            <div className='divider' />
                            <Row form>
                                {/* School Name */}
                                <Col>
                                    <Label for="prevSchool">Previous School Name</Label>
                                    <Input type="text" name="prevSchool" id="prevSchool" />
                                </Col>
                                {/* Admission Number */}
                                <Col>
                                    <Label for="prevAdmissionNo">Admisson Number</Label>
                                    <Input type="text" name="prevAdmissionNo" id="prevAdmissionNo" />
                                </Col>
                                {/* Class */}
                                <Col>
                                    <Label for="prevClass">Class</Label>
                                    <Input type="text" name="prevClass" id="prevClass" />
                                </Col>
                                {/* Grade */}
                                <Col>
                                    <FormGroup>
                                        <Label for="prevGrade">Grade</Label>
                                        <Input type="text" name="prevGrade" id="prevGrade" />
                                    </FormGroup>

                                </Col>
                                {/* Year */}
                                <Col>
                                    <Label for="year">Year</Label>
                                    <Input type="text" name="year" id="year" />
                                </Col>
                            </Row>
                            {/* Additional Info */}
                            <CardTitle>Additional Info</CardTitle>
                            <div className="divider" />
                            {/* Document Titles */}
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="nationalID">National ID</Label>
                                        <Input type="text" name="nationalID" id="nationalID" />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="otherNotes">Other Notes</Label>
                                        <Input type="textarea" name="otherNotes" id="otherNotes" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="documentTitle1">Document 1</Label>
                                        <Input type="text" name="documentTitle1" id="documentTitle1" placeholder="Enter document title" />
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup>
                                        <Label for="documentTitle2">Document 2</Label>
                                        <Input type="text" name="documentTitle2" id="documentTitle2" placeholder="Enter document title" />
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup>
                                        <Label for="documentTitle3">Document 3</Label>
                                        <Input type="text" name="documentTitle3" id="docudocumentTitle3ent3" placeholder="Enter document title" />
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup>
                                        <Label for="documentTitle4">Document 4</Label>
                                        <Input type="text" name="documentTitle4" id="documentTitle4" placeholder="Enter document title" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* Documents */}
                            <Row>
                                <Col>
                                    <CustomInput type="file" name="file1" />
                                </Col>
                                <Col>
                                    <CustomInput type="file" name="file2" />
                                </Col>
                                <Col>
                                    <CustomInput type="file" name="file2" />
                                </Col>
                                <Col>
                                    <CustomInput type="file" name="file2" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <br />
                                </Col>
                            </Row>

                            {/* Submit */}
                            <div className="text-center">
                                <Button type="submit" color="primary" size="lg">Save Record</Button>
                            </div>

                        </Form>

                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>


        </Fragment>
    );
}
