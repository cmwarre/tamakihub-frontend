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

    if(props.engineer == null)
        return(<div>Loading...</div>);
    else
        //TODO Permissions
        return(
            <div className="container">
                    <div className="col-md-12">
                        <PageHeader>{props.engineer.attributes.fullname}</PageHeader>
                    </div>

                    <div className="col-md-6">
                        <dl>
                            <dt>Acronym</dt>
                            <dd>{props.engineer.attributes.acronym}</dd>

                            <dt>Username</dt>
                            <dd>{props.engineer.attributes.username}</dd>

                            <dt>Payroll</dt>
                            <dd>
                                <Link to={"/payrolls/" + props.engineer.attributes.payrollID}>
                                    {props.engineer.attributes.payroll.data.attributes.name}
                                </Link>
                            </dd>

                            <dt>Location</dt>
                            <dd>{replaceIfEmpty(props.engineer.attributes.location)}</dd>

                            <dt>Phone</dt>
                            <dd>{replaceIfEmpty(props.engineer.attributes.phone)}</dd>

                            <dt>Email</dt>
                            <dd>{replaceIfEmpty(props.engineer.attributes.email)}</dd>

                            <dt>Address</dt>
                            <dd>
                                {replaceIfEmpty(props.engineer.attributes.address)}
                            </dd>

                            <dt>Other Details</dt>
                            <dd>{replaceIfEmpty(props.engineer.attributes.otherContactDetails)}</dd>

                            <dt>Permissions</dt>
                            <dd>
                                <dl>
                                    <li>Booking</li>
                                    <li>Engineers</li>
                                </dl>
                            </dd>

                            <dt>Notes</dt>
                            <dd>{replaceIfEmpty(props.engineer.attributes.notes)}</dd>

                        </dl>
                    </div>
            </div>
        );
}