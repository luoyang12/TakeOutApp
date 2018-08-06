import React from 'react';
import '../styles/_root.css';
import {NavLink} from 'react-router-dom';
class RootComponent extends React.Component {   
    constructor(props,context){
        super(props,context)

        this.state={
          
        }
    }
    
    render(){
        // console.log(this.props.children)
        return (
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className='footer'>
                <NavLink exact activeClassName={'selected'} to='/'>
                    <span className={'iconfont icon-shouye'}> </span>
                    <span>首页</span>
                </NavLink>
                <NavLink activeClassName={'selected'} to='/order'>
                    <span className={'iconfont icon-dingdan'}> </span>
                    <span>订单</span>
                </NavLink>
                <NavLink activeClassName={'selected'} to='/mine'>
                    <span className={'iconfont icon-wode'}> </span>
                    <span>我的</span>
                </NavLink>
            </div>
        )
    }
}
//定义默认属性


export default RootComponent