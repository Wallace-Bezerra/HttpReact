import { useEffect, useRef, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import "./App.css";
import Loading from "./components/loading/Loading";

function App() {
  const URL = "http://localhost:3000/products/";
  // const [products, setProducts] = useState([]);
  const { data: products, httpConfig, loading, error } = useFetch(URL);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(URL);
  //     const data = await response.json();
  //     console.log(data);
  //     setProducts(data);
  //   };
  //   fetchData();
  // }, []);

  // add de produtos
  const handleSubimit = async (e) => {
    e.preventDefault();
    console.log("Ola");
    const product = {
      name,
      price,
    };
    httpConfig(product, "POST");
    setName("");
    setPrice("");
    // console.log(product);
    //   const response = await fetch(URL, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(product),
    //   });
    //   const data = await response.json();

    //   setProducts((currentProducts) => [...currentProducts, data]);
    //   setName("");
    //   setPrice("");
    //   // console.log(data);
    // };
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <div className="main">
        {loading && (
          <>
            <Loading />
            <p>LOADING ...</p>
          </>
        )}
        {!error && (
          <ul className="products">
            {products &&
              products.map((product) => {
                return (
                  <li className="product" key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <button
                      className="btnDelete"
                      onClick={() => {
                        console.log(product.id);
                        httpConfig(product.id, "DELETE");
                      }}
                    >
                      Excluir
                    </button>
                  </li>
                );
              })}
          </ul>
        )}

        <div className="addProducts">
          <form onSubmit={handleSubimit}>
            <label>
              <span>Nome</span>
              <input
                type="text"
                value={name}
                name="nome"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label>
              <span>Preço</span>
              <input
                type="text"
                value={price}
                name="preco"
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </label>
            {loading && (
              <button type="submit" disabled={true}>
                Agurde
              </button>
            )}
            {!loading && <button type="submit">Enviar</button>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
