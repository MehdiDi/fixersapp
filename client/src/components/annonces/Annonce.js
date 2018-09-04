import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showAnnonce, resetState, likeAnnonce, unlikeAnnonce} from '../../actions/annonceActions'
import { getOffers} from '../../actions/offerActions'
import NewOffer from './NewOffer'
import { Button, Feed } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export class Annonce extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      open: false,
      
    }
  }
  
  componentDidMount(){
    const urlParams = new URLSearchParams(this.props.location.search);
    const id = urlParams.get('id');
    this.setState({id});
    this.props.getOffers(id);
    this.props.showAnnonce(id);
    
  }
  
  componentWillUnmount(){
    this.props.resetState();
  }

  handleLikeClick = (e) => {
    if(e.target.className.indexOf('red') > -1) {
      this.props.unlikeAnnonce(this.state.id, this.props.user.id);
      e.target.classList.remove('red');
    }
    else {
        this.props.likeAnnonce(this.state.id, this.props.user.id);
        e.target.classList.add('red');

      }
    
  }
  handleModalOpen = () => {
    this.setState({ open: true });
  }

  handleModalClose= () => {
    this.setState({ open: false});
  }

  userOfferExists = (id, offers) => {
    
    for(var i = 0; i < offers.length; i++ ){
      if(offers[i].user[0]._id === id){
        
        return true;
      }
    }
    return false;
  }

  render() {

    const offerList = this.props.offers.map(offer => (
      <Feed key={offer._id}>
        <Feed.Event>
          <Feed.Label image='/images/avatar/small/joe.jpg' />
          <Feed.Content>
            <Feed.Summary>
              <a>{offer.user[0].nom} {offer.user[0].prenom} </a>a placé une offre de {offer.prix} DH
              <Feed.Date>il y a {Math.floor(((Math.abs(new Date(offer.date) - new Date()))/ 1000 ) / 60) } minutes </Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {offer.message}
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    ));
    
    const { annonce } = this.props;
    let formattedDate;
    if(annonce){
      const date = new Date(annonce.date);
      formattedDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "  "
        + date.getHours()+":"+date.getMinutes();
    }
    let infos = "";

    if(annonce.user)
      {
        infos = (
          <div>
          <div className="label">
          <img src="/images/wireframe/square-image.png" alt="cmon" />
        </div>
        <div className="content">
          <div className="date">
            { formattedDate }
          </div>
          <div className="summary">
            <a>{annonce.user.nom} {annonce.user.prenom}</a>
          </div>
          
          <div className="meta">
            <a className="like">
              <i className={"like icon " + (this.props.user && 
              this.props.annonce.likes.indexOf(this.props.user.id ) > -1 ? 'red': '')} 
                  onClick={this.handleLikeClick}></i>{annonce.likes.length}</a>
          </div>
        </div>
        {
          this.props.user.id !== annonce.user._id && 
          (<Button primary onClick={this.handleModalOpen}>
              {
                this.userOfferExists(this.props.user.id, this.props.offers) ? "Annuler l'offre" : "Envoyer une offre"
              }
            </Button>
          )
        }
        

          <NewOffer open={this.state.open} onclose={this.handleModalClose} 
            user={ this.props.user} annonce={ annonce } 
          />

        </div>
        )
      }
      

    return (
      <div className="annonce">
        <div className="ui grid">
          <div className="seven wide column">
              <h3 className="ui header centered">{annonce.titre}</h3>
              <div className="event">
                {infos}
            </div>
            <div className="ui divider"></div>
            <div>
              <span dangerouslySetInnerHTML={ {__html: annonce.description} } ></span>
            </div>
          </div>
        </div>
        {offerList}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  annonce: state.annonce.annonce,
  user: state.auth.user,
  offers: state.offer.offers
});

Annonce.propTypes = {
  offers: PropTypes.array.isRequired
};


export default connect(mapStateToProps, {showAnnonce, resetState, likeAnnonce, unlikeAnnonce, 
getOffers})(Annonce)
