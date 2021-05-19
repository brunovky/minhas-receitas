import React, { useState } from 'react';
import LoginScreen from 'react-native-login-screen';
import { Image, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import UserRepository from '../repository/UserRepository';

export default function _LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [signup, setSignup] = useState(false);
  
  function doLoginOrSignup() {
    if (signup) {
      doSignup();
      return;
    }
    if (email === "") {
      Snackbar.show({text: "E-mail é obrigatório", duration: Snackbar.LENGTH_LONG});
      return;
    }
    if (password === "") {
      Snackbar.show({text: "Senha é obrigatório", duration: Snackbar.LENGTH_LONG});
      return;
    }

    UserRepository.findByEmailAndPassword(email, password).then(async userId => {
      if (userId) {
        await AsyncStorage.setItem("userId", userId);
        navigation.replace("RecipesScreen", {userId: userId});
      } else {
        Snackbar.show({text: "E-mail e/ou senha inválidos", duration: Snackbar.LENGTH_LONG});
      }
    });
  }

  function doSignup() {
    if (email === "") {
      Snackbar.show({text: "E-mail é obrigatório", duration: Snackbar.LENGTH_LONG});
      return;
    }
    if (password === "") {
      Snackbar.show({text: "Senha é obrigatório", duration: Snackbar.LENGTH_LONG});
      return;
    }
    if (repassword === "") {
      Snackbar.show({text: "Confirmar senha é obrigatório", duration: Snackbar.LENGTH_LONG});
      return;
    }
    if (password != repassword) {
      Snackbar.show({text: "Senhas não coincidem", duration: Snackbar.LENGTH_LONG});
      return;
    }

    UserRepository.findByEmail(email).then(result => {
      if (result) {
        Snackbar.show({text: "Este e-mail já existe", duration: Snackbar.LENGTH_LONG});
      } else {
        UserRepository.save(email, password).then(async userId => {
          await AsyncStorage.setItem("userId", userId);
          navigation.replace("RecipesScreen", {userId: userId});
        })
      }
    });
  }

  return (
    <View style={styles.container}>
      <LoginScreen 
        source={require('../assets/login_bg.jpeg')}
        logoComponent={logoComponent}
        loginText="ENTRAR"
        disableSettings
        usernamePlaceholder="E-mail"
        usernameTitle="E-mail"
        passwordPlaceholder="Senha"
        passwordTitle="Senha"
        signupText="Cadastrar"
        emailPlaceholder="E-mail"
        emailTitle="E-mail"
        repasswordPlaceholder="Confirmar Senha"
        repasswordTitle="Confirmar Senha"
        loginButtonText="Já tem uma conta?"
        usernameOnChangeText={setEmail}
        passwordOnChangeText={setPassword}
        emailOnChangeText={setEmail}
        repasswordOnChangeText={setRepassword}
        onPressLogin={doLoginOrSignup}
        onPressSignup={() => setSignup(!signup)} />
      </View>
  );
}

const logoComponent = (
  <View style={{marginTop: 64, alignItems: "center", justifyContent: "center"}}>
    <Image style={{width: 128, height: 128}} source={require('../assets/ic_minhas_receitas.png')} resizeMode="contain" />
    <Text style={{color: "white", fontSize: 32, fontWeight: "bold", marginTop: 16}}>Minhas Receitas</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});