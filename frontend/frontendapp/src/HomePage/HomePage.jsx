import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import {_} from 'underscore';
import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }


    render(){
        const { user, users } = this.props;
        let items = users.items || [];
        console.log("items",items);
        const divStyle = {
            padding: "50px"
        };
        const container = {
            "color":"#FFFFFF",
            "backgroundColor": "#FFFFFF",
            border:"2px #CACFD2 solid",
            "borderRadius":"4px",
            "marginTop":"50px",
            "height":"100px",
        }

        const navbarColor = {
            "color":"#FFFFFF",
            "backgroundColor": "#FFFFFF",
            border:"2px #CACFD2 solid",

        };
        const heading = {
            "color":"#17202A",
            "paddingLeft":"50px"
        };
        const description = {
            "color":"#566573",
            "paddingLeft":"50px"
        }
        return (
            <div style={divStyle}>
            <nav class="navbar navbar-default" style={navbarColor}>
                  <div class="container-fluid">
                     <div class="navbar-header">
                       <a class="navbar-brand" href="#">BlockCluster</a>
                     </div>
                  <ul class="nav navbar-nav">
                     <li class="active"><a href="/addFavourite">Add</a></li>
                  </ul>
                  </div>
            </nav>
                {items.map(function(name, index){
                      return <div key={ index } style={container}>
                               <h3 style={heading}>{name.repoName}</h3>
                               <p style={description}>{name.description}</p>

                    </div>

                })}

           </div>
        )
    }
}


function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };