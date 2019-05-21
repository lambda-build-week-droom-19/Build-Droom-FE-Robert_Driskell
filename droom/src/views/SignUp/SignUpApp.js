import React from "react";
import {Redirect} from "react-router-dom";
import {register} from "../../actions"

import PastExper from "./Components/SIgnUpPastExperience"
import About from "./Components/SignUpAbout"
import AccountType from "./Components/SignUpAccountType"
import Hobbies from "./Components/SignUpHobbies"
import Interests from "./Components/SignUpJobInterests"
import UserName from "./Components/SignUpUserName" 

import { connect } from 'react-redux';

class SignUpApp extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state =
        {
            userType: 0,
            screenIndex: 0 // is the screen we are on, this becomes -1 we will break and send the info
        }
    this.view = [
        [ /*list of components to call for seekers*/
           <UserName data={this.data} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <AccountType data={this.data} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <Hobbies data={this.data} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <Interests data={this.data} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <About data={this.data} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <PastExper data={this.data} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>
        ],
        [ /*list of components to call for employers*/
            <div>employers hello</div>,
            <div>employers goodbye</div>
        ] 
    ]
    this.data = {}; //list of data we are collecting to send to the server when app finalizes
    }
    prevElement()
    {
        this.setState({...this.state, screenIndex: this.state > 1 ? this.state.screenIndex-1 : 0 })
    }
    nextElement()
    {
        this.setState({...this.state, screenIndex: this.state.screenIndex < this.view[this.state.userType].length-1 ? this.state.screenIndex+1 : -1 })
    }
    getIndex()
    {
        return this.state.screenIndex;
    }
    render()
    {
        if(this.state.screenIndex < 0 )
        {
            //call some code here to start the data upload
            return <Redirect to={{pathname: "/protected"}} />
        }
        return(
        <div>
            
            {this.view[this.state.userType][this.state.screenIndex]}
        </div>
        )
    }
}


const mapStateToProps = state => 
{
    return {
        ...state
    }
}

export default connect(mapStateToProps, {register})(SignUpApp)