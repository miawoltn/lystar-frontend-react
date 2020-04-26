import React, { Fragment, Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { Row, Col, Button } from 'reactstrap';
import SectionBody from './SectionBody';
import SectionForm from './SectionForm';

import axios from 'axios';
import { toast } from 'react-toastify';
//axios.defaults.baseURL = 'https://192.168.0.33:44319/api/v1/';
//axios.defaults.baseURL = 'https://lytstarbackend-947718277.us-west-2.elb.amazonaws.com/api/v1/';

axios.defaults.baseURL = process.env.REACT_APP_PROTOCOL+process.env.REACT_APP_BACKEND_URL
axios.defaults.timeout = 5000

export default class SectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionList: [],
            section: '', // selected section to apply action to (edit/delete)
            edit: false
        }
        this.child = React.createRef();
    }

    componentDidMount() {
        this.getSectionList();
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

    postNewSection = (newSection) => {

        axios.post('sections', {
            name: newSection.name,
            code: newSection.code 
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            const newSectionList = this.state.sectionList;
            newSectionList.push(res.data);
            this.setState({ sectionList: newSectionList })
            toast('Section saved.', {type: toast.TYPE.SUCCESS})
        })
        .catch(error => {
            console.log('postNewSection(error):',error.toJSON());
            let message = 'Unable to save new section. '; 
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

    updateSection = (section) => {
        axios.put('sections/'+section.id, {
            id: section.id,
            name: section.name,
            code: section.code 
        })
        .then(res => {
            console.log(res); 
            toast('Section updated.', {type: toast.TYPE.SUCCESS})
            var index = this.state.sectionList.findIndex(s => s.id === section.id)
            const newSectionList = this.state.sectionList;
            newSectionList[index] = section;
            this.setState({ sectionList: newSectionList, section: ''})
            //edit: false 
        })
        .catch(error => {
            console.log('updateSection(error):',error.toJSON());
            let message = 'Unable to update section. '; 
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

    deleteSection = (id) => {
        axios.delete('sections/'+id)
        .then(res => {
            console.log(res); 
            toast('Section deleted.', {type: toast.TYPE.SUCCESS});
            const sectionList = this.state.sectionList.filter((i) => { return i.id !== id });
            this.setState({sectionList});
        })
        .catch(error => {
            console.log('updateSection(error):',error.toJSON());
            let message = 'Unable to update section. '; 
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

    handleSectionEditAction = (section) => {
        console.log("SectionPage:handleSectionEdit", section);
        this.setState({ section, edit: true })
    }

    handleSectionDeleteAction = (id) => {
        console.log("SectionPage:handleSectionDelete", id);
        this.deleteSection(id);
    }

    handleSectionEdit = (section) => {
        this.updateSection(section);
    }

    handleSectionAdd = section => {
        this.postNewSection(section);
    }

    handleAddButtonClick = () => {        
        this.setState({section: '', edit: false})
    }

    render() {
        console.log("SectionPage(props):", this.props)
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
                    transitionAppear={false}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <PageTitle
                            heading="Section"
                            subheading=""
                            icon="lnr-frame-expand icon-gradient bg-mean-fruit"
                            breadcrumbPath={['Dashboard', 'Academics', 'Section']} />
                    </div>
                    {button}
                    <Row>
                        <SectionForm
                            editMode={this.state.edit}
                            currentSection={this.state.section}
                            onSectionAdd={this.handleSectionAdd}
                            onSectionEdit={this.handleSectionEdit} />
                        <SectionBody
                            sectionList={this.state.sectionList}
                            onSectionEditAction={this.handleSectionEditAction}
                            onSectionDeleteAction={this.handleSectionDeleteAction} />
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
