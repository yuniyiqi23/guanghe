# backend-server 接口文档

## 目录：

[1、用户登录](#1用户登录)<br/>
[2、用户注册](#2用户注册)<br/>
[3、获取用户信息](#3获取用户信息)<br/>
[4、上传音频课程](#4上传音频课程)<br/>
[5、获取音频课程](#5获取音频课程)<br/>

## 接口列表：

### 1、用户登录

#### 请求URL:  
```
http://47.75.8.64/user/signin
```

#### 请求方式: 
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|name      |Y       |string   | 用户名 |
|password      |Y       |string  | 密码 |

#### 返回示例：

```javascript
{
    "success": true,
    "message": "登录成功!",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2hfd2FuZ2p5IiwiaWF0IjoxNTUyMzgwMjQ3LCJleHAiOjE1NTIzODc0NDd9.oTO7lNPwjwkpC0jecwvvGFMK59jnRL3D5e9UCnR-QuE",
    "name": "gh_wangjy"
}
```

### 2、用户注册

#### 请求URL：
```
http://47.75.8.64/user/signup
```

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|name      |Y       |string   | 用户名 |
|password      |Y       |string  | 密码 |

#### 返回示例：

```javascript
{
    "success": true,
    "message": "成功创建新用户!"
}
```

