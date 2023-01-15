import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { useLocalTheme } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { FirestoreProvider } from "./contexts/FirestoreContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { PrivateRoute } from "./routes/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";
import { AuthenticatedRoute } from "./routes/AuthenticatedRoute";
import { PortfolioSetupRoute } from "./routes/PortfolioSetupRoute";
import CreatePortfolio from "./pages/CreatePortfolio";
import DesignPortfolio from "./pages/DesignPortfolio";
import Signup from "./pages/Signup";
import { StorageProvider } from "./contexts/StorageContext";
import { GoogleProvider } from "./contexts/GoogleContext";

function App() {
  const { localTheme } = useLocalTheme();
  return (
    <div className="App" id={localTheme}>
      <Router>
        <AuthProvider>
          <FirestoreProvider>
            <StorageProvider>
              <GoogleProvider>
                <Routes>
                  {/* Route only if user is logged in and portfolio is created */}
                  <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Dashboard />} />
                  </Route>
                  {/* Route only if user is logged in and portfolio is created */}
                  <Route path="/update-profile" element={<PrivateRoute />}>
                    <Route path="/update-profile" element={<UpdateProfile />} />
                  </Route>
                  {/* Route only if user is logged out */}
                  <Route path="/signup" element={<AuthenticatedRoute />}>
                    <Route path="/signup" element={<Signup />} />
                  </Route>
                  {/* Route only if user is logged out */}
                  <Route path="/login" element={<AuthenticatedRoute />}>
                    <Route path="/login" element={<Login />} />
                  </Route>
                  {/* Route only if user is logged out */}
                  <Route
                    path="/forgot-password"
                    element={<AuthenticatedRoute />}
                  >
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                  {/* Route only if user is loggen in and portfolio is not yet created */}
                  <Route
                    path="/create-portfolio"
                    element={<PortfolioSetupRoute />}
                  >
                    <Route
                      path="/create-portfolio"
                      element={<CreatePortfolio />}
                    />
                  </Route>
                  {/* Route only if user is logged in and portfolio is created */}
                  <Route path="/design-portfolio" element={<PrivateRoute />}>
                    <Route
                      path="/design-portfolio"
                      element={<DesignPortfolio />}
                    />
                  </Route>
                </Routes>
              </GoogleProvider>
            </StorageProvider>
          </FirestoreProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
