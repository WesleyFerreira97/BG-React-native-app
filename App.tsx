import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/Routes';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { ThemeContextProvider } from './src/providers/ThemeContext';
import { useFonts } from 'expo-font';
import { PaperProvider } from './src/providers/PaperProvider';
import { theme } from './src/styles/theme';
import { Image, Text } from 'react-native';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Aquire': require('./assets/fonts/AquireBold-8Ma60.otf'),
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <PaperProvider>
        <ThemeContextProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar
                style="light"
                backgroundColor={theme.colors.primary}
                // backgroundColor="#B30753"
                translucent
              />
              <NavigationContainer>
                <Routes />
              </NavigationContainer>
            </SafeAreaView>
          </SafeAreaProvider>
        </ThemeContextProvider>
      </PaperProvider>
    </>
  );
}