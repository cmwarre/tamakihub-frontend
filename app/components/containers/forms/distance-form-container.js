import React from 'react';

import DistanceForm from '../../views/forms/distance-form';

import * as jobApi from '../../../api/job-api';
import * as bookingTypeApi from '../../../api/booking-types-api';
import * as distancesApi from '../../../api/distances-api';


const DistanceFormContainer = React.createClass({

    getInitialState: function(){
      return({
          engineerID: this.props.engineerID,
          jobs: [],
          jobCategories: [],
          bookingTypes: [],
      });
    },

    componentDidMount: function(){
        if(this.props.distanceID > -1)
            distancesApi.getDistance(this.props.distanceID, response =>{
                this.setState({
                    data: response.data['data'].attributes
                });
            });

        jobApi.getOpenJobs(response => {
            this.setState(Object.assign({}, this.state, {jobs: response.data['data']}));
        });

        bookingTypeApi.getBookingTypes(response => {
            this.setState(Object.assign({}, this.state, {bookingTypes: response.data['data']}));
        });

    },

    onSubmit: function(formData){
        if(this.props.distanceID > -1) {
            distancesApi.editDistance(this.props.distanceID, formData, response => {
                this.props.onSuccess ? this.props.onSuccess(response.data) : null;
            });
        }else
            distancesApi.addDistance(formData, response => {
                this.props.onSuccess ? this.props.onSuccess(response.data) : null;
            });
    },

    render: function() {
        return (
            <DistanceForm
                date={this.props.date}
                engineerID={this.state.engineerID}
                data={this.state.data}
                jobs={this.state.jobs}
                bookingTypes={this.state.bookingTypes}
                onSubmit={this.onSubmit}
            />
        );
    }
});

export default DistanceFormContainer;