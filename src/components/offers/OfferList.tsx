import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Offer } from '@app-types/internal';
import OfferCard from './OfferCard';

interface OfferListProps {
  products: Offer[];
  title: string;
}

const OfferList = ({ products, title }: OfferListProps) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <OfferCard offer={item} productTitle={title} />}
      keyExtractor={(item) => item.offer_id}
      ListHeaderComponent={
        <Text style={styles.header}>{title || 'Offers'}</Text>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No deals found at the moment.</Text>
          <Text style={styles.emptyText}>Please check back later.</Text>
        </View>
      }
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  }
});

export default OfferList;