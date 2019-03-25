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
[12、获取音频课程详情](#12获取音频课程详情)<br/>
[13、获取Boss说课程详情](#13获取Boss说课程详情)<br/>
[14、发布我秀](#14发布我秀)<br/>
[15、获取我秀数据](#15获取我秀数据)<br/>
[16、创建我秀评论](#16创建我秀评论)<br/>
[17、获取我秀评论](#17获取我秀评论)<br/>
[18、删除我秀评论](#18删除我秀评论)<br/>
[19、创建课程评论](#19创建课程评论)<br/>
[20、获取课程评论](#20获取课程评论)<br/>
[21、删除课程评论](#21删除课程评论)<br/>
[22、创建课程收藏](#22创建课程收藏)<br/>
[23、获取课程收藏](#23获取课程收藏)<br/>
[24、取消课程收藏](#24取消课程收藏)<br/>

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
|publishTime   |Y       |string   | 发布时间 |
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
|pageNumber    |Y      |string   | 第几页（默认值：1） |
|pageSize      |Y       |string   | 数量（默认值：3） |
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
|videoPictures |N       |string   | 视频切片 |
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

### 11、获取Boss说课程

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
|pageNumber    |Y      |string   | 第几页（默认值：1） |
|pageSize      |Y       |string   | 数量（默认值：3） |
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

### 12、获取音频课程详情

#### 请求URL：
```
http://47.75.8.64:3002/courseware/info
```

#### 示例：

```
http://47.75.8.64:3002/courseware/info?courseId=5c944cff5f1e9851f59d41ba
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|courseId        |Y       |string   | 课程Id |
|Authorization   |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "获取课程成功!",
    "courseBoss": {
        "dataStatus": "1",
        "_id": "5c944cff5f1e9851f59d41ba",
        "author": {
            "id": "5c8744bdc71400367afd3ad7",
            "nickName": "明道老师"
        },
        "title": "测试_1",
        "videoURL": "videoURL",
        "cover": "coverPicture",
        "content": "吴京的《流浪地球》票房今年春节档成功位居榜首，上映20天，累计42.87亿，成为仅此于《战狼2》最高票房的亚军。对于吴京来说两部电影都是自己的心血，能否超越《战狼2》并不重要，重要的是能否给社会和观众带来价值。很显然，吴京是成功的。",
        "publishTime": "2019-03-2T02:34:00.000Z",
        "__v": 0
    }
}
```


### 13、获取Boss说课程详情

#### 请求URL：
```
http://47.75.8.64:3002/courseboss/info
```

#### 示例：

```
http://47.75.8.64:3002/courseboss/info?courseId=5c944cff5f1e9851f59d41ba
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|courseId        |Y       |string   | 课程Id |
|Authorization   |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "获取课程成功!",
    "courseBoss": {
        "dataStatus": "1",
        "_id": "5c944cff5f1e9851f59d41ba",
        "author": {
            "id": "5c8744bdc71400367afd3ad7",
            "nickName": "明道老师"
        },
        "title": "测试_1",
        "videoURL": "videoURL",
        "cover": "coverPicture",
        "content": "吴京的《流浪地球》票房今年春节档成功位居榜首，上映20天，累计42.87亿，成为仅此于《战狼2》最高票房的亚军。对于吴京来说两部电影都是自己的心血，能否超越《战狼2》并不重要，重要的是能否给社会和观众带来价值。很显然，吴京是成功的。",
        "publishTime": "2019-03-2T02:34:00.000Z",
        "__v": 0
    }
}
```


### 14、发布我秀

#### 请求URL：
```
http://47.75.8.64:3002/myshow/create
```

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|pictures     |N       |string   | 图片列表 |
|content      |N       |string   | 文字内容 |
|Authorization   |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "发布我秀成功!"
}
```

### 15、获取我秀数据

#### 请求URL：
```
http://47.75.8.64:3002/myshow/list
```

#### 示例：
```
http://47.75.8.64:3002/myshow/list?pageSize=1&pageNumber=1
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|pageNumber    |Y      |string   | 第几页（默认值：1） |
|pageSize      |Y       |string   | 数量（默认值：3） |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "获取数据成功！",
    "myshowList": [
        {
            "pictures": [
                "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
            ],
            "likeNumber": 0,
            "commentNumber": 0,
            "dataStatus": "1",
            "_id": "5c94d46804c629d82086cba5",
            "userId": "5c86032f689b0b1ce6fe8fd1",
            "content": "吴京的《流浪地球》票房今年春节档成功位居榜首，上映20天，累计42.87亿，成为仅此于《战狼2》最高票房的亚军。对于吴京来说两部电影都是自己的心血，能否超越《战狼2》并不重要，重要的是能否给社会和观众带来价值。很显然，吴京是成功的。",
            "__v": 0
        }
    ]
}

```

### 16、创建我秀评论

#### 请求URL：
```
http://47.75.8.64:3002/myshowcomment/create
```

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|myShowId      |Y       |string   | 我秀id |
|content       |Y       |string   | 内容 |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "评论成功!"
}
```

### 17、获取我秀评论

#### 请求URL：
```
http://47.75.8.64:3002/myshowcomment/list
```

#### 示例：

```
http://47.75.8.64:3002/myshowcomment/list?myShowId=5c94d46804c629d82086cba5&pageSize=3&pageNumber=1
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|myShowId      |N       |string   | 我秀id |
|pageNumber    |Y       |string   | 第几页（范围：大于1）|
|pageSize      |Y       |string   | 数量（范围：1～30） |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "获取数据成功！",
    "myShowCommentList": [
        {
            "dataStatus": "1",
            "_id": "5c971e04588a3d5300f11298",
            "user": {
                "_id": "5c86032f689b0b1ce6fe8fd1",
                "nickName": "光合",
                "avatar": "http://poaadnrl9.bkt.clouddn.com/image/test/1553047757769_17.jpg"
            },
            "myShowId": "5c94d46804c629d82086cba5",
            "content": "真棒！",
            "__v": 0
        }
    ]
}
```

### 18、删除我秀评论

#### 请求URL：
```
http://47.75.8.64:3002/myshowcomment
```

#### 示例：

```
http://47.75.8.64:3002/myshowcomment?commentId=5c971dff588a3d5300f11297
```

#### 请求方式：
```
DELETE
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|commentId      |Y       |string  | 评论id |
|Authorization  |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "删除成功！"
}
```

### 19、创建课程评论

#### 请求URL：
```
http://47.75.8.64:3002/courseComment/create
```

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|courseId      |Y       |string   | 课程id |
|content       |Y       |string   | 内容 |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "评论成功!"
}
```

### 20、获取课程评论

#### 请求URL：
```
http://47.75.8.64:3002/courseComment/list
```

#### 示例：

```
http://47.75.8.64:3002/courseComment/list?courseId=5c94d46804c629d82086cba5&pageSize=3&pageNumber=1
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|courseId      |N       |string   | 课程id |
|pageNumber    |Y       |string   | 第几页（范围：大于1）|
|pageSize      |Y       |string   | 数量（范围：1～30） |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "获取数据成功！",
    "courseCommentList": [
        {
            "dataStatus": "1",
            "_id": "5c9866fa6200876ea0ae2dab",
            "user": {
                "_id": "5c86032f689b0b1ce6fe8fd1",
                "nickName": "光合",
                "avatar": "http://poaadnrl9.bkt.clouddn.com/image/test/1553047757769_17.jpg"
            },
            "courseId": "5c9604134dc72c204aafadbc",
            "content": "测试_课程评论1",
            "__v": 0
        }
    ]
}
```

### 21、删除课程评论

#### 请求URL：
```
http://47.75.8.64:3002/courseComment
```

#### 示例：

```
http://47.75.8.64:3002/courseComment?commentId=5c971dff588a3d5300f11297
```

#### 请求方式：
```
DELETE
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|commentId      |Y       |string   | 评论id |
|Authorization  |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "删除成功！"
}
```

### 22、创建课程收藏

#### 请求URL：
```
http://47.75.8.64:3002/courseCollection/create
```

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|myShowId      |Y       |string   | 我秀id |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "收藏成功!"
}
```

### 23、获取课程收藏

#### 请求URL：
```
http://47.75.8.64:3002/courseCollection/list
```

#### 示例：

```
http://47.75.8.64:3002/courseCollection/list?userId=5c94d46804c629d82086cba5&pageSize=3&pageNumber=1
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userId      |N       |string   | 用户id |
|pageNumber    |Y       |string   | 第几页（范围：大于1）|
|pageSize      |Y       |string   | 数量（范围：1～30） |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "获取数据成功！",
    "courseCollectionList": [
        {
            "dataStatus": "1",
            "_id": "5c98775606fb82771993e575",
            "userId": "5c86032f689b0b1ce6fe8fd1",
            "course": {
                "dataStatus": "1",
                "_id": "5c9604134dc72c204aafadbc",
                "author": {
                    "id": "5c8744bdc71400367afd3ad7",
                    "nickName": "明道老师"
                },
                "title": "测试_1",
                "videoURL": "videoURL",
                "cover": "coverPicture",
                "content": "吴京的《流浪地球》票房今年春节档成功位居榜首，上映20天，累计42.87亿，成为仅此于《战狼2》最高票房的亚军。对于吴京来说两部电影都是自己的心血，能否超越《战狼2》并不重要，重要的是能否给社会和观众带来价值。很显然，吴京是成功的。",
                "publishTime": "2019-04-21T02:34:00.000Z",
                "courseType": "2",
                "__v": 0
            },
            "__v": 0
        }
    ]
}
```

### 24、取消课程收藏

#### 请求URL：
```
http://47.75.8.64:3002/courseCollection
```

#### 示例：

```
http://47.75.8.64:3002/courseCollection?collectionId=5c971dff588a3d5300f11297
```

#### 请求方式：
```
DELETE
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|collectionId      |Y       |string  | 收藏id |
|Authorization     |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "取消收藏成功！"
}
```
