import axios from "axios";

export default {
    arePhotos: function(){
     axios.get("/api/getFiles").then(
        res=>{
            console.log(res.data)
        }
     )
       
    },
};