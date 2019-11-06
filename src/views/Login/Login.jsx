import React, { Component } from 'react';
import imagine from "../../assets/img/loginBack.png";
import { Grid, Row, Col, FormGroup, FormControl, Checkbox, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import config from '../../config/config';
import axios from 'axios';

class Login extends Component {
    state = {
        user :{
            username: '',
            password: ''
        },
        error: {
            username: "",
            password: "",
        },
        remember: false,
        invalidauth: ''
    }

    userNameCheck = (e) =>{
        let user = { ...this.state.user };
        user.username = e.target.value.trim();
        this.setState({ user  });
    }
    passwordCheck = (e) =>{
        let user = { ...this.state.user };
        user.password = e.target.value.trim();
        this.setState({ user  });
    }
    resetState = (type) => {
        let error = {
            username: "",
            password: "",
        }
        this.setState({ error });
    }
    onLoginSubmit = (e) =>{
        e.preventDefault();
        this.resetState("all");
        let comp_this = this;
        let error_update = { ...this.state.error };
        if (comp_this.state.user.username.length < 1 || comp_this.state.user.password.length < 1){
            if (comp_this.state.user.username.length < 1){
                error_update.username = 'Username is required';
            }
            if (comp_this.state.user.password.length < 1){
                error_update.password = 'password is required';      
            }
            comp_this.setState({ error: error_update});
            return;
            
        }
        let params = new URLSearchParams();
        params.append("client_id", config.auth.clientId);
        params.append("client_secret", config.auth.clientSecret);
        params.append("grant_type", config.auth.grant_type);
        params.append("username", this.state.user.username);
        params.append("password", this.state.user.password);
        axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        let prop = this.props;


        axios.post(config.auth.apiBaseUrl + "/oauth/token/", params)
          .then(function(response) {            
            if (response.data.access_token) {
                var expiration = new Date();
                expiration.setSeconds(response.data.expires_in);

                localStorage.setItem("Skut_access_token", response.data.access_token);
                localStorage.setItem("Skut_expires_at", expiration);
                
                
                prop.history.push({
                    pathname: "/home",
                    state: {
                    access_token: response.data.access_token
                    }
                });
            } else {
              alert('Something went wrong. Please contact aminisrator or try again.');
            }
            
          })
          .catch(function(error) {
            let invalidauth = { ...comp_this.state.invalidauth }
            invalidauth = '********** Invalid Username or Password given  **********'
            comp_this.setState({invalidauth});            
          });
    }

    componentDidMount(){
        
    }
    render() {
        let ExpireDate = localStorage.Skut_expires_at;
        let CurrentDate = new Date();
        ExpireDate = new Date(ExpireDate);
        
        if (localStorage.Skut_access_token && (ExpireDate > CurrentDate)){
            this.props.history.push({
                pathname: "/home",
            });
        }
        const LoginBackground = {
            backgroundImage: "url(" + imagine + ")"
        };
        return (
            <div className="login_wrapper" style={LoginBackground} >
                <div className="login_wrapper_content">
                    
                    <Grid fluid>
                        <Row>
                            <Col lg={4} sm={4} smOffset={4} lgOffset={4}>
                                <div className="form-login">
                                    <div className="logo_wrap">
                                        <h2 className={'text-center'}><strong>SKUT ADMIN</strong></h2>
                                    </div>
                                    <form onSubmit={this.onLoginSubmit}>
                                        <ControlLabel>User Name</ControlLabel>
                                        <FormGroup
                                            controlId="userName"
                                        >
                                            <FormControl
                                                type="text"
                                                value={this.state.user.username}
                                                placeholder="Enter username"
                                                onChange={this.userNameCheck}
                                            />
                                            <FormControl.Feedback />
                                            <div className="validation-message username-validation">{this.state.error.username}</div>

                                        </FormGroup>
                                        <ControlLabel>Password</ControlLabel>
                                        <FormGroup
                                            controlId="password"
                                        >
                                            <FormControl
                                                type="password"
                                                value={this.state.user.password}
                                                placeholder="Enter password"
                                                onChange={this.passwordCheck}
                                            />
                                            <FormControl.Feedback />
                                            <div className="validation-message username-validation">{this.state.error.password}</div>

                                        </FormGroup>
                                        <Checkbox >
                                            Remember Me
                                    </Checkbox>
                                        <Button type="submit" fill bsStyle="info">Login</Button>
                                    </form>
                                    <div className="validation-message text-center">{this.state.invalidauth}</div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Login;