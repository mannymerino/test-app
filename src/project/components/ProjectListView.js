import React, { Component } from 'react';

import getProjects from '../../queries/getProjects';

import './ProjectListView.css';

class ProjectListView extends Component {
  state = {
    projects: [],
  }

  componentDidMount() {
    console.log(this.props);
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        getProjects(this.props.collectionId),
      ),
    })
      .then(result => result.json())
      .then(json => {
        this.setState({projects: json.data.projects});
      });
  }

  newProject = () => {
    this.props.history.push('/newproject');
  }

  render() {
    return (
      <div className="container">
        <h1>Projects</h1>
        <div className="newProject" onClick={this.newProject}>Create New Project</div>
        {this.state.projects.map((project) => {
          return (<div className="projectItem" key={project.id}>{project.name}</div>)
        })}
      </div>
    );
  }
}

export default ProjectListView;
