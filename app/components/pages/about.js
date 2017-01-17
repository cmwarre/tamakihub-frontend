import React from 'react';
import { Button } from 'react-bootstrap';
import * as jobApi from '../../api/job-api';
import * as bookingTypeApi from '../../api/booking-types-api';
import * as taskApi from '../../api/task-api';

import HoursForm from '../views/hours-form';

const About = React.createClass({

    getInitialState: function(){
      return({
          jobs: [],
          bookingTypes: [],
          tasks: [],
          rates: []
      });
    },

    componentDidMount: function(){
        jobApi.getOpenJobs(response => {
            this.setState(Object.assign({}, this.state, {jobs: response.data['data']}));
        });

        bookingTypeApi.getBookingTypes(response => {
            this.setState(Object.assign({}, this.state, {bookingTypes: response.data['data']}));
        });

        taskApi.getTasks(response => {
            this.setState(Object.assign({}, this.state, {tasks: response.data['data']}));
        });
    },

    onSubmit: function(event){
        event.preventDefault();
    },

    render: function() {
        return (
            <div className="container">
            <HoursForm
                jobs={this.state.jobs}
                bookingTypes={this.state.bookingTypes}
                tasks={this.state.tasks}
                onSubmit={this.onSubmit}
            />
            </div>
        );
    }
});

export default About;