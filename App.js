import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { Routes } from './src/routes/Navigation'

export default function App() {
	return (
		<NavigationContainer>
			<Routes />
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
