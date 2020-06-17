import React, { Component } from 'react';

class Login extends Component {

    constructor (props) {
        super(props);
        this.state = {
            name : "",
            email : ""
        }
    }

    doStuff(e) {
        e.preventDefault();
        console.log("did stuff");
    }

    render () {
        return (
            <section className="container">
                <p>Login Form</p>

                <form onSubmit={this.doStuff.bind(this)}>

                    <div className="form-group">
                        <input placeholder="Email" className="form-control" type="text" name="email" 
                            onChange={(e) => this.setState({email: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <input placeholder="Password" className="form-control" type="password" name="password" 
                            onChange={(e) => this.setState({pass: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <input className="col-md-3 btn-primary form-control" type="submit" value="Login" />
                    </div>

                </form>
            </section>
        );
    }

};

export default Login;