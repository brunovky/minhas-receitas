import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function RecipeScreen({ route }) {

    const recipe = JSON.parse(route.params.recipe);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{recipe.name}</Text>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.itemsContainer}>
                <Text style={styles.subtitle}>Tempo de Preparo:</Text>
                <Text style={styles.body}>{recipe.preparationTime}</Text>
                <Text style={styles.subtitle}>Rendimento:</Text>
                <Text style={styles.body}>{recipe.quantity}</Text>
                <Text style={styles.subtitle}>Ingredientes:</Text>
                {
                    recipe.ingredients.map(ingredient => {
                        return <Text key={ingredient} style={styles.body}>- {ingredient}</Text>
                    })
                }
                <Text style={styles.subtitle}>Modo de Preparo:</Text>
                {
                    recipe.preparationMode.map(step => {
                        return <Text key={step} style={styles.body}>- {step}</Text>
                    })
                }
                <View style={{marginTop: 20}} />
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
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
    },
    body: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 5
    },
    scrollContainer: {
        flex: 1,
        width: '90%'
    },
    itemsContainer: {
        marginTop: 10,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
});