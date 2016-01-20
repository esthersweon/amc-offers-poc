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

let StudiesList = require('../StudiesList'), 
    BottomNavBar = require('../BottomNavBar');

let StudiesScreen = React.createClass({
    getInitialState() {
        // API request here to see if user has already done profile video
        return {
            profileVideo: true
        };
    },
    render() {
        return (
            <ScrollView>
                { 
                    this.state.profileVideo 
                        ? <TouchableHighlight onPress={ Router.setRoute('RecordVideo') }>
                            <Text style={ styles.center }>Record Video</Text>
                        </TouchableHighlight>
                        : null 
                }
                <View>
                    <Text>Respond</Text>
                    <StudiesList url={'accepted'} style={styles.container} />
                </View>

                <View>
                    <Text>Apply</Text>
                    <StudiesList url={'for_you'} style={styles.container} />
                </View>

                <View>
                    <Text>Refer Friends</Text>
                    <StudiesList url={'for_friends'} style={styles.container} />
                </View>
                <BottomNavBar/>
            </ScrollView>
        );
    }
});

module.exports = StudiesScreen;