import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const date = {
  fontSize: 11
}
const marge = {
  marginTop: '-18px'
}
const userInfos = {
  color: '#7B7B7B',
  fontSize: '12px',
  
}
const annonceItem = {
  background: 'rgb(255,255,255)',
  padding: 12,
  borderRadius: 5,
  border: '0.5px solid rgba(0,0,0,0.1)'
}
const description = {
  color: '#7B7B7B',
  fontSize: '12px',
  fontStyle: 'italic'
}

export class AnnonceItem extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  formatDate = (date) =>{
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Nouvembre', 'Décembre'];

   const day = date.getDate();
   const monthIndex = date.getMonth();
   const year = date.getFullYear();
   
   return year+'/'+(monthIndex + 1) +'/'+ (day + 1) + ' ' + date.getHours()+":"+date.getMinutes();
  }

  render(){
    const { annonce } = this.props;
    const user = annonce.user[0];
    return (
      <div style={annonceItem}>
        <div className="ui grid">
          <div className="row">
            <div className="sixteen column wide">
            <h4 className="ui header">
              <div className="content">
                <Link to={"/annonces/?id=" + annonce._id}>{ annonce.titre }</Link>
                <div style={date} className="sub header">{this.formatDate(new Date(annonce.date))}</div>
              </div>
            </h4>
            </div>
          </div>
        </div>
        <div style={marge} className="ui grid">
            <div className="row">
              <div className="sixteen wide column ui grid">
                <div className="two wide column">
                  <img className="ui avatar image" src={'/uploads/avatars/' + (user.avatar ? user.avatar : 'randomman.jpg')} />
                </div>
                <div className="ten wide column">
                  <div className="row">
                    <div className="sixteen wide column">
                      { user.nom + ' ' + user.prenom }
                    </div>
                  </div>
                  <div style={description} className="row sixteen wide column">
                    {/* Description de l'utilisateur */}
                    description ici 
                  </div>
                </div>
                
              </div>
            </div>
          </div>
      </div>
    );
  }
}
export default AnnonceItem;