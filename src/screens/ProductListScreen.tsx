import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFetchProducts } from '@hooks/useFetchProducts';
import OfferList from '@components/offers/OfferList';
import LoadingIndicator from '@components/common/LoadingIndicator';
import ErrorIndicator from '@components/common/ErrorIndicator';

const ProductListScreen = () => {
  const { products, title, isLoading, error } = useFetchProducts('xbox_one_s');

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator errorMessage={error} />;
  
  return (
    <SafeAreaView style={styles.container}>
      <OfferList products={products} title={title} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
});

export default ProductListScreen;