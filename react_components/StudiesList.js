'use strict';

let React = require('react-native');
let {
  ListView,
  Text,
  View,
  TouchableHighlight
} = React;

let styles = require('./Styles'), 
    Router = require('./Router');

let StudiesList = React.createClass({
    getInitialState() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false
        }
    },
    componentDidMount() {
        setTimeout(this.fetchData, 500);
    },
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading Studies...
                </Text>
            </View>
        );
    },
    fetchData() {
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
    renderStudy(study) {
        return (
            <TouchableHighlight style={styles.container} onPress={ Router.setRoute('ApplyForStudy') }>
                <Text>{study.name} - {study.duration + ' weeks'}</Text>
            </TouchableHighlight>
        );
    },
    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        } else {
            return(
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.renderStudy}
                    style={styles.listView} />
            );
        }
    }
});

module.exports = StudiesList;
