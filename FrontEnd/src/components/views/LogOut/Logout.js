import React, {Component} from 'react';
import {revokeAccess} from "../../services/auth.service";

export default class Logout extends Component {

    componentDidMount(){
        //remove items
        localStorage.removeItem('CustomerLogged');
        localStorage.removeItem('AdminLogged');
        localStorage.removeItem('UserLogged');
        revokeAccess().then(res=>{
            if(res.status===200){
                this.props.history.push('/');
                window.location.reload();
            }
        })

    }
    render() {

        return (
            <div>
            </div>
        );
    }

}
