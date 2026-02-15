import {BrowserRouter, Route, Routes} from "react-router";
import ViewerPage from "./pages/ViewerPage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter>
                <Routes>
                    <Route path="/viewer" element={<ViewerPage />}></Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>

    )
}

export default App