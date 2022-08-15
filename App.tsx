import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/Routes';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './src/styles/theme';
import { SidebarDrawer } from './src/Routes/SidebarDrawer';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            style="light"
            backgroundColor={theme.colors.primary}
            translucent
          />
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

