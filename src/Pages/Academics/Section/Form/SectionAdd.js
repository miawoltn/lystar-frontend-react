import React from 'react';
import {
    Form, Button, FormGroup, Label, Input,
    Card, CardBody, Col, FormFeedback
} from 'reactstrap';

export default function (props) {
    return (
        <Col lg="4">
            <h4>Add New Section</h4>
            <Card>
                <CardBody>
                    <Form onSubmit={props.handleSubmit(props.onSubmit)}>
                        <FormGroup>
                            <Label for="sectionName">Name*</Label>
                            <Input
                                type="text"
                                name="sectionName"
                                id="sectionName"
                                innerRef={props.register({ required: true, maxLength: 20 })}
                                invalid={props.errors.sectionName && true}
                                defaultValue={props.currentSection && props.currentSection.name}
                                placeholder="Enter section name" />
                            <FormFeedback>
                                {props.errors.sectionName && props.errors.sectionName.type === 'required' && 'Section name is required'}
                            </FormFeedback>
                            <FormFeedback>
                                {props.errors.sectionName && props.errors.sectionName.type === 'maxLength' && 'Too long. 20 characters max.'}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="sectionCode">Code</Label>
                            <Input
                                type="text"
                                name="sectionCode"
                                id="sectionCode"
                                innerRef={props.register}
                                defaultValue={props.currentSection && props.currentSection.code}
                                placeholder="Enter section code" />
                        </FormGroup>
                        <div className="text-center">
                            <Button color="primary" size="lg" className="mt-1">Save Section</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    )
}