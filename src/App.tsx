import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Viewer from "./pages/Viewer";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/viewer" element={<Viewer />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App