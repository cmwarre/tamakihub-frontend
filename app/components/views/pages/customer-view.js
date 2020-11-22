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

    if(!(props.customer && props.jobs && props.invoice_addresses))
        return(<div>Loading...</div>);
    else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PageHeader>{props.customer.attributes.name}</PageHeader>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <dl>
                            <dt>Industry</dt>
                            <dd>{replaceIfEmpty(props.customer.attributes.industryMajor)}</dd>

                            <dt>Sub-Industry</dt>
                            <dd>{replaceIfEmpty(props.customer.attributes.industryMinor)}</dd>

                            <dt>Locations</dt>
                            <dd>{replaceIfEmpty(props.customer.attributes.locations)}</dd>

                            <dt>Address</dt>
                            <dd>{replaceIfEmpty(props.customer.attributes.address)}</dd>

                            <dt>Notes</dt>
                            <dd>{replaceIfEmpty(props.customer.attributes.notes)}</dd>

                        </dl>

                    </div>


                    <div className="col-md-4">
                        <table className="table table-striped table-responsive table-hover table-bordered">
                            <thead>
                            <tr>
                                <th>Job #</th>
                                <td>Name</td>
                            </tr>
                            </thead>
                            <tbody>
                            {props.jobs.map((row, index) => {
                                return (
                                    index < 20 ?
                                        <tr key={row.id}>
                                            <td>
                                                <Link to={"/jobs/" + row.id}>
                                                    {row.attributes.jobNumber}
                                                </Link>
                                            </td>
                                            <td>
                                                {row.attributes.name}
                                            </td>
                                        </tr> : null
                                );
                            })}
                            </tbody>
                        </table>

                        <table className="table table-striped table-responsive table-hover table-bordered">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <td>Contact</td>
                            </tr>
                            </thead>
                            <tbody>
                            {props.invoice_addresses.map((row, index) => {
                                return (
                                    index < 20 ?
                                        <tr key={row.id}>
                                            <td>
                                                <Link to={"/invoice-addresses/" + row.id}>
                                                    {row.attributes.name}
                                                </Link>
                                            </td>
                                            <td>
                                                {row.attributes.contactName}
                                            </td>
                                        </tr> : null
                                );
                            })}
                            </tbody>
                        </table>

                        <PageHeader><small></small></PageHeader>

                    </div>

                </div>
            </div>
        );
    }
}