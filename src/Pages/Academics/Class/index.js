import React, {Fragment, Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import PageTitle from '../../../Layout/AppMain/PageTitle';

import { Col, Row, Button } from 'reactstrap';
import ClassBody from './ClassBody';
import ClassForm from './ClassForm';

import axios from 'axios';
import { toast } from 'react-toastify';

export default class ClassPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classList: [],
            sectionList: [],
            Class: '', // selected class to apply action to (edit/delete)
            edit: false
        }
    }

    componentDidMount() {
        this.getClassList();
        this.getSectionList();
    }

    getClassList = () => {
        axios.get('classes')
            .then(res => {
                console.log(res)
                const classList = res.data;
                this.setState({ classList });
            })
            .catch(error => {
                console.log('getclassList(error):',error);
                let message = 'Unable to retrieve class list. '; 
                if(error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx 
                    message += error.response.data;  
                } else if (error.request) {
                    // The request was made but no response was received  
                    message += error.message;  
                  } else {
                    // Something happened in setting up the request that triggered an Error 
                    message += error.message; 
                  } 
                  toast(message, {type: toast.TYPE.ERROR})
            })
    }

    getSectionList = () => {
        axios.get('sections')
            .then(res => {
                console.log(res)
                const sectionList = res.data;
                this.setState({ sectionList });
            })
            .catch(error => {
                console.log('getSectionList(error):',error.toJSON());
                let message = 'Unable to retrieve section list. '; 
                if(error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx 
                    message += error.response.data;  
                } else if (error.request) {
                    // The request was made but no response was received  
                    message += error.message;  
                  } else {
                    // Something happened in setting up the request that triggered an Error 
                    message += error.message; 
                  } 
                  toast(message, {type: toast.TYPE.ERROR})
            })
    }

    postNewClass = (newClass) => {
        //  let headers = {
        //     'Content-Type': 'application/json;charset=UTF-8',
        //     "Access-Control-Allow-Origin": "*"

        // }
        axios.post('classes', {
            name: newClass.name,
            shortName: newClass.shortName,
            sections: newClass.sections 
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            toast('Class saved.', {type: toast.TYPE.SUCCESS})
            const newClassList = this.state.classList;
            newClassList.push(res.data);
            this.setState({ classList: newClassList })

        })
        .catch(error => {
            console.log('postNewClass(error):',error.toJSON());
            let message = 'Unable to save new class. '; 
            if(error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx 
                message += error.response.data;  
            } else if (error.request) {
                // The request was made but no response was received  
                message += error.message;  
              } else {
                // Something happened in setting up the request that triggered an Error 
                message += error.message; 
              } 
              toast(message, {type: toast.TYPE.ERROR})
        })
    }

    updateClass = (_class) => {
        axios.put('classes/'+_class.id, {
            id: _class.id,
            name: _class.name,
            shortName: _class.shortName,
            sectionId: _class.sectionId 
        })
        .then(res => {
            console.log(res); 
            toast('Class updated.', {type: toast.TYPE.SUCCESS})
            var index = this.state.classList.findIndex(s => s.id === _class.id)
            const newClassList = this.state.classList;
            newClassList[index] = _class;
            this.setState({ classList: newClassList, _class: '', edit: false })
        })
        .catch(error => {
            console.log('updateClass(error):',error.toJSON());
            let message = 'Unable to update class. '; 
            if(error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx 
                message += error.response.data;  
            } else if (error.request) {
                // The request was made but no response was received  
                message += error.message;  
              } else {
                // Something happened in setting up the request that triggered an Error 
                message += error.message; 
              } 
              toast(message, {type: toast.TYPE.ERROR})
        })
    }

    deleteClass = (id) => {
        axios.delete('classes/'+id)
        .then(res => {
            console.log("deleteClass:Response:",res.data); 
            toast('Class deleted.', {type: toast.TYPE.SUCCESS});
            const classList = this.state.classList.filter((i) => { return i.id !== id });
            this.setState({classList});
        })
        .catch(error => {
            console.log('updateClass(error):',error);
            let message = 'Unable to update class. '; 
            if(error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx 
                message += error.response.data;  
            } else if (error.request) {
                // The request was made but no response was received  
                message += error.message;  
              } else {
                // Something happened in setting up the request that triggered an Error 
                message += error.message; 
              } 
              toast(message, {type: toast.TYPE.ERROR})
        })
    }

    handleClassEditAction = (_class) => {
        console.log("ClassPage:handleClassEdit", _class);
        this.setState({ Class: _class, edit: true })
    }

    handleClassDeleteAction = (id) => {
        console.log("ClassPage:handleClassDelete", id);
        this.deleteClass(id);
    }

    handleClassEdit = _class => {
        this.updateClass(_class);
    }

    handleClassAdd = _class => {
        this.postNewClass(_class);
    }

    handleAddButtonClick = () => {
        this.setState({Class: '', edit: false})
    }

    render() {
        console.log("ClassPage(props):", this.props)
        let button = '';
        if (this.state.edit) {
            button = (<Col sm={{ size: 1, offset: 11 }}>
                <Button className="mb-2 mr-2" color="primary" onClick={this.handleAddButtonClick} >Add</Button>
            </Col>);
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
                        <div>
                        <PageTitle
                            heading="Class"
                            subheading=""
                            icon="pe-7s-culture icon-gradient bg-mean-fruit"
                            breadcrumbPath={['Dashboard', 'Academics', 'Class']}
                        />
                        </div>
                        {button}
                        <Row>
                        <ClassForm
                         editMode={this.state.edit}
                         currentClass={this.state.Class}
                         sectionList={this.state.sectionList}
                         onClassAdd={this.handleClassAdd}
                         onClassEdit={this.handleClassEdit} />
                         
                    <ClassBody
                            classList={this.state.classList}
                            onClassEditAction={this.handleClassEditAction}
                            onClassDeleteAction={this.handleClassDeleteAction} />                        
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
