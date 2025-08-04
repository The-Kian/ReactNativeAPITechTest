import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import OfferCard from '@components/OfferCard';
import { MOCK_OFFERS } from '@test-utils/mockOffers';
import { useFetchProducts } from '@hooks/useFetchProducts';
import LoadingIndicator from './LoadingIndicator';
import ErrorIndicator from './ErrorIndicator';

const OfferContainer = () => {
  const { products, isLoading, error } = useFetchProducts();
  console.log(`🚀 - KP -  ~ OfferContainer ~ products:`, products)

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        data={MOCK_OFFERS} // Use the mock data for now
        renderItem={({ item }) => <OfferCard {...item} />}
        keyExtractor={(item) => item.offer_id}
        ListHeaderComponent={
          <Text style={styles.header}>Xbox One S Offers</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    marginBottom: 8,
  },
});

export default OfferContainer;