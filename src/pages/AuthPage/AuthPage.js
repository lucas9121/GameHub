import { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import styles from './AuthPage.module.css'

export default function AuthPage({ setUser, setShowSignin }) {
  const [showLogin, setShowLogin] = useState(true);


  return (
    <main className={styles.AuthPage}>
        <div>
          <div className={styles.Signin}>
            <h3 style={showLogin ? {border: 'solid rgb(0 123 255)'} : null} onClick={() => setShowLogin(true)}> LOG IN</h3>
            <h3 style={!showLogin ? {border: 'solid rgb(0 123 255)'} : null} onClick={() => setShowLogin(false)}>SIGN UP</h3>
          </div>
          {/* changes the div display */}
            {showLogin ? <LoginForm setUser={setUser} setShowSignin={setShowSignin} /> : <SignUpForm setUser={setUser} setShowSignin={setShowSignin} />}
        </div> 
    </main>
  )
}