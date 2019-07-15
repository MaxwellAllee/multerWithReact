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
        upload: [],
        photoz: {},
        isUploading: false,
        isEmpty: true

    }
    componentDidMount() {
        this.getPhotos();
    }
    getPhotos = () => {
        API.arePhotos().then(res => {
            document.getElementById("sub").style.visibility = "hidden"
            if (res.data.length) {
                this.setState({ filez: res.data })
            }
            else {
                this.setState({ filez: [] })
                console.log("no photos")
            }
        }
        )
    }
    handlFileChange = (event) => {
        document.getElementById("sub").style.visibility = "visible"
        this.setState({ upload: event.target.value })
        console.log(event.target.value)
        !this.state.upload.length ? this.setState({ isEmpty: false }) : console.log("nothing happening")
        console.log(this.state.isEmpty)
    }
    submit = (e) => {
        e.preventDefault()
        this.setState({ isUploading: true }, () => {
            const file = document.getElementById("file").files[0]
            API.upload(file).then(res => {
                setTimeout(() => {
                    this.setState({ isUploading: false, upload: "", isEmpty: true })
                    this.refs.filez.value = '';
                    console.log(this.state)
                    this.getPhotos()
                }, 1000)

            })
        })


    }
    deleted = (ids) => {

        API.deleted(ids).then(res => {
            this.getPhotos()
        })
    }

    render() {
        const { isUploading } = this.state;
        const { isEmpty } = this.state
        return (
            <div className="color">
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col className="moreColor">
                            <h1 >Mongo File Uploads</h1>

                            <form encType="multipart/form-data">
                                <label htmlFor="file">{isEmpty ? (<div className="inputBox">Select File</div>) : (
                                    this.state.upload.replace(/^.*\\/, "")
                                    // console.log(this.state.upload)
                                )}</label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    ref="filez"
                                    className="inputfile"
                                    onChange={this.handlFileChange}
                                />

                                <br />
                                <Button
                                    id="sub"
                                    variant="primary"
                                    disabled={isUploading || isEmpty}
                                    onClick={!isUploading ? this.submit : null}
                                >
                                    {isUploading ? 'Uploading…' : 'Upload'}
                                </Button>
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
                                                        <Button variant="danger" onClick={() => { this.deleted(filez._id) }}>Delete</Button>
                                                    </div>
                                                ) : (
                                                        <div>
                                                            <video width="320" height="240" controls key ={filez._id} >
                                                                <source src={`api/video/${filez.filename}`} type="video/mp4" />

                                                            </video>
                                                            <div>
                                                            <Button variant="danger" onClick={() => { this.deleted(filez._id) }}>Delete</Button>
                                                            </div>
                                                            
                                                        </div>
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