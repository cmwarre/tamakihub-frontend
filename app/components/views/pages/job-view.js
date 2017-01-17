/**
 * Created by cwarren on 1/16/17.
 */
import React from 'react';
import { Link } from 'react-router';
import { PageHeader } from 'react-bootstrap';

export default function(props){

    const replaceIfEmpty = function(value){
        value = value ? value : "-";
        return value.toString().trim() ? value.toString().trim() : "-";
    };

    if(props.job == null)
        return(<div>Loading...</div>);
    else {
        //TODO can I do this inline below???
        const createdDate = new Date(props.job.attributes.created);

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
                            <dd>{replaceIfEmpty(props.branch.attributes.branch)}</dd>

                            <dt>Admin</dt>
                            <dd>{replaceIfEmpty(props.admin.attributes.fullname)}</dd>

                            <dt>Customer</dt>
                            <dd>{replaceIfEmpty(props.endCustomer.name)}</dd>

                            <dt>Job Number</dt>
                            <dd>{replaceIfEmpty(props.job.attributes.jobNumber)}</dd>

                            <dt>Currency</dt>
                            <dd>{replaceIfEmpty(props.currency.code)}</dd>

                            <dt>Quoted Value</dt>
                            <dd>
                                {replaceIfEmpty(props.currency.symbol) + replaceIfEmpty(props.job.attributes.quotedValue)}
                            </dd>

                            <dt>Closed</dt>
                            <dd>{replaceIfEmpty(props.job.attributes.closed)}</dd>

                            <dt>Notes</dt>
                            <dd>{replaceIfEmpty(props.job.attributes.notes)}</dd>

                        </dl>

                        <PageHeader><small>Uncategorized Defaults</small></PageHeader>

                        <dl>
                            <dt>Distance Rate</dt>
                            <dd>{replaceIfEmpty(props.job.attributes.distanceRate)}</dd>

                            <dt>Distance Markup</dt>
                            <dd>{replaceIfEmpty(props.job.attributes.distanceMarkup) + "%"}</dd>

                            <dt>Expense Markup</dt>
                            <dd>{replaceIfEmpty(props.job.attributes.expenseMarkup) + "%"}</dd>
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
                            <dd>-</dd>

                            <dt>Expenses</dt>
                            <dd>-</dd>

                            <dt>Distances</dt>
                            <dd>-</dd>

                            <dt>Total Costs</dt>
                            <dd>-</dd>
                        </dl>

                    </div>

                </div>
            </div>
        );
    }
}