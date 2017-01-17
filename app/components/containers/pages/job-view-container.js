/**
 * Created by cwarren on 1/16/17.
 */
import React from 'react';
import JobView from '../../views/pages/job-view';
import * as jobApi from '../../../api/job-api';
import * as branchApi from '../../../api/branches-api';
import * as engineerApi from '../../../api/engineer-api';
import * as customerApi from '../../../api/customers-api';
import * as currencyApi from '../../../api/currency-api';

const JobViewContainer = React.createClass({

        getInitialState: function(){
            return {
                job: null,
                branch: null,
                admin: null,
                endCustomer: null,
                currency: null
            };
        },

        componentDidMount: function(){
            jobApi.getJob(this.props.params.id, response => {
                this.setState({job : response.data.data});

                let branchID = response.data.data.branchID;
                branchApi.getBranch(branchID, response => {
                    this.setState({branch: response.data.data});
                });

                let adminID = response.data.data.adminID;
                engineerApi.getEngineer(adminID, response => {
                    this.setState({admin: response.data.data});
                });

                let endCustomerID = response.data.data.endCustomerID;
                customerApi.getCustomer(endCustomerID, response => {
                    this.setState({endCustomer: response.data.data});
                });

                let currencyID = response.data.data.currencyID;
                currencyApi.getCurrency(currencyID, response => {
                    this.setState({currency: response.data.data});
                });

            });

        },

        render: function(){
            return <JobView {...this.state} />
        },
});

export default JobViewContainer;