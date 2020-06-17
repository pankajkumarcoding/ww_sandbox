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

                        <Route path="/login">
                            <Login />
                        </Route>
                        
                        <Route path="/signup">
                            <SignUp />
                        </Route>

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