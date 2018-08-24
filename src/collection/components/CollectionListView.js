import React, { Component } from 'react';

import getCollections from '../../queries/getCollections';

import './CollectionListView.css';

class CollectionListView extends Component {
  state = {
    collections: [],
    selectedId: null
  }

  componentDidMount() {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        getCollections(),
      ),
    })
      .then(result => result.json())
      .then(json => {
        this.setState({collections: json.data.collections});
      });
  }

  handleClick = (collectionId) => {
    this.props.selectCollection(collectionId);
    this.props.history.push('/projects');
  }

  render() {
    return (
      <div className="container">
        <h1>Collections</h1>
        {this.state.collections.map((collection) => {
          return (<div className="collectionItem" key={collection.id} onClick={() => this.handleClick(collection.id)}>{collection.name}</div>)
        })}
      </div>
    );
  }
}

export default CollectionListView;
