/**
 * Created by cwarren on 1/16/17.
 */
import React from 'react';
import EngineerView from '../../views/pages/engineer-view';
import * as engineerApi from '../../../api/engineer-api';


const EngineerViewContainer = React.createClass({

        getInitialState: function(){
            return {
                engineer: null
            };
        },

        componentDidMount: function(){
            engineerApi.getEngineer(this.props.params.id, response => {
                this.setState({engineer : response.data.data});
                console.log(response);
            });
        },

        render: function(){
            return <EngineerView engineer={this.state.engineer}/>
        },
});

export default EngineerViewContainer;