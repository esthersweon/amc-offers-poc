'use strict';

let React = require('react-native');
let {
    ListView,
    TouchableHighlight,
    Text,
    ScrollView,
    View
} = React;

let styles = require('../Styles'),
    Router = require('../Router');

let BottomNavBar = require('../BottomNavBar');

let ApplyForStudyScreen = React.createClass({
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
                    Loading Questions...
                </Text>
            </View>
        );
    },

    fetchData() {
        // Should be replaced with API call for this study's questions
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([
              {
                "question": "Question A?"
              }, {
                "question": "Question B?"
              }, {
                "question": "Question C?"
              }
            ]),
            loaded: true
        });
    },

    renderQuestion(question) {
        return (
            <View style={styles.container}>
                <Text>{question.question}</Text>
            </View>
        );
    },

    render() {
        return (
            <ScrollView>
                <View>
                    <Text>Device</Text>
                    <Text>Questions</Text>
                    <Text>Compensation</Text>
                </View>

                <View>
                    <Text>Description of Study Here</Text>
                </View>

                <View>
                    <TouchableHighlight>
                        <Text>Yes, I'd like to participate in this study.</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text>No, I'll pass on this study.</Text>
                    </TouchableHighlight>
                </View>

                <ListView dataSource={this.state.dataSource}
                    renderRow={this.renderQuestion}
                    style={styles.listView} />
            </ScrollView>
        );
    }
});

module.exports = ApplyForStudyScreen;