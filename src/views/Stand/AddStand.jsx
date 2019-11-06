import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import config from '../../config/config';
import axios from 'axios';
import Select from 'react-select';

class AddStand extends Component {
    state = { 
        name: '',
        description: '',
        selectedArea: null,
        area: [],
        coordinate: '',
        error: {
            name: '',
            category: ''
        }
    }

    getCategory = () => {
        let category = [];
        let comp_this = this;
        axios.get(config.auth.apiBaseUrl + "/api/areas")
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
                <p className={'pageTitle'}>Add a New Stand</p>
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

                                    <ControlLabel>Area</ControlLabel>
                                    <FormGroup
                                        controlId="stand">
                                        <Select
                                            value={this.state.selectedarea}
                                            onChange={this.handlearealChange}
                                            options={this.state.area}
                                        />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation">{this.state.error.area}</div>
                                    </FormGroup>
                                    <ControlLabel>Co-ordinate</ControlLabel>
                                    <FormGroup
                                        controlId="description">
                                        <FormControl
                                            type="text"
                                            value={this.state.coordinate}
                                            placeholder="Enter coordinate"
                                            onChange={this.coordinate}
                                        />
                                        <FormControl.Feedback />
                                        <div className="validation-message username-validation"></div>
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
 
export default AddStand;