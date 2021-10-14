/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';

import axios from 'axios';

import { NativeModules } from 'react-native';

const { RnTestExceptionHandler } = NativeModules;

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <Text> 
          {this.state.error && this.state.error.toString() }
          {/* && this.state.errorInfo.componentStack */}
        </Text>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  state = { 
    counter: 0,
  }

  handleClick = () => {
  
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return (
      <View >
        <Text onPress={this.handleClick} style={styles.text}>{this.state.counter}</Text>
      </View>
      // <Button onPress={this.handleClick}
      //   title={this.state.counter+''}
      // />

    );
  }
}

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
        'Unexpected error occurred',
        `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
        We have reported this to our team ! Please close the app and start again!
        `,
      [{
        text: 'Close'
      }]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

const errorHandlerUtils = (e, isFatal) => {
  axios.create({
    baseURL: '',
    headers: {'Content-Type': 'application/json'}
  }).post('http://10.0.2.2:3000/',e,{})
  .then(
  );
  if (isFatal) {
    Alert.alert(
        'Unexpected error occurred',
        `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
        We have reported this to our team ! this is using gloable error util!
        `,
      [{
        text: 'Close'
      }]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

const errorHandlerForNative = (e) => {
  axios.create({
    baseURL: '',
    headers: {'Content-Type': 'application/json'}
  }).post('http://10.0.2.2:3000/',e,{})
  .then(
    console.log('success crash report')
  );
};

setJSExceptionHandler(errorHandler, true);


// setNativeExceptionHandler(errorHandlerForNative,true,false);
// setNativeExceptionHandler(errorHandlerUtils,true,false);

// setNativeExceptionHandler((errorString) => {
//   fetch('http://192.168.0.104:3000/test/');
// });

setNativeExceptionHandler((errorString) => {
  axios.create({
    baseURL: '',
    headers: {'Content-Type': 'application/json'}
  }).get('http://10.0.2.2:3000/test/')
  .then(
    (e) => {
      console.log(e);
    }
  );
  console.log('crash report from java script',errorString)
});

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }; 
  
  causeJSError = ()=>{ 
    throw new Error('THIS IS A CUSTOM UNHANDLED JS ERROR');
  }

  causeJSErrorUsingUtil = ()=>{
    global.ErrorUtils.setGlobalHandler(errorHandlerUtils); 
    throw new Error('error util exception');
  }

  causeNativeError = ()=>{
    RnTestExceptionHandler.raiseTestNativeError();
  }
 
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text>
            error boundaries
        </Text>
        <ErrorBoundary>
          <BuggyCounter /> 
        </ErrorBoundary>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        <Text>
            react JS exception handler
        </Text>
        <Button onPress={() => this.causeJSError()} title="Js error" color="#841584"/> 
        <Text>
            react JS exception handler
        </Text>
        <Button onPress={() => this.causeJSErrorUsingUtil()} title="Js util error" color="#841584"/> 
        <Text>
            react Native exception handler
        </Text>
        <Button onPress={() => this.causeNativeError()} title="Native error" color="#841584"/> 
      </ScrollView>
    </SafeAreaView>
  ); 
};

const styles = StyleSheet.create({
  root: {
    width: 360,
    height: 640,
    backgroundColor: 'white',
    borderRadius: 5,
    boxShadow: '0 3px 5px -2px rgba(0, 0, 0, 0.3)',
    display: 'grid',
    placeContent: 'center'
  },
  text: {
    fontSize: 50,
    padding: 20,
    cursor: 'pointer',
    color: '#6a3093',
    fontWeight: 'bold',
    userSelect: 'none',
    boxShadow: '0 3px 5px -2px rgba(0, 0, 0, 0.3)',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
