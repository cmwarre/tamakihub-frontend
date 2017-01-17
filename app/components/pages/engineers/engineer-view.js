import React from 'react';
import * as engineerApi from '../../../api/engineer-api';
import { connect } from 'react-redux';

const EngineerView = React.createClass({

    componentDidMount: function(){
        engineerApi.getEngineer(this.props.params.id);
    },

    getEngineer: function(){
        return this.props.engineer != undefined ? this.props.engineer : { attributes: {} };
    },

    render: function(){
        return(
            <div>
                {
                    this.props.engineer == undefined ? <div>Loading...</div> :
                        <div>
                            {"Hello " + this.props.engineer.attributes['fullname']}
                        </div>
                }
            </div>
        );
    }

});

const mapStateToProps = function(store){
    return {
        engineer: store.engineerState.engineer
    }
};

export default connect(mapStateToProps)(EngineerView);