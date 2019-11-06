import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import config from '../../config/config';
import axios from 'axios';
import Select from 'react-select';


class Edit extends Component {
    state = {
        id: '',
        name: '',
        description: '',
        selectedCategory: null,
        category: [],
        error: {
            name: '',
            category: ''
        }
    }
    componentDidMount() {
        this.getCategory();

        if(this.props.match.params.id ){
            let comp_this = this;
            let id = this.props.match.params.id;
            axios.get(config.auth.apiBaseUrl + "/api/scooter-models/" + id + "/")
                .then(function (response) {

                    if (response.data) {
                        let selectedCategory = {
                            value: response.data.category.id,
                            label: response.data.category.name
                        };
                        let name = response.data.name;
                        let description = response.data.description;
                        let id = response.data.id;
                        comp_this.setState({selectedCategory, name, description, id});

                    } else {
                        alert('Something went wrong. Please contact aminisrator or try again.');
                    }

                })
                .catch(function (error) {

                });
        }
    }
    nameChange = (e) =>{
        let name = e.target.value.trim();
        this.setState({name});
    }
    description = (e) =>{
        let description = e.target.value.trim();
        this.setState({description});
    }
    handleCategorylChange = (selectedCategory) => {
        this.setState({ selectedCategory });
    }
    onSubmit = (e) =>{
        e.preventDefault();
        let name = this.state.name;
        let description = this.state.description;
        let category = this.state.selectedCategory;
        let id = this.state.id;
        if (name == '' || category == null) {
            let error = {...this.state.error};
            if (category == null) {
                error.category = "Please select a category";                
            }
            if (name == '') {
                error.name = "Please add a name";            
            }
            this.setState({error})
            return;
        }
        let params = {};
        let comp_this = this;
        const prop = this.props;
        let token = localStorage.Skut_access_token;
        params.name = name;
        params.description = description;        
        params.category_id = category.value;

        axios.defaults.headers.post["Authorization"] = "Bearer "+ token ;
        axios.patch(config.auth.apiBaseUrl + "/api/scooter-models/"+ id +"/", params)
            .then(function (response) {
                prop.history.push({
                    pathname: "/model/"
                });
            })
            .catch(function (error, response) {
                alert(error);

            });
    }
    getCategory = () => {
        let category = [];
        let comp_this = this;
        axios.get(config.auth.apiBaseUrl + "/api/scooter-categories/")
            .then(function (response) {

                if (response.data) {
                    response.data.map(item => {
                        category.push({
                            value: item.id,
                            label: item.name
                        });
                    })

                    comp_this.setState({ category })


                } else {
                    alert('Something went wrong. Please contact aminisrator or try again.');
                }

            })
            .catch(function (error) {

            });
    }
    render() {

        return (
            <div className={"list-page"}>
                <p className={'pageTitle'}>Add a New Skut Model</p>
                <Grid fluid>
                    <Row>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-login">
                                <Col lg={6} sm={6} >
                                    <ControlLabel>Name</ControlLabel>
                                    <FormGroup
                                        controlId="Key">
                                        <FormControl
                                            type="text"
                                            value={this.state.name}
                                            placeholder="Enter Key Name"
                                            onChange={this.nameChange}
                                        />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation">{this.state.error.name}</div>
                                    </FormGroup>

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
                                </Col>
                                <Col lg={6} sm={6} >

                                    <ControlLabel>Category</ControlLabel>
                                    <FormGroup
                                        controlId="stand">
                                        <Select
                                            value={this.state.selectedCategory}
                                            onChange={this.handleCategorylChange}
                                            options={this.state.category}
                                        />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation">{this.state.error.category}</div>
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

export default Edit;