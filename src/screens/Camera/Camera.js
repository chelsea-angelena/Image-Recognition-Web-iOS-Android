import React, { useState } from 'react'
import { Text, Platform, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAlert, useCamera } from '../../hooks'
import { CameraPreview } from './CameraPreview'

export const CameraApp = ({ navigation }) => {
	const {
		toggleFlash,
		takePicture,
		pickImage,
		previewVisible,
		setPreviewVisible,
		photo,
		flashMode,
		base64,
		identifyImage,
		loading,
		response,
	} = useCamera()
	// const { onShare } = useShare()
	const [type, setType] = useState(Camera.Constants.Type.back)
	const { createAlert } = useAlert()

	return (
		<>
			{previewVisible && photo ? (
				<CameraPreview
					base64={base64}
					photo={photo}
					loading={loading}
					response={response}
					identifyImage={identifyImage}
					setPreviewVisible={setPreviewVisible}
				/>
			) : (
				// <Camera
				// 	type={Platform === 'web' ? null : type}
				// 	flashMode={Platform === 'web' ? null : flashMode}
				// 	style={{ flex: 1, width: '100%' }}
				// 	ref={(r) => {
				// 		cameraRef = r
				// 	}}
				// >
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						flexDirection: 'row',
						flex: 1,
						width: '100%',
						padding: 20,
						margin: 0,
						justifyContent: 'center',
						backgroundColor: 'black',
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							flex: 1,
							width: '75%',
							margin: 0,
							justifyContent: 'space-evenly',
							backgroundColor: 'transparent',
						}}
					>
						<TouchableOpacity
							onPress={toggleFlash}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: flashMode === 'off' ? '#000' : '#fff',
								borderRadius: 32,
								height: 32,
								width: 32,
							}}
						>
							<Text
								style={{
									fontSize: 32,
								}}
							>
								⚡️
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								setType(
									type === Camera.Constants.Type.back
										? Camera.Constants.Type.front
										: Camera.Constants.Type.back
								)
							}}
						>
							<MaterialCommunityIcons
								size={32}
								color='white'
								name='camera-party-mode'
							/>
						</TouchableOpacity>

						<TouchableOpacity
							// onPress={takePicture}
							onPress={() => createAlert('currently disabled')}
							style={{
								width: 40,
								height: 40,
								color: 'white',
								backgroundColor: 'white',
								borderRadius: 40,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<View
								style={{
									width: 32,
									height: 32,
									color: 'black',
									backgroundColor: 'black',
									borderRadius: 32,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<View
									style={{
										width: 24,
										height: 24,
										color: 'white',
										backgroundColor: 'white',
										borderRadius: 24,
									}}
								></View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={pickImage}>
							<MaterialCommunityIcons
								name='image-multiple'
								size={32}
								color='white'
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
							<MaterialCommunityIcons
								name='window-close'
								size={32}
								color='white'
							/>
						</TouchableOpacity>
					</View>
				</View>
				// </Camera>
			)}
		</>
	)
}
