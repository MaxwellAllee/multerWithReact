import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./attributes/photoPage.css"
import API from '../Utils/API'
class photoPage extends React.Component {
    state = {

    }
    getPhotos=()=>{
        API.arePhotos()
    }
    render() {
        return (
            <div className="color">
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col className="moreColor">
                            <h1 >Mongo File Uploads</h1>
                            <form encType="multipart/form-data">
                                <div>
                                    <input type="file" name="file" id="file" />
                                </div>
                                <Button type="button" onClick ={this.getPhotos}  value="Submit">Submit</Button>
                            </form>
                            <hr />
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }


}
export default photoPage