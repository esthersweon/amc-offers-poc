'use strict';

var React = require('react-native');
var {
  ListView,
  Platform,
  Text,
  View
} = React;

var styles = require('./Styles');

var StudiesList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    }
  },
  componentDidMount: function() {
    setTimeout(this.fetchData, 500);
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Studies...
        </Text>
      </View>
    );
  },
  fetchData: function() {
    if (this.props.url === 'current') {
      // Following code should be replaced with API call for current studies
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([
          {
            "name": "A Study",
            "duration": 53
          }, {
            "name": "B Study",
            "duration": 32
          }, {
            "name": "C Study",
            "duration": 17
          }
        ]),
        loaded: true
      });
    } else {
      // Following code should be replaced with API call for other studies
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([
          {
            "name": "D Study",
            "duration": 13
          }, {
            "name": "E Study",
            "duration": 52
          }, {
            "name": "F Study",
            "duration": 10
          }
        ]),
        loaded: true
      });
    }
  },
  renderStudy: function(study) {
    return (
      <View style={styles.container}>
        <Text>{study.name}</Text>
        <Text>{study.duration + ' weeks'}</Text>
      </View>
    );
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else {
      var listViewTitle = this.props.url === 'current' ? 'Current Studies' : 'Other';

      return(
        <View>
          <Text>{ listViewTitle }</Text>
          <ListView 
            dataSource={this.state.dataSource}
            renderRow={this.renderStudy}
            style={styles.listView} />
        </View>
      );
    }
  }
});

module.exports = StudiesList;