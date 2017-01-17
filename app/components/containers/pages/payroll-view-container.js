/**
 * Created by cwarren on 1/16/17.
 */
import React from 'react';
import PayrollView from '../../views/pages/payroll-view';
import * as payrollApi from '../../../api/payroll-api';


const PayrollViewContainer = React.createClass({

        getInitialState: function(){
            return {
                payroll: null,
                engineers: [],
                branches: []
            };
        },

        componentDidMount: function(){
            payrollApi.getPayroll(this.props.params.id, response => {
                this.setState({payroll : response.data.data});
            });

            payrollApi.getPayrollBranches(this.props.params.id, response => {
                this.setState({branches: response.data});
            });

            payrollApi.getPayrollEngineers(this.props.params.id, response => {
                this.setState({engineers: response.data});
            });
        },

        render: function(){
            return <PayrollView {...this.state} />
        },
});

export default PayrollViewContainer;