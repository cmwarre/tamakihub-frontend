import React from 'react';
import Autosuggest from 'react-autosuggest';


/*
*
* EntityAutoComplete
*
* Props:
*   data: An array of entities
*   placeholder: Initial start text
*   value: The ID of the corresponding entity
*   displayProperty: The property name of the entity to display
*   onChange: Function called whenever the selected ID changes
*
*
* */
const EntityAutoComplete = React.createClass({

    getInitialState: function(){
        let displayValue = this.getDisplayValueByID(
            this.props.value,
            this.props.data,
            this.props.displayProperty
        );

        return({
            suggestion: {},
            value: this.props.value ? this.props.value : '',
            displayValue: displayValue,
            suggestions: []
        });
    },

    /*
    * I'll bet I have to use this for race conditions...
    * */
    componentWillReceiveProps: function(nextProps){
        if(nextProps.value > 0 && (nextProps.data !== this.getData || nextProps.value !== this.props.value)){
            this.setState({
                displayValue: this.getDisplayValueByID(nextProps.value, nextProps.data, nextProps.displayProperty)
            });
        }
    },

    getData: function(){
        return this.props.data ? this.props.data : [];
    },

    getDisplayValueByID(id, data, displayProperty){
        let element = data.find(element => {
            return element.id == id;
        });

        return element ? element.attributes[displayProperty] : '';
    },

    /*
     * Filters through data for auto complete input
     * */
    filter: function(value){
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.getData().filter(row =>
            row.attributes[this.props.displayProperty].toLowerCase().includes(inputValue)
        );
    },

    renderEntity: function (suggestion) {
        return(
            <span>{suggestion.attributes[this.props.displayProperty]}</span>
        );
    },

    getEntitySuggestion: function (suggestion) {
        return suggestion.attributes[this.props.displayProperty];
    },

    onSuggestionSelected: function(event, {suggestion}){
        event.target.id = this.props.id;
        event.target.value = suggestion.id;
        event.target.displayValue = suggestion.attributes[this.props.displayProperty];
        this.props.onChange(event);
    },

    _onChange: function(event, { newValue }){
        this.setState({displayValue: newValue});
    },

    // onSuggestionSelected: function(event, { suggestion, suggestionValue, sectionIndex, method }){
    //     return this.props.onSelect(event, { suggestion, suggestionValue, sectionIndex, method });
    // },

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested: function({ value }){
        this.setState({
            suggestions: this.filter(value)
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
            value: this.state.displayValue,
            onChange: this._onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getEntitySuggestion}
                renderSuggestion={this.renderEntity}
                inputProps={inputProps}
            />
        );
    },
});

export default EntityAutoComplete;