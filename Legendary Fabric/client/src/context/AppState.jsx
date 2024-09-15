import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const url = "http://localhost:1000/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState()
  const [cart, setCart] = useState([])
  const [reload, setReaload] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [userOrder, setUserOrder] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });

      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile()
    };

    fetchProducts();
    userCart()
    getAddress()
    getUserOrder()
  }, [token, reload]);

  useEffect(() => {

    let lsToken = localStorage.getItem('token');

    if( lsToken ) {
      setIsAuthenticated(true)
      setToken(lsToken);
    }

  }, [])

  // register user
  const registerUser = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // console.log("registered: ", api);

    toast.success(api.data.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });

    return api.data;
  };

  // login user
  const loginUser = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    toast.success(api.data.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });

    // console.log("login ", api.data);

    setToken(api.data.token);
    setIsAuthenticated(true);

    localStorage.setItem("token", api.data.token);

    return api.data;
  };

  // logout user
  const logoutUser = () => {
    setIsAuthenticated(false); // reset
    setToken(" ");
    localStorage.removeItem("token");

    toast.success("Logout Successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  }

  // profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true,
    });
    setUser(api.data.user)

  };

  // add to cart
  const addToCart = async (productId, title, price, quantity, imgSrc) => {
    const api = await axios.post(`${url}/cart/add`,{productId, title, price, quantity, imgSrc}, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true,
    });
    setReaload(!reload)

    toast.success(api.data.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });

  };

  // user cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true,
    });
    setCart(api?.data?.cart)
  };

  //decrease quantity
  const decreaseQuantity = async ( productId, quantity ) => {
    const api = await axios.post(`${url}/cart/--quantity`,{productId, quantity}, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true,
    });
    setReaload(!reload)
    toast.success(api.data.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  };

  // remove from cart
  const removeFromCart = async ( productId ) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true,
    });
    setReaload(!reload)
    toast.success(api.data.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  };

  // clear cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true,
    });
    setReaload(!reload)
    toast.success(api.data.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  };

  // shipping Address
  const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
    const api = await axios.post(`${url}/address/add`,{fullName, address, city, state, country, pincode, phoneNumber}, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true,
    });
    setReaload(!reload)
    toast.success(api.data.message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });

    return api.data;
  };

  // get user Address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true,
    });

    setUserAddress(api.data.userAddress);
  };

  // get user order
  const getUserOrder = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true,
    });

    setUserOrder(api.data)
  };

  return (
    <AppContext.Provider
      value={{
        products,
        registerUser,
        loginUser,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        user,
        logoutUser,
        addToCart,
        cart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
