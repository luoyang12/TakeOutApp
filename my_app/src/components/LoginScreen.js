import React from 'react';
// import RootComponent from "./RootComponent";
import '../styles/_root.css';

//import {Link} from 'react-router-dom';
class LoginScreen extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: '',
            psd: '',
        }
    }

    login = () => {
        fetch('api/login', {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: 'name=' + this.state.name + '&password=' + this.state.psd
        }).then(res => res.json().then(result => {
                console.log(result.status);
                if (result.status === 2) {
                    alert('密码错误，请重试！');
                } else if (result.status === 1) {
                    localStorage.setItem("name", this.state.name);
                    localStorage.setItem('password', this.state.psd);
                    alert('登录成功！欢迎您！');
                    if (result.role === 0) {
                        window.location.href = '/admin';
                    } else {
                        window.location.href = '/';
                    }
                } else {
                    alert('用户名不存在！');
                }
            })
        )
    };

    render() {
        // console.log(this.props.children)
        return (
            <div>
                <div className='login'>
                    <h3>
                        <img src={'../../back.png'} alt={'返回'} onClick={() => {
                            window.history.go(-1)
                        }} style={{
                            position: 'absolute',
                            width: '0.3rem',
                            height: '0.3rem',
                            left: '0.05rem',
                            top: '0.05rem'
                        }}/>
                        登陆
                    </h3>
                    <section>
                        <p><label>账号：</label><input type={'text'} placeholder={'请输入手机号'} onChange={(e) => {
                            this.setState({name: e.target.value})
                        }}/></p>
                        <p><label>密码：</label><input type={'password'} onChange={(e) => {
                            this.setState({psd: e.target.value})
                        }}/></p>
                    </section>
                    <button onClick={this.login}>登陆</button>
                </div>
            </div>

        )
    }
}

//定义默认属性


export default LoginScreen
