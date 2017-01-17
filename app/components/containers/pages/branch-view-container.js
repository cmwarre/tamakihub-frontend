/**
 * Created by cwarren on 1/16/17.
 */
import React from 'react';
import BranchView from '../../views/pages/branch-view';
import * as branchesApi from '../../../api/branches-api';


const BranchViewContainer = React.createClass({

        getInitialState: function(){
            return {
                branch: null,
                jobs: [],
            };
        },

        componentDidMount: function(){
            branchesApi.getBranch(this.props.params.id, response => {
                this.setState({branch : response.data.data});
            });

            branchesApi.getOpenJobs(this.props.params.id, response => {
                this.setState({jobs: response.data});
            });
        },

        render: function(){
            return <BranchView {...this.state} />
        },
});

export default BranchViewContainer;