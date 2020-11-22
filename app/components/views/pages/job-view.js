/**
 * Created by cwarren on 1/16/17.
 */
import React from 'react';
import { Link } from 'react-router';
import { PageHeader } from 'react-bootstrap';

export default function(props){

    const replaceIfEmpty = function(value, replacement="-"){
        value = value ? value : "-";
        return value.toString().trim() ? value.toString().trim() : "-";
    };

    if(!(props.job && props.branch && props.endCustomer && props.admin && props.currency))
        return(<div>Loading...</div>);
    else {
        //TODO can I do this inline below???
        let createdDate = new Date(props.job.attributes.created);
        let currency = props.currency.attributes.symbol;
        let currencyCode = " " + props.currency.attributes.code;

        let hoursCost = props.hours.length ?
                props.hours.reduce((sum, hour) => {
                    let quantity = parseFloat(hour.attributes.quantity);
                    let rate = parseFloat(hour.attributes.rate);

                    return sum + quantity * rate * Number(hour.attributes.bookTypeID == 1);
                }, 0) : 0;

        let hoursBookable = props.hours.length ? props.hours.reduce((sum, hour) => {
            return sum + parseFloat(hour.attributes.quantity) * Number(hour.attributes.bookTypeID == 1);
        }, 0) : 0;

        let hoursNonBookable = props.hours.length ? props.hours.reduce((sum, hour) => {
            return sum + parseFloat(hour.attributes.quantity) * Number(hour.attributes.bookTypeID == 2);
        }, 0) : 0;

        let hoursAgreement = props.hours.length ? props.hours.reduce((sum, hour) => {
            return sum + parseFloat(hour.attributes.quantity) * Number(hour.attributes.bookTypeID > 2);
        }, 0) : 0;

        let expensesCost = props.expenses.length > 0 ?
            props.expenses.reduce((sum, expenses) => {
                let quantity = parseFloat(expenses.attributes.km);
                let rate = expenses.attributes.rate ? parseFloat(expenses.attributes.rate) : 0;
                let markup = expenses.attributes.markup ? expenses.attributes.markup : 0;

                return sum + quantity * rate * (1 + markup/100);
            }, 0) : 0;

        let distancesCost = props.distances.length > 0 ?
                props.distances.reduce((sum, distance) => {
                    let quantity = parseFloat(distance.attributes.km);
                    let value = distance.attributes.value ? parseFloat(distance.attributes.value) : 0;
                    let markup = distance.attributes.markup ? parseFloat(distance.attributes.markup) : 0;

                    return sum + quantity * value * (1 + markup/100);
                }, 0) : 0;

        let totalCost = hoursCost + expensesCost + distancesCost;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PageHeader>{props.job.attributes.name}</PageHeader>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <dl>
                            <dt>Date Created</dt>
                            <dd>{createdDate.toLocaleString()}</dd>

                            <dt>Branch</dt>
                            <dd>
                                <Link to={"/branches/" + props.job.attributes.branchID}>
                                    {replaceIfEmpty(props.branch.attributes.name)}
                                </Link>
                            </dd>

                            <dt>Admin</dt>
                            <dd>
                                <Link to={"/engineers/" + props.job.attributes.adminID}>
                                    {replaceIfEmpty(props.admin.attributes.fullname)}
                                </Link>
                            </dd>

                            <dt>Customer</dt>
                            <dd>
                                <Link to={"/customers/" + props.job.attributes.endCustomerID}>
                                    {replaceIfEmpty(props.endCustomer.attributes.name)}
                                </Link>
                            </dd>

                            <dt>Job Number</dt>
                            <dd>{replaceIfEmpty(props.job.attributes.jobNumber)}</dd>

                            <dt>Currency</dt>
                            <dd>{replaceIfEmpty(currencyCode)}</dd>

                            <dt>Quoted Value</dt>
                            <dd>{currency + props.job.attributes.quotedValue.toString() + currencyCode}</dd>

                            <dt>Closed</dt>
                            <dd>{replaceIfEmpty(props.job.attributes.closed)}</dd>

                            <dt>Notes</dt>
                            <dd>{replaceIfEmpty(props.job.attributes.notes)}</dd>

                        </dl>

                        <PageHeader><small>Uncategorized Defaults</small></PageHeader>

                        <dl>
                            <dt>Distance Rate</dt>
                            <dd>{currency + props.job.attributes.distanceRate + currencyCode + " per KM"}</dd>

                            <dt>Distance Markup</dt>
                            <dd>{props.job.attributes.distanceMarkup + "%"}</dd>

                            <dt>Expense Markup</dt>
                            <dd>{props.job.attributes.expenseMarkup + "%"}</dd>
                        </dl>

                        <PageHeader><small>Hours</small></PageHeader>

                        <dl>
                            <dt>Bookable</dt>
                            <dd>{replaceIfEmpty(hoursBookable)}</dd>

                            <dt>Non-Bookable</dt>
                            <dd>{replaceIfEmpty(hoursNonBookable, "0")}</dd>

                            <dt>By Aggreement</dt>
                            <dd>{replaceIfEmpty(hoursAgreement, "0")}</dd>
                        </dl>

                        <PageHeader><small>Financial Summary</small></PageHeader>

                        <dl>
                            <dt>Balance</dt>
                            <dd>-</dd>

                            <dt>Available Funds</dt>
                            <dd>-</dd>

                            <dt>Total Invoiced</dt>
                            <dd>-</dd>

                            <dt>Total Costs</dt>
                            <dd>-</dd>
                        </dl>

                        <PageHeader><small>Funds & Invoices</small></PageHeader>

                        <dl>
                            <dt>Total Funds</dt>
                            <dd>-</dd>

                            <dt>Total Invoiced</dt>
                            <dd>-</dd>

                            <dt>Total Paid</dt>
                            <dd>-</dd>

                            <dt>Total Banked</dt>
                            <dd>-</dd>
                        </dl>

                        <PageHeader><small>Costs</small></PageHeader>

                        <dl>
                            <dt>Hours Worked</dt>
                            <dd>{currency + hoursCost.toString() + currencyCode + " (" + hoursBookable.toString() + " Hours)" }</dd>

                            <dt>Expenses</dt>
                            <dd>{currency + expensesCost.toString() + currencyCode}</dd>

                            <dt>Distances</dt>
                            <dd>{currency + distancesCost.toString() + currencyCode}</dd>

                            <dt>Total Costs</dt>
                            <dd>{currency + totalCost.toString() + currencyCode}</dd>
                        </dl>

                        <PageHeader><small></small></PageHeader>

                    </div>

                </div>
            </div>
        );
    }
}