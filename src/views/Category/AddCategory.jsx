import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import config from '../../config/config';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import Select from 'react-select';


class AddCategory extends Component {
    state = {
        name: '',
        description: '',
        error:{
            name: '',
            description: ''
        }
    }
    KeyNameChange = (e) => {
        let name = e.target.value.trim();
        this.setState({ name });        
    }
    description = (e) => {
        let description = e.target.value.trim();
        this.setState({ description });
    }
    onCategorySubmit = (e) => {        
        console.log(this.state);
        
        e.preventDefault();
        let name = this.state.name;
        let description = this.state.description;
        if (name === '' || description === '') {
            let error = {...this.state.error};
            if(name == ''){                
                error.name = "Name Must be added";                
            }
            if(description == ''){
                error.description = "Description Must be added";
            }
            this.setState({error});
            
            return;
        }
        let params = {};
        let comp_this = this;
        const prop = this.props;
        let token = localStorage.Skut_access_token;        
        params.name = this.state.name;
        params.description = this.state.description;   
        

        axios.defaults.headers.post["Authorization"] = "Bearer "+ token ;
        axios.post(config.auth.apiBaseUrl + "/api/scooter-categories/", params)
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
                <p className={'pageTitle'}>Add a New Category</p>
                <Grid fluid>
                    <Row>
                        <form onSubmit={this.onCategorySubmit}>
                            <div className="form-login">
                                <Col lg={6} sm={6} >
                                    <ControlLabel>Key Name</ControlLabel>
                                    <FormGroup
                                        controlId="Key">
                                        <FormControl
                                            type="text"
                                            value={this.state.name}
                                            placeholder="Enter Key Name"
                                            onChange={this.KeyNameChange}
                                        />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation">{this.state.error.name}</div>
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
                                        <div className="validation-message username-validation">{this.state.error.description}</div>
                                    </FormGroup>


                                </Col>
                            </div>
                            <Col lg={12} sm={12}>
                                <Button type="submit" >Save</Button>
                            </Col>

                        </form>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default AddCategory;