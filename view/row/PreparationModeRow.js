import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

export default function PreparationModeRow(props) {

    function editPreparationMode() {
        props.onEdit(props.preparationMode);
    }

    function deletePreparationMode() {
        props.onDelete(props.preparationMode);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textItem}>{props.preparationMode}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={deletePreparationMode}>
                    <Icon name="trash" color="white" size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={editPreparationMode}>
                    <Icon name="edit" color="white" size={18} />
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginTop: 20,
      width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textItem: {
        fontSize: 20,
    }
});