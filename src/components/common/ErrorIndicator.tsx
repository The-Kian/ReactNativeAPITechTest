import { View, Text, StyleSheet } from 'react-native';

interface ErrorIndicatorProps {
    errorMessage: string;
}

const ErrorIndicator = ({ errorMessage }: ErrorIndicatorProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText} testID="error-message">{errorMessage}</Text>
        </View>
    );
};

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