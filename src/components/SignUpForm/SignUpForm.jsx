import { Component } from "react";
import { signUp } from '../../utilities/users-service';
import styles from './SignUpForm.module.css'


export default class SignUpForm extends Component {
    state = {
      name: '',
      email: '',
      username: '',
      password: '',
      confirm: '',
      account: 'gamer',
      error: '',
      fName: "",
      lName: ''
    };


    handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value,
        error: ''
      });
    };

    
    handleSubmit = async (evt) => {
      evt.preventDefault();
      try {
        const formData = {...this.state};
        formData.name = formData.fName + ' ' + formData.lName;
        delete formData.confirm;
        delete formData.error;
        delete formData.fName;
        delete formData.lName;
        const user = await signUp(formData);
        this.props.setUser(user);
        // closes sign in div
        this.props.setShowSignin(false)
      } catch {
        this.setState({ error: 'Sign Up Failed - Try Again' });
      }
    };
    
    
    render() {
      const disable = this.state.password !== this.state.confirm;
      return (
        <div className={styles.SignUp}>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className={styles.row}>
                <div>
                  <label>First Name</label>
                  <input type="text" name="fName" value={this.state.fName} onChange={this.handleChange} required />
                </div>
                <div>
                  <label>Last Name</label>
                  <input type="text" name="lName" value={this.state.lName} onChange={this.handleChange} required />
                </div>
                <div>
                  <label>Username</label>
                  <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />
                </div>
              </div>
              <div className={styles.row}>
                <div>
                  <label>Email</label>
                  <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                </div>
                <div>
                  <label>Password</label>
                  <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                </div>
                <div>
                  <label>Confirm</label>
                  <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                </div>
              </div>
              <div className={styles.row}>
                <label>Account Type</label>
                <select name="account" onChange={(evt) => {
                  // options are elements in the select array. account is equal to the value of the clicked option
                    this.setState({...this.state, account: evt.target[evt.target.selectedIndex].value} )
                }}>
                    <option  value="gamer">Gamer</option>
                    <option value='developer'>Developer</option>
                    <option value='admin'>Admin</option>
                </select>
                <button className="btn main-btn" type="submit" disabled={disable}>SIGN UP</button>
              </div>
            </form>
          <p className="error-message">&nbsp;{this.state.error}</p>
        </div>
      );
    }
}