import React, { Component } from 'react';
import {flowRight as compose} from 'lodash';
import { graphql, Mutation } from 'react-apollo';




class SignUp extends Component {

    constructor (props) {
        super(props);
        this.state = {
            name : "",
            email : "",
            pass : "",
            pass_confirm : ""
        }
    }

    doStuff(e) {
        e.preventDefault();
        console.table(this.state);

    }

    componentDidUpdate() {
        console.log("UPDATED");
    }

    render () {
        return (
            <section className="container">
            <div className="col-md-6">

                <form onSubmit={this.doStuff.bind(this)}>

                    <p>Sign Up Form</p>
                    <div className="form-group">
                        <input placeholder="Name" className="form-control" type="text" name="name" 
                            onChange={(e) => this.setState({name: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <input placeholder="Email" className="form-control" type="text" name="email" 
                            onChange={(e) => this.setState({email: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <input placeholder="Password" className="form-control" type="password" name="password" 
                            onChange={(e) => this.setState({pass: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <input placeholder="Confirm Password" className="form-control" type="password" name="confirm" 
                            onChange={(e) => this.setState({pass_confirm: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <input className="col-md-3 btn-primary form-control" type="submit" value="Join" />
                    </div>

                </form>
            </div>
            </section>
        );
    }

};

export default SignUp;