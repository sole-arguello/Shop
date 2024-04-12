import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./context/GlobalState";
import Header from "./components/header/Header";
import Pages from "./components/mainPages/Pages";
import './App.css'
function App() {

  return (
    <DataProvider>
      <Router>
      <div className="App">
        <Header />
        <Pages />
      </div > 
      </Router>
    </DataProvider>

  )
}

export default App
