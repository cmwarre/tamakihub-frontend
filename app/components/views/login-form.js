import React from 'react';
import {Form, FormGroup, FormControl, Button, Checkbox} from 'react-bootstrap';


const LoginForm = React.createClass({

    getInitialState: function(){
        return {
            username: "",
            password: "",
            remember: false
        }
    },

    _onSubmit: function(event){
        event.preventDefault();
        this.props.onSubmit(this.state);
    },

    _onChange: function(event){
        let _state = this.state;
        _state[event.target.id] = event.target.value;
        this.setState(_state);
    },

    _onRememberChecked: function(event){
        this.setState(Object.assign({}, {remember: event.target.checked}));
    },

    render: function(){
        return(
            <div className="container-fluid">
                <div className="signin-form-container">
                    <Form className="form-signin" onSubmit={this._onSubmit}>
                        <h2 className="form-signin-heading">Please sign in</h2>
                        <FormGroup controlId="username">
                            <FormControl controlId="username" type="text" placeholder="Username" onChange={this._onChange} required autofocus />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormControl type="password" placeholder="Password" onChange={this._onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Checkbox id="remember" onChange={this._onRememberChecked}>Remember me</Checkbox>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" className="btn btn-lg btn-primary btn-block">Sign in</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
});

export default LoginForm;