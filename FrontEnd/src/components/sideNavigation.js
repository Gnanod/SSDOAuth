import React from 'react';
import {MDBListGroup, MDBListGroupItem, MDBIcon, MDBCardImage} from 'mdbreact';
import { NavLink } from 'react-router-dom';
import '../index.css';
const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid image-round"  src={localStorage.getItem("profImage")}/>
                <div style={{textAlign:"center",marginTop:-30,fontSize:20}}>{localStorage.getItem("name")}</div>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink to="/blogs" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="table" className="mr-3"/>
                        My Files
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/logout" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="sign-out-alt" className="mr-3"/>
                        LogOut
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;