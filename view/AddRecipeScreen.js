import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipeInfoScreen from './RecipeInfoScreen';
import IngredientsScreen from './IngredientsScreen';
import PreparationModeScreen from './PreparationModeScreen';
import { Text, TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';
import RecipeRepository from '../repository/RecipeRepository';

const BottomTab = createBottomTabNavigator();

const tabBarOptions = {
    style: {
        elevation: 0,
        shadowOpacity: 0,
        height: 64,
    },
    tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelStyle: {
        fontSize: 13,
        marginLeft: 16
    },
    inactiveBackgroundColor: '#fafafc',
    activeBackgroundColor: '#ebebf5',
    inactiveTintColor: '#c1bccc',
    activeTintColor: '#32264d'
};

export default function AddRecipeScreen({ route, navigation }) {

    const [name, setName] = useState(route.params.recipe ? route.params.recipe.name : '');
    const [quantity, setQuantity] = useState(route.params.recipe ? route.params.recipe.quantity : '');
    const [preparationTime, setPreparationTime] = useState(route.params.recipe ? route.params.recipe.preparationTime : '');
    const [ingredients, setIngredients] = useState(route.params.recipe ? route.params.recipe.ingredients : []);
    const [preparationModeList, setPreparationModeList] = useState(route.params.recipe ? route.params.recipe.preparationMode : []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={saveRecipe}>
                    <Text style={{padding: 20, fontWeight: 'bold'}}>SALVAR</Text>
                </TouchableOpacity>
            )
        });
    }, [name, quantity, preparationTime, ingredients, preparationModeList]);

    function saveRecipe() {
        if (name == "") {
            Snackbar.show({text: "Nome é obrigatório", duration: Snackbar.LENGTH_LONG});
            return;
        }
        if (quantity == "") {
            Snackbar.show({text: "Rendimento é obrigatório", duration: Snackbar.LENGTH_LONG});
            return;
        }
        if (preparationTime == "") {
            Snackbar.show({text: "Tempo de preparo é obrigatório", duration: Snackbar.LENGTH_LONG});
            return;
        }
        if (ingredients.length == 0) {
            Snackbar.show({text: "Ingredientes são obrigatórios", duration: Snackbar.LENGTH_LONG});
            return;
        }
        if (preparationModeList.length == 0) {
            Snackbar.show({text: "Modo de preparo é obrigatório", duration: Snackbar.LENGTH_LONG});
            return;
        }

        if (route.params.recipe) {
            RecipeRepository.edit({
                name: name,
                quantity: quantity,
                preparationTime: preparationTime,
                ingredients: ingredients,
                preparationMode: preparationModeList,
                datetime: new Date(),
                userId: route.params.userId
            }, route.params.id).then(() => {
                navigation.navigate("RecipesScreen", { reload: true });
            });
        } else {
            RecipeRepository.save({
                name: name,
                quantity: quantity,
                preparationTime: preparationTime,
                ingredients: ingredients,
                preparationMode: preparationModeList,
                datetime: new Date(),
                userId: route.params.userId
            }).then(() => {
                navigation.navigate("RecipesScreen", { reload: true });
            });
        }
    }

    return (
        <BottomTab.Navigator tabBarOptions={tabBarOptions}>
            <BottomTab.Screen name="RecipeInfoScreen" options={{tabBarLabel: "Informações"}}>
                {props => <RecipeInfoScreen {...props} name={name} setName={setName} quantity={quantity} setQuantity={setQuantity} preparationTime={preparationTime} setPreparationTime={setPreparationTime} /> }
            </BottomTab.Screen>
            <BottomTab.Screen name="IngredientsScreen" options={{tabBarLabel: "Ingredientes"}}>
                {props => <IngredientsScreen {...props} ingredients={ingredients} setIngredients={setIngredients} />}
            </BottomTab.Screen>
            <BottomTab.Screen name="PreparationModeScreen" options={{tabBarLabel: "Modo de Preparo"}}>
                {props => <PreparationModeScreen {...props} preparationModeList={preparationModeList} setPreparationModeList={setPreparationModeList} />}
            </BottomTab.Screen>
        </BottomTab.Navigator>
    );

}