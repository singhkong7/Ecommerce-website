import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import firebase from 'firebase/app';
import 'firebase/remote-config';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';


const Header = ({ currentUser, hidden }) => {
  const [message,setMessage]=useState(null);
  const[image,setImage]=useState(require('../../assets/render0.jpg'));
  
  useEffect(() => {
    const fetchAndAct = async () => {
      try {
      await firebase.remoteConfig().fetchAndActivate();
      const newText = firebase.remoteConfig().getValue('homescreen_message').asString();
      const newImage =firebase.remoteConfig().getValue('header_image').asString();
      console.log(
       "NewText>>>>>>>>>>>>>>>",newImage 
      );
        setMessage(newText);
      } catch (error) {
        console.error('Error fetching and activating Remote Config:', error);
      }
    };
  
    fetchAndAct();
  }, []);
  return (
  <div className='header'>
   
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <h1>{message}</h1>
    <img src={image} alt="" className='image_header' style={{height:"auto",width:"10%"}}/>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
