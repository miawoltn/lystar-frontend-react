import React, {Suspense} from 'react';
import { Table, Card, CardBody, Col } from 'reactstrap';
import ActionButton from '../../../Layout/Utilities/ActionButton';

export default class ClassBody extends React.Component {
    Actions = [
        "Edit", "Delete"
    ]

    handleActionSelected = (actionName, classId) => {
        if (actionName === "Edit") {
            this.onClassEdit(classId);
        }if(actionName === "Delete") {
            this.onClassDelete(classId);
        }
    }

    onClassEdit = (id) => {
        console.log("ClassBody:onClassEdit", id)
        this.props.onClassEditAction(this.props.classList.filter((i) => { return i.id === id })[0]);
    }

    onClassDelete = (id) => {
        console.log("ClassBody:onClassDelete", id);
        this.props.onClassDeleteAction(id);
    }

    render() {
        console.log("ClassBody(props)", this.props);
        const rows = []
        this.props.classList.forEach((_class, index) => {
            rows.push(
                <tr key={index}>
                    <td>{_class.name}</td>
                    <td>{_class.shortName}</td>
                    <td>{_class.sections.map(x => <tr key={x.id} >{x.name}</tr>)}</td> 
                    <td>
                        <ActionButton
                            id={_class.id}
                            actions={this.Actions}
                            onActionSelected={this.handleActionSelected} />
                    </td>
                </tr>
            )
        });
        return (
            <Col lg="8">
                <h4>Class List</h4>
                <Card className="main-card mb-4">
                    <CardBody>
                        <Table hover className="mb-0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Short Name</th>
                                    <th>Sections</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody> 
                            <Suspense fallback={
                                <div className="loader-container">
                                    <div className="loader-container-inner">
                                        <h6 className="mt-3">
                                            Loading...
                                        </h6>
                                    </div>
                                </div>
                             }>
                                {rows} 
                            </Suspense>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
