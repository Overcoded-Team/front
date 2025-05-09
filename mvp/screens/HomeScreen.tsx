import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons, Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Feather name="map-pin" size={18} color="#FF4B00" style={{ marginRight: 4 }} />
          <View>
            <Text style={styles.locationLabel}>Current location</Text>
            <Text style={styles.locationText}>Jl. Soekarno Hatta 15A...</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color="#FF4B00" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#888" style={{ marginLeft: 12 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          editable={false}
        />
      </View>

      {/* Card Laranja */}
      <View style={styles.orangeCard}>
        <Text style={styles.orangeCardText}>encontre os melhores{'
'}chefs</Text>
        <TouchableOpacity style={styles.exploreBtn}>
          <Text style={styles.exploreBtnText}>explorar</Text>
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <View style={styles.categoriesContainer}>
        <View style={styles.categoryCard}>
          <Image source={require('../assets/italiana.png')} style={styles.categoryImg} />
          <Text style={styles.categoryText}>Italiana</Text>
        </View>
        <View style={styles.categoryCard}>
          <Image source={require('../assets/saudavel.png')} style={styles.categoryImg} />
          <Text style={styles.categoryText}>saudável</Text>
        </View>
        <View style={styles.categoryCard}>
          <Image source={require('../assets/carnes.png')} style={styles.categoryImg} />
          <Text style={styles.categoryText}>carnes</Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <Feather name="home" size={24} color="#FF4B00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="search" size={24} color="#bbb" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="heart" size={24} color="#bbb" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="user-o" size={24} color="#bbb" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 18,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
  },
  locationLabel: {
    fontSize: 11,
    color: '#888',
  },
  locationText: {
    fontSize: 14,
    color: '#222',
    fontWeight: 'bold',
    maxWidth: 140,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    marginHorizontal: 18,
    marginBottom: 18,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  orangeCard: {
    backgroundColor: '#FF4B00',
    borderRadius: 16,
    marginHorizontal: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },
  orangeCardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
  },
  exploreBtn: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  exploreBtnText: {
    color: '#FF4B00',
    fontWeight: 'bold',
    fontSize: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 8,
    marginBottom: 18,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: 90,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  categoryImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    textTransform: 'capitalize',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
}); 