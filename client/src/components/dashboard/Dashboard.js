import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Main from '../Main'
import Navbar from "../layout/Navbar";
import API from "../../utils/API"
// import UserInputs from "../UserInputs"


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: ""
        }
    }

    componentDidMount(){
        API.getUserName()
        .then(res => {
            console.log(res);
            this.setState({firstName: res.data.firstName, lastName: res.data.lastName})
            console.log(this.state)
        })
        .catch(error => console.log(error))
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        // const { user } = this.props.auth;
        return (
            <div >
                <Navbar  
                firstName = {this.state.firstName}
                lastName = {this.state.lastName}/>
                <Main />
                {/* <UserInputs /> */}
                <button className="btn btn-large waves-effect waves-light hoverable" style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }} onClick={this.onLogoutClick}>
                    Logout
                </button>
            </div>

        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logoutUser })(Dashboard);