import { View, ActivityIndicator } from "react-native";
import { StyleSheet, Text } from "react-native";

const LoadingIndicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}
export default LoadingIndicator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
});