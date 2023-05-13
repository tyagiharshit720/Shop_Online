import React,{useEffect, useState} from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus,FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Cookies from 'js-cookie'
const CartButton = () => {
  const { closeSidebar } = useProductsContext()
  const { total_items, clearCart } = useCartContext()
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [authState, setAuthState] = useState('Login');
  const [token, setToken] = useState('');
  const [myUser, setMyUser] = useState();

  const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});
  
  const handleAuth = async() => {
    if (authState === 'Login') {
      try {
        const resp = await customFetch.post('/auth/login', { email, password });
        window.localStorage.setItem('user', resp.data.user);
        setMyUser(resp.data.user);
        return setShowLoginModal(false);
        // return resp.data;
      } catch (error) {
        return
  }
    } else {
      try {
        const resp = await customFetch.post('/auth/register', {name, email, password});
        console.log(resp.data);
        setMyUser(resp.data.user);
        window.localStorage.setItem(resp.data.user);
        return setShowLoginModal(false);
      }
      catch (error) {
        return
      }
    }
  }

  
  return (
    <>
      <Modal
        show={showLoginModal}
        onHide={()=>setShowLoginModal(false)}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {authState}
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
          {authState === "Signup" && <>
            <h5 style={{marginBottom:"0.5rem"}}>Name</h5>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%" ,height:"2.5rem",paddingLeft:"1rem" }}
              placeholder="e.g. John Doe"
            />
          </>
          }
          <h5 style={{marginTop:"1.5rem",marginBottom:"0.5rem"}}>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%" ,height:"2.5rem",paddingLeft:"1rem" }}
            placeholder="e.g. johndoe@gmail.com"
          />
          <h5 style={{marginTop:"1.5rem",marginBottom:"0.5rem"}}>Password</h5>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%",height:"2.5rem",paddingLeft:"1rem" }}
            placeholder="e.g. johndoe@9786mainacc"
          />
          <p style={{ marginTop: "1.5rem", cursor: "pointer" }} onClick={() => {
            if (authState === "Login") {
              setAuthState("Signup")
            } else {
              setAuthState("Login")
             }
          }}>Already Have an account?
            <span style={{ color: "brown", }}>
              {authState === "Login" ? "Sign Up" : "Login"}
            </span>
          </p>
        </Modal.Body>
        <Button style={{width:"50%",margin:"0rem auto 1rem auto"}} onClick={handleAuth}> {authState}</Button>
    </Modal>
    <Wrapper className='cart-btn-wrapper'>
      <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
        Cart
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
        </Link>
        {/* {myUser && <>
        <button
          type='button'
          className='auth-btn'
          onClick={() => {
            clearCart()
            localStorage.removeItem('user');
            setMyUser();
          }}
        >
          {myUser.name} <FaUser />
        </button>
        </>
        } */}
      {myUser ? (
        <button
          type='button'
          className='auth-btn'
          onClick={() => {
            clearCart()
            localStorage.removeItem('user');
            setMyUser();
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button type='button' className='auth-btn' onClick={()=>setShowLoginModal(true)}>
          Login <FaUserPlus />
        </button>
      )}
      </Wrapper>
      </>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButton
