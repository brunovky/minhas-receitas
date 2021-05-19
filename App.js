import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import _LoginScreen from './view/LoginScreen';
import RecipeScreen from './view/RecipeScreen';
import AddRecipeScreen from './view/AddRecipeScreen';
import RecipesScreen from './view/RecipesScreen';
import SplashScreen from './view/SplashScreen';

const Stack = createStackNavigator();

export default function App() {
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{headerShown: false}} />
                <Stack.Screen
                    name="LoginScreen"
                    component={_LoginScreen}
                    options={{headerShown: false}} />
                <Stack.Screen
                    name="RecipesScreen"
                    component={RecipesScreen}
                    options={{title: "Minhas Receitas"}} />
                <Stack.Screen
                    name="RecipeScreen"
                    component={RecipeScreen}
                    options={{title: "Minhas Receitas"}} />
                <Stack.Screen
                    name="AddRecipeScreen"
                    component={AddRecipeScreen}
                    options={({route}) => ({title: route.params.recipe ? "Alterar Receita" : "Criar Receita"})} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}