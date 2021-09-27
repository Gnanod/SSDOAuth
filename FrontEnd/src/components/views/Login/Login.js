import React, {Component} from "react";
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBAnimation,
    MDBAlert,
    MDBModal,
    MDBModalHeader, MDBModalBody, MDBModalFooter, MDBCardImage
} from 'mdbreact';
import './Login.css';
import {MDBCard, MDBCardBody, MDBInput} from 'mdbreact';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            loginEmail: '',
            loginPass: '',
            loginEmailV: false,
            loginPassV: false,

        };
        this.onClick = this.onClick.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.onChangeEmailV = this.onChangeEmailV.bind(this);
        this.onChangePassV = this.onChangePassV.bind(this);
    }


    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggle2 = () => {
        this.setState({
            modal: !this.state.modal,
            modal2: !this.state.model2
        });
    }

    onChangeEmailV(event) {
        this.setState({
            loginEmail: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangePassV(event) {
        this.setState({
            loginPass: event.target.value,
            [event.target.name]: event.target.value
        })
    }


    validateUser(event) {
        event.preventDefault();
        if (this.state.loginEmail != '') {
            this.setState({
                loginEmailV: false
            })
            if (this.state.loginPass != '') {
                this.setState({
                    loginPassV: false
                })
                localStorage.setItem("UserLogged", "UserLogged");
                this.props.history.push('/blogs');
            } else {
                console.log('email field empty');
                this.setState({
                    loginPassV: true
                })
            }
        } else {
            console.log('email field empty');
            this.setState({
                loginEmailV: true
            })
        }
    };


    render() {
        return (
            <div id='apppage'>
                <MDBView>
                    <MDBMask className='white-text gradient'/>
                    <MDBContainer
                        style={{height: '100%', width: '100%', paddingTop: '10rem'}}
                        className='d-flex justify-content-center white-text align-items-center'
                    >
                        <MDBRow>
                            <MDBCol md='12' className='text-center text-md-left mt-xl-5 mb-5'>
                                <MDBAnimation type='fadeInLeft' delay='.3s'>
                                    <MDBCard className="loginContainer">
                                        <form className="needs-validation"
                                              onSubmit={this.validateUser}>
                                            <MDBCardBody className="mx-4">
                                                <div className="text-center">
                                                    <h3 className="dark-grey-text mb-5">
                                                        <strong> Login</strong>
                                                    </h3>
                                                </div>
                                                <MDBInput label="Your email" group type="email" validate error="wrong"
                                                          success="right" value={this.state.loginEmail}
                                                          onChange={this.onChangeEmailV}/>
                                                {
                                                    this.state.loginEmailV ?
                                                        <MDBAlert color="danger">
                                                            Please enter a value for email !
                                                        </MDBAlert> : ''
                                                }

                                                {/*<input value={this.state.loginPass} onChange={this.onChangePassV}/>*/}
                                                <MDBInput label="Your password" group type="password" validate
                                                          containerClass="mb-0" value={this.state.loginPass}
                                                          onChange={this.onChangePassV}/>
                                                {
                                                    this.state.loginPassV ?
                                                        <MDBAlert color="danger">
                                                            Please enter a value for email !
                                                        </MDBAlert> : ''
                                                }

                                                <div className="text-center mb-3">
                                                    <MDBBtn type="submit" color='blue'
                                                            className="btn-block z-depth-1a buttonSign ">
                                                        LOGIN
                                                    </MDBBtn>
                                                </div>
                                                <MDBModalFooter className="mx-5 pt-3 mb-1">
                                                    <p className="font-small grey-text d-flex justify-content-end">
                                                        Not a member?
                                                        <MDBBtn outline color="info" size="sm" onClick={this.toggle2}>
                                                            Sign Up</MDBBtn>
                                                    </p>
                                                </MDBModalFooter>
                                            </MDBCardBody>
                                        </form>

                                    </MDBCard>
                                </MDBAnimation>
                            </MDBCol>

                        </MDBRow>
                    </MDBContainer>
                </MDBView>
            </div>
        );
    }
}
