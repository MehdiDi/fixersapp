import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getCategories } from '../../actions/categoryActions'
import { getAnnonces } from '../../actions/annonceActions'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './CategoriesList.css'


export class CategoriesList extends Component{

    componentDidMount(){
        this.props.getCategories();
    }

    handleClick = (e) => {
        
        this.props.catChoice();
    }

    render(){
        
        return (
            <List id="catList" selection verticalAlign='middle'>
                {
                this.props.categories.map(cat => 
                    ( 
                        <List.Item>
                        <Image avatar src={'/uploads/categories/' + cat.img} />
                        <List.Content>
                          <Link to={'/?cat=' + cat._id} key={cat._id} onClick = {this.handleClick}>
                                <List.Header>{cat.catName}</List.Header>
                            </Link>

                        </List.Content>
                        </List.Item>
                )
            )}
            
            </ List>
        )
        }
}
const mapStateToProps = state => ({
    categories: state.category.categories
})
export default connect(mapStateToProps, { getCategories })(CategoriesList)