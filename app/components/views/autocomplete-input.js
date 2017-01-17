import React from 'react';
import Autosuggest from 'react-autosuggest';

const Example = React.createClass({

    getData: function(){
        return this.props.data ? this.props.data : [];
    },

    getInitialState: function(){
        return({
            suggestion: {},
            value: this.props.value ? this.props.value : '',
            suggestions: []
        });
    },

    onChange: function(event, { newValue }){
        this.setState({value: newValue});
        this.props.onChange ? this.props.onChange(event) : null;
    },


    onSuggestionSelected: function(event, { suggestion, suggestionValue, sectionIndex, method }){
        return this.props.onSelect(event, { suggestion, suggestionValue, sectionIndex, method });
    },

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested: function({ value }){
        this.setState({
            suggestions: this.props.filter(value)
        });
    },

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested: function(){
        this.setState({
            suggestions: []
        });
    },

    render: function(){
        const { suggestions } = this.state;

        // Autosuggest will pass through all these props to the input element.
        const inputProps = {
            placeholder: this.props.placeholder,
            value: this.state.value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.props.getSuggestionValue}
                renderSuggestion={this.props.renderSuggestion}
                inputProps={inputProps}
            />
        );
    },
});

export default Example;