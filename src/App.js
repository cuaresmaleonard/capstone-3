  import "./App.css";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import {useState, useEffect} from "react";
  // import UserContext from './UserContext';
  

//screens
  import HomeScreen from "./screens/HomeScreen.js";
  import UserScreen from "./screens/UserScreen";
  import ProductScreen from "./screens/ProductScreen";
  import CartScreen from "./screens/CartScreen";
  import SideDrawer from "./components/SideDrawer";
  import Register from "./screens/Register";
  import Login from './screens/Login'
  import Logout from "./screens/Logout";
//components
import Navbar from "./components/Navbar"
import Backdrop from "./components/Backdrop";
import { UserProvider } from './UserContext'
import Footer from "./components/Footer";
import AdminDashboard from "./screens/AdminDashboard";

function App() {
  // const { user } = useContext(UserContext);
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });
  console.log(user)

  const unsetUser = () => {
    localStorage.clear()
  };

  useEffect(() => {
    console.log(user)
    // console.log(localStorage)
    fetch('https://evening-forest-87496.herokuapp.com/user/details',
    {
      method: "POST",
      header: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(user)
      if(typeof data._id !== 'undefined'){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        })
      } else {
        setUser({
          id: null,
          isAdmin: null,
        })
      }
    })
  }, [])

   const [sideToggle, setSideToggle] = useState(false)
  return (
    <UserProvider value={{user, setUser, unsetUser}}>
    <Router>
      <Navbar click={() => setSideToggle(true)}/>
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)}/>
      <Backdrop show={sideToggle} click={() => setSideToggle(false)}/>


      <main className="app">
        <Routes>
          <Route path="/profile" element={<UserScreen/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="logout" element={<Logout/>}/>
          <Route path="/products/:productId" element={<ProductScreen/>} />
          <Route path="/cart" element={<CartScreen/>} />
          </Routes>
      </main> 
      <Footer/>
    </Router>
    </UserProvider>
  );
}

export default App;
