import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import CKEditor from 'react-ckeditor-component';
import { connect } from 'react-redux';
import { ajouterAnnonce, resetState } from '../../actions/annonceActions';
import { getCategories } from '../../actions/categoryActions';


export class AddAnnonce extends Component{
    constructor(props){
        super(props);

        this.state = {
            titre: '',
            description: '',
            images: [],
            category: ''
        }
    }
    componentDidMount(){
        this.props.getCategories();
    }
    componentWillReceiveProps(nextProps){
        
        if(nextProps.added && nextProps.added == true){
            {
                this.props.resetState();
                this.props.history.push('/');
                
            }
        }
    }


    onSubmit = (e) =>{
        e.preventDefault();
        let form = new FormData();
        form.append('annonce', JSON.stringify({
            titre: this.state.titre,
            description: this.state.description,
            user: this.props.user,
            category: this.state.category
        }));

        for (let i = 0; i < this.state.images.length; i++) {
            form.append('images', this.state.images[i]);
            
        }
        
        this.props.ajouterAnnonce(form);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onEditorChange = (e) => {
        this.setState({
            description: e.editor.getData()
        })
        
    }
    onImageChange = (e) => {
        this.setState({
            images: e.target.files
        })
        
    }
    handleChange = e => {
        this.setState({
            category: e.target.value,
            test: "CMON"
        });
        

        
    }
    
    render(){
        let catOptions;
        const categories = this.props.categories;

        if(categories)
        {
            catOptions = categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.catName}</option>
            ));
        }
        return (
            <div className="add-annonce">
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <Grid container>
                        <Grid item xs={12}>
                        <FormControl>
                            <InputLabel htmlFor="categories">Category</InputLabel>
                            <Select
                                native
                                value={this.state.age}
                                onChange={this.handleChange}
                                inputProps={{
                                    id: 'categories'
                                }}
                                >
                                <option value="-1" />
                                {catOptions}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel  htmlFor="titre">Titre</InputLabel>
                                <Input id="titre" type="text" name="titre" onChange ={this.onChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <CKEditor activeClass="p10" content={this.state.description} events= {{
                                    "change": this.onEditorChange
                                }} />
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <FormControl>
                                <input type="file" accept="images/*" name="images" multiple onChange = {this.onImageChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs = {12}>
                            <Button type="submit" color="primary">Confirmer</Button>
                        </Grid>
                    </Grid>
                    
                </form>
            
            </div>
            
        );
    }
}

const mapStateToProps = state => ({
    loading: state.annonce.loading,
    added: state.annonce.added,
    user: state.auth.user.id,
    categories: state.category.categories,
    
});


export default connect(mapStateToProps, {ajouterAnnonce, getCategories, resetState})(AddAnnonce);

