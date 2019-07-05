import axios from "axios";

export default {
    arePhotos: function(){
    return axios.get("/api/getFiles")     
    },
    getThePhoto: function(name){
    return axios.get(`/api/image/${name}`)
    },
    deleted: function(ids){
        return axios.post(`api/files/delete/${ids}`)
    },
    upload: function(filez){
        const url = '/api/upload';
        const formData = new FormData();
        formData.append('file',filez)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config)
    }
};