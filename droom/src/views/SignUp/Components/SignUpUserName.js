import React from "react"
import {register} from "../../../actions"
import { connect } from 'react-redux';

class Username extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            credentials: {
                username: '',
                password: '',
                confirm: ''
            }
        };
        
    }
    componentDidMount()
    {
    }
    handleChange = e =>
    {
        this.setState({
            credentials: {
              ...this.state.credentials,
              [e.target.name]: e.target.value
            }
          });
    }
    authenticate(cb)
    {
        if(this.state.credentials==={} || this.state.credentials.password === "" || this.state.credentials.username === ""  ) return;
        if(this.state.credentials.password !== this.state.credentials.confirm) return;
        //this.props.register(this.state.credentials,cb);
        cb();
    }
    render()
    {
        //bypass
        //{this.props.next()}
        return (
        <div style={{margin: "0 auto", maxWidth:"200px"}}>
            <div className="signin-Input" style={{display: "flex", flexDirection: "column"}}>
                <input name="username" placeholder="User Name" onChange={this.handleChange}/>
                <input name="password" placeholder="Password" onChange={this.handleChange}/>
                <input name="confirm" placeholder="Comfirm" onChange={this.handleChange}/>
            </div> 
            {this.props.index() !== 0 ? <button onClick={()=>{this.authenticate(this.props.prev)}}>Prev</button> : ""}
            <button onClick={()=>{this.authenticate(this.props.next)}}>Next</button>
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

export default connect(mapStateToProps, {register})(Username)