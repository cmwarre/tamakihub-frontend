import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, PageHeader } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/less/bootstrap.less';
import 'react-widgets/lib/less/react-widgets.less';

var AppLayout = React.createClass({

    render: function(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <Navbar inverse collapseOnSelect>
                        <Navbar.Header>
                            <IndexLinkContainer to="/">
                                <Navbar.Brand>
                                    Tamaki Hub
                                </Navbar.Brand>
                            </IndexLinkContainer>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavDropdown title="Jobs & Analysis" id="jobs" eventKey="4">
                                    <LinkContainer to="/list/payrolls">
                                        <MenuItem eventKey="4.1">Payroll Systems</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/branches">
                                        <MenuItem eventKey="4.2">Branches</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/customers">
                                        <MenuItem eventKey="4.3">Customers</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/jobs">
                                        <MenuItem eventKey="4.4">Jobs</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/rate-groups">
                                        <MenuItem eventKey="4.5">Rate Groups</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/locks">
                                        <MenuItem eventKey="4.6">Locks</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/purchase-orders">
                                        <MenuItem eventKey="4.7">Purchase Orders</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/invoices">
                                        <MenuItem eventKey="4.8">Invoices</MenuItem>
                                    </LinkContainer>
                                </NavDropdown>
                                <NavDropdown title="Engineers" id="engineers" eventKey="5">
                                    <LinkContainer to="/list/engineers">
                                        <MenuItem eventKey="5.1">Engineers</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/daily-allowance-rates">
                                        <MenuItem eventKey="5.2">Daily Allowance Rates</MenuItem>
                                    </LinkContainer>
                                </NavDropdown>
                                <NavDropdown title="Misc." id="misc" eventKey="6">
                                    <LinkContainer to="/list/currencies">
                                        <MenuItem eventKey="6.1">Currencies</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/tasks">
                                        <MenuItem eventKey="6.2">Task Types</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/booking-types">
                                        <MenuItem eventKey="6.3">Booking Types</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/skills">
                                        <MenuItem eventKey="6.4">Skills</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/expense-categories">
                                        <MenuItem eventKey="6.5">Expense Categories</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/conversation-topics">
                                        <MenuItem eventKey="6.6">Conversation Topics</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/us-invoicing">
                                        <MenuItem eventKey="6.7">US Invoicing</MenuItem>
                                    </LinkContainer>
                                </NavDropdown>
                                <NavDropdown title="Tools" id="tools" eventKey="7">
                                    <LinkContainer to="/list/reports">
                                        <MenuItem eventKey="7.1">Reports</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/analysis">
                                        <MenuItem eventKey="7.2">Analysis</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/custom-queries">
                                        <MenuItem eventKey="7.3">Custom Queries</MenuItem>
                                    </LinkContainer>
                                </NavDropdown>
                                <NavDropdown title="System" id="system" eventKey="8">
                                    <LinkContainer to="/list/client-releases">
                                        <MenuItem eventKey="8.1">Client Releases</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/change-requests">
                                        <MenuItem eventKey="8.2">Change Requests</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/list/database-stats">
                                        <MenuItem eventKey="8.3">Database Stats</MenuItem>
                                    </LinkContainer>
                                    <LinkContainer to="/hours">
                                        <MenuItem eventKey="8.4">Hours</MenuItem>
                                    </LinkContainer>
                                </NavDropdown>
                                <LinkContainer to="/timesheet">
                                    <NavItem>
                                        Timesheet
                                    </NavItem>
                                </LinkContainer>
                            </Nav>
                            <Nav pullRight>
                                <LinkContainer to="/login">
                                    <NavItem eventKey="9">
                                        <FontAwesome name="sign-in"/> Login
                                    </NavItem>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="container-fluid">
                        <div className="row">
                            {this.props.children}
                        </div>
                    </div>
                    <PageHeader/>
                    <div className="container-fluid">
                        <div className="row">
                            <Navbar fixedBottom>
                                <div className="container">
                                    <p className="text-muted text-center">© 2016 Tamaki Control Ltd. All rights reserved</p>
                                </div>
                            </Navbar>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default AppLayout;