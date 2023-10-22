import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout"

// pages
import Home from "./pages/Home"
import Characters from "./pages/Characters"
import Classes from "./pages/Characters/Classes"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <AppLayout>
            <Home />
          </AppLayout>
        } />
        <Route exact path="/characters" element={
          <AppLayout>
            <Characters />
          </AppLayout>
        } />
        <Route exact path="/characters/classes" element={
          <AppLayout>
            <Classes />
          </AppLayout>
        } />
        <Route path="*" element={
          <AppLayout>
            <NotFound />
          </AppLayout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
