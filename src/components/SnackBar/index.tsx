import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { styles } from './styles'

type SnackBarProps = {
    text: string,
}

export function SnackBar(props: SnackBarProps) {
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.container}>
            <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {props.text}
            </Snackbar>
        </View>
    );
};
