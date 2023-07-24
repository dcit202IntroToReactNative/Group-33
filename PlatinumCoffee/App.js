import React from 'react';
import { View, Text, StatusBar, FlatList,  TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

const coffeeData = [
  {
    name: 'Espresso',
    image: require('./cafe.png'), 
  },
  {
    name: 'Cappuccino',
    image: require('./cappcunio.png'),
  },
  {
    name: 'Latte',
    image: require('./late.png'), 
  },
  {
    name: 'Orange Vanilla',
    image: require('./orangevanilla.png'), 
  },
  {
    name: 'Green Tea',
    image: require('./greentea.png'), 
  },
  {
    name: 'Thai Tea',
    image: require('./thaitea.png'),  
  },
  {
    name: 'Tea',
    image: require('./tea.png'),
  },
  {
    name: 'Americano',
    image: require('./orange.png'), 
  },
  {
    name: 'Match',
    image: require('./match.png'), 
  },
];

// Function to shuffle an array in place (Fisher-Yates shuffle)
const getRandomCoffeeData = () => {
  const randomIndex = Math.floor(Math.random() * coffeeData.length);
  return coffeeData[randomIndex];
};

const generateNonRepeatingCoffees = () => {
  const shuffledCoffees = [...coffeeData];
  for (let i = shuffledCoffees.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCoffees[i], shuffledCoffees[j]] = [shuffledCoffees[j], shuffledCoffees[i]];
  }
  return shuffledCoffees;
};

const HomeScreen = ({ navigation }) => {
  const data = generateNonRepeatingCoffees().slice(0, 10);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Detail', item)}
    >
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Coffee Shop</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const DetailScreen = ({ route }) => {
  const { name, image } = route.params;
  const [cartCount, setCartCount] = React.useState(0);

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Coffee Details</Text>
      </View>
      <View style={styles.content}>
        <Image source={image} style={styles.image} />
        <Text style={styles.coffeeName}>{name}</Text>
        <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
          <FontAwesome name="cart-plus" size={20} color="white" />
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <Text style={styles.cartCountText}>Cart Count: {cartCount}</Text>
      </View>
    </View>
  );
};

const SplashScreen = ({ navigation }) => {
  const handleStartApp = () => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000); // 2 seconds delay before navigating to HomeScreen
  };

  return (
    <View style={styles.splashContainer}>
      <StatusBar hidden />
      <Image source={require('./cafe.png')} style={styles.splashLogo} />
      <TouchableOpacity onPress={handleStartApp} style={styles.startButton}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingVertical: 20,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 90,
  },
  coffeeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  cartCountText: {
    fontSize: 18,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  splashLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  startButtonText: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="PlatinumCoffee" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;