import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import RootComponent from "./components/RootComponent";
import {post,get} from "./util/fetch";

class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            shopList: [],
        };
    }

    componentDidMount() {
        get('shopList').then(res => this.setState({shopList: res.data}))
        // const obj = {a: 1, b: 2, c: 3};
        // post('test', obj)
        //     .then(data => console.log(data)).catch(err => console.log(err))

    }

    shopList = (shop) => {
        return (
            <section key={shop.shopId} onClick={this.jumpto.bind(this, shop.shopId)}>
                {shop.img ? <img alt='店铺图片' src={shop.img}/> :
                    <img src={'../../empty_default.png'} alt={'店铺图片'}
                         style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#e8e8e8'}}/>
                }
                <div>
                    <h3>{shop.shopName}</h3>
                    <p>{shop.address}</p>
                </div>
            </section>
        )
    };
    jumpto = (id) => {
        window.location.href = `/${id}`;
    };

    render() {
        return (<div>
                <div className="App">
                    {/*<header className="App-header">*/}
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<h1 className="App-title">Welcome to App</h1>*/}
                    {/*</header>*/}
                    <img src={'../bannerAdmin.png'} style={{width: '100%', height: 'auto', marginBottom: '0.15rem'}}
                         alt={'banner'}/>
                    {this.state.shopList && this.state.shopList.map(v => this.shopList(v))}
                </div>
                <RootComponent/>
            </div>
        );
    }
}

export default App;
