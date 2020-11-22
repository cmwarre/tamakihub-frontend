import React from 'react';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';

import AppLayout from './components/layouts/app-layout';
import TimesheetLayout from './components/layouts/timesheet-layout';

import Home from './components/pages/home';
import Login from './components/pages/login';


import BranchViewContainer from './components/containers/pages/branch-view-container';
import CustomerViewContainer from './components/containers/pages/customer-view-container';
import EngineerViewContainer from './components/containers/pages/engineer-view-container';
import JobViewContainer from './components/containers/pages/job-view-container';
import PayrollViewContainer from './components/containers/pages/payroll-view-container';

import EntityTableContainer from './components/containers/entity-table-container';

export default (
    <Router history={browserHistory}>
        <Route component={AppLayout}>
            <Route path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/list">
                <Route path=":entity" component={EntityTableContainer} />
            </Route>

            <Route path="/branches/">
                <Route path=":id" component={BranchViewContainer} />
            </Route>

            <Route path="/customers/">
                <Route path=":id" component={CustomerViewContainer} />
            </Route>

            <Route path="/jobs/">
                <Route path=":id" component={JobViewContainer} />
            </Route>

            <Route path="/engineers/">
                <Route path=":id" component={EngineerViewContainer} />
            </Route>

            <Route path="/payrolls/">
                <Route path=":id" component={PayrollViewContainer} />
            </Route>

            <Route path="/timesheet" component={TimesheetLayout} />

        </Route>
    </Router>
);

