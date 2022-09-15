import { Route, Routes } from 'react-router-dom'
import { Store } from './components/Store'
import { ProductDetails } from './components/ProductDetails'
import { PrivateGuard } from './guards/PrivateGuard';
import { ErrorPage } from './components/ErrorPage';
import { StripeContainer } from './components/StripeContainer';
import { SuccessPage } from './components/SuccessPage'
import { HomePage } from './components/HomePage'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path="/store" element={<Store />}></Route>
                <Route path='/products/:productId' element={<ProductDetails />}></Route>
                <Route element={<PrivateGuard />}>
                    <Route path='/checkout' element={<StripeContainer />}></Route>
                </Route>
                <Route path='/error' element={<ErrorPage />}></Route>
                <Route path='/success' element={<SuccessPage></SuccessPage>}></Route>
            </Routes>
        </div>
    );
}

export default App;
