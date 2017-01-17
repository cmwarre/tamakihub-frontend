import React from 'react';
import { Button } from 'react-bootstrap';

export default React.createClass({

    getQuery: function(){
        return this.refs.search ? this.refs.search.value : "";
    },

    render: function(){
        return(
            <form className="search" onSubmit={this.props.search}>
                <input type="text" ref="search" placeholder="Search" />
                <Button bsStyle="primary" type="submit">Search</Button>
            </form>
        );
    }

});
