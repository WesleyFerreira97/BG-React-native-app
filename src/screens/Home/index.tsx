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

    async function getAllCategories() {
        const { data, error } = await supaDb.from('categories').select();

        console.log(data, 'buckets data');
        console.log(error, 'buckets error');
    }

    async function deleteCategories() {
        const { data, error } = await supaDb
            .from('categories')
            .delete()
            .match({ slug: 'brincos' })

        console.log(data, 'buckets data');
        console.log(error, 'buckets error');
    }

    async function updateCategories() {
        const { data, error } = await supaDb
            .from('categories')
            .update({ slug: 'shorts' })
            .match({ slug: 'Auckland' })

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
                onPress={updateCategories}
            >Start Function</Button>
        </View>
    );
}




