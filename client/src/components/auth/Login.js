import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            socket: null
        }
    }

    

    componentWillReceiveProps(nextProps){

        let err = nextProps.errorMessage;
        if(err && err !== "")
            alert(nextProps.errorMessage);
    
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = (e) =>{
        e.preventDefault();

        this.props.loginUser({
            email: this.state.email,
            password: this.state.password
        })

    };



  render() {
      const { errorMessage } = this.props;
    return (
      <div className="login">

        <form onSubmit={this.onSubmit}>
            <Grid container spacing={24}>

                <Grid item xs={12} >
                    <FormControl >
                        <InputLabel  htmlFor="email">Email</InputLabel>
                        <Input id="email" type="email" name="email" onChange={this.onChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl >
                        <InputLabel htmlFor="password">Mot de passe</InputLabel>
                        <Input id="password" type="password" name="password"  onChange={this.onChange} />
                    </FormControl>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                    Connexion
                </Button>
            </Grid>
        </form>      
      </div>
    )
  }
}

const mapStateToProps = state => (
    {
    auth: state.auth,
    errorMessage: state.auth.errorMessage
});

export default connect(mapStateToProps, {loginUser})(Login)
