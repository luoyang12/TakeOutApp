import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RootComponent from "./components/RootComponent";

class App extends Component {
  constructor(){
    super()
    this.state = {
      users: [],
        shoplist:[],
    };
  }
  componentDidMount(){
    fetch('api/shoplist', {method:'GET'}).then(res =>
        res.json().then(data=>{
          this.setState({shoplist:data.data});
        })
    )
  }
  shopList=(shop)=>{
    return (
        <section key={shop.shopId} onClick={this.jumpto.bind(this,shop.shopId)}>
            {shop.img?<img alt='店铺图片' src={shop.img}/>:
                <img src={'../../empty_default.png'} alt={'店铺图片'} style={{borderStyle:'solid',borderWidth:'1px',borderColor:'#e8e8e8'}}/>
            }
            <div>
                <h3>{shop.shopName}</h3>
                <p>{shop.address}</p>
            </div>
        </section>
    )
  };
  jumpto=(id)=>{
    window.location.href=`/${id}`;
  };
  fetchUsers=()=>{
    // return fetch('api/users', {accpet: "application/json"}).then(res => {return res.json().then(json => {this.setState({users: json})})})
      return fetch('api/users', {accpet: "application/json"}).then(res => res.json().then(data=>{this.setState({users:data.data})}))
    //   return fetch('api/shoplist', {method:'GET'}).then(res => res.json().then(data=>{this.setState({users:data.data})}))
  }
  render() {
    return (<div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to App</h1>
        </header>
        {/*<p className="App-intro" onClick={this.fetchUsers.bind(this)}>*/}
          {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*{this.state.users&&this.state.users.map((user, index) => {*/}
          {/*return (<h1 key={index}>{user.name}</h1>)*/}
        {/*})}*/}
        {this.state.shoplist&&this.state.shoplist.map(v=>this.shopList(v))}
      </div>
       <RootComponent/>
      </div>
    );
  }
}

export default App;
