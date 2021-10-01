import React, {Component} from "react";
import {
    MDBAlert,
    MDBAnimation,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBMask,
    MDBRow,
    MDBView
} from 'mdbreact';
import './Login.css';
import LoginImage from "../../../assets/loginIcon.png"
import GoogleLogin from "react-google-login";
import {getToken, getUserDetails} from "../../services/auth.service";

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
        this.responseGoogle = this.responseGoogle.bind(this);
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
                // localStorage.setItem("UserLogged", "UserLogged");
                // this.props.history.push('/blogs');
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

    responseGoogle(response) {
        localStorage.setItem("UserLogged", "UserLogged");
        localStorage.setItem("code", response.code);
        getToken(response.code).then(res=>{
            if(res.status===200){
                localStorage.setItem("token",JSON.stringify(res.data))
                localStorage.setItem("accessToken",res.data.access_token)
                console.log(res.data)
                getUserDetails().then(response => {
                    if(response.status===200){
                        localStorage.setItem("name",response.data.name)
                        localStorage.setItem("profImage",response.data.picture)
                        this.props.history.push('/blogs');
                    }
                })
            }
        })
    }


    render() {
        return (
            <div id='apppage'>
                <MDBView>
                    <MDBMask className='rgba-purple-slight '/>
                    <MDBRow>
                        <MDBCol md='12' className='mb-4 text-center'>
                            <h2 className='display-5 purple-text mb-0 pt-md-5 pt-5'>
                                <strong>Manage your files in </strong>
                                <a href='#!' className='indigo-text font-weight-bold'>
                                    <strong>Google Drive</strong>
                                </a>
                            </h2>
                            <hr className='hr-light'/>
                        </MDBCol>
                    </MDBRow>
                    <MDBContainer
                        style={{height: '100%', width: '100%', paddingTop: '0rem'}}
                        className='d-flex justify-content-center purple-text align-items-center'
                    >
                        <MDBRow className=' align-items-center'>
                            <MDBCol md='6' className=' text-center text-md-left mb-5'>
                                {/*<MDBAnimation type='fadeInLeft' delay='.3s'>*/}
                                <img src={LoginImage}
                                     className="figure-img imageheight img-fluid "
                                     alt=""/>
                                {/*</MDBAnimation>*/}
                            </MDBCol>


                            <MDBCol md='5' className='text-center text-md-left mb-5'>
                                <MDBAnimation type='fadeInRight' delay='.3s'>
                                    <MDBCard className='dark-grey-text '>
                                        <form className="needs-validation"
                                              onSubmit={this.validateUser}>
                                            <MDBCardBody className="mx-4">
                                                <div className='text-center'>
                                                    <h3 className='grey-text mb-5 mt-4 font-weight-bold'>
                                                        <strong>SIGN</strong>
                                                        <a href='#!' className='purple-text font-weight-bold'>
                                                            <strong> IN</strong>
                                                        </a>
                                                    </h3>
                                                </div>
                                                <MDBInput label="Your email" group type="email" validate error="wrong"
                                                          labelClass='purple-text'
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
                                                          labelClass='purple-text'
                                                          containerClass="mb-0" value={this.state.loginPass}
                                                          onChange={this.onChangePassV}/>
                                                {
                                                    this.state.loginPassV ?
                                                        <MDBAlert color="danger">
                                                            Please enter a value for email !
                                                        </MDBAlert> : ''
                                                }

                                                <div className="text-center mb-3">
                                                    <MDBBtn gradient="purple" type="submit"
                                                            className="btn-block z-depth-1a  ">
                                                        SIGN IN
                                                    </MDBBtn>
                                                    <MDBCol className='d-flex  justify-content-center '>
                                                        <GoogleLogin
                                                            clientId="114616242823-k7oli0bd6gt69kbl0afdarqvhg0kr0qa.apps.googleusercontent.com"
                                                            buttonText="Login"
                                                            responseType="code"
                                                            onSuccess={this.responseGoogle}
                                                            onFailure={this.responseGoogle}
                                                            cookiePolicy={'single_host_origin'}
                                                            scope='https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file'
                                                        />
                                                    </MDBCol>
                                                </div>

                                                <MDBCol className="mx-5 pt-3 mb-1 d-flex" md='12'>
                                                    <p className='font-small grey-text d-flex justify-content-end'>
                                                        Do not have an account?
                                                        <a href='#!' className='purple-text ml-1 font-weight-bold'>
                                                            Sign Up
                                                        </a>
                                                    </p>
                                                </MDBCol>
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
