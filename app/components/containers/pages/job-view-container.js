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
                currency: null,
                hours: [],
                distances: [],
                expenses: []
            };
        },

        componentDidMount: function(){
            jobApi.getJob(this.props.params.id, response => {
                this.setState({job : response.data.data});

                let branchID = response.data.data.attributes.branchID;
                branchApi.getBranch(branchID, response => {
                    this.setState({branch: response.data.data});
                });

                let adminID = response.data.data.attributes.adminID;
                engineerApi.getEngineer(adminID, response => {
                    this.setState({admin: response.data.data});
                });

                let endCustomerID = response.data.data.attributes.endCustomerID;
                customerApi.getCustomer(endCustomerID, response => {
                    this.setState({endCustomer: response.data.data});
                });

                let currencyID = response.data.data.attributes.currencyID;
                currencyApi.getCurrency(currencyID, response => {
                    this.setState({currency: response.data.data});
                });

            });

            jobApi.getJobHours(this.props.params.id, response => {
                this.setState({hours: response.data.data});
            });

            jobApi.getJobDistances(this.props.params.id, response => {
                this.setState({distances: response.data.data});
            });

            jobApi.getJobExpenses(this.props.params.id, response => {
                this.setState({expenses: response.data.data});
            });

            // jobApi.getJobInvoices(this.props.params.id, response => {
            //     this.setState({invoices: response.data});
            // });

        },

        render: function(){
            return <JobView {...this.state} />
        },
});

export default JobViewContainer;