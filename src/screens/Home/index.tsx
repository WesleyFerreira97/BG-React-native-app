import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '../../providers/ThemeContext';
import { ThemeProps } from '../../providers/ThemeContext';
import { supaDb } from '../../services/supadb';
import { styles } from './styles';

export function Home() {
    const { theme, setTheme } = useTheme();

    async function getAllBuckets() {
        const { data, error } = await supaDb.storage.listBuckets()

        console.log(data, 'buckets data');
        console.log(error, 'buckets error');
    }

    getAllBuckets();

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




