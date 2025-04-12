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

export default HomeScreen; // Exportar el componente HomeScreen