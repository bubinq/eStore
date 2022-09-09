import { Route, Routes } from 'react-router-dom'
import { Catalog } from './components/Catalog'
import { ProductDetails } from './components/ProductDetails'
import { CheckOut } from './components/CheckOut'
import { PrivateGuard } from './guards/PrivateGuard';
import { ErrorPage } from './components/ErrorPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Catalog />}></Route>
                <Route path='/products/:productId' element={<ProductDetails />}></Route>
                <Route element={<PrivateGuard />}>
                    <Route path='/checkout' element={<CheckOut />}></Route>
                </Route>
                <Route path='/error' element={<ErrorPage />}></Route>
            </Routes>
        </div>
    );
}

export default App;
