import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/Routes';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { ThemeContextProvider } from './src/hooks/ThemeContext';
import 'react-native-url-polyfill/auto';
import { useFonts } from 'expo-font';

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

