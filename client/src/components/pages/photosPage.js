import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./attributes/photoPage.css"
import API from '../Utils/API'
import ListGroup from 'react-bootstrap/ListGroup'

class photoPage extends React.Component {
    state = {
        filez: [],
        photoz: {}
    }
    componentDidMount() {
        this.getPhotos();
    }
    getPhotos = () => {
        API.arePhotos().then(res => {
            this.setState({ filez: res.data })
            this.photoGrabber()
        }
        )
    }
    photoGrabber =()=>{
        this.state.filez.forEach(photo => {
            if(photo.isImage){
                API.getThePhoto(photo.filename).then(
                    res=>{
                        this.setState({photoz : {[photo.filename]:res.data }})
                    }
                )
            }
        });
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
                                <Button type="button" onClick={this.getPhotos} value="Submit">Submit</Button>
                            </form>
                            <hr />
                            {this.state.filez.length ? (
                                <ListGroup>
                                    {this.state.filez.map(filez => {
                                        return (
                                            <ListGroup.Item key={filez.id}>
                                                {filez.isImage ?(
                    
                                                   <img src={`/api/image/${filez.filename}`} alt={filez.id} height="42" width="42"></img>
                                                ):(
                                                    <source src="" type="video/mp4"></source>
                                                )}
                                            </ListGroup.Item>
                                        )
                                    })}

                                </ListGroup>
                            ) : (
                                    <ListGroup>

                                        <ListGroup.Item>
                                            <h1>No Files at this time!</h1>
                                        </ListGroup.Item>


                                    </ListGroup>
                                )}
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default photoPage