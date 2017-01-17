import React from 'react';
import FormModal from '../views/form-modal';
import EntityTable from '../views/entity-table';
import moment from 'moment';
import { Calendar } from 'react-widgets';
import { Button, Panel } from 'react-bootstrap';

import HourFormContainer from '../containers/forms/hour-form-container';
import DistanceFormContainer from '../containers/forms/distance-form-container';
import ExpenseFormContainer from '../containers/forms/expense-form-container';
import ConversationFormContainer from '../containers/forms/conversation-form-container';

import * as engineerApi from '../../api/engineer-api';
import * as hoursApi from '../../api/hours-api';
import * as distancesApi from '../../api/distances-api';
import * as expensesApi from '../../api/expenses-api';
import * as conversationsApi from '../../api/conversations-api';

const momentLocalizer = require('react-widgets/lib/localizers/moment');

momentLocalizer(moment);

const TimesheetLayout = React.createClass({

    getInitialState: function(){
        return {
            engineerID: engineerApi.getCurrentUser().id,
            date: moment().format("YYYY-MM-DD"),
            hours: [],
            distances: [],
            expenses: [],
            conversations: [],
            showHourForm: false,
            showDistanceForm: false,
            showExpenseForm: false,
            showConversationForm: false
        };
    },

    componentDidMount: function(){
        this.refreshData(this.state.date);
    },

    refreshData: function(date){
        this.getHours(date);
        this.getDistances(date);
        this.getExpenses(date);
        this.getConversations(date);
    },

    _onChange: function(name, value){
        let date = moment(value).format("YYYY-MM-DD");
        this.setState({date: date});
        this.refreshData(date);
    },

    /*
    *
    * Hours Table Actions
    *
    * */
    getHours: function(date){
        hoursApi.getDayHours(this.state.engineerID, date, response => {
            this.setState({hours: response.data['data']});
        });
    },

    onAddHour: function(){
        this.setState({hourID: -1});
        this.showHourForm();
    },

    onEditHour: function(id){
        this.setState({hourID: id});
        this.showHourForm();
    },

    onDeleteHour: function(id){
        hoursApi.removeHour(id, () => {
            this.getHours(this.state.date);
        });
    },

    showHourForm: function() {
        this.setState({showHourForm: true});
    },

    hideHourForm: function(){
        this.setState({showHourForm: false});
    },

    submitHourSuccess: function(){
        this.getHours(this.state.date);
        this.hideHourForm();
    },

    /*
    *
    * Distances Table Actions
    *
    * */
    getDistances: function(date){
        distancesApi.getDayDistances(this.state.engineerID, date, response => {
            this.setState({distances: response.data['data']});
        });
    },

    onAddDistance: function(){
        this.setState({distanceID: -1});
        this.showDistanceForm();
    },

    onEditDistance: function(id){
        this.setState({distanceID: id});
        this.showDistanceForm();
    },

    onDeleteDistance: function(id){
        distancesApi.removeDistance(id, () => {
            this.getDistances(this.state.date);
        });
    },

    showDistanceForm: function(){
        this.setState({showDistanceForm: true});
    },

    hideDistanceForm: function(){
        this.setState({showDistanceForm: false});
    },

    submitDistanceSuccess: function(){
        console.log("success");
        this.getDistances(this.state.date);
        this.hideDistanceForm();
    },

    /*
     *
     * Expenses Table Actions
     *
     * */
    getExpenses: function(date){
        expensesApi.getDayExpenses(this.state.engineerID, date, response => {
            this.setState({expenses: response.data['data']});
        })
    },

    onAddExpense: function(){
        this.setState({expenseID: -1});
        this.showExpenseForm();
    },

    onEditExpense: function(id){
        this.setState({expenseID: id});
        this.showExpenseForm();
    },

    onDeleteExpense: function(id){
        expensesApi.removeExpense(id, () => {
            this.getExpenses(this.state.date);
        });
    },

    showExpenseForm: function(){
        this.setState({showExpenseForm: true});
    },

    hideExpenseForm: function(){
        this.setState({showExpenseForm: false});
    },

    submitExpenseSuccess: function(){
        this.getExpenses(this.state.date);
        this.hideExpenseForm();
    },

    /*
     *
     * Conversation Table Actions
     *
     * */
    getConversations: function(date){
        conversationsApi.getDayConversations(this.state.engineerID, date, response => {
            this.setState({conversations: response.data['data']});
        })
    },

    onEditConversation: function(id){
        this.setState({conversationID: id});
        this.showConversationForm();
    },

    onDeleteConversation: function(id){
        conversationsApi.removeConversation(id, () => {
            this.getConversations(this.state.date);
        });
    },

    showConversationForm: function(){
        this.setState({showConversationForm: true});
    },

    hideConversationForm: function(){
        this.setState({showConversationForm: false});
    },

    submitConversationSuccess: function(){
        this.getConversations(this.state.date);
        this.hideConversationForm();
    },

    render: function(){
        return(
            <div className="container-fluid">

                <div className="col-md-2">
                    <Calendar
                        footer={true}
                        onChange={this._onChange.bind(null, '0')}
                    />
                </div>
                <div className="col-md-10">
                    <row>
                        <Button bsStyle="primary" onClick={this.onAddHour}>Add Hour</Button>

                        <FormModal show={this.state.showHourForm} onHide={this.hideHourForm}>
                            <HourFormContainer
                                hourID={this.state.hourID}
                                engineerID={this.state.engineerID}
                                date={this.state.date}
                                onSuccess={this.submitHourSuccess}
                            />
                        </FormModal>
                    </row>
                    <row>
                        <Panel collapsible expanded={this.state.hours.length > 0}>
                            <EntityTable
                                title="Hours"
                                headers={['Description', 'Quantity', 'Job', '']}
                                data={this.state.hours}
                                detailLink="/hours/"
                                linkingField="description"
                                showColumns={["quantity", "job.data.attributes.name"]}
                                showEdit={true}
                                onEdit={this.onEditHour}
                                showDelete={true}
                                onDelete={this.onDeleteHour}
                            />
                        </Panel>
                    </row>
                    <row>
                        <Button bsStyle="primary" onClick={this.onAddDistance}>Add Distance</Button>
                        <FormModal show={this.state.showDistanceForm} onHide={this.hideDistanceForm}>
                            <DistanceFormContainer
                                distanceID={this.state.distanceID}
                                engineerID={this.state.engineerID}
                                date={this.state.date}
                                onSuccess={this.submitDistanceSuccess}
                            />
                        </FormModal>
                    </row>
                    <row>
                        <Panel collapsible expanded={this.state.distances.length > 0}>
                            <EntityTable
                                title="Distances"
                                headers={['Description', 'KM', 'Job', '']}
                                data={this.state.distances}
                                detailLink="/distances/"
                                linkingField="description"
                                showColumns={["km", "job.data.attributes.name"]}
                                showEdit={true}
                                onEdit={this.onEditDistance}
                                showDelete={true}
                                onDelete={this.onDeleteDistance}
                            />
                        </Panel>
                    </row>
                    <row>
                        <Button bsStyle="primary" onClick={this.showExpenseForm}>Add Expense</Button>
                        <FormModal show={this.state.showExpenseForm}
                                   onHide={this.hideExpenseForm}>
                            <ExpenseFormContainer
                                expenseID={this.state.expenseID}
                                engineerID={this.state.engineerID}
                                date={this.state.date}
                                onSuccess={this.submitExpenseSuccess}
                            />
                        </FormModal>
                    </row>
                    <row>
                        <Panel collapsible expanded={this.state.expenses.length > 0}>
                            <EntityTable
                                title="Expenses"
                                headers={['Description', 'Value', '']}
                                data={this.state.expenses}
                                detailLink="/distances/"
                                linkingField="description"
                                showColumns={["value"]}
                                showEdit={true}
                                onEdit={this.onEditExpense}
                                showDelete={true}
                                onDelete={this.onDeleteExpense}
                            />
                        </Panel>
                    </row>
                    <row>
                        <Button bsStyle="primary" onClick={this.showConversationForm}>Add Conversation</Button>
                        <FormModal show={this.state.showConversationForm}
                            onHide={this.hideConversationForm} >
                            <ConversationFormContainer
                                conversationID={this.state.conversationID}
                                engineerID={this.state.engineerID}
                                date={this.state.date}
                                onSuccess={this.submitConversationSuccess}
                            />
                        </FormModal>
                    </row>
                    <row>
                        <Panel collapsible expanded={this.state.conversations.length > 0}>
                            <EntityTable
                                title="Conversations"
                                headers={['Description']}
                                data={this.state.conversations}
                                detailLink="/conversations/"
                                linkingField="description"
                                showColumns={[]}
                                showEdit={true}
                                onEdit={this.onEditConversation}
                                showDelete={true}
                                onDelete={this.onDeleteConversation}
                            />
                        </Panel>
                    </row>
                </div>
            </div>
        );
    }
});

export default TimesheetLayout;
