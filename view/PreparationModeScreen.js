import React, { useEffect, useState } from 'react';
import { TextInput, View, TouchableOpacity, ScrollView, StyleSheet, Text } from 'react-native';
import { Feather as Icon, MaterialIcons as MaterialIcon } from '@expo/vector-icons';
import Snackbar from 'react-native-snackbar';
import PreparationModeRow from './row/PreparationModeRow';

export default function PreparationModeScreen(props) {

    const [preparationMode, setPreparationMode] = useState('');
    const [preparationModeList, setPreparationModeList] = useState(props.preparationModeList ? props.preparationModeList : []);
    const [edit, setEdit] = useState(false);
    const [preparationModeEdited, setPreparationModeEdited] = useState('');

    useEffect(() => {
        props.setPreparationModeList(preparationModeList);
    }, [preparationModeList]);

    function addPreparationMode() {
        if (preparationMode == "") {
            Snackbar.show({text: "Modo de preparo é obrigatório", duration: Snackbar.LENGTH_LONG});
            return;
        }

        if (edit) {
            const index = preparationModeList.indexOf(preparationModeEdited);
            preparationModeList[index] = preparationMode;
            setEdit(false);
        } else {
            preparationModeList.push(preparationMode);
        }
        setPreparationMode('');
    }

    function editPreparationMode(preparationMode) {
        setPreparationMode(preparationMode);
        setPreparationModeEdited(preparationMode);
        setEdit(true);
    }

    function deletePreparationMode(preparationMode) {
        preparationModeList.splice(preparationMode, 1);
    }

    function cancelEdit() {
        setPreparationMode('');
        setEdit(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.textRowContainer}>
                <MaterialIcon style={styles.icon} name="list-alt" size={36} color="black" />
                <TextInput style={styles.input} multiline onChangeText={setPreparationMode} value={preparationMode} placeholder="Modo de preparo" clearButtonMode="always" />
            </View>
            <TouchableOpacity style={styles.button} onPress={addPreparationMode}>
                <View style={styles.buttonContainer}>
                    <Icon name="plus" size={22} color="white" />
                    <Text style={styles.buttonText}>{edit ? 'Salvar' : 'Adicionar'}</Text>
                </View>
            </TouchableOpacity>
            {
                edit && <TouchableOpacity style={styles.button} onPress={cancelEdit}>
                    <View style={styles.buttonContainer}>
                        <Icon name="x" size={22} color="white" />
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </View>
                </TouchableOpacity>
            }
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.itemsContainer}>
                {
                    preparationModeList.map(preparationMode => {
                        return <PreparationModeRow key={preparationMode} preparationMode={preparationMode} onEdit={editPreparationMode} onDelete={deletePreparationMode} />
                    })
                }
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D93600',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: "90%",
        marginTop: 20
    },
    icon: {
        paddingLeft: 12
    },
    input: {
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        alignItems: 'stretch'
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        height: 60,
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: "row"
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1,
        width: '90%'
    },
    itemsContainer: {
        marginTop: 10,
        padding: 20,
        borderRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
});