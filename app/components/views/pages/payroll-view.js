/**
 * Created by cwarren on 1/16/17.
 */
import React from 'react';
import { Link } from 'react-router';
import { PageHeader } from 'react-bootstrap';

export default function(props){

    const replaceIfEmpty = function(value){
        return value.toString().trim() ? value : "-";
    };

    if(props.payroll == null)
        return(<div>Loading...</div>);
    else {
        //TODO can I do this inline below???
        const createdDate = new Date(props.payroll.attributes.created);
        const modifiedDate = new Date(props.payroll.attributes.modified);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PageHeader>{props.payroll.attributes.name}</PageHeader>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <dl>
                            <dt>Date Created</dt>
                            <dd>{createdDate.toLocaleString()}</dd>

                            <dt>Last Modified By</dt>
                            <dd>{modifiedDate.toLocaleString()}</dd>

                            <dt>Name</dt>
                            <dd>{props.payroll.attributes.name}</dd>

                            <dt>Country</dt>
                            <dd>{props.payroll.attributes.country}</dd>

                            <dt>Accountant</dt>
                            <dd>
                                {props.payroll.attributes.accountant.trim() ?
                                    props.payroll.attributes.accountant : "-"}
                            </dd>

                            <dt>Notes</dt>
                            <dd>
                                {props.payroll.attributes.notes.trim() ?
                                    props.payroll.attributes.notes : "-"}
                            </dd>

                        </dl>
                    </div>


                    <div className="col-md-6">
                        <table className="table table-striped table-responsive table-hover table-bordered">
                            <thead>
                            <tr>
                                <th>Payroll Branches</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.branches.data.map(row => {
                                return (
                                    <tr key={row.id}>
                                        <td>
                                            <Link to={"/branches/" + row.id}>
                                                {row.attributes.name}
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

                        <table className="table table-striped table-responsive table-hover table-bordered">
                            <thead>
                            <tr>
                                <th>Payroll Engineers</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.engineers.data.map(row => {
                                return (
                                    <tr key={row.id}>
                                        <td>
                                            <Link to={"/engineers/" + row.id}>
                                                {row.attributes.fullname}
                                            </Link>
                                        </td>
                                    </tr>
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