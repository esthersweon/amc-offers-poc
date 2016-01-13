'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var {
  ActivityIndicatorIOS,
  ListView,
  Platform,
  ProgressBarAndroid,
  Image,
  Text,
  View,
  TouchableHighlight
} = React;

var styles = require('../../Styles');

var QuestionScreen = React.createClass({
  getInitialState: function() {
    return {
      question: '', 
      answerChoices: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      videoAnswer: false,
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
          Loading Question...
        </Text>
      </View>
    );
  },
  fetchData: function() {
    // API request that should give us a response
    // with the following structure --> {"question": "...", "answerChoices": [...]}
    var response = {
      "question": "Is this a question?", 
      "answerChoices": [
        {"text": "Yes"}, 
        {"text": "No"}, 
        {"text": "Maybe"}
      ], 
      "videoAnswer": true
    };

    this.setState({
      question: response.question, 
      answerChoices: this.state.answerChoices.cloneWithRows(response.answerChoices),
      videoAnswer: response.videoAnswer,
      loaded: true
    })
  },
  renderAnswerChoice: function(choice) {
    return(
      <View>
        <Text>{ choice }</Text>
      </View>
    );
  },
	render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

		return (
			<View>
				<Text>{ this.state.question }</Text>
        <ListView 
          dataSource={ this.state.answerChoices }
          renderRow={this.renderAnswerChoice} 
          style={styles.listView} />
        <Text>{ this.state.videoAnswer ? "Record Video Response" : ""}</Text>
			</View>
		);
	}
});


module.exports = QuestionScreen;