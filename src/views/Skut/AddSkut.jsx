import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import config from '../../config/config';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import Select from 'react-select';



class AddSkut extends Component {
    state = {
        skutModel: [],
        LockModel: [],
        StandModel: [],
        selectedSkutModel: null,
        selectedLockModel: null,
        selectedStandModel: null,
        files: [],
        keyName: '',
        description: '',
        error:{
            skutModel: '',
            LockModel: '',
            StandModel: '',
        }
    }
    getFiles = (files) => {
        this.setState({ files: files });        
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
      }
    handleSkutModelChange = (selectedSkutModel) => {
        this.setState({ selectedSkutModel });
    }
    handleLockModelChange = (selectedLockModel) => {
        this.setState({ selectedLockModel });
    }
    handleStandlChange = (selectedStandModel) => {
        this.setState({ selectedStandModel });
    }
    getAllModel = () =>{
        let skutModel = [];
        let comp_this = this;
        axios.get(config.auth.apiBaseUrl + "/api/scooter-models/")
          .then(function(response) {   
                       
            if (response.data) {     
                response.data.map(item => {
                    skutModel.push({
                        value: item.id,
                        label: item.name
                    });                    
                })
                
                comp_this.setState({skutModel})
                
                
            } else {
              alert('Something went wrong. Please contact aminisrator or try again.');
            }
            
          })
          .catch(function(error) {
                   
          });
    }
    getLockModel = () =>{
        let LockModel = [];
        let comp_this = this;
        axios.get(config.auth.apiBaseUrl + "/api/locks/")
          .then(function(response) {   
                       
            if (response.data) {     
                response.data.map(item => {
                    if (item.status === "active") {
                        LockModel.push({
                            value: item.id,
                            label: item.name
                        });
                    }                    
                })
                
                comp_this.setState({LockModel})
                
                
            } else {
              alert('Something went wrong. Please contact aminisrator or try again.');
            }
            
          })
          .catch(function(error) {
                   
          });
    }
    getAllStands = () =>{
        let StandModel = [];
        let comp_this = this;
        axios.get(config.auth.apiBaseUrl + "/api/stands/")
          .then(function(response) {   
                       
            if (response.data) {     
                response.data.map(item => {
                    StandModel.push({
                        value: item.id,
                        label: item.name
                    });             
                })
                
                comp_this.setState({StandModel})
                
                
            } else {
              alert('Something went wrong. Please contact aminisrator or try again.');
            }
            
          })
          .catch(function(error) {
                   
          });
    }

    componentDidMount(){
        this.getAllModel();
        this.getLockModel();
        this.getAllStands();
    }
    KeyNameChange = (e) =>{
        let keyName = e.target.value.trim();
        this.setState({keyName});
    }
    description = (e) =>{
        let description = e.target.value.trim();
        this.setState({description});
    }
    resetState = (type) => {
        let error = {
            username: "",
            password: "",
        }
        this.setState({ error });
    }
    onSkutSubmit = (e) =>{
        e.preventDefault();
        let skutModel = this.state.selectedSkutModel;
        let lock = this.state.selectedLockModel;
        let stand = this.state.selectedStandModel;
        if(skutModel!== null && lock!== null && stand!== null ){
                skutModel = skutModel.value;
                lock = lock.value;
                stand = stand.value;
        }
        else{
            let error = {...this.state.error};
            if(skutModel === null){                
                error.skutModel = "Skut Model Must Be Selected";                
            }
            if(lock === null){
                error.LockModel = "Skut Model Must Be Selected";
            }
            if(stand === null){
                error.StandModel = "Skut Model Must Be Selected";
            }
            this.setState({error});
            return;
        }
        let params = {};
        let comp_this = this;
        const prop = this.props;
        let token = localStorage.Skut_access_token;
        params.model_id = skutModel;
        params.stand_id = stand;
        params.lock_id = lock;
        params.key_name = this.state.keyName;
        params.description = this.state.description;        
        params.image = this.state.files.name;
        

        axios.defaults.headers.post["Authorization"] = "Bearer "+ token ;
        axios.post(config.auth.apiBaseUrl + "/api/scooters/", params)
            .then(function (response) {
                console.log(response.data.id);
                prop.history.push({
                    pathname: "/category/"
                });

            })
            .catch(function (error, response) {
                alert(error);

            });
        
        
        
    }
    render() {
        
        
        
        return (
            <div className={"list-page"}>
                <p className={'pageTitle'}>Add a New Skut</p>
                <Grid fluid>
                    <Row>
                        <form onSubmit={this.onSkutSubmit}>
                            <div className="form-login">
                                <Col lg={6} sm={6} >
                                    <ControlLabel>Key Name</ControlLabel>
                                    <FormGroup
                                        controlId="Key">
                                        <FormControl
                                            type="text"
                                            value={this.state.keyName}
                                            placeholder="Enter Key Name"
                                            onChange={this.KeyNameChange}
                                        />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation"></div>
                                    </FormGroup>
                                    
                                    <ControlLabel>Image</ControlLabel>
                                    <FormGroup
                                        className={'image_select'}
                                        controlId="image">
                                        <FileBase64
                                            
                                            multiple={false}
                                            onDone={this.getFiles.bind(this)} />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation"></div>
                                    </FormGroup>
                                    <ControlLabel>Locks</ControlLabel>
                                    <FormGroup
                                        controlId="lock">
                                        <Select
                                            value={this.state.selectedLockModel}
                                            onChange={this.handleLockModelChange}
                                            options={this.state.LockModel}
                                        />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation">{this.state.error.LockModel}</div>
                                    </FormGroup>
                                </Col>
                                <Col lg={6} sm={6} >
                                    <ControlLabel>Description</ControlLabel>
                                    <FormGroup
                                        controlId="description">
                                        <FormControl
                                                type="text"
                                                value={this.state.description}
                                                placeholder="Enter Description"
                                                onChange={this.description}
                                            />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation"></div>
                                    </FormGroup>
                                    <ControlLabel>Model</ControlLabel>
                                    <FormGroup
                                        controlId="model">
                                        <Select
                                            value={this.state.selectedOption}
                                            onChange={this.handleSkutModelChange}
                                            options={this.state.skutModel}
                                        />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation">{this.state.error.skutModel}</div>
                                    </FormGroup>
                                    <ControlLabel>Stand</ControlLabel>
                                    <FormGroup
                                        controlId="stand">
                                        <Select
                                            value={this.state.selectedStandModel}
                                            onChange={this.handleStandlChange}
                                            options={this.state.StandModel}
                                        />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation">{this.state.error.StandModel}</div>
                                    </FormGroup>
                                    

                                </Col>
                            </div>
                            <Col  lg={12} sm={12}>
                                <Button type="submit" >Save</Button>    
                            </Col>
                            
                        </form>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default AddSkut;