import React from "react";


class MainPage extends React.Component {
    state = {
        count: 0,
        started: false,
        clicked: "start"
        
    }
    test = () => {
         let start = () => {
             console.log("in start", this.state.started)
            if (this.state.started){
            setTimeout(() => {
                let holder = this.state.count + 1
                this.setState({ count: holder })
                start()
            }, 1000)}
        }
        if(!this.state.started){
            this.setState({started : true})
            setTimeout(()=>{
                start()
            },400)
            
            

        }
        else{
            this.setState({started : false})
        }
    }
    Money = () => {
        return this.state.count
    }
    render() {
        return (
            <div>
                <button onClick={this.test}>button</button>
                <h1>Hello... is it me? {this.Money()}</h1>
            </div>
        )
    }
}

export default MainPage