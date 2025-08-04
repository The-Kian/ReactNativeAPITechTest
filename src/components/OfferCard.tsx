import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Offer } from '@app-types/internal'; 
interface OfferCardProps {
  offer: Offer;
}

const OfferCard = ({offer}: OfferCardProps) => {
  const handlePress = () => {
    Linking.openURL(offer.link).catch((err) => console.error("Couldn't load page", err));
  };

  console.log(`🚀 - KP -  ~ OfferCard ~ offer.image:`, offer.image)
  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image
        source={{ uri: offer.image || offer.merchant.logo_url }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>
          {offer.name}
        </Text>
        <Text style={styles.price}>
          {`${offer.currency_symbol}${offer.price.toFixed(2)}`}
        </Text>
        <View style={styles.merchantContainer}>
          <Image
            source={{ uri: offer.merchant.logo_url }}
            style={styles.merchantLogo}
            resizeMode="contain"
          />
          <Text style={styles.merchantName}>{offer.merchant.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    flex: 1
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#333',
    fontWeight: '700',
    marginVertical: 4,
  },
  merchantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  merchantLogo: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  merchantName: {
    fontSize: 14,
    color: '#666',
    width: 'auto'
  },
});

export default OfferCard;