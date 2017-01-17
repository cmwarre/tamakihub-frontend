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
                jobID: -1,
                bookTypeID: 1,
                taskID: 1,
                customCategoryID: -1,
                rate: this.props.defaultRate,
                description: "",
                quantity: 0
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
                jobID: nextProps.data.job.data.id,
                customCategoryID: nextProps.data.customCategoryID,
                bookTypeID: nextProps.data.bookTypeID,
                taskID: nextProps.data.taskID,
                rate: nextProps.data.rate,
                description: nextProps.data.description,
                quantity: nextProps.data.quantity
            }});
        }else if(nextProps.defaultRate != this.props.defaultRate){
            console.log(nextProps.defaultRate);
            this.setState({data: Object.assign({}, this.state.data, {rate: nextProps.defaultRate})});
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
        jobID: function (value) {
            console.log("validating job id " + value);
            return value < 1 ? this.onValidationError("Please select a valid job") : true;
        },

        bookTypeID: function(value) {
            return value < 1 ? this.onValidationError("Please select a valid booking type") : true;
        },

        rate: function (value) {
            return  value < 0 ? this.onValidationError("Invalid Rate") : true;
        },

        description: function (value) {
            return value.length < 1 ? this.onValidationError("Description is too short") :
                value.length > 255 ? this.onValidationError("Description is too long") : true;
        },

        quantity: function(value) {
            return  value <= 0 ? this.onValidationError("Please enter a valid number of hours (must be more than 0)") :
                    value > 24 ? this.onValidationError("Please enter a valid number of hours (too many)") : true;
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
                    <ControlLabel>Job</ControlLabel>
                    <EntityAutoComplete
                        id="jobID"
                        data={this.props.jobs}
                        displayProperty="name"
                        value={this.state.data.jobID}
                        onChange={this._onChange}
                    />
                </FormGroup>

                <FormGroup controlId="bookTypeID">
                    <ControlLabel>Booking Type</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={this._onChange}
                        value={this.state.data.bookTypeID} >
                        {this.props.bookingTypes.map(bookingType => {
                            return (
                                <option key={"2." + bookingType.id} value={bookingType.id}>
                                    {bookingType.attributes.name}
                                </option>
                            );
                        })}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="taskID">
                    <ControlLabel>Task</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={this._onChange}
                        value={this.state.data.taskID} >
                        {this.props.tasks.map(task => {
                            return (
                                <option key={"3." + task.id} value={task.id}>
                                    {task.attributes.name}
                                </option>
                            );
                        })}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="rate">
                    <ControlLabel>Rate</ControlLabel>
                    <FormControl componentClass="select"
                                 onChange={this._onChange}
                                 value={this.state.data.rate} >
                        {this.props.rates.map(rate => {
                            return (
                                <option key={"4." + rate.id} value={rate.attributes.value}>
                                    {rate.attributes.name + " - " + rate.attributes.value}
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

                <FormGroup controlId="quantity">
                    <ControlLabel>Quantity</ControlLabel>
                    <FormControl type="number"
                                 min="0"
                                 max="24"
                                 value={this.state.data.quantity}
                                 onChange={this._onChange} />
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