import { Route, Routes } from 'react-router-dom'
import { Catalog } from './components/Catalog'
import { ProductDetails } from './components/ProductDetails'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Catalog />}></Route>
                <Route path='/products/:productId' element={<ProductDetails />}></Route>
            </Routes>
        </div>
    );
}

export default App;
