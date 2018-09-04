import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

export class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            email: '',
            password: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.registerUser(this.state)
    }

  render() {
    return (
      <div className="register">
            <form onSubmit={this.onSubmit}>
                <Grid container space={25}>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel htmlFor="nom">Nom</InputLabel>
                            <Input type="text" name="nom" id="nom" label="Votre nom" s={12} onChange={this.onChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel htmlFor="prenom">Prenom</InputLabel>
                            <Input type="text" name="prenom" id="prenom" label="Votre prenom" s={12} onChange={this.onChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input type="email" name="email" id="email" label="Adresse email" s={12} onChange={this.onChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel htmlFor="password">Mot de passe </InputLabel>
                            <Input type="password" name="password" id="password" label="Mot de passe" s={12} onChange={this.onChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" color="secondary" s={10} >S'inscrire</Button>
                    </Grid>
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

export default connect(mapStateToProps, {registerUser})(Register);