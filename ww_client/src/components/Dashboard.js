import React, { Component} from 'react';
import DoDashboard from '../charts/do-dashboard';
import '../styles/dashboard.css';

class Dashboard extends Component {

    constructor (props) {
        super(props);
        this.state = {
            //
        }
    }

    componentDidMount() {
        let init = new DoDashboard().setupDashboard();
    
    }

    render() {
        return (
           <table id="dashboard-dock">
           
           </table>
        );
    }

}

export default Dashboard;