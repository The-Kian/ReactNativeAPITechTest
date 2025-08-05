import React from 'react';
import { View, Text, Image, StyleSheet, Linking, Pressable } from 'react-native';
import { Offer } from '@app-types/internal';
interface OfferCardProps {
  offer: Offer;
  productTitle: string;
}

const OfferCard = ({ offer, productTitle }: OfferCardProps) => {
  const handlePress = () => {
    Linking.openURL(offer.link).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: offer.image }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {productTitle}
        </Text>

        <View style={styles.merchantContainer}>
          <Image
            source={{ uri: offer.merchant.logo_url }}
            style={styles.merchantLogo}
            resizeMode="contain"
          />
          <Text style={styles.merchantName}>{offer.merchant.name}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.price}>
            {`${offer.currency_symbol}${offer.price.toFixed(2)}`}
          </Text>
          <Pressable onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>View Deal</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    flexDirection: 'row',
  },
  productImage: {
    width: 90,
    height: 90,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  merchantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  merchantLogo: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  merchantName: {
    fontSize: 14,
    color: '#555',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default OfferCard;