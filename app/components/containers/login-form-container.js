import React from 'react';
import LoginForm from '../views/login-form';
import * as engineerApi from '../../api/engineer-api';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const LoginFormContainer = React.createClass({

    onSubmit: function(formData){
        engineerApi.getAuthToken(formData.username, formData.password, formData.remember);
    },

    componentWillReceiveProps: function(newProps){
        if(this.props.apiToken != newProps.apiToken && newProps.apiToken != ""){
            this.props.router.push("/");
        }
    },

    render: function(){
        return(<LoginForm onSubmit={this.onSubmit} />);
    }
});


const mapStateToProps = function(store) {
    return {
        apiToken: store.userState.token
    }
};

export default withRouter(connect(mapStateToProps)(LoginFormContainer));
