import React from 'react';
import { Button, FormGroup, InputGroup, ControlLabel, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import EntityAutoComplete from '../entity-autocomplete';

const DistancesForm = React.createClass({

    getInitialState: function(){
        return({
            data: {
                engineerID: this.props.engineerID,
                date: this.props.date,
                jobID: -1,
                bookTypeID: 1,
                customCategoryID: -1,
                description: "",
                km: 0
            },
            validationText: "",
            distanceUnits: "KM"
        });
    },

    componentDidMount: function(){
        this.validationMethods.parent = this;
    },

    //TODO I hate this crap
    componentWillReceiveProps: function(nextProps){
        if(nextProps.data && nextProps.data !== this.state.data){
            this.setState({data: {
                engineerID: nextProps.data.engineerID,
                date: nextProps.data.date,
                jobID: nextProps.data.job.data.id,
                bookTypeID: nextProps.data.bookTypeID,
                customCategoryID: -1,
                description: nextProps.data.description,
                km: nextProps.data.km
            }});
        }
    },

    onDistanceUnitsChanged: function(value){
        this.setState({distanceUnits: value});
    },

    milesToKM: function(miles){
        return Math.ceil(miles * 1.60934);
    },

    _onChange: function(event){
        let _data = Object.assign({}, this.state.data);
        _data[event.target.id] = event.target.value;
        this.setState({data: _data});
    },

    _onSubmit: function(event){
        event.preventDefault();

        // TODO I'm not sure this is the best place for this...
        // If the user chose to use miles, we need to convert this into KM for the database.
        let _data = Object.assign({}, this.state.data, {
            km: this.state.distanceUnits.toLowerCase() === "km" ? this.state.data.km : this.milesToKM(this.state.data.km)
        });

        if(this.validateForm())
            this.props.onSubmit(_data);
    },

    validationMethods: {
        jobID: function (value) {
            return value < 1 ? this.onValidationError("Please select a valid job") : true;
        },

        bookTypeID: function(value) {
            return value < 1 ? this.onValidationError("Please select a valid booking type") : true;
        },

        km: function (value) {
            return  value <= 0 ? this.onValidationError("Please give a valid driving distance") : true;
        },

        description: function (value) {
            return  value.length < 1 ? this.onValidationError("Description is too short") :
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

                <FormGroup controlId="km">
                    <ControlLabel>Distance</ControlLabel>
                    <InputGroup>

                        <FormControl type="number"
                                     min="0"
                                     max="5000"
                                     value={this.state.data.km}
                                     onChange={this._onChange}/>

                        <DropdownButton id="distanceUnits"
                                        componentClass={InputGroup.Button}
                                        title={this.state.distanceUnits}>
                            <MenuItem onClick={this.onDistanceUnitsChanged.bind(null, 'KM')}>KM</MenuItem>
                            <MenuItem onClick={this.onDistanceUnitsChanged.bind(null, 'Miles')}>Miles</MenuItem>
                        </DropdownButton>

                    </InputGroup>
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