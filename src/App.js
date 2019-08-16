import React,{Component} from 'react';
import logo from './logo.svg';
import hut from "./hut.png"
import './App.css';
const list = [
{
title:"React",
url : "https://react.org",
author: "Jordan Wale",
num_comments : 4,
points : 2,
objectId : 1
},
{
title: "Graphql",
url: "https://graphql.com",
author: "Mark Zuckerberg",
num_comments: 2,
points :5,
objectId: 2	
	
}
]
class  App extends Component {
	constructor(props){
		super(props)
		this.state ={
			list,
			image:"hut.png"
		}
	this.onDismiss = this.onDismiss.bind(this);	
	}
	
	onDismiss(id){
		
		const isNotId = (item) => item.objectId  !==id
		const updatedList = this.state.list.filter(isNotId)
		this.setState({list:updatedList});
	}
	render(){
  return (
    <div className="App">
	{this.state.list.map(item => <div key ={item.objectId}><span><a href={item.url}>{item.title}</a></span>
	<span>{item.author}</span>
	<span>{item.num_comments}</span>
	<span>{item.points}</span>
	<span><button onClick= {() => this.onDismiss(item.objectId)}>Dismiss</button></span>
	</div>)}
    </div>
  );
}
}

export default App;
