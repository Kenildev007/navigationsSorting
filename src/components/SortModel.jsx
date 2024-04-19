import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const SortModel = ({modalVisible ,toogleModal}) => {
    return (
        <Modal style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <TouchableOpacity onPress={toogleModal} style={styles.centeredView}>

                <View style={styles.secondView}>
                    <TouchableOpacity onPress={toogleModal}><Text>hello</Text></TouchableOpacity>
                    <TouchableOpacity onPress={toogleModal} ><Text>hello</Text></TouchableOpacity>
                    <TouchableOpacity onPress={toogleModal} ><Text>hello</Text></TouchableOpacity>
                    <TouchableOpacity onPress={toogleModal} ><Text>hello</Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
} 

export default SortModel;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'red',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    secondView: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
})