import React, {Component} from 'react'
import { connect } from 'react-redux'
import { logoutUser, getNotifications } from '../../actions/authActions'
import {Link} from 'react-router-dom'
import { Icon, Popup, Dropdown, List, Header } from 'semantic-ui-react'
import io from 'socket.io-client'
import './navbarStyle.css'
const iconStyle = {
  color: '#1678C2'
}

export class NavbarLayout extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: this.props.auth.user,
            isAuthenticated: this.props.auth.isAuthenticated,
            notifications: [],
            socket: io.connect("127.0.0.1:5000")
        }
    }

    componentDidMount(){
      if(this.state.isAuthenticated){
        this.props.getNotifications(this.state.user.id);
      }

    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.isAuthenticated){
          this.setState({
            user: nextProps.auth.user,
            isAuthenticated: nextProps.auth.isAuthenticated
          }, () => {

            this.state.socket.emit('loggedIn', this.state.user);
            
            this.state.socket.on('notify', data => {
            
            this.setState({
              notifications: [data, ...this.state.notifications]
            });

            });

          });
        }
        if(nextProps.notifications){
          this.setState({
            notifications: nextProps.notifications
          });
        }
    }
    
  handleItemClick = (e) => {
    const item = document.querySelector(".menu .active");
    
    if(item !== e.target){
      item.classList.remove('active');
      e.target.classList.add('active');
    }
  }
  logOut = () => {
    this.props.logoutUser();
  }
  render() {
    const {isAuthenticated, auth} = this.props;
    let notificationList; 
    let notifications;
    

    if(this.props.notifications !== null){

      notifications = this.state.notifications;
      
      notificationList = notifications.map(notification => (

        <List.Item key={notification._id}>
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a' >{ notification.message }</List.Header>
          </List.Content>
        </List.Item>
        
      ));
    }
    

    return (

      <div className="ui menu secondary">
        <div className="ui container">
        <Dropdown item icon='wrench' simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name='home' />
            <span >New</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
          <div className="left menu">

          <Link className="computer only item active" to={"/"} onClick={this.handleItemClick}>
            Accueil
          </Link>
          <Link className="computer only item" to={"/annonce/nouveau"} onClick={this.handleItemClick}>
            
            Créer une annonce
          </Link>
          
          </div>
          <div className="item brand">
            <h2 className="ui header"><Link to={"/"}>Bricoleur</Link></h2>
          </div>
          <div className="right menu">
            
            <a href="#" className="item circle">
              <Icon style={iconStyle} name="search"></Icon>
            </a>
            <Popup wide trigger = {<a href="#" className="item circle">
              <Icon style={iconStyle} name="bell outline" ></Icon></a>} on="click" >
              <List divided relaxed>
                <List.Header>
                  <Header as="h5">Notifications</Header>
                </List.Header>
                  { notificationList }
              </List>
            </Popup>
            <a href="#" className="item circle">
              <Icon style={iconStyle} name="envelope outline" ></Icon>
            </a>
            <Link to={"/login"} className="ui item ui primary basic button" onClick = {isAuthenticated ? this.logOut : () => {}}>
              {isAuthenticated ? "Logout" : "Login"}
            </Link>
          </div>
        </div>
      </div>
      );
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    notifications: state.auth.notifications
})

export default connect(mapStateToProps, {logoutUser, getNotifications})(NavbarLayout);
