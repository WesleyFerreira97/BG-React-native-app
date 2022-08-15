import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/Routes';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './src/styles/theme';
import 'react-native-gesture-handler';
import { SidebarDrawer } from './src/Routes/SidebarDrawer';
import { ThemeContextProvider } from './src/hooks/ThemeContext';

export default function App() {
  return (
    <>
      <ThemeContextProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
              style="light"
              backgroundColor={theme.colors.primary}
              translucent
            />
            <NavigationContainer>
              {/* <SidebarDrawer /> */}
              <Routes />
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeContextProvider>
    </>
  );
}

