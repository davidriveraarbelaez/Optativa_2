# Unidad 3: Navegación con React Navigation (Stack, Tabs y Drawer)

## Objetivos de Aprendizaje
- Comprender los conceptos de navegación Stack, Tabs y Drawer.

- Configurar React Navigation en un proyecto Expo + TypeScript.

- Implementar cada tipo de navegación con ejemplos prácticos.

- Integrar diferentes navegaciones dentro de una estructura combinada.

- Aplicar paso de datos entre pantallas y navegación condicional.

## Requisitos previos

- Tener instalado **Node.js** y **Expo CLI**.
- Proyecto Expo creado con TypeScript.

basic
```bash
npx create-expo-app MyNavigationApp -t expo-template-blank-typescript
```

- Cambiar al directorio del proyecto    
```bash
cd MyNavigationApp
```

- Instalar dependencias de navegación
```bash
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler react-native-reanimated
npx expo install @react-navigation/native-stack
npx expo install @react-navigation/bottom-tabs
npx expo install @react-navigation/drawer
```

**Recomendación**

```bash
npx expo install @react-navigation/native react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer
```

- Importar **react-native-gesture-handler** en el archivo `App.tsx` antes de cualquier otro import.

```tsx
import 'react-native-gesture-handler';
```

### Stack Navigator
- Crear un archivo `StackNavigator.tsx` en la ruta `src/navigation/StackNavigator.tsx`.

```tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number; message: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
```

📄 src/screens/HomeScreen.tsx

```tsx
import { Button, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 42,
            message: 'Hola desde Home!',
          })
        }
      />
    </View>
  );
}
```

📄 src/screens/DetailsScreen.tsx

```tsx
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route }: Props) {
  const { itemId, message } = route.params;

  return (
    <View>
      <Text>ID: {itemId}</Text>
      <Text>Mensaje: {message}</Text>
    </View>
  );
}
```

### Bottom Tab Navigator
- Crear un archivo `TabNavigator.tsx` en la ruta `src/navigation/TabNavigator.tsx`.

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

### Drawer Navigator

- Crear un archivo `DrawerNavigator.tsx` en la ruta `src/navigation/DrawerNavigator.tsx`.

```tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
```

### Navigación Combinada

```tsx
// App.tsx
// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
```

### Crear SettingsScreen
📄 src/screens/SettingsScreen.tsx

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <Text>Aquí puedes ajustar las preferencias de la aplicación.</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
});  
