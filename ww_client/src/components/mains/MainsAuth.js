import React, { Component, useState  } from 'react';
import {
    BrowserRouter as Router,
    Route, 
    Link, 
    Switch,
    Redirect
  } from "react-router-dom";

  import Login from "../auth/Login";
  import SignUp from "../auth/SignUp";

class MainsAuth extends Component {

    render() {
        return (
            <div>
                <Router>
                    <Switch>

                        <Route path="/login" component={Login} />
                        
                        <Route path="/signup" component={SignUp} />

                        <Route path="/logout">
                            {/*  ?  */}
                        </Route>

                    </Switch>
                </Router>

            </div>
        )
    }
    
};

export default MainsAuth;