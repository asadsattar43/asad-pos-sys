import { useState } from 'react'
import OrderForm from './components/OrderForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <OrderForm/>
    </>
  )
}

export default App
