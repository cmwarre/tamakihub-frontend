/**
 * Created by cwarren on 1/16/17.
 */
import React from 'react';
import { Link } from 'react-router';
import { PageHeader } from 'react-bootstrap';

export default function(props){

    const replaceIfEmpty = function(value){
        return value.toString().trim() ? value.toString().trim() : "-";
    };

    if(props.branch == null)
        return(<div>Loading...</div>);
    else {
        //TODO can I do this inline below???
        const createdDate = new Date(props.branch.attributes.created);
        const modifiedDate = new Date(props.branch.attributes.modified);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PageHeader>{props.branch.attributes.name}</PageHeader>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <dl>
                            <dt>Date Created</dt>
                            <dd>{createdDate.toLocaleString()}</dd>

                            <dt>Last Modified</dt>
                            <dd>{modifiedDate.toLocaleString()}</dd>

                            <dt>Acronym</dt>
                            <dd>{props.branch.attributes.acronym}</dd>

                            <dt>Name</dt>
                            <dd>{props.branch.attributes.name}</dd>

                            <dt>Branch #</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.branchNumber)}</dd>

                            <dt>Address 1</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.address1)}</dd>

                            <dt>Address 2</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.address2)}</dd>

                            <dt>Address 3</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.address3)}</dd>

                            <dt>Address 4</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.address4)}</dd>

                            <dt>Phone</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.phone)}</dd>

                            <dt>Tax Name</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.taxName)}</dd>

                            <dt>Tax Rate</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.taxRate)}</dd>

                            <dt>Tax Number</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.taxNumber)}</dd>

                        </dl>

                        <PageHeader><small>Payable Details</small></PageHeader>

                        <dl>
                            <dt>Contact</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.payableName)}</dd>

                            <dt>Bank</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.payableBank)}</dd>

                            <dt>Branch Code</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.payableBranchCode)}</dd>

                            <dt>Account #</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.payableAcctNum)}</dd>

                            <dt>Sort Code</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.payableSortCode)}</dd>

                            <dt>Details</dt>
                            <dd>{replaceIfEmpty(props.branch.attributes.payableDetails1)}</dd>
                        </dl>

                    </div>


                    <div className="col-md-4">
                        <table className="table table-striped table-responsive table-hover table-bordered">
                            <thead>
                            <tr>
                                <th>Open Jobs</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.jobs.data.map((row, index) => {
                                    return (
                                        index < 20 ?
                                        <tr key={row.id}>
                                            <td>
                                                <Link to={"/jobs/" + row.id}>
                                                    {row.attributes.name}
                                                </Link>
                                            </td>
                                        </tr> : null
                                    );
                            })}
                            </tbody>
                        </table>


                    </div>

                </div>
            </div>
        );
    }
}