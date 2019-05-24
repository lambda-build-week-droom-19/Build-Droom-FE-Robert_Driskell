import React from "react";
import {Redirect} from "react-router-dom";
import {register, createProfile} from "../../actions"

import PastExper from "./Components/SIgnUpPastExperience"
import About from "./Components/SignUpAbout"
import AccountType from "./Components/SignUpAccountType"
import Hobbies from "./Components/SignUpHobbies"
import Interests from "./Components/SignUpJobInterests"
import UserName from "./Components/SignUpUserName"
import CompanyAbout from "./Components/SignUpCompanyAbout"
import CompanyBio from "./Components/SignUpCompanyBio"

import { connect } from 'react-redux';

class SignUpApp extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state =
        {
            user_type: 0,
            screenIndex: 0 // is the screen we are on, this becomes -1 we will break and send the info
        }
        this.data = {
            user_type: 1,
            first_name: "",
            company_name: "",
            last_name: "",
            location: "",
            bio: "",
            past_experience: [{name: "", title: "", description: ""}], 
            interests: [""],
            niche: 0,
            seen: false,
            timestamp: "" 
        }; //list of data we are collecting to send to the server when app finalizes
    this.view = [
        [ /*list of components to call for employers*/
            <UserName getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
            <CompanyAbout getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
            <CompanyBio getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>
        ],
        [ /*list of components to call for seekers*/
           <UserName getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <AccountType getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <About getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <PastExper getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <Hobbies getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>,
           <Interests getData={()=>this.getData()} setData={(s) => this.setData(s)} index={()=>this.getIndex()} next={()=>this.nextElement()} prev={()=>this.prevElement()}/>
        ]
       
    ]
   
    }
    prevElement()
    {
        this.setState({...this.state, screenIndex: this.state.screenIndex > 1 ? this.state.screenIndex - 1 : 0 })
    }
    nextElement()
    {
        this.setState({...this.state, screenIndex: this.state.screenIndex < this.view[this.data.user_type].length-1 ? this.state.screenIndex+1 : -1 })
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
            this.data.user_id = parseInt(localStorage.getItem('userID'));
            this.data.timestamp = Date.now();
            let obj = {}
            if(this.data.user_type === 1) 
            obj = {
                first_name: this.data.first_name, 
                last_name: this.data.last_name,
                position: "",
                location: this.data.location, 
                bio: this.data.bio,
                job_type: "",
                contact_info: {
                    phone_number: "",
                    email: ""
                },
                interests: this.data.interests,
                past_experience: this.data.past_experience,
                education: [],
                skills: this.data.interests,
                references: [],
                social_media: {
                    facebook: "",
                    linkedIn: "",
                    twitter: "",
                    github: ""
                },
                portfolio: "",
                resume: "",
                niche: this.data.niches[0],
                seen: [],
                timestamp: Date.now()
            };
            else 
            obj =
            {
                name: this.data.company_name,
                location: this.data.location,
                about: this.data.bio,
                contact_info: {
                    phone: "",
                    email: " "
                },
                social_media: {
                    facebook: "",
                    linkedIn: "",
                    twitter: "",
                    github: ""
                },
                website: ""
            }
            this.props.createProfile( obj, this.data.user_type, ()=>this.props.history.push({pathname: "/protected"}))
        }
        if(this.state.rederect) return <Redirect to={{pathname: "/protected"}} />
        return(
        <div>
            
            {this.view[this.data.user_type][this.state.screenIndex]}
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

export default connect(mapStateToProps, {register,createProfile})(SignUpApp)