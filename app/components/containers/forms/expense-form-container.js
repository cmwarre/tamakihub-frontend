import React from 'react';

import ExpenseForm from '../../views/forms/expense-form';

import * as jobApi from '../../../api/job-api';
import * as bookingTypeApi from '../../../api/booking-types-api';
import * as expenseCategoriesApi from '../../../api/expense-categories-api';
import * as expensesApi from '../../../api/expenses-api';

const ExpenseFormContainer = React.createClass({

    getInitialState: function(){
      return({
          engineerID: this.props.engineerID,
          jobs: [],
          customCategories: [],
          bookingTypes: [],
          expenseCategories: [],
      });
    },

    componentDidMount: function(){
        if(this.props.expenseID > -1)
            expensesApi.getExpense(this.props.expenseID, response =>{
                console.log(response);
                this.setState({
                    data: response.data['data'].attributes
                });
            });

        jobApi.getOpenJobs(response => {
            this.setState({jobs: response.data['data']});
        });

        bookingTypeApi.getBookingTypes(response => {
            this.setState({bookingTypes: response.data['data']});
        });

        expenseCategoriesApi.getExpenseCategories(response => {
            this.setState({expenseCategories: response.data['data']});
        });

    },

    onSubmit: function(formData){
        if(this.props.expenseID > -1)
            expensesApi.editExpense(this.props.expenseID, formData, response => {
                this.props.onSuccess ? this.props.onSuccess(response.data) : null;
            });
        else
            expensesApi.addExpense(formData, response => {
                this.props.onSuccess ? this.props.onSuccess(response.data) : null;
            });
    },

    render: function() {
        return (
            <ExpenseForm
                date={this.props.date}
                engineerID={this.state.engineerID}
                data={this.state.data}
                jobs={this.state.jobs}
                customCategories={this.state.customCategories}
                bookingTypes={this.state.bookingTypes}
                expenseCategories={this.state.expenseCategories}
                onSubmit={this.onSubmit}
            />
        );
    }
});

export default ExpenseFormContainer;