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
            if(res.data.length){
            this.setState({ filez: res.data })}
            else{
                this.setState({filez:[]})
                console.log("no photos")
            }
        }
        )
    }
    submit =(e)=>{
        e.preventDefault()
        const file = document.getElementById("file").files[0]
        API.upload(file).then(res =>{
            this.refs.filez.value = '';
            this.getPhotos()

        })
       
    }
    deleted = (ids) => {
       
         API.deleted(ids).then(res=>{
            this.getPhotos()
         })
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
                                    <input type="file" name="file" id="file" ref="filez"/>
                                </div>
                                <Button type="button" onClick={this.submit} value="Submit">Submit</Button>
                            </form>
                            <hr />
                            {this.state.filez.length ? (
                                <ListGroup>
                                    {this.state.filez.map(filez => {
                                        return (
                                            <ListGroup.Item key={filez._id}>
                                                {filez.isImage ? (
                                                    <div>
                                                        <div>
                                                            <img src={`/api/image/${filez.filename}`} alt={filez._id} height="42" width="42"></img>
                                                        </div>
                                                        <Button variant="danger" onClick={() => { this.deleted(filez._id)} }>Danger</Button>
                                                    </div>
                                                ) : (
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