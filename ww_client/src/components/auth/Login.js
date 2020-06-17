import React, { Component } from 'react';
import { graphql, Mutation } from 'react-apollo';
import {LOGIN_MUTATION} from '../../queries/userQueries'



class Login extends Component {

    constructor (props) {
        super(props);
        this.state = {
            password : "",
            email : ""
        }
    }

    doStuff(e) {
        e.preventDefault();
        console.log("did stuff");
    }

    _confirm(data) {

    }

    render () {
        const {password, email} = this.state;
        return (
            <section className="container">
                <p>Login Form</p>
                <Mutation
                    mutation={LOGIN_MUTATION}
                    variables={{ email, password }}
                    onCompleted={data => this._confirm(data)}
                >
                    {mutation => (
                        <div className="pointer mr2 button" onClick={mutation}>
                            {'login'}
                        </div>
                    )}
                </Mutation>

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