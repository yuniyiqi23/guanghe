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

### 3、获取用户信息

#### 请求URL：
```
http://47.75.8.64/user/userInfo
```

#### 示例：


#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "gender": "x",
    "isAdmin": true,
    "_id": "5c8601759b2af91a39c2c788",
    "name": "gh_wangjy",
    "password": null,
    "identifyingCode": "1234",
    "endLoginTime": "1234",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2hfd2FuZ2p5IiwiaWF0IjoxNTUyNDQzMDA2LCJleHAiOjE1NTI0NTAyMDZ9.zCJRHa3dTaFpGgcPj7tLymENMOouzk2LG-R8WLZKYGg",
    "nickName": "光合"
}

```