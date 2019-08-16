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
const isSearched= (searchTerm) => (item) =>item.title.toLowerCase().includes(searchTerm.toLowerCase());


class  App extends Component {
	constructor(props){
		super(props)
		this.state ={
			list,
      searchTerm:"",
				}
	this.onDismiss = this.onDismiss.bind(this);
	this.onSearchChange =this.onSearchChange.bind(this);
	}

	onDismiss(id){

		const isNotId = (item) => item.objectId  !==id
		const updatedList = this.state.list.filter(isNotId)
		this.setState({list:updatedList});
	}
	onSearchChange(event){
		this.setState ({searchTerm : event.target.value});

	}
	render(){
		const {searchTerm,list} =this.state
  return (
    <div className="App">
		<form>
		//different injection of an event
<input type="text" onChange ={this.onSearchChange}/>
		</form>
	{this.state.list.filter(isSearched(this.state.searchTerm)).map(item => <div key ={item.objectId}><span><a href={item.url}>{item.title}</a></span>
	<span>{item.author}</span>
	<span>{item.num_comments}</span>
	<span>{item.points}</span>
	/*different injection of onDismiss Event*/
	<span><button onClick= {() => this.onDismiss(item.objectId)}>Dismiss</button></span>
	</div>)}
    </div>
  );
}
}

export default App;
