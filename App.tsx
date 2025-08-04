import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MOCK_OFFERS } from '@test-utils/mockOffers';
import ProductListScreen from '@components/OfferContainer';



export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <ProductRow {...MOCK_OFFERS[0]} /> */}
      <ProductListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
