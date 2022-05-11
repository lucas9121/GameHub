import { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import styles from './AuthPage.module.css'

export default function AuthPage({ setUser, showSignin, setShowSignin }) {
  const [showLogin, setShowLogin] = useState(true);
  // const [showSignin, setShowSignin] = useState(false)


  return (
    <main className={styles.AuthPage}>
        <div>
          <div>
            <h3 onClick={() => setShowLogin(true)}> LOG IN</h3>
            <h3 onClick={() => setShowLogin(false)}>SIGN UP</h3>
          </div>
            {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
        </div> 
    </main>

    // <main className="AuthPage">
    //   <div>
    //         <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
    //   </div>
    //   {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
    // </main>
  );
}