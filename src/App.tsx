import { Route, Routes } from "react-router-dom"
import Home from "./routes/Home"

const App: React.FunctionComponent = () => {
  return (
    <div className='App'>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
