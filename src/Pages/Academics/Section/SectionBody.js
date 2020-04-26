import React from 'react';
import { Table, Card, CardBody, Col } from 'reactstrap';

import ActionButton from '../../../Layout/Utilities/ActionButton';

export default class SectionBody extends React.Component {

    Actions = [
        "Edit", "Delete"
    ]

    handleActionSelected = (actionName, sectionId) => {
        if (actionName === "Edit") {
            this.onSectionEdit(sectionId);
        }
        if(actionName === "Delete") {
            this.onSectionDelete(sectionId);
        }
    }

    onSectionEdit = (id) => {
        console.log("SectionBody:onSectionEdit", id)
        this.props.onSectionEditAction(this.props.sectionList.filter((i) => { return i.id === id })[0]);
    }

    onSectionDelete = (id) => {
        console.log("SectionBody:onSectionDelete", id);
        this.props.onSectionDeleteAction(id);
    }

    render() {
        console.log("SectionBody(props)", this.props);
        const rows = []
        this.props.sectionList.forEach((section, index) => {
            rows.push(
                <tr key={index}>
                    <td>{section.name}</td>
                    <td>{section.code}</td>
                    <td>
                        <ActionButton
                            id={section.id}
                            actions={this.Actions}
                            onActionSelected={this.handleActionSelected} />
                    </td>
                </tr>
            )
        });
        return (
            <Col lg="8">
                <h4>Section List</h4>
                <Card className="main-card mb-4">
                    <CardBody>
                        <Table hover className="mb-0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
