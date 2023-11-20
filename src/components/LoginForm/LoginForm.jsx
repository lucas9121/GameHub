import { useState, useEffect } from 'react';
import * as usersService from '../../utilities/users-service';
import * as cartsAPI from '../../utilities/carts-api'
import styles from './LoginForm.module.css'
import Input from '../Input/Input';

export default function LoginForm({ setUser, setShowSignin, setActClk, refresh, setRefresh }) {
    const [credentials, setCredentials] = useState({
      email: '',
      password: ''
    });
    const [error, setError] = useState('');
    const [disable, setDisable] = useState(true)

    useEffect(() => {
      if(credentials.email !== '' && credentials.password !== '') return setDisable(false)
      setDisable(true)

    }, [credentials])

    function handleChange(evt) {
      setCredentials(currData => {return { ...currData, [evt.target.name]: evt.target.value }});
      setError('');
    }

    async function handleSubmit(evt) {
      evt.preventDefault();
      try {
        const user = await usersService.login(credentials);
        setUser(user);
        if(user.account === 'gamer') await cartsAPI.checkCart(user._id)
        // close the sign in div
        setShowSignin(false)
        setActClk(false)
        setRefresh(!refresh)
      } catch {
        setError('Log In Failed - Try Again');
      }
    }

    return (
      <div className={styles.Login}>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={styles.column}>
              <div className={styles.row}>
                <label>Email</label>
                <Input type="text" name="email" value={credentials.email} onChange={handleChange} required={true} style={{width: '250px'}} />
                {/* <input type="text" name="email" value={credentials.email} onChange={handleChange} required /> */}
              </div>
              <div className={styles.row}>
                <label>Password</label>
                <Input type="password" name="password" value={credentials.password} onChange={handleChange} required={true} style={{width: '250px'}} />
                {/* <input type="password" name="password" value={credentials.password} onChange={handleChange} required /> */}
              </div>
            </div>
            <div className={styles.message}>
              <button className='btn main-btn' type="submit" disabled={disable}>LOG IN</button>
              <p className="error-message">&nbsp;{error}</p>
            </div>
          </form>
        </div>
      </div>
    );
}