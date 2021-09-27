import React, {Component} from 'react';
import Routes from '../src/components/Routes';
import SideNavigation from './components/sideNavigation';
import Footer from './components/Footer';
import './index.css';
import LoginRoutes from "./components/LoginRoutes";


class App extends Component {

    render() {
        if (localStorage.getItem("UserLogged") === "UserLogged") {
            return (
                <div className="flexible-content">
                    <SideNavigation/>
                    <main id="content" className="p-5">
                        <Routes/>
                    </main>
                    <Footer/>
                </div>
            );
        } else {
            return (
                <div>
                    <LoginRoutes/>
                    {/*<TopNavigation/>*/}
                </div>
            );
        }
    }
}

export default App;
