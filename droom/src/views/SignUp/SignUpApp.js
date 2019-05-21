import React from "react";
import {Redirect} from "react-router-dom";
import {register, updateInfo} from "../../actions"

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
        this.data = {
            userType: 0,
            seeker_id: -1,
            first_name: "",
            last_name: "",
            location: "",
            bio: "", 
            past_experience: [{company_name: "", job_title: "", description: ""}], 
            interests: [""], 
            niche: 0, 
            seen: false,
            timestamp: "" 
        }; //list of data we are collecting to send to the server when app finalizes
    this.view = [
        [ /*list of components to call for seekers*/
           <UserName getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <AccountType getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <About getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <PastExper getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <Hobbies getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <Interests getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>
        ],
        [ /*list of components to call for employers*/
            <UserName getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
            <AccountType getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
            <About getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>
        ] 
    ]
   
    }
    prevElement()
    {
        this.setState({...this.state, screenIndex: this.state > 1 ? this.state.screenIndex-1 : 0 })
    }
    nextElement()
    {
        this.setState({...this.state, screenIndex: this.state.screenIndex < this.view[this.data.userType].length-1 ? this.state.screenIndex+1 : -1 })
    }
    getIndex()
    {
        return this.state.screenIndex;
    }
    getData()
    {
        //console.log(this.data);
        return this.data;
    }
    setData(state)
    {
        this.data =
        {
            ...this.data,
            ...state
        }
    }
    render()
    {
        if(this.state.screenIndex < 0 )
        {
            //call some code here to start the data upload
            this.props.updateInfo(this.data, ()=>this.setState({...this.state, redirect : true}))
        }
        if(this.state.rederect) return <Redirect to={{pathname: "/protected"}} />
        return(
        <div>
            
            {this.view[this.data.userType][this.state.screenIndex]}
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

export default connect(mapStateToProps, {register,updateInfo})(SignUpApp)