import { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import styles from './AuthPage.module.css'

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignin, setShowSignin] = useState(false)


  return (
    <main className={styles.AuthPage}>
      <h3 onClick={() => setShowSignin(!showSignin)}>Sign in</h3>
      {showSignin ?
        <div>
          <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
          {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
        </div> :
        null
      }

    </main>

    // <main className="AuthPage">
    //   <div>
    //         <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
    //   </div>
    //   {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
    // </main>
  );
}