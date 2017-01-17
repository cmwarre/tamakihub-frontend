import React from 'react';
import * as skillApi from '../../api/skill-api';
import * as jobApi from '../../api/job-api';
import * as engineerApi from '../../api/engineer-api';
import SearchForm from '../views/search-form';

const SearchFormContainer = React.createClass({

    search: function(event){
        event.preventDefault();

        let query = this.refs.child.getQuery();

        console.log(this.props.searchType);

        if(this.props.searchType == "skills"){
            if(query != "")
                skillApi.searchSkills(query);
            else
                skillApi.getSkills();
        }else if(this.props.searchType == "jobs"){
            jobApi.searchJobs(query);
        }else if(this.props.searchType == "engineers"){
            engineerApi.searchEngineers(query);
        }
    },

    render: function(){
        return(
            <SearchForm search={this.search} ref="child" />
        );
    }

});

export default SearchFormContainer;