import React from 'react';
import API from '../Utils/API'
import Carousel from 'react-bootstrap/Carousel'
import './attributes/slide.css'


class slideShow extends React.Component {
    state = {

        filez: []

    }
    componentDidMount() {
        this.getPhotos();
    }
    getPhotos = () => {
        API.arePhotos().then(res => {
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
    render() {

        return (
            <div className="size">
               
                            <Carousel className="justify-content-md-center">
                            {this.state.filez.map(filez => {
                                        return (
                                            <Carousel.Item key={filez._id}>
                                               
                                                    <div>
                                                        <div>
                                                            <img src={`/api/image/${filez.filename}`} alt={filez._id}></img>
                                                        </div>
                                                        
                                                    </div>
                                                 
                                            </Carousel.Item>
                                        )
                                    })}
                            </Carousel>
                      
            </div>
  
        )
    }

}
export default slideShow