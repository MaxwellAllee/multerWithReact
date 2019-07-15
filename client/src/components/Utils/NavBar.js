import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../pages/attributes/slidshowlogo.png'
import { NavLink } from 'react-router-dom'
import '../pages/attributes/nav.css'
class NavBar extends React.Component {
    state = {
        direct: false,
        whereToGo: ""
    }
    componentDidMount() {
        console.log("true")
    }
    change = () => {
        console.log(this.props)
    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home"><img width="75" src={logo} alt="Italian Trulli" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>


                    <NavLink activeStyle={{
                        fontWeight: "bold",
                        color: "white"
                    }}  exact to="/" className="linkStyle">
           
                            Slide Show
           
                    </NavLink>
                    <NavLink activeStyle={{
                        fontWeight: "bold",
                        color: "white"
                    }} to="/setup" className="linkStyle">Setup
                    </NavLink>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default NavBar