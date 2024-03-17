import { useState, useEffect } from "react";
import "./App.css";
import Product from "./Product";
import mockdata from "./mockdata";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [products, setProduct] = useState(mockdata);
  const [theme, colorMode] = useMode();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://danny-213.github.io/product-dashboard/products");
    const data = await response.json();
    setProduct(data.products);
    console.log(data.products);
  };

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
              <Product products={products} />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
