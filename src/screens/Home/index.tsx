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

    async function getAllBucketsFolders() {
        const { data, error } = await supaDb.storage.from("photo").list("public");

        console.log(data, 'buckets data');
        console.log(error, 'buckets error');
    }

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.primary }
            ]} >
            <Button
                style={styles.button}
                onPress={getAllBucketsFolders}
            >Start Function</Button>
        </View>
    );
}




