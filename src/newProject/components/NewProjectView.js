import React, { Component } from 'react';

import createProject from '../../queries/createProject';

import './NewProjectView.css';

class NewProjectView extends Component {
  state = {
    name: '',
    description: ''
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
      e.preventDefault();
      fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          createProject({
            name: this.state.name,
            description: this.state.description,
            collectionId: this.props.collectionId,
            tasks: []
          })
        )
      })
      .then(result => result.json())
      .then(json => {
        this.props.history.goBack();
      })
  }

  cancel = () => {
    
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
            <h1>Build a Project</h1>
            <h2>Fill out your project details</h2>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            <label>Description</label>
            <textarea name="description" value={this.state.description} onChange={this.handleChange} />
            <h2>Add tasks to your project</h2>
            <button className="secondaryBtn" onClick={this.addTask}>Add Task</button>
            <button className="primaryBtn" onClick={this.createProject}>Create Project</button>
            <span onClick={this.cancel}>
                <p>cancel</p>
            </span>
        </form>
      </div>
    );
  }
}

export default NewProjectView;
