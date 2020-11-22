import React from 'react';
import CustomerView from '../../views/pages/customer-view';
import * as customerApi from '../../../api/customers-api';

const CustomerViewContainer = React.createClass({

        getInitialState: function(){
            return {
                customer: null,
                jobs: [],
                invoice_addresses: []
            };
        },

        componentDidMount: function(){
            customerApi.getCustomer(this.props.params.id, response => {
                this.setState({customer: response.data.data});
            });

            customerApi.getCustomerJobs(this.props.params.id, response => {
                console.log(response);
                this.setState({jobs: response.data.data});
            });

            customerApi.getCustomerInvoiceAddresses(this.props.params.id, response => {
                this.setState({invoice_addresses: response.data.data});
            });
        },

        render: function(){
            return <CustomerView {...this.state} />
        },
});

export default CustomerViewContainer;