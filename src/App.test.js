import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import App, {Search,Table,Button}from './App';

describe("App", () => {
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
test("has a valid snapshot", () => {
  const component = renderer.create(<App/>);
  const tree= component.toJSON();
  expect(tree).toMatchSnapshot();
});
});

 describe ("Search",() =>
 {
   it("renders without crashing",() =>{
     const div =document.createElement("div");
     ReactDOM.render(<Search/>,div);
     ReactDOM.unmountComponentAtNode(div);
   })
   test("has a valid snapshot",() =>{
     const component =renderer.create(
       <Search></Search>
     );
     const tree=component.toJSON();
     expect(tree).toMatchSnapshot();
   })
 })

describe("Table",()=>{
  const props ={
    list :[
    { title:"1",author:"1",num_comments:1,points:2,objectID:"y"},
    {title:"2",author:"2",num_comments:1,points:1,objectID:"z"}
    ]
  }
  it("renders without crashing out",()=>{
    const div =document.createElement("div");
    ReactDOM.render(<Table {...props}/>,div);
  });
  test("has a valid snapshot",()=>{
    const component =renderer.create(<Table {...props}/>);
  })
})

describe("Button", ()=>{
  it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<Button/>,div);
  })
  test("has a valid snapshot",()=>{
    const component =renderer.create(<Button>Give me More</Button>);
    const tree=component.toJSON();
    expect(tree).toMatchSnapshot();
  });

})
