import React from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import EntityAutoComplete from '../entity-autocomplete';

const HoursForm = React.createClass({

    getInitialState: function(){
        return({
            data: {
                engineerID: this.props.engineerID,
                date: this.props.date,
                peerID: -1,
                topicID: 1,
                description: "",
            },
            validationText: ""
        });
    },

    componentDidMount: function(){
        //TODO this is shiiiiit
        this.validationMethods.parent = this;
    },

    //TODO I hate this crap
    componentWillReceiveProps: function(nextProps){
        if(nextProps.data && nextProps.data !== this.state.data){
            this.setState({data: {
                engineerID: nextProps.data.engineerID,
                date: nextProps.data.date,
                peerID: nextProps.data.peerID,
                topicID: nextProps.data.topicID,
                description: nextProps.data.description,
            }});
        }
    },

    _onChange: function(event){
        let _data = Object.assign({}, this.state.data);
        _data[event.target.id] = event.target.value;
        this.setState({data: _data});
    },

    _onSubmit: function(event){
        event.preventDefault();
        if(this.validateForm())
            this.props.onSubmit(this.state.data);
    },

    validationMethods: {
        peerID: function (value) {
            return value < 1 ? this.onValidationError("Please select a valid peer") : true;
        },

        topicID: function(value) {
            return value < 1 ? this.onValidationError("Please select a valid topic") : true;
        },

        description: function (value) {
            return value.length < 1 ? this.onValidationError("Description is too short") :
                value.length > 255 ? this.onValidationError("Description is too long") : true;
        },

        onValidationError: function(message){
            this.parent.setState({validationText: message});
            return false;
        },
    },

    validateForm: function(){
        var isValid = true;

        for(var key in this.state.data) {
            if (this.state.data.hasOwnProperty(key))
                isValid = this.validationMethods[key] ?
                this.validationMethods[key](this.state.data[key]) && isValid : true;
        }

        return isValid;
    },

    render: function(){
        return (
            <div>
                <FormGroup>
                    <ControlLabel>Peer</ControlLabel>
                    <EntityAutoComplete
                        id="peerID"
                        data={this.props.engineers}
                        displayProperty="fullname"
                        value={this.state.data.peerID}
                        onChange={this._onChange}
                    />
                </FormGroup>

                <FormGroup controlId="topicID">
                    <ControlLabel>Topic</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={this._onChange}
                        value={this.state.data.topicID} >
                        {this.props.topics.map(topic => {
                            return (
                                <option key={"2." + topic.id} value={topic.id}>
                                    {topic.attributes.name}
                                </option>
                            );
                        })}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="description">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea"
                                 value={this.state.data.description}
                                 onChange={this._onChange}
                                 rows="4"
                                 maxLength="255" />
                </FormGroup>

                <div className="form-validation-text">
                    {this.state.validationText}
                </div>

                <Button bsStyle="primary" onClick={this._onSubmit}>Submit</Button>

            </div>
        );
    }

});

export default HoursForm;