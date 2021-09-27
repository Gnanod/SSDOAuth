import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            {/*<a href="#!" className="logo-wrapper waves-effect">*/}
            {/*    <img alt="MDB React Logo" className="img-fluid" src={logo}/>*/}
            {/*</a>*/}
            <MDBListGroup className="list-group-flush">

                        <NavLink exact={true} to="/dashboard" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="chart-pie" className="mr-3"/>
                                Dashboard
                            </MDBListGroupItem>
                        </NavLink>


                        <NavLink to="/blogs" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="table" className="mr-3"/>
                                My Blogs
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