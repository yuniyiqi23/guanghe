# backend-server 接口文档

## 目录：

[1、用户登录](#1用户登录)<br/>
[2、用户注册](#2用户注册)<br/>
[3、获取用户信息](#3获取用户信息)<br/>
?[4、更新用户信息](#4更新用户信息)<br/>
?[5、删除用户](#5删除用户)<br/>
[6、创建音频课程](#6创建音频课程)<br/>
[7、获取音频课程](#7获取音频课程)<br/>
[8、老师注册](#8老师注册)<br/>
[9、获取全部老师数据](#9获取全部老师数据)<br/>
[10、创建Boss说课程](#10创建Boss说课程)<br/>
[11、获取Boss说课程](#11获取Boss说课程)<br/>

## 接口列表：

### 1、用户登录

#### 请求URL:  
```
http://47.75.8.64:3002/user/signin
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
    "result": "success",
    "message": "登录成功!",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2hfd2FuZ2p5IiwiaWF0IjoxNTUyNTcwNzc0LCJleHAiOjE1NTI1Nzc5NzR9.-fKbIi6-hmMHnDPYN5VXYDOquX6w7jinhf5MgfPO30c",
    "name": "gh_wangjy"
}
```

### 2、用户注册

#### 请求URL：
```
http://47.75.8.64:3002/user/registerUser
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
    "result": "success",
    "message": "成功创建新用户!",
    "user": {
        "gender": "x",
        "isAdmin": false,
        "_id": "5c8a594bfdc0beca6d2dce93",
        "name": "adam",
        "password": "$2b$10$mUBI3i0W.2wYwPRj93OsCugpnu.TDjgbhzHdQNfWahrki7.J21z9W",
        "role": "33819",
        "endLoginTime": "2019-03-14 21:37",
        "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg",
        "__v": 0
    }
}
```

### 3、获取用户信息

#### 请求URL：
```
http://47.75.8.64:3002/user/info
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
    "result": "success",
    "message": "获取用户信息成功！",
    "user": {
        "gender": "x",
        "isAdmin": true,
        "_id": "5c8601759b2af91a39c2c788",
        "name": "gh_wangjy",
        "password": null,
        "role": "1234",
        "endLoginTime": "1234",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2hfd2FuZ2p5IiwiaWF0IjoxNTUyNTcwNzc0LCJleHAiOjE1NTI1Nzc5NzR9.-fKbIi6-hmMHnDPYN5VXYDOquX6w7jinhf5MgfPO30c",
        "nickName": "光合"
    }
}

```

### 6、创建音频课程

#### 请求URL：
```
http://47.75.8.64:3002/courseware/create
```

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|authorId      |Y       |string   | 用户id |
|nickName      |Y       |string   | 用户昵称 |
|avatar        |Y       |string   | 头像URL |
|title         |Y       |string   | 标题 |
|content       |Y       |string   | 内容 |
|audioURL      |N       |string   | 音频URL |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "发布信息成功!"
}
  
```

### 7、获取音频课程

#### 请求URL：
```
http://47.75.8.64:3002/courseware/list
```

#### 示例：

```
http://47.75.8.64:3002/courseware/list?pageSize=2&pageNumber=1
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|nickName      |N       |string   | 用户昵称 |
|pageNumber    |N       |string   | 第几页（默认值：1） |
|pageSize      |N       |string   | 数量（默认值：3） |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "获取数据成功！",
    "coursewares": [
        {
            "_id": "5c8a65b6d1cfd4dc392c17d6",
            "author": {
                "id": "5c8744bdc71400367afd3ad7",
                "nickName": "李晨",
                "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
            },
            "title": "浪漫的婚庆台词",
            "content": "吴京的《流浪地球》票房今年春节档成功位居榜首，上映20天，累计42.87亿，成为仅此于《战狼2》最高票房的亚军。对于吴京来说两部电影都是自己的心血，能否超越《战狼2》并不重要，重要的是能否给社会和观众带来价值。很显然，吴京是成功的。",
            "publishTime": "2019-03-14 22:31",
            "__v": 0
        },
        {
            "_id": "5c8a2e6b4bea099f8cd0f291",
            "author": {
                "id": "5c8744bdc71400367afd3ad7",
                "nickName": "李晨",
                "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
            },
            "title": "浪漫的婚庆台词",
            "content": "吴京的《流浪地球》票房今年春节档成功位居榜首，上映20天，累计42.87亿，成为仅此于《战狼2》最高票房的亚军。对于吴京来说两部电影都是自己的心血，能否超越《战狼2》并不重要，重要的是能否给社会和观众带来价值。很显然，吴京是成功的。",
            "publishTime": "2019-03-14 18:35",
            "__v": 0
        }
    ]
}

```

### 8、老师注册

#### 请求URL：
```
http://47.75.8.64:3002/user/registerTeacher
```

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|nickName      |Y       |string  | 昵称 |
|name          |Y       |string  | 用户名 |
|password      |N       |string  | 密码 |
|avatar        |N       |string  | 头像URL |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "成功创建新用户!",
    "user": {
        "gender": "x",
        "isAdmin": false,
        "_id": "5c8f30320e1073c5c37b15f8",
        "nickName": "明道老师1",
        "name": "gh_mingdao",
        "password": "$2a$10$x6uyDBRhPwWmSjQmSx8WpuqXidLV58aBNuRL5WRI9.Q5oYMTuF47K",
        "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg",
        "checkCode": "15637",
        "role": "6",
        "endLoginTime": "2019-03-18 13:44:13",
        "__v": 0
    }
}
```

### 9、获取全部老师数据

#### 请求URL：
```
http://47.75.8.64:3002/user/teacherList
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
    "result": "success",
    "message": "获取老师列表成功!",
    "teachers": [
        {
            "gender": "x",
            "isAdmin": false,
            "_id": "5c8e5bb3a47c444a88b98f12",
            "nickName": "明道老师",
            "name": "gh_mingd",
            "password": "$2a$10$rpm.bMhXl585gFgdWERT3uCwQ4pM1r4klQ8gYoqaXSiMrjUEZz8WO",
            "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg",
            "checkCode": "77474",
            "role": "6",
            "endLoginTime": "2019-03-17 22:37:39",
            "__v": 0
        },
        {
            "gender": "x",
            "isAdmin": false,
            "_id": "5c8f30320e1073c5c37b15f8",
            "nickName": "明道老师1",
            "name": "gh_mingdao",
            "password": "$2a$10$x6uyDBRhPwWmSjQmSx8WpuqXidLV58aBNuRL5WRI9.Q5oYMTuF47K",
            "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg",
            "checkCode": "15637",
            "role": "6",
            "endLoginTime": "2019-03-18 13:44:13",
            "__v": 0
        }
    ]
}

```

### 10、创建Boss说课程

#### 请求URL：
```
http://47.75.8.64:3002/courseboss/create
```

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|authorId      |Y       |string   | 用户id |
|nickName      |Y       |string   | 用户昵称 |
|avatar        |Y       |string   | 头像URL |
|title         |Y       |string   | 标题 |
|content       |Y       |string   | 内容 |
|videoURL      |Y       |string   | 视频URL |
|cover         |Y       |string   | 封面 |
|videoPictures |N       |Array    | 视频切片 |
|publishTime   |Y       |string   | 发布时间 |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "发布信息成功!"
}
  
```

### 7、获取Boss说课程

#### 请求URL：
```
http://47.75.8.64:3002/courseboss/list
```

#### 示例：

```
http://47.75.8.64:3002/courseboss/list?pageSize=2&pageNumber=1
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|nickName      |N       |string   | 用户昵称 |
|pageNumber    |N       |string   | 第几页（默认值：1） |
|pageSize      |N       |string   | 数量（默认值：3） |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    {
    "result": "success",
    "message": "获取数据成功！",
    "courseBosss": [
        {
            "vodioPictures": [],
            "dataStatus": "1",
            "_id": "5c91a9d80cf71bd3ed36cc2e",
            "author": {
                "id": "5c8744bdc71400367afd3ad7",
                "nickName": "明道老师",
                "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
            },
            "title": "测试_浪漫的婚庆台词",
            "vodioURL": "vodioURL",
            "cover": "coverList",
            "content": "吴京的《流浪地球》票房今年春节档成功位居榜首，上映20天，累计42.87亿，成为仅此于《战狼2》最高票房的亚军。对于吴京来说两部电影都是自己的心血，能否超越《战狼2》并不重要，重要的是能否给社会和观众带来价值。很显然，吴京是成功的。",
            "publishTime": "2019-03-18 21:35:38",
            "__v": 0
        }
    ]
}

```
