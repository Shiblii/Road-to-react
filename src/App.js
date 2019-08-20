import React, { Component } from 'react';
import './App.css';
import axios from "axios"
import {sortBy} from "lodash"
import classNames from "classnames";
;
const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE="page=";

const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

const Loading = () => <div> LOADING.....</div>;


const SORTS ={
  NONE: list => list,
  TITLE:list => sortBy(list,"title"),
  Author: list => sortBy(list,"author"),
  COMMENTS: list =>sortBy(list,"num_comments").reverse(),
  POINTS: list => sortBy(list,"points").reverse()
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
			searchKey:"",
      searchTerm: DEFAULT_QUERY,
			error:null,
      isLoading :false,

    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
		this.onSearchSubmit =this.onSearchSubmit.bind(this);
		this.fetchSearchTopStories =this.fetchSearchTopStories.bind(this);
		this.needToSearchTopStories =this.needToSearchTopStories.bind(this)

  }

needToSearchTopStories(searchTerm){
	return !this.state.results[searchTerm];
}

  setSearchTopStories(result) {
		const { hits, page } = result;
		const { searchKey,results} = this.state;
const oldHits = results && results[searchKey]
? results[searchKey].hits : [];
const updatedHits = [
   ...oldHits,
   ...hits
   ];
this.setState({
results: {...results,
	[searchKey]:{ hits: updatedHits, page }
},isLoading:false
});
  }

	fetchSearchTopStories(searchTerm, page = 0){
    this.setState({isLoading:true})
axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)

			.then(result => this.setSearchTopStories(result.data))
			.catch(error => this.setState({error:error}));


	}

  componentDidMount() {
    const { searchTerm } = this.state;
this.setState({searchKey:searchTerm});
this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

	onSearchSubmit(event){
const {searchTerm} =this.state;
this.setState({searchKey:searchTerm})
if(this.needToSearchTopStories(searchTerm)){
	this.fetchSearchTopStories(searchTerm)
}

event.preventDefault();
	}

  onDismiss(id) {
		const {searchKey,results} =this.state;
		const {hits,page}=results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({ results : {...results,[searchKey]:{hits:updatedHits,page} }});
  }


  render() {
    const {
      searchTerm,
      results,
      searchKey ,
      error,
      isLoading} = this.state;
const  page = (results && results[searchKey] &&results[searchKey].page) || 0
const list =( results && results[searchKey]&&results[searchKey].hits) || [];
if(error){
	return <p className="paragraph">failed to fetch</p>
}
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
							onSubmit ={this.onSearchSubmit}
          >
            Search me
          </Search>
        </div>
        { error ? <div className="interactions">
        <p>Something went wrong</p>
        </div>
        :
					 <Table
          list={list}

          onSort={this.onSort}

          onDismiss={this.onDismiss}
        />}
        <div className="interactions">
        <ButtonWithLoading
        isLoading  ={isLoading}
				 onClick={() =>this.fetchSearchTopStories(searchKey,page +1)}>More</ButtonWithLoading>

      </div>
      </div>
    );
  }
}
class Search  extends Component {
componentDidMount(){
  if(this.input){
    this.input.focus();
  }
}
  render (){
  const { value, onChange, children ,onSubmit} =this.props;

      return(
        <form onSubmit={onSubmit}>
       <input
          type="text"
          value={value}
          onChange={onChange}
          ref ={el => this.input =el}
        />
    		<button type="submit">
    		{children}
    		</button>
      </form>)
  }

}

class   Table extends Component{
  constructor(props){
    super(props)
    this.state ={
      sortKey:"NONE",
    isSortReverse:false
  };
  this.onSort =this.onSort.bind(this);
  }

  onSort(sortKey){
    const isSortReverse =this.state.sortKey ===sortKey && !this.state.isSortReverse;
    this.setState({sortKey,isSortReverse});
  }

  render(){
  const  {
    list,
    onDismiss,
  

  } = this.props;
const {
  sortKey,
    isSortReverse
} =this.state;
  const sortedList =SORTS[sortKey](list);
  const reversSortedList =isSortReverse
  ? sortedList.reverse()
  :sortedList;

    return(
      <div className="table">
      <div className ="table-header">
      <span style ={{width:"40%"}}>
      <Sort
      sortKey={"TITLE"}
      onSort={this.onSort}
      activeSortKey={sortKey}>

      TITLE
      </Sort>
      </span>

      <span style ={{width:"30%"}}>
      <Sort
      sortKey={"Author"}
      onSort={this.onSort}
        activeSortKey={sortKey}>

      Author
      </Sort>
      </span>

      <span style ={{width:"10%"}}>
      <Sort
      sortKey={"COMMENTS"}
      onSort={this.onSort}
      activeSortKey={sortKey}>

       Comments
      </Sort>
      </span>

      <span style ={{width:"10%"}}>
      <Sort
      sortKey={"POINTS"}
      onSort= {this.onSort}
      activeSortKey={sortKey}>
      Points
      </Sort>
      </span>

      <span style ={{width:"10%"}}>
    Archive
</span>
      </div>

        {reversSortedList.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>
              {item.author}
            </span>
            <span style={smallColumn}>
              {item.num_comments}
            </span>
            <span style={smallColumn}>
              {item.points}
            </span>
            <span style={smallColumn}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>
          </div>
        )}
      </div>

);
}
}












const Button = ({
  onClick,
  className = '',
  children,
}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>


const Sort =({sortKey,onSort,children,activeSortKey})=>{
  const sortClass =classNames("button-inline",{"button-active":sortKey ===activeSortKey});

  return(
  <Button
  onClick={()=> onSort(sortKey)}
  className={sortClass}  >
   {children}
   </Button>
 );
}
 const withLoading = (Component) => ({isLoading,...rest}) => isLoading ? <Loading/> :<Component {...rest}/>
const ButtonWithLoading = withLoading(Button);
export default App;
export {Button,Search,Table};
