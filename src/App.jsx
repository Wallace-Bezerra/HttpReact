import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/products/");
      const data = await response.json();
      console.log(data);
      setProducts(data)
    }
    fetchData();
  }, [])


  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <button onClick={() => { console.log("State products", products) }}>Clicar</button>
      <ul className='products'>
        {products.map((product) => {
          return (
            <li className='product' key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </li>
          )
        })}
      </ul>

    </div>
  )
}

export default App
