import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import RecipeRepository from '../../repository/RecipeRepository';
import { AdMobInterstitial } from 'react-native-admob';

export default function RecipeRow(props) {

    const recipe = JSON.parse(props.recipe);

    function viewRecipe() {
        AdMobInterstitial.addEventListener('adClosed', () => {
            AdMobInterstitial.removeAllListeners();
            props.navigation.navigate("RecipeScreen", {recipe: props.recipe});
        });
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }

    function editRecipe() {
        props.navigation.navigate("AddRecipeScreen", {recipe: recipe, id: props.id, userId: props.userId});
    }

    function deleteRecipe() {
        Alert.alert("Atenção", "Você tem certeza que deseja excluir esta receita?", [
            {
                text: "Não",
                onPress: () => console.log("Cancel pressed"),
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
                    RecipeRepository.deleteById(props.id).then(() => props.navigation.navigate("RecipesScreen", { id: props.id }));
                }
            }
        ], { cancelable: false });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textItem}>{recipe.name}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={deleteRecipe}>
                    <Icon name="trash" color="white" size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={editRecipe}>
                    <Icon name="edit" color="white" size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewButton} onPress={viewRecipe}>
                    <Icon name="eye" color="white" size={18} />
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
    viewButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: 'green',
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