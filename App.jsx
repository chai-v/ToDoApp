import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';

//components
import Home from './components/Home';

//styles
import { Container } from './styles/appStyles';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [ready,setready] = useState(false);

  //initial todos
  const initialTodos = [];

  const [todos, setTodos] = useState(initialTodos);
  
  const LoadTodos = () => {
    AsyncStorage.getItem("storedTodos").then(data => {
      if(data!==null){
        setTodos(JSON.parse(data))
      }
    }).catch((error)=> console.log(error));
  }

  if (!ready){
    return(
      <AppLoading
        startAsync={LoadTodos}
        onFinish={() => setready(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <Container>
      <Home todos={todos} setTodos={setTodos}></Home>
      <StatusBar style="auto" />
    </Container>
  );
}


