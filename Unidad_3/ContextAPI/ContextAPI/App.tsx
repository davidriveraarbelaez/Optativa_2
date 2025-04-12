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
