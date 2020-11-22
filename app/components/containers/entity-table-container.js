/**
 * Created by cwarren on 11/13/16.
 */
import React from 'react';
import EntityTable from '../views/entity-table';
import SearchForm from '../views/search-form';
import { connect } from 'react-redux';


import * as skillApi from '../../api/skill-api';
import * as jobApi from '../../api/job-api';
import * as engineerApi from '../../api/engineer-api';
import * as taskApi from '../../api/task-api';
import * as expenseCategoriesApi from '../../api/expense-categories-api';
import * as bookingTypesApi from '../../api/booking-types-api';
import * as branchesApi from '../../api/branches-api';
import * as payrollApi from '../../api/payroll-api';
import * as customerApi from '../../api/customers-api';
import * as dailyAllowanceRatesApi from '../../api/daily-allowance-rates-api';
import * as purchaseOrdersApi from '../../api/purchase-orders-api';
import * as invoicesApi from '../../api/invoices-api';
import * as rateGroupsApi from '../../api/rate-groups-api';
import * as currencyApi from '../../api/currency-api';
import * as clientReleasesApi from '../../api/client-releases-api';
import * as changeRequestsApi from '../../api/change-requests-api';
import * as conversationTopicsApi from '../../api/conversation-topics-api';

const EntityTableContainer = React.createClass({

    map: {
        currencies: {
            title: "Currencies",
            detailLink: "/currencies/",
            linkingField: "code",
            headers: ["Code", "Name", "Symbol"],
            showColumns: ["name", "symbol"],
            get: currencyApi.getCurrencies,
            search: currencyApi.searchCurrencies
        },
        jobs: {
            title: "Jobs",
            detailLink: "/jobs/",
            linkingField: "name",
            headers: ["Name", "Job Number", "Closed", "Quoted Value"],
            showColumns: ["jobNumber", "closed", "quotedValue"],
            get: jobApi.getOpenJobs,
            search: jobApi.searchJobs
        },
        engineers: {
            title: "Engineers",
            detailLink: "/engineers/",
            linkingField: "username",
            headers: ["Username", "Full Name", "Email", "Phone"],
            showColumns: ["fullname", "email", "phone"],
            get: engineerApi.getEngineers,
            search: engineerApi.searchEngineers
        },
        skills: {
            title: "Skills",
            detailLink: "/skills/",
            linkingField: "name",
            headers: ["Name", "Description"],
            showColumns: ["description"],
            get: skillApi.getSkills,
            search: skillApi.searchSkills
        },
        tasks: {
            title: "Tasks",
            detailLink: "/tasks/",
            linkingField: "name",
            headers: ["Name", "Description"],
            showColumns: ["description"],
            get: taskApi.getTasks,
            search: taskApi.searchTasks
        },
        "expense-categories" : {
            title: "Expense Categories",
            detailLink: "/expense-categories/",
            linkingField: "name",
            headers: ["Name", "Description"],
            showColumns: ["description"],
            get: expenseCategoriesApi.getExpenseCategories,
            search: expenseCategoriesApi.searchExpenseCategories

        },
        "booking-types" : {
            title: "Booking Types",
            detailLink: "/booking-types/",
            linkingField: "name",
            headers: ["Name", "Description", "% Bookable"],
            showColumns: ["description", "percentBK"],
            get: bookingTypesApi.getBookingTypes,
            search: bookingTypesApi.searchBookingTypes
        },
        branches : {
            title: "Branches",
            detailLink: "/branches/",
            linkingField: "name",
            headers: ["Name", "Tax Number", "Phone"],
            showColumns: ["tax_number", "phone"],
            get: branchesApi.getBranches,
            search: branchesApi.searchBranches
        },
        payrolls : {
            title: "Payrolls",
            detailLink: "/payrolls/",
            linkingField: "name",
            headers: ["Name", "Country"],
            showColumns: ["country"],
            get: payrollApi.getPayrolls,
            search: payrollApi.searchPayrolls
        },
        customers: {
            title: "Customers",
            detailLink: "/customers/",
            linkingField: "name",
            headers: ["Name", "Industry", "Sub-Industry", "Locations"],
            showColumns: ["industryMajor", "industryMinor", "locations"],
            get: customerApi.getCustomers,
            search: customerApi.searchCustomers
        },
        "daily-allowance-rates" : {
            title: "Daily Allowance Rates",
            detailLink: "/daily-allowance-rates/",
            linkingField: "name",
            headers: ["Name"],
            showColumns: [],
            get: dailyAllowanceRatesApi.getDailyAllowanceRates,
            search: dailyAllowanceRatesApi.searchDailyAllowanceRates
        },
        "purchase-orders": {
            title: "Purchase Orders",
            detailLink: "/purchase-orders/",
            linkingField: "poNumber",
            headers: ["PO Number", "Name", "Value"],
            showColumns: ["name", "value"],
            get: purchaseOrdersApi.getPurchaseOrders,
            search: purchaseOrdersApi.searchPurchaseOrders
        },
        invoices: {
            title: "Invoices",
            detailLink: "/invoices/",
            linkingField: "invoiceNumber",
            headers: ["Invoice Number", "Value"],
            showColumns: ["value"],
            get: invoicesApi.getInvoices,
            search: invoicesApi.searchInvoices
        },
        "rate-groups": {
            title: "Rate Groups",
            detailLink: "/rate-groups/",
            linkingField: "name",
            headers: ["Name", "Currency", "Num Rates"],
            showColumns: ["currency.data.attributes.symbol", "children.data.length"],
            get: rateGroupsApi.getRateGroups,
            search: rateGroupsApi.searchRateGroups
        },
        "client-releases": {
            title: "Client Releases",
            detailLInk: "/client-releases/",
            linkingField: "versionMajor",
            headers: ["Version Major", "Version Minor", "Release Date", "Disable Sync"],
            showColumns: ["versionMinor", "disableSync"],
            get: clientReleasesApi.getClientReleases,
            search: clientReleasesApi.searchClientReleases
        },
        "change-requests": {
            title: "Change Requests",
            detailLink: "/change-requests/",
            linkingField: "name",
            headers: ["Name", "Area", "Type", "Completed"],
            showColumns: ["area", "type", "complete"],
            get: changeRequestsApi.getChangeRequests,
            search: changeRequestsApi.searchChangeRequests

        },
        "conversation-topics": {
            title: "Conversation Topics",
            detailLink: "/conversation-topics/",
            linkingField: "name",
            headers: ["Name", "Topic Type"],
            showColumns: ["name", "topicType"],
            get: conversationTopicsApi.getConversationTopics,
            search: conversationTopicsApi.searchConversationTopics
        }
    },

    search: function(event){
        event.preventDefault();

        let query = this.refs.search.getQuery();
        let entity = this.map[this.props.params.entity];
        console.log("Searching for: " + query);

        if(query != "")
            entity.search(query);
        else
            entity.get();


    },

    componentDidMount: function(){
        this.map[this.props.params.entity].get();
    },

    componentWillReceiveProps: function(nextProps){
        console.log(nextProps);
        if(this.props.params.entity != nextProps.params.entity)
            this.map[nextProps.params.entity].get();

        this.props = nextProps;
    },

    render: function(){
        return(
            <div className="container">
                <div className="search">
                <header className="search-header">
                    {this.map[this.props.params.entity].title}
                    <SearchForm search={this.search} ref="search"/>
                </header>
                <EntityTable
                    headers={this.map[this.props.params.entity].headers}
                    data={this.props.data}
                    detailLink={this.map[this.props.params.entity].detailLink}
                    linkingField={this.map[this.props.params.entity].linkingField}
                    showColumns={this.map[this.props.params.entity].showColumns}
                    ref="child"
                />
            </div>
                <footer className="search-footer">
                    {this.props.data.length} Results
                </footer>
            </div>
        );
    }

});

const mapStateToProps = function(store){
    return {
        data: store.entityTableState.data
    }
};

export default connect(mapStateToProps)(EntityTableContainer);