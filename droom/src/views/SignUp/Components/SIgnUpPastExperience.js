import React from "react"

class PastExperience extends React.Component
{
    constructor(props)
    {
        super(props);
        let data = props.getData();
        this.state =
        {
            past_experience: data.past_experience
        }
    }
    handleChange(e)
    {
        let arry = this.state.past_experience;
        let i = parseInt(e.target.id);
        arry[i] = 
        {
            ...arry[i],
            [e.target.name] : e.target.value
        }
        this.setState({past_experience: arry});
    }
    addItem()
    {
        if(!this.validateItem(this.state.past_experience[this.state.past_experience.length-1])) return
        let arry = this.state.past_experience;
        arry.push({name: "", title: "", description: ""})
        this.setState({past_experience: arry});
    }
    removeItem(i)
    {
        let arry = this.state.past_experience;
        arry.splice(i,1);
        if(arry.length === 0) arry.push({name: "", title: "", description: ""})
        this.setState({past_experience: arry});
    }
    validateItem(obj)
    {
        return obj.name !== "" && obj.title !== "" && obj.description !== ""
    }
    validate(cb)
    {
        
        let arry = this.state.past_experience;
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
            <div>PastExperience</div>
            <button onClick={()=>this.addItem()}>Add New Experience</button>
            <div>
                {this.state.past_experience.map((x,i) => 
                (
                <div key={i}>
                <input name="name"key={`1:${i}`} id={i} value={x.name} placeholder="Company..." onChange={(e)=>this.handleChange(e)}/>
                <input name="title" key={`2:${i}`} id={i} value={x.title} placeholder="Job Title..." onChange={(e)=>this.handleChange(e)}/>
                <input name="description" key={`3:${i}`} id={i} value={x.description} placeholder="Description..." onChange={(e)=>this.handleChange(e)}/>
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

export default PastExperience;