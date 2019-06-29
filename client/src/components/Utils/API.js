import axios from "axios";

export default {
    arePhotos: function(){
    return axios.get("/api/getFiles")     
    },
    getThePhoto: function(name){
    return axios.get(`/api/image/${name}`)
    }
};