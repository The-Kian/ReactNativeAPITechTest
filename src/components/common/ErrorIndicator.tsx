import { View, Text, StyleSheet } from 'react-native';
const ErrorIndicator = ({errorMessage}) => {
    return (
        <View style={styles.container}>
        <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
    );
    }
export default ErrorIndicator;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    errorText: {
        fontSize: 16,
        color: '#ff0000',
    },
});