import { Component } from "react";
import { signUp } from '../../utilities/users-service';
import * as cartsAPI from '../../utilities/carts-api'
import styles from './SignUpForm.module.css'
import Input from "../Input/Input";


export default class SignUpForm extends Component {
    state = {
      name: '',
      email: '',
      username: '',
      password: '',
      confirm: '',
      account: 'gamer',
      question1: "What is your mother's maiden name?",
      answer1: '',
      question2: "What is the name of your first pet?",
      answer2: '',
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
        if(user.account === 'gamer') await cartsAPI.checkCart(user._id)
        // closes sign in div
        this.props.setShowSignin(false)
        this.props.setActClk(false)
        this.props.setRefresh(!this.props.refresh)
      } catch(err) {
        this.setState({ error: 'Sign Up Failed - Try Again' });
        console.log(err)
      }
    };

    isStateEmpty = () => {
      // Create array of keys
      const fields = Object.keys(this.state);

      // Exclude 'error' and 'name' from the check
      const fieldsToCheck = fields.filter(field => field !== 'error' && field !== 'name');

      // Check if at least one field is empty or equal to an empty string
      const validator = fieldsToCheck.some(field => this.state[field] === '' || this.state[field].trim() === '');
      
      // If none of the fields are empty, check if password and confirm are the same
      if(!validator) return this.state.password !== this.state.confirm
      
      // Empty field, return tuthy
      return validator
    }
    
    
    render() {
      return (
        <div className={styles.SignUp}>
            <form autoComplete="off" className={styles.SignUpForm} onSubmit={this.handleSubmit}>
              <div className={styles.column}>
                <div className={styles.row}>
                  <div>
                    <label>First Name</label>
                    <Input type="text" name="fName" value={this.state.fName} onChange={this.handleChange} isRequired={true} />
                    {/* <input type="text" name="fName" value={this.state.fName} onChange={this.handleChange} required /> */}
                  </div>
                  <div>
                    <label>Last Name</label>
                    <Input type="text" name="lName" value={this.state.lName} onChange={this.handleChange} isRequired={true} />
                    {/* <input type="text" name="lName" value={this.state.lName} onChange={this.handleChange} required /> */}
                  </div>
                  <div>
                    <label>Username</label>
                     <Input type="text" name="username" value={this.state.username} maxLength='10' onChange={this.handleChange} isRequired={true}/>
                    {/* <input type="text" name="username" value={this.state.username} maxLength='10' onChange={this.handleChange} required /> */}
                  </div>
                </div>
                <div className={styles.row}>
                  <div>
                    <label>Email</label>
                     <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} isRequired={true}/>
                    {/* <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required /> */}
                  </div>
                  <div>
                    <label>Password</label>
                     <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} isRequired={true}/>
                    {/* <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required /> */}
                  </div>
                  <div>
                    <label>Confirm</label>
                     <Input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} isRequired={true}/>
                    {/* <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required /> */}
                  </div>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.row}>
                  <div>
                    <label>Security Question 1</label>
                      <select className={styles.questionSelect} name="question1" onChange={(evt) => {
                        this.setState({...this.state, question1: evt.target[evt.target.selectedIndex].value} )
                      }}>
                          <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                          <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                          <option value="What was your first car?">What was your first car?</option>
                          <option value="What elementary school did you attend?">What elementary school did you attend?</option>
                          <option value="What is the name of the town where you were born?">What is the name of the town where you were born?</option>
                          <option value="Where did you meet your spouse?">Where did you meet your spouse?</option>
                      </select>
                  </div>
                  <div>
                    <label>Answer 1</label>
                    <Input type="text" name="answer1" value={this.state.answer1} onChange={this.handleChange} isRequired={true}/>
                    {/* <input type="text" name="answer1" value={this.state.answer1} onChange={this.handleChange} required /> */}
                  </div>
                </div>
                <div className={styles.row}>
                  <div>
                    <label>Security Question 2</label>
                      <select className={styles.questionSelect} name="question2" onChange={(evt) => {
                        this.setState({...this.state, question2: evt.target[evt.target.selectedIndex].value} )
                      }}>
                          <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                          <option value="What was your first car?">What was your first car?</option>
                          <option value="What elementary school did you attend?">What elementary school did you attend?</option>
                          <option value="What is the name of the town where you were born?">What is the name of the town where you were born?</option>
                          <option value="Where did you meet your spouse?">Where did you meet your spouse?</option>
                          <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                      </select>
                  </div>
                  <div>
                    <label>Answer 2</label>
                     <Input type="text" name="answer2" value={this.state.answer2} onChange={this.handleChange} isRequired={true}/>
                    {/* <input type="text" name="answer2" value={this.state.answer2} onChange={this.handleChange} required /> */}
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
                      {/* <option value='admin'>Admin</option> */}
                  </select>
                  <button className="btn main-btn" type="submit" disabled={this.isStateEmpty()}>SIGN UP</button>
                  <p className="error-message">&nbsp;{this.state.error}</p>
                </div>
              </div>
            </form>
        </div>
      );
    }
}