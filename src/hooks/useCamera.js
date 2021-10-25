import React, { useEffect, useState } from 'react'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import { useAlert } from './useAlert'
import { REACT_YOUR_API_KEY } from '@env'

const clarifai = require('clarifai')

export const useCamera = () => {
	const [hasPermission, setHasPermission] = useState(null)
	const [previewVisible, setPreviewVisible] = useState(false)
	const [photo, setPhoto] = useState(null)
	const [flashMode, setFlashMode] = useState('off')
	const [loading, setLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const { createAlert } = useAlert()

	useEffect(() => {
		;(async () => {
			const { status } = await Camera.getCameraPermissionsAsync(
				Permissions.CAMERA,
				Permissions.MEDIA_LIBRARY
			)
			status === 'granted' && setHasPermission(true)
		})()
	}, [])

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		})

		if (!result.cancelled) {
			setPhoto(result)
			setPreviewVisible(true)
		}
	}
	const takePicture = async () => {
		try {
			if ((await cameraRef.isAvailableAsync()) === true) {
				const photo = await Camera.takePictureAsync({ base64: true })
				setPreviewVisible(true)
				setPhoto(photo)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const toggleFlash = () => {
		if (flashMode === 'on') {
			setFlashMode('off')
		} else if (flashMode === 'off') {
			setFlashMode('on')
		} else {
			setFlashMode('auto')
		}
	}

	// const { callApi } = useApi()

	const identifyImage = async (photo) => {
		// await callApi(photo)
		setLoading(true)
		const app = new clarifai.App({
			apiKey: REACT_YOUR_API_KEY,
		})
		try {
			const response = await app.models.predict(clarifai.GENERAL_MODEL, {
				base64: photo,
			})

			createAlert(response.outputs[0].data.concepts[0].name)
			setLoading(false)
		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

	return {
		toggleFlash,
		takePicture,
		pickImage,
		hasPermission,
		setPreviewVisible,
		previewVisible,
		photo,
		identifyImage: (photo) => identifyImage(photo),
		flashMode,
		loading,
		response,
	}
}
