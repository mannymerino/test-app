import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CollectionListView from './collection/components/CollectionListView';
import ProjectListView from './project/components/ProjectListView';
import NewProjectView from './newProject/components/NewProjectView';

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionId: null
    }
  }

  selectCollection = id => {
    console.log('selectCollection(id)', id);
    this.setState({
      collectionId: id
    })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" 
            render={props => 
            <CollectionListView {...props} selectCollection={this.selectCollection} />
            }/>
          <Route exact path="/projects" 
            render={props => 
              <ProjectListView {...props} collectionId={this.state.collectionId} />
            }/>
          <Route exact path="/newProject" 
            render={props => 
              <NewProjectView {...props} collectionId={this.state.collectionId} />
            }/>
        </Switch>
      </Router>
    );
  }
} 

export default Root;
