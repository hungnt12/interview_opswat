import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Error extends Component {
    render() {
        return (
            <section id="wrapper" className="error-page">
                <div className="error-box">
                    <div className="error-body text-center">
                        <h1 className="text-info">404</h1>
                        <h3 className="text-uppercase">Page Not Found !</h3>
                        <p className="text-muted m-t-30 m-b-30">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
                        <Link to={'/'} className={`mb-2`}>Back Home</Link>
                    </div>
                    <footer className="footer text-center">© 2017 Admin Pro.</footer>
                </div>
            </section>
        );
    }
}

export default Error;
