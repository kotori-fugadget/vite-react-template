import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./hooks/AuthContext"
import NoMatch from "./routes/NoMatch"
import PrivateRoute from "./routes/PrivateRoute"
import PublicRoute from "./routes/PublicRoute"
import SignIn from "./components/Views/SignIn"
import SignUp from "./components/Views/SignUp"
import Members from "./components/Views/Members"
import Home from "./components/Views/Home"
import { Suspense } from "react"
import { useWindowResize } from "./hooks/useWindowResize"
import NoRenderMobile from "./routes/NoRenderMobile"

const App: React.FunctionComponent = () => {
  const wsize = useWindowResize()[1]
  return (
    <Suspense fallback={<div><h3>Loading...</h3></div>}>
      <AuthProvider>    
        <div className='App'>
          <Routes>
            <Route>
              {wsize>=960 &&
              <>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<NoMatch />} />
                <Route path="/members" element={<PrivateRoute component={Members}/>}/>
                <Route path="/signin" element={<PublicRoute component={SignIn}/>}/>
                <Route path="/signup" element={<PublicRoute component={SignUp}/>}/>
              </>
              }
              {wsize<960 && 
              <>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<NoRenderMobile />} />
                </>
              }
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Suspense>
  )
}

export default App
