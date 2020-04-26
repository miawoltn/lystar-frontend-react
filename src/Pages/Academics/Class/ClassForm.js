import React from 'react'
import { useForm } from 'react-hook-form'; 
import {
    Form, Button, FormGroup, Label, Input,
    Card, CardBody, Col, FormFeedback, CustomInput
} from 'reactstrap';

export default function ClassForm(props) {
    console.log("ClassForm(props):", props) 
    const { register, handleSubmit, errors, getValues } = useForm();

    const onSubmit = data => {
        console.log("OnSubmit", data)
        
        const Class = {id: props.currentClass.id, name: data.className, shortName: data.shortName, sections: data.sections}
        console.log("ClassForm:onSubmit", data, Class);
        if(props.editMode) {
            props.onClassEdit(Class);
        } else {
            props.onClassAdd(Class);
        } 

        document.getElementById("class-form").reset();
    }

    const validateSections = _ => {
        const values = getValues({ nest: true });
        console.log("validate", values);
        return (
          values.sections.filter(v => Boolean(v)).length >= 1 || "Select at least one section."
        );
      };

    // const sectionList = props.sectionList.map((section, index) => {
    //     return (
    //         <option value={section.id}>{section.name}</option>
    //     )
    // })

    const sectionCheckboxes = props.sectionList.map((section, index) => {
        let _sections = [] 
        if(props.editMode) {
            console.log("ClassForm:EditMode:true")
            props.currentClass.sections.map(x => _sections.push(x.id))
            return (
                <CustomInput 
                    type="checkbox" 
                    id={section.id} 
                    label={section.name} 
                    value={section.id} innerRef={register({
                        validate: validateSections
                    })} 
                    invalid={errors.sections && true} 
                    name={`sections`} 
                    {...(_sections.includes(section.id) && {defaultChecked: true})} 
                />
            );
        } 
        console.log("ClassForm:EditMode:false")
        return (
            <CustomInput 
                type="checkbox" 
                id={section.id} 
                label={section.name} 
                value={section.id} innerRef={register({
                    validate: validateSections
                })} 
                invalid={errors.sections && true} 
                name={`sections`} 
            />
        )
        
    });

    console.log("errors", errors);
    return (
        <Col lg="4">
            <h4>{!props.editMode ? 'Add New Class':'Edit Class'}</h4>
            <Card>
                <CardBody>
                    <Form id="class-form" onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <Label for="className">Name*</Label>
                            <Input 
                            type="text" 
                            name="className" 
                            id="className"
                            innerRef={register({ required: true, maxLength: 20 })}
                            invalid={errors.className && true}
                            defaultValue={props.currentClass && props.currentClass.name}
                            placeholder="Enter class name" />
                        <FormFeedback>
                                {errors.className && errors.className.type === 'required' && 'Class name is required'}
                            </FormFeedback>
                        <FormFeedback>
                                {errors.className && errors.className.type === 'maxLength' && 'Too long. 20 characters max.'}
                        </FormFeedback>
                        </FormGroup> 
                        <FormGroup>
                            <Label for="shortName">Short Name</Label>
                            <Input 
                            type="text" 
                            name="shortName" 
                            id="shortName"
                            innerRef={register}
                            defaultValue={props.currentClass && props.currentClass.shortName}
                            placeholder="Enter a short name" />
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="sectionId">Section*</Label>
                            <Input 
                            type="select" 
                            name="sectionId" 
                            id="sectionId"
                            innerRef={register({ required: true, minLength:1})}
                            invalid={errors.sectionId && true}
                            defaultValue={props.currentClass && props.currentClass.sectionId}>
                                <option value="">Select...</option>
                                {sectionList}
                            </Input>
                            <FormFeedback>
                                {errors.sectionId && errors.sectionId.type === 'required' && 'Section is required'}
                            </FormFeedback>
                        </FormGroup> */}
                        <FormGroup>
                            <Label for="section">Sections*</Label>                            
                            {sectionCheckboxes}                            
                            <small>{errors.sections && errors.sections.message}</small>                       
                        </FormGroup>
                        <div className="text-center">
                            <Button color="primary" size="lg" className="mt-1">{!props.editMode? 'Save':'Update'}  Class</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
}