import React from 'react';
import { MDBFooter, MDBBtn, MDBIcon } from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter color="purple" className="text-center font-small darken-2">
            <p className="footer-copyright mb-0 py-3 text-center">
                &copy; {new Date().getFullYear()} Copyright: bruteforce@gmail.com
            </p>
        </MDBFooter>
    );
}

export default Footer;