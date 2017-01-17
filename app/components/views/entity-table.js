import React from 'react';
import { Link } from 'react-router';
import { Button, ButtonGroup } from 'react-bootstrap';

const EntityList = React.createClass({

    getQuery: function(){
        return this.refs.search.getQuery()
    },

    getData: function(){
        return this.props.data ? this.props.data : [];
    },

    render: function() {
        return (
                <table className="table table-striped table-responsive table-hover table-bordered">
                    <thead>
                    <tr>
                        {this.props.headers.map(column => {
                            return(<th key={column}>{column}</th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {this.getData().map(row => {
                        return (
                            <tr key={row.id}>
                                <td className="details">
                                    <Link
                                        to={this.props.detailLink + row.id}>{row['attributes'][this.props.linkingField]}</Link>
                                </td>
                                {
                                    this.props.showColumns.map(column => {
                                        return (<td key={row.id + column}>{eval('row.attributes.' + column)}</td>);
                                    })
                                }
                                { this.props.showEdit || this.props.showDelete ?
                                    <td>
                                        <ButtonGroup>
                                            {
                                                this.props.showEdit ?
                                                    <Button block bsStyle="warning"
                                                            onClick={this.props.onEdit.bind(null, row.id)}>
                                                        Edit
                                                    </Button> : null
                                            }
                                            {
                                                this.props.showDelete ?
                                                    <Button block bsStyle="danger"
                                                            onClick={this.props.onDelete.bind(null, row.id)}>
                                                        Delete
                                                    </Button> : null
                                            }
                                        </ButtonGroup>
                                    </td> : null
                                }
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
        );
    },
});

export default EntityList;