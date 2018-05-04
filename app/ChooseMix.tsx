import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Channel from './channel/Channel';

const ChooseMix = () => (
	<View style={styles.container}>
		<Channel />
		<Text>hello</Text>
	</View>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ChooseMix