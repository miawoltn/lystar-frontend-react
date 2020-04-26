import React from 'react'
import { useForm } from 'react-hook-form';
import {
    Form, Button, FormGroup, Label, Input,
    Card, CardBody, Col, FormFeedback
} from 'reactstrap';


export default function SectionForm(props) {
    console.log("SectionForm(props):", props) 
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        const section = {id: props.currentSection.id, name: data.sectionName, code: data.sectionCode}
        console.log("SectionForm:onSubmit", data, section);
        //var sectionFrom = document.getElementById("section-form");
        if(props.editMode) {
            props.onSectionEdit(section);
        } else {
            props.onSectionAdd(section);
        } 
        document.getElementById("section-form").reset();
        
    }   

    return (
        <Col lg="4">
            <h4>{!props.editMode ? 'Add New Section':'Edit Section'}</h4>
            <Card>
                <CardBody>
                    <Form id="section-form" onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <Label for="sectionName">Name*</Label>
                            <Input
                                type="text"
                                name="sectionName"
                                id="sectionName"
                                innerRef={register({ required: true, maxLength: 20 })}
                                invalid={errors.sectionName && true}
                                defaultValue={props.currentSection && props.currentSection.name}
                                placeholder="Enter section name" />
                            <FormFeedback>
                                {errors.sectionName && errors.sectionName.type === 'required' && 'Section name is required'}
                            </FormFeedback>
                            <FormFeedback>
                                {errors.sectionName && errors.sectionName.type === 'maxLength' && 'Too long. 20 characters max.'}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="sectionCode">Code</Label>
                            <Input
                                type="text"
                                name="sectionCode"
                                id="sectionCode"
                                innerRef={register}
                                defaultValue={props.currentSection && props.currentSection.code}
                                placeholder="Enter section code" />
                        </FormGroup>
                        <div className="text-center">
                            <Button color="primary" size="lg" className="mt-1">{!props.editMode? 'Save':'Edit'} Section</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
}