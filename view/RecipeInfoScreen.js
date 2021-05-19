import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Feather as Icon, MaterialIcons as MaterialIcon, MaterialCommunityIcons as MaterialCommunityIcon } from '@expo/vector-icons';

export default function RecipeInfoScreen(props) {

    const [name, setName] = useState(props.name ? props.name : '');
    const [quantity, setQuantity] = useState(props.quantity ? props.quantity : '');
    const [preparationTime, setPreparationTime] = useState(props.preparationTime ? props.preparationTime : '');

    useEffect(() => {
        props.setName(name);
        props.setQuantity(quantity);
        props.setPreparationTime(preparationTime);
    }, [name, quantity, preparationTime]);

    return (
        <View style={styles.container}>
            <View style={styles.textRowContainer}>
                <MaterialIcon style={styles.icon} name="fastfood" size={36} color="black" />
                <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="Nome da receita" clearButtonMode="always" />
            </View>
            <View style={styles.textRowContainer}>
                <MaterialCommunityIcon style={styles.icon} name="table-chair" size={36} color="black" />
                <TextInput style={styles.input} onChangeText={setQuantity} value={quantity} placeholder="Rendimento" clearButtonMode="always" />
            </View>
            <View style={styles.textRowContainer}>
                <Icon style={styles.icon} name="clock" size={36} color="black" />
                <TextInput style={styles.input} onChangeText={setPreparationTime} value={preparationTime} placeholder="Tempo de preparo" clearButtonMode="always" />
            </View>
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
    }
});