import React from 'react';
import { Button, FormGroup, InputGroup, ControlLabel, FormControl } from 'react-bootstrap';
import EntityAutoComplete from '../entity-autocomplete';

import * as jobsApi from '../../../api/job-api';

const DistancesForm = React.createClass({

    getInitialState: function(){
        return({
            data: {
                engineerID: this.props.engineerID,
                date: this.props.date,
                jobID: -1,
                customCategoryID: -1,
                bookTypeID: 1,
                expenseType: 1,
                currencyID: -1,
                name: "",
                description: "",
                value: 0
            },
            selectedJob: null,
            validationText: ""
        });
    },

    componentDidMount: function(){
        this.validationMethods.parent = this;
    },

    componentWillReceiveProps: function(nextProps){
        if(nextProps.data && nextProps.data !== this.state.data){
            this.setState({data: {
                engineerID: nextProps.data.engineerID,
                date: nextProps.data.date,
                jobID: nextProps.data.jobID,
                customCategoryID: nextProps.data.customCategoryID,
                bookTypeID: nextProps.data.bookTypeID,
                expenseType: nextProps.data.expenseType,
                currencyID: nextProps.data.currencyID,
                name: nextProps.data.name,
                description: nextProps.data.description,
                value: nextProps.data.value
            }});
        }
    },

    // TODO API calls should be done by the container somehow
    onJobSelected: function(event){
        let _data = Object.assign({}, this.state.data);
        _data[event.target.id] = event.target.value;

        jobsApi.getJob(event.target.value, response => {
            console.log("setting currency id");
            console.log(response);
            _data.currencyID = response.data.data.attributes.currencyID;
            this.setState({
                selectedJob: response.data,
                data: _data
            });
        });
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
            return value < 1 ? this.onValidationError("Please select a valid job") : true;
        },

        customCategoryID: function(value){
            return true;
        },

        bookTypeID: function(value) {
            return value < 1 ? this.onValidationError("Please select a valid booking type") : true;
        },

        expenseCategoryID: function(value){
            return true;
        },

        name: function(value) {
            return true;
        },

        description: function (value) {
            return  value.length < 1 ? this.onValidationError("Description is too short") :
                    value.length > 255 ? this.onValidationError("Description is too long") : true;
        },

        value: function (value) {
            return  value <= 0 ? this.onValidationError("Please give a valid driving distance") : true;
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
                        onChange={this.onJobSelected}
                    />
                </FormGroup>

                <FormGroup controlId="customCategoryID">
                    <ControlLabel>Category</ControlLabel>
                    <FormControl
                        disabled={true}
                        componentClass="select"
                        onChange={this._onChange}
                        value={this.state.data.customCategoryID} >
                        {this.props.customCategories.map(customCategory => {
                            return (
                                <option key={"2." + customCategory.id} value={customCategory.id}>
                                    {customCategory.attributes.name}
                                </option>
                            );
                        })}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="bookTypeID">
                    <ControlLabel>Booking Type</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={this._onChange}
                        value={this.state.data.bookTypeID} >
                        {this.props.bookingTypes.map(bookingType => {
                            return (
                                <option key={"3." + bookingType.id} value={bookingType.id}>
                                    {bookingType.attributes.name}
                                </option>
                            );
                        })}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="value">
                    <ControlLabel>Value</ControlLabel>
                    <InputGroup>
                    <FormControl type="number"
                                 min="0"
                                 max="100000"
                                 value={this.state.data.value}
                                 onChange={this._onChange} />
                        <InputGroup.Addon>
                            {
                                this.state.selectedJob ?
                                this.state.selectedJob.data.attributes.currency.data.attributes.code : null
                            }
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>

                <FormGroup controlId="expenseType">
                    <ControlLabel>Expense Category</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={this._onChange}
                        value={this.state.data.expenseCategoryID} >
                        {this.props.expenseCategories.map(expenseCategory => {
                            return (
                                <option key={"4." + expenseCategory.id} value={expenseCategory.id}>
                                    {expenseCategory.attributes.name}
                                </option>
                            );
                        })}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="name">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl type="text"
                                 value={this.state.data.name}
                                 onChange={this._onChange}
                                 maxLength="255" />
                </FormGroup>

                <FormGroup controlId="description">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl type="textarea"
                                 value={this.state.data.description}
                                 onChange={this._onChange}
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

export default DistancesForm;