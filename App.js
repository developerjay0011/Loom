import React from 'react'
import { Provider } from 'react-redux'
import Navigation from './src/Navigation/Navigation'
import { store, persistor } from "./src/Redux/store"
import { PersistGate } from 'redux-persist/integration/react'
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
}

export default App