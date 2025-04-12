# Instrucciones

1. Crea un nuevo proyecto de React Native.

```bash
npx create-expo-app@latest --template
```
2. Seleccionar el template **"blank (TypeScript)"**.

3. Asignar un nombre a la app, por ejemplo **"MyApp"**.

4. Cambiar al directorio del proyecto.
```bash
cd MyApp
```

5. Crear el contexto y el proveedor.

```bash
mkdir src
```
```bash
cd src
```
```bash
mkdir context
```
```bash
touch AppContext.tsx
```

6. Ingresar al archivo `AppContext.tsx` y agregar el siguiente código:

```tsx
import React, { createContext, useState, FC, ReactNode} from 'react'

interface AppContextInterface {
    count: number;
    increase: () => void;
    decrease: () => void;
}

export const AppContext = createContext<AppContextInterface | null>(null)

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
    const [count, setCount] = useState(0)

    const increase = () => {
        setCount(count + 1)
    }

    const decrease = () => {
        setCount(count - 1)
    }

    return (
        <AppContext.Provider value={{ count, increase, decrease }}>
            {children}
        </AppContext.Provider>
    )
}
```
**Explicación del código:**
- **Interfaz** `AppContextInterface`: Define la estructura del contexto, que incluye un contador y funciones para aumentar y disminuir el contador.
- **AppContext**: Crea el contexto utilizando `createContext` y establece un valor inicial de `null`.
- **AppProvider**: Componente que utiliza el contexto. Mantiene el estado del contador y proporciona funciones para modificarlo. Envuelve a sus hijos con el `AppContext.Provider`, permitiendo que los componentes hijos accedan al contexto.

7. Crear la pantalla que consume el contexto. Verificar que se encuentre en la carpeta `src`. 

8. Crear una nueva carpeta `screens` dentro de `src`.

```bash
mkdir screens
```
```bash
cd screens
```
```bash
touch HomeScreen.tsx
```

9. Editar el archivo `HomeScreen.tsx` y agregar el siguiente código:

```tsx
/*
Crear una pantalla que muestre el valor del contador y botones para modificarlo
*/

import React, { useContext } from 'react'; // Importar React y useContext
import { View, Text, Button, StyleSheet } from 'react-native'; // Importar componentes de React Native
import { AppContext } from '../contexts/AppContext'; // Importar el contexto de la aplicación

const HomeScreen: React.FC = () => { // Definir el componente HomeScreen|
    const context = useContext(AppContext); // Obtener el contexto de la aplicación

    if (!context) {
        return <Text>Error: Contexto no disponible</Text>; // Manejar el caso en que el contexto no está disponible        
    }

    const { count, increase, decrease } = context; // Desestructurar el contexto

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Contador: {count}</Text> {/* Mostrar el valor del contador */}
            <Button title="Aumentar" onPress={increase} /> {/* Botón para aumentar el contador */}
            <Button title="Disminuir" onPress={decrease} /> {/* Botón para disminuir el contador */}
        </View>
    );
};

const styles = StyleSheet.create({ // Estilos para el componente
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
});

```

**Explicación del código:**
- **useContext**: Hook que permite acceder al contexto creado en `AppContext.tsx`.
- **Desestructuración**: Se extraen las propiedades `count`, `increase` y `decrease` del contexto.
- **Renderizado**: Se muestra el valor del contador y se crean botones para aumentar y disminuir el contador. Los botones llaman a las funciones `increase` y `decrease` al ser presionados.    

10. Editar el archivo `App.tsx` y agregar el siguiente código:

```tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppProvider } from './src/contexts/AppContext'
import HomeScreen from './src/screens/HomeScreen'

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </AppProvider>
  )
}
```

**Explicación del código:**
- **AppProvider**: Se envuelve el componente `HomeScreen` con el `AppProvider`, lo que permite que el contexto esté disponible en toda la aplicación.
- **NavigationContainer**: Se utiliza para envolver la aplicación y habilitar la navegación. En este caso, no se está utilizando navegación, pero es una buena práctica incluirlo si se planea agregar navegación en el futuro.

11. Ejecutar la aplicación.

```bash
npm run web
```