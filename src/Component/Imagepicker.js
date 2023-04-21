//import liraries
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import color from '../utils/Color';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const width = Dimensions.get("window").width

const MyComponent = (props) => {

    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const cameraLaunch = () => {
        launchCamera(options, async (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
                if (props?.opencamera == true) {
                    props.setopencamera()
                }
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
                if (props?.opencamera == true) {
                    props.setopencamera()
                }
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
                if (props?.opencamera == true) {
                    props.setopencamera()
                }
            } else {
                console.log("res.assets[0].uri", res.assets[0])
                if (props?.opencamera == true) {
                    props.setopencamera()
                }
                ImageResizer.createResizedImage(
                    res.assets[0].uri,
                    res.assets[0].width,
                    res.assets[0].height,
                    'JPEG',
                    50,
                    0,
                )
                    .then((response) => {
                        console.log(response)
                        props.upload({ "image": response.uri, name: response.name, type: "image/jpeg" })
                    })
                    .catch((err) => {
                    });
            }
        });
    }
    const imageGalleryLaunch = () => {
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                console.log("res.assets[0].uri", res.assets[0])
                ImageResizer.createResizedImage(
                    res.assets[0].uri,
                    res.assets[0].width,
                    res.assets[0].height,
                    'JPEG',
                    50,
                    0,
                )
                    .then((response) => {
                        console.log(response)
                        props.upload({ "image": response.uri, name: response.name, type: "image/jpeg" })
                    })
                    .catch((err) => {
                    });
            }
        });
    }
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA);
            console.log(granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                cameraLaunch()
            } else {
                console.log(granted)
            }
        } catch (err) {
            console.warn(err);
        }
    }
    const checkReadContactsPermission = async () => {
        const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (result == true) {
            cameraLaunch()
        }
        else {
            requestCameraPermission()
        }
    }
    const checkSTORAGE = async () => {imageGalleryLaunch()}

    useEffect(() => {
        if (props?.opencamera == true) {
            checkReadContactsPermission()
        }
    }, [props?.opencamera])


    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={props?.open}
            onRequestClose={() => {
                props.setopen()
            }}
        >
            <View style={styles.Modalview}>

                <View style={styles.ModalItem}>

                    <TouchableOpacity
                        onPress={() => {
                            props.setopen()
                        }}
                        style={styles.close}>
                        <Image
                            imageStyle={{ resizeMode: "stretch" }}
                            style={[styles.closei]}
                            source={require('../assets/image/close.png')} />
                    </TouchableOpacity>

                    <View style={styles.button2}>

                        <TouchableOpacity onPress={() => {
                            checkReadContactsPermission(), props.setopen()
                        }}>
                            <Image
                                imageStyle={{ resizeMode: "stretch" }}
                                style={styles.Icon}
                                source={require('../assets/image/camera.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            checkSTORAGE(), props.setopen()
                        }}>
                            <Image
                                imageStyle={{ resizeMode: "stretch" }}
                                style={styles.Icon}
                                source={require('../assets/image/gallery.png')} />
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    Modalview: {
        backgroundColor: "rgba(0,0,0,0.4)",
        flex: 1
    },
    ModalItem: {
        backgroundColor: color.backgroundcolor,
        overflow: "hidden",
        width: width / 3,
        borderRadius: 20,
        marginTop: 160,
        marginLeft: width / 1.8
    },
    button2: {
        flexDirection: "row",
        alignItems: "center",
    },
    close: {
        right: 10,
        alignSelf: "flex-end",
        top: -6,
        position: "absolute"
    },
    closei: {
        height: width / 30,
        width: width / 30,
        marginTop: 15
    },
    Icon: {
        height: width / 15,
        width: width / 15,
        marginLeft: 20,
        marginBottom: 20,
        marginTop: 20
    },
});


export default MyComponent;
