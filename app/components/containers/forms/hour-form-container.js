import React from 'react';

import * as jobApi from '../../../api/job-api';
import * as bookingTypeApi from '../../../api/booking-types-api';
import * as taskApi from '../../../api/task-api';
import * as workrateApi from '../../../api/workrate-api';
import * as hoursApi from '../../../api/hours-api';

import HourForm from '../../views/forms/hour-form';

const HoursFormContainer = React.createClass({

    // TODO default rate needs to be first one on dropdown - change state after API callback and catch props inside?
    // TODO pass existing form data in and use it as edit
    getInitialState: function(){
      return({
          engineerID: this.props.engineerID,
          jobs: [],
          jobCategories: [],
          bookingTypes: [],
          tasks: [],
          rates: [],
          defaultRate: 70
      });
    },

    componentDidMount: function(){
        if(this.props.hourID > -1)
            hoursApi.getHour(this.props.hourID, response =>{
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

        taskApi.getTasks(response => {
            this.setState(Object.assign({}, this.state, {tasks: response.data['data']}));
        });

        workrateApi.getEngineerWorkRates(this.props.engineerID, response => {
            let defaultRate = response.data['data'][0].attributes.value;
            return this.setState(Object.assign({}, this.state, {
                defaultRate: defaultRate ? defaultRate : 70,
                rates: response.data['data']
            }));
        });
    },

    onSubmit: function(formData){
        if(this.props.hourID > -1) {
            console.log("editing hour");
            hoursApi.editHour(this.props.hourID, formData, response => {
                this.props.onSuccess ? this.props.onSuccess(response.data) : null;
            });
        }else
            hoursApi.addHour(formData, response => {
                this.props.onSuccess ? this.props.onSuccess(response.data) : null;
            });
    },

    render: function() {
        return (
            <HourForm
                date={this.props.date}
                engineerID={this.state.engineerID}
                data={this.state.data}
                defaultRate={this.state.defaultRate}
                jobs={this.state.jobs}
                bookingTypes={this.state.bookingTypes}
                tasks={this.state.tasks}
                rates={this.state.rates}
                onSubmit={this.onSubmit}
            />
        );
    }
});

export default HoursFormContainer;