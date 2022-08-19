import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '../../providers/ThemeContext';
import { ThemeProps } from '../../providers/ThemeContext';
import { styles } from './styles';

export function Home() {
    const { theme, setTheme } = useTheme();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.primary }
            ]} >
            <Text>Home COMPONENT</Text>
        </View>
    );
}




