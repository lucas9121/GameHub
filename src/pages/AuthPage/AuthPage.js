import { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import styles from './AuthPage.module.css'

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);


  return (
    <main className={styles.AuthPage}>
      <LoginForm setUser={setUser} />
      <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
    </main>

    // <main className="AuthPage">
    //   <div>
    //         <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
    //   </div>
    //   {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
    // </main>
  );
}