import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/Routes';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { ThemeContextProvider } from './src/hooks/ThemeContext';

import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { useCallback, useEffect } from 'react';


// Constants.manifest.extra.fact === 'kittens are cool';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Aquire': require('./assets/fonts/AquireBold-8Ma60.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ThemeContextProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
              style="light"
              backgroundColor='#000'
              translucent
            />
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeContextProvider>
    </>
  );
}

