import React, { useEffect, useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather as Icon, MaterialIcons as MaterialIcon } from '@expo/vector-icons';
import Snackbar from 'react-native-snackbar';
import IngredientRow from './row/IngredientRow';

export default function IngredientsScreen(props) {

    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState(props.ingredients ? props.ingredients : []);
    const [edit, setEdit] = useState(false);
    const [ingredientEdited, setIngredientEdited] = useState('');

    useEffect(() => {
        props.setIngredients(ingredients);
    }, [ingredients]);

    function addIngredient() {
        if (ingredient == "") {
            Snackbar.show({text: "Ingrediente é obrigatório", duration: Snackbar.LENGTH_LONG});
            return;
        }

        if (edit) {
            const index = ingredients.indexOf(ingredientEdited);
            ingredients[index] = ingredient;
            setEdit(false);
        } else {
            ingredients.push(ingredient);
        }
        setIngredient('');
    }

    function editIngredient(ingredient) {
        setIngredient(ingredient);
        setIngredientEdited(ingredient);
        setEdit(true);
    }

    function deleteIngredient(ingredient) {
        ingredients.splice(ingredient, 1);
    }

    function cancelEdit() {
        setIngredient('');
        setEdit(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.textRowContainer}>
                <MaterialIcon style={styles.icon} name="shopping-cart" size={36} color="black" />
                <TextInput style={styles.input} onChangeText={setIngredient} value={ingredient} placeholder="Ingrediente" clearButtonMode="always" />
            </View>
            <TouchableOpacity style={styles.button} onPress={addIngredient}>
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
                    ingredients.map(ingredient => {
                        return <IngredientRow key={ingredient} ingredient={ingredient} onEdit={editIngredient} onDelete={deleteIngredient} />
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