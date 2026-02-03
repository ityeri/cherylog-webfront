import {BrowserRouter, Route, Routes} from "react-router";
import ViewerPage from "./pages/ViewerPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/viewer" element={<ViewerPage />}></Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App