import { TouchableOpacity } from "react-native-gesture-handler";
import { GalleryHeaderProps } from "./types";
import { styles } from "./styles";
import { FilePlus } from "phosphor-react-native";
import { theme } from "../../styles/theme";
import { Text, View } from "react-native";

export const GalleryHeader = (props: GalleryHeaderProps) => {
    const { pickImage, color, name } = props;

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={pickImage}
            style={{
                ...styles.galleryHeader,
                backgroundColor: color
            }}>
            <View style={styles.galleryOptions}>
                <FilePlus
                    size={32}
                    style={{ marginRight: 5 }}
                    color={theme.colors.neutralAlt}
                />
                <Text style={styles.galleryTitle}>
                    Adicionar Imagem
                </Text>
            </View>
            <Text style={styles.galleryTitle}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}