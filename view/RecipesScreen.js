import React, {useState} from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { AdMobInterstitial } from 'react-native-admob';

import RecipeRepository from '../repository/RecipeRepository';
import RecipeRow from './row/RecipeRow';

export default function RecipesScreen({ route, navigation }) {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        RecipeRepository.findByUser(route.params.userId).then(recipes => setRecipes(recipes));
    }, [route]);

    function addRecipe() {
        AdMobInterstitial.addEventListener('adClosed', () => {
            AdMobInterstitial.removeAllListeners();
            navigation.navigate("AddRecipeScreen", {userId: route.params.userId});
        });
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Receitas</Text>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.itemsContainer}>
                {
                    recipes.map(recipe => {
                        return <RecipeRow key={recipe.id} id={recipe.id} userId={route.params.userId} recipe={JSON.stringify(recipe.data())} navigation={navigation} />
                    })
                }
            </ScrollView>
            <FloatingAction overrideWithAction actions={[
                {
                    text: "Add",
                    icon: require("../assets/add.png"),
                    name: "bt_add",
                    position: 1
                }
            ]} onPressItem={item => addRecipe()} />
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
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
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