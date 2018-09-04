import React, { Component } from 'react';
import AnnonceItem from './AnnonceItem';
import { getAnnonces } from '../../actions/annonceActions';
import { connect } from 'react-redux';
import Loading from '../Loading';
    
const margeItem = {
    margin: '38px'
}

export class Annonces extends Component {


    componentDidMount(){
        const urlParams = new URLSearchParams(this.props.location.search);
        const cat = urlParams.get('cat');

        this.props.getAnnonces(cat);
        
    }
    
    render(){
        let listAnnonce = this.props.annonces.map(annonce => (
            <div style={margeItem} className="row" key={annonce._id}>
                <AnnonceItem  annonce = {annonce}/>
            </div>
        ));
        
        return (
            <div className="annonces">
                {this.props.loading === true && (<Loading />)}
                <h3>Jobs </h3>

                {listAnnonce}
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        annonces: state.annonce.annonces,
        loading: state.annonce.loading
    }
)

export default connect(mapStateToProps, {getAnnonces})(Annonces);