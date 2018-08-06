import React from 'react';
import RootComponent from "./RootComponent";
import '../styles/_root.css';
//import {Link} from 'react-router-dom';
class MineComponent extends React.Component {
    constructor(props,context) {
        super(props, context);

        this.state = {
            logined:localStorage.getItem('name')!==null,
        }
    }
    //退出登录
    exit=()=>{
        localStorage.removeItem('name');
        localStorage.removeItem('password');
        this.setState({
            logined:localStorage.getItem('name')!==null
        })
    };
    render(){
        // console.log(this.props.children)
        const {logined}=this.state;
        return (
            <div>
                <div className='mine'>
                    <div className={'mine-header'}>
                        <header>我的</header>
                        <span> </span>
                        {!logined?<nav>
                            <a href={'/login'}>登陆</a>
                            <a href={'/register'}>注册</a>
                        </nav>:
                            <nav>欢迎您，{localStorage.getItem('name')}</nav>
                        }
                    </div>
                    <p className={'phone'}>客服电话：88888888</p>
                    <p>关于我们</p>
                    {logined&&<p className={'exit'} onClick={this.exit}>退出登录</p>}
                </div>
                <RootComponent/>
            </div>
        )
    }
}
//定义默认属性


export default MineComponent