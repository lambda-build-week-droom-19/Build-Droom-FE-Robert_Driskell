import React from "react"

class Hobbies extends React.Component
{

    constructor(props)
    {
        super(props);
        let data = props.getData();
        this.state =
        {
            interests: data.interests
        }
    }
    handleChange(e)
    {
        let arry = this.state.interests;
        let i = parseInt(e.target.id);
        arry[i] = e.target.value;
        this.setState({interests: arry});
    }
    addItem()
    {
        if(!this.validateItem(this.state.interests[this.state.interests.length-1])) return
        let arry = this.state.interests;
        arry.push("")
        this.setState({interests: arry});
    }
    removeItem(i)
    {
        let arry = this.state.interests;
        arry.splice(i,1);
        if(arry.length === 0) arry.push("")
        this.setState({interests: arry});
    }
    validateItem(obj)
    {
        return obj !== "";
    }
    validate(cb)
    {
        
        let arry = this.state.interests;
        arry = arry.filter(x => this.validateItem(x));
        if(!arry.length) return;
        this.setState({past_exerience: arry});
        this.props.setData(this.state);
        cb();
    }
    render()
    {
        return (
        <div>
            <div>Hobbies</div>
            <button onClick={()=>this.addItem()}>Add New Hobby</button>
            <div>
                {this.state.interests.map((x,i) => 
                (
                <div key={i}>
                <input name="interests" id={i} key={i} value={x} placeholder="Interests..." onChange={(e)=>this.handleChange(e)}/>
                {<button key={`but:${i}`} style={{ margin: "-20px", background: "#00000000", border: "none"}} onClick={()=> this.removeItem(i)}>x</button>/*maybe add this later*/}
                </div>
                ))
                }
            </div>
            {this.props.index() !== 0 ? <button onClick={()=>{this.validate(this.props.prev)}}>Prev</button> : ""}
            <button onClick={()=>{this.validate(this.props.next)}}>Next</button>
        </div>
        )
    }
}

export default Hobbies;