import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  { key: 'posts', label: 'Posts', icon: 'post-outline' },
  { key: 'inspirations', label: 'Inspirações', icon: 'lightbulb-outline' },
  { key: 'chefs', label: 'Chefs', icon: 'chef-hat' },
  { key: 'trolley', label: 'Virtual trolley', icon: 'cart-outline' },
  { key: 'mix', label: 'Mix n\'Match', icon: 'shuffle-variant' },
];

const foodTypes = [
  { key: 'italiana', label: 'Italiana', image: require('../assets/italiana.png') },
  { key: 'saudavel', label: 'saudável', image: require('../assets/saudavel.png') },
  { key: 'carnes', label: 'carnes', image: require('../assets/carnes.png') },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="account-circle" size={32} color="#FF6600" />
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Current location</Text>
          <Text style={styles.locationText}>Jl. Soekarno Hatta...</Text>
        </View>
        <Icon name="bell-outline" size={24} color="#333" />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={22} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map(cat => (
          <TouchableOpacity key={cat.key} style={styles.categoryButton}>
            <Icon name={cat.icon} size={22} color="#FF6600" />
            <Text style={styles.categoryLabel}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Destaque */}
      <View style={styles.highlightCard}>
        <Text style={styles.highlightText}>encontre os melhores chefs</Text>
        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>explorar</Text>
        </TouchableOpacity>
      </View>

      {/* Tipos de comida */}
      <View style={styles.foodTypesContainer}>
        {foodTypes.map(type => (
          <View key={type.key} style={styles.foodTypeCard}>
            <Image source={type.image} style={styles.foodImage} />
            <Text style={styles.foodLabel}>{type.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu inferior */}
      <View style={styles.bottomMenu}>
        <Icon name="magnify" size={28} color="#aaa" />
        <Icon name="heart-outline" size={28} color="#aaa" />
        <Icon name="account-outline" size={28} color="#aaa" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  locationContainer: { flex: 1, marginLeft: 8 },
  locationLabel: { fontSize: 10, color: '#888' },
  locationText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFEFEF', borderRadius: 12, paddingHorizontal: 12, marginBottom: 16 },
  searchInput: { flex: 1, height: 40, marginLeft: 8, color: '#333' },
  categoriesContainer: { flexDirection: 'row', marginBottom: 16 },
  categoryButton: { alignItems: 'center', marginRight: 20 },
  categoryLabel: { fontSize: 12, color: '#333', marginTop: 4 },
  highlightCard: { backgroundColor: '#FF6600', borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 16 },
  highlightText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  exploreButton: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 24, paddingVertical: 6 },
  exploreButtonText: { color: '#FF6600', fontWeight: 'bold' },
  foodTypesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  foodTypeCard: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 12, width: 90, elevation: 2 },
  foodImage: { width: 50, height: 50, borderRadius: 25, marginBottom: 8 },
  foodLabel: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  bottomMenu: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, backgroundColor: '#fff', borderRadius: 24, position: 'absolute', bottom: 16, left: 16, right: 16, elevation: 8 },
});
