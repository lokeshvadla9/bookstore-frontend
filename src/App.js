import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Header from './components/header'
import Footer from './components/footer'
import Login from './components/login'
import SignUp from './components/signup';
import FAQ from './components/faq';
import LocateStore from './components/locatestore';
import ForgotPassword from './components/forgotpassword';
import CustomerHome from './components/customerhome';
import AdminDashboard from './components/admindashboard/admindashboard';
import AddBook from './components/addbook/addbook';
import OrdersPage from './components/orderspage';
import Customers from './components/customers';
import Inventory from './components/inventory';
import Dashboard from './components/dashboard';
import BookDetail from './components/bookdetail';
import Checkout from './components/checkout';
import ContactUs from './components/contactus';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn}></Header>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/faq" element={<FAQ/>} />
        <Route exact path="/locatestore" element={<LocateStore/>}/>
        <Route exact path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route exact path="/customerhome" element={<CustomerHome/>} />
        <Route exact path="/admindashboard" element={<AdminDashboard/>} />
        <Route exact path="/addbook" element={<AddBook/>} />
        <Route exact path="/orderspage" element={<OrdersPage/>} />
        <Route exact path="/customers" element={<Customers/>} />
        <Route exact path="/inventory" element={<Inventory/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route exact path="/bookdetail/:id" element={<BookDetail/>}/>
        <Route exact path="/checkout" element={<Checkout/>} />
        <Route exact path="/contactus" element={<ContactUs/>}/>
      </Routes>
      <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
