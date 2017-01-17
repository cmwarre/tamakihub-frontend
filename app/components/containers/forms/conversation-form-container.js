import React from 'react';

import * as engineersApi from '../../../api/engineer-api';
import * as conversationTopicsApi from '../../../api/conversation-topics-api';
import * as conversationsApi from '../../../api/conversations-api';

import ConversationForm from '../../views/forms/conversation-form';

const ConversationFormContainer = React.createClass({

    getInitialState: function(){
      return({
          engineerID: this.props.engineerID,
          engineers: [],
          topics: [],
      });
    },

    componentDidMount: function(){
        if(this.props.conversationID > -1)
            conversationsApi.getConversation(this.props.conversationID, response =>{
                console.log(response);
                this.setState({
                    data: response.data['data'].attributes
                });
            });

        console.log("getting engineers");

        engineersApi.getEngineers(response => {
            console.log(response);
            this.setState({engineers: response.data['data']});
        });

        console.log("getting conversation topics");
        conversationTopicsApi.getConversationTopics(response => {
            this.setState({topics: response.data['data']});
        });

    },

    onSubmit: function(formData){
        if(this.props.conversationID > -1) {
            conversationsApi.editConversation(this.props.conversationID, formData, response => {
                this.props.onSuccess ? this.props.onSuccess(response.data) : null;
            });
        }else
            conversationsApi.addConversation(formData, response => {
                this.props.onSuccess ? this.props.onSuccess(response.data) : null;
            });
    },

    render: function() {
        return (
            <ConversationForm
                date={this.props.date}
                engineerID={this.state.engineerID}
                data={this.state.data}
                engineers={this.state.engineers}
                topics={this.state.topics}
                onSubmit={this.onSubmit}
            />
        );
    }
});

export default ConversationFormContainer;