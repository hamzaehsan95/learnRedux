/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import {createStore} from 'redux';
import {combineReducers} from 'redux';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const counter  = (state = 0 ,action )=>{
  switch(action.type)
  {
    case 'INCREMENT':
    return state+1;
    case 'DECREMENT':
    return state-1;

    default:
    return state;
  }
}

const todo = (state,action)=>{
switch(action.type){
  case 'ADD_TODO':
  return {
    id:action.id,
    text:action.text,
    completed:false
  };
  case 'TOGGLE_TODO':
  if(state.id!== action.id){
    return state;
  }
  return {
    ...state,
    completed:!state.completed
  };
  default :
  return state;
}
}
const todos = (state=[],action)=>{
  switch(action.type){
    case 'ADD_TODO':
    return[
      ...state,
      todo(undefined,action)
    ];
    case 'TOGGLE_TODO':
    return state.map(t=>
      todo(t,action)
      );
    default:
    return state;
  }
}
const todoApp = combineReducers({
  todos
});

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD+TODO',
    id:0,
    text:'Learn Redux'
  };
  const stateAfter = [
  {
    id:0,
    text:'Learn Redux',
    completed:false
  }
  ];
}
const store = createStore(todoApp);


type Props = {};
let nextid = 0 ;
export default class App extends Component<Props> {
  render() {
    return (
     
      <TodoApp
      todos = {store.getState().todos}/>
    );
  }
}

class TodoApp extends Component {
  render() {
    return (
     
      <View style={styles.container}>
        <Button onPress={
          ()=> {
            store.dispatch({
              type:'ADD_TODO',
              text:'Testt',
              id:nextid++
            })
          }
        } title='ADD todo'>
        
        </Button>
        <View>
        <Text>
          {this.props.todos.map(todo=>
            console.log(todo.id)
            )};
        </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// function mapStateToProps(state){
//   return{
//     count:state
//   }
// }

