import React,{Component} from 'react';
//import hut from "./hut.png"
//import './App.css';
const list = [
{
title:"React js",
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

const largeColumn = {
width: '40%',
};
const midColumn = {
width: '30%',
};
const smallColumn = {
width: '10%',
};
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
    <div className="page">
		<div className="interactions">
		<Search
value={searchTerm}
onChange ={this.onSearchChange}
		>Search</Search>
		</div>
		<Table
list ={list}
pattern ={searchTerm}
onDismiss ={this.onDismiss}
		/>


    </div>
  );
}
}
const Search = ({value,onChange,children}) =>{

		return (

			<form>
			//different injection of an event
			{children}
			<input type="text"
			value={value}
			onChange ={onChange}/>
			</form>

		)
	}

const Table = ({list,pattern,onDismiss}) => {

		return(
			<div className="table">
			{list.filter(isSearched(pattern)).map(item =>
				<div key ={item.objectId} className="table-row"><span style={largeColumn}>
				<a href={item.url} >{item.title}</a></span>
			<span style={midColumn}>{item.author}</span>
			<span style={smallColumn}>{item.num_comments}</span>
			<span style={smallColumn}>{item.points}</span>
			/*different injection of onDismiss Event*/
			<span style={smallColumn}><Button onClick= {() =>onDismiss(item.objectId)} className="button-inline">Dismiss</Button></span>
			</div>
		)
		}
			</div>
)
	}

const  Button  = ({onClick,children,className}) => {

	return(


<button
onClick={onClick}

className ={className}>{children}</button>


	)
}

export default App;
