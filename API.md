# backend-server 接口文档

## 目录：

[1、用户登录](#1用户登录)<br/>
[2、用户注册](#2用户注册)<br/>
[3、获取用户信息](#3获取用户信息)<br/>
?[4、更新用户信息](#4更新用户信息)<br/>
?[5、删除用户](#5删除用户)<br/>
[6、创建课程](#6创建课程)<br/>
[7、获取课程](#7获取课程)<br/>
[8、老师注册](#8老师注册)<br/>
[9、获取老师数据列表](#9获取老师数据列表)<br/>

[12、获取课程详情](#12获取课程详情)<br/>

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
[25、更新用户信息](#25更新用户信息)<br/>
[26、搜索课程](#26搜索课程)<br/>
?[27、搜索老师](#27搜索老师)<br/>
[28、获取课程发布总数](#28获取课程发布总数)<br/>

[30、创建我秀点赞](#30创建我秀点赞)<br/>
[31、取消我秀点赞](#31取消我秀点赞)<br/>


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
        "_id": "5c86032f689b0b1ce6fe8fd1",
        "nickName": "user1",
        "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
    }
}
```

### 6、创建课程

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
|courseType    |Y       |string   | 课程类型 |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）
courseType说明：（文档中的 courseType 都和这个说明一致）
    参数“1”: 每日音频
    参数“2”: Boss说
	参数“3”: 案例研习社

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "发布信息成功!"
}
  
```

### 7、获取课程

#### 请求URL：
```
http://47.75.8.64:3002/courseware/list
```

#### 示例：

```
http://47.75.8.64:3002/courseware/list?pageSize=2&pageNumber=1&courseType=1
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|nickName      |N       |string   | 用户昵称 |
|pageNumber    |Y       |string   | 第几页（默认值：1） |
|pageSize      |Y       |string   | 数量（默认值：100） |
|courseType    |Y       |string   | 课程类型 |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

返回数据注释：
用户是否已收藏：isCollected；评论数commentCount

```javascript
{
    "result": "success",
    "message": "获取数据成功！",
    "coursewares": [
        {
            "commentCount": 0,
            "isCollected": true,
            "dataStatus": "1",
            "_id": "5c9996a1f6fab0902082aefa",
            "author": {
                "id": "5c8744bdc71400367afd3ad7",
                "nickName": "明道老师",
                "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
            },
            "title": "测试1_浪漫的婚庆台词",
            "content": "吴京的《流浪地球》票房今年春节档成功位居榜首，上映20天，累计42.87亿，成为仅此于《战狼2》最高票房的亚军。对于吴京来说两部电影都是自己的心血，能否超越《战狼2》并不重要，重要的是能否给社会和观众带来价值。很显然，吴京是成功的。",
            "audioURL": "http://poaadnrl9.bkt.clouddn.com/image/test/1553081800504_纯音乐 - Canon In D Major (钢琴).mp3",
            "publishTime": "2019-02-1T02:34:00.000Z",
            "courseType": "1",
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

### 9、获取老师数据列表

#### 请求URL：
```
http://47.75.8.64:3002/user/teacherList
```

#### 示例：
```
http://47.75.8.64:3002/user/teacherList?teacherName=ad
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|teacherName      |N       |string   | 老师昵称 |
|Authorization    |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "获取老师列表成功!",
    "teachers": [
        {
            "_id": "5c943c644c0456481c19451a",
            "nickName": "Adam",
            "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK29uaZ1OibZO2MYEsia5XMOHCDwEj8LEd8dNBwiceCuH8oeRyxeEAW1OpNGmNHnnicISq2x8kTJ8LtyA/132"
        },
        {
            "_id": "5c988abe3efc6e7bfc1bde2e",
            "nickName": "ad_f8d",
            "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
        }
    ]
}
```


### 12、获取课程详情

#### 请求URL：
```
http://47.75.8.64:3002/courseware/info
```

#### 示例：

```
http://47.75.8.64:3002/courseware/info?courseId=5c944cff5f1e9851f59d41ba&courseType=1
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|courseId        |Y       |string   | 课程Id |
|courseType      |Y       |string   | 课程类型 |
|Authorization   |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

返回数据注释：
评论数：commentCount

```javascript
{
    "result": "success",
    "message": "获取课程成功!",
    "courseware": {
        "commentCount": 1,
        "collectCount": 1,
        "isCollected": true,
        "forwardCount": 0,
        "dataStatus": "1",
        "_id": "5c87606733da1e5a87b162ef",
        "pictures": [
            "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg",
        ],
        "author": {
            "id": "5c8744bdc71400367afd3ad7",
            "nickName": "李晨",
            "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
        },
        "title": "第3期 | Nodejs + Expressjs+ JWT，JWT使用",
        "content": "为什么要用研究JWT于是就用Nodejs 对JWT进行了实践.本文参照这篇文章实践的。",
        "audioURL": "http://47.75.8.64/audios/Tiffany Alvord - Baby I Love You.mp3",
        "publishTime": "2019-03-21T02:34:00.000Z",
        "__v": 0,
        "courseType": "1"
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
|pictures      |N       |string   | 图片列表 |
|content       |N       |string   | 文字内容 |
|location      |N       |string   | 位置信息 |
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
http://47.75.8.64:3002/myshow/list?pageSize=1&pageNumber=1&self=true
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|pageNumber    |Y      |string   | 第几页（默认值：1） |
|pageSize      |Y      |string   | 数量（默认值：100） |
|self          |N      |bool     | 标识是否是自己 |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

返回数据注释：
点赞数likeCount；用户是否已点赞：isLiked；评论数commentCount

```javascript
{
    "result": "success",
    "message": "获取数据成功！",
    "myShowList": [
        {
            "pictures": [
                "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
            ],
            "likeCount": 2,
            "isLiked": true,
            "commentCount": 2,
            "dataStatus": "1",
            "_id": "5c94d46804c629d82086cba5",
            "content": "吴京的《流浪地球》票房今年春节档成功位居榜首，上映20天，累计42.87亿，成为仅此于《战狼2》最高票房的亚军。对于吴京来说两部电影都是自己的心血，能否超越《战狼2》并不重要，重要的是能否给社会和观众带来价值。很显然，吴京是成功的。",
            "__v": 0,
            "user": {
                "_id": "5c86032f689b0b1ce6fe8fd1",
                "nickName": "林大大",
                "avatar": "avatarURL1"
            }
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
|courseId          |Y       |string   | 课程id |
|Authorization     |Y       |string   | token值 |
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
                    "nickName": "明道老师",
                    "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
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
http://47.75.8.64:3002/courseCollection?courseId=5c971dff588a3d5300f11297
```

#### 请求方式：
```
DELETE
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|courseId         |Y       |string   | 课程id |
|Authorization    |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "取消收藏成功！"
}
```

### 25、更新用户信息

#### 请求URL：
```
http://47.75.8.64:3002/user/info
```

#### 请求方式：
```
PUT
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|nickName    |N       |string   | 昵称 |
|avatar      |N       |string   | 头像URL |
|Authorization     |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "更新用户信息成功!",
    "user": {
        "gender": "x",
        "dataStatus": "1",
        "_id": "5c86032f689b0b1ce6fe8fd1",
        "name": "gh_sunwh",
        "password": "$2b$10$cnId5PbrjlOiYcO3v3lwH./mzguXnVEkf95FTsdsqNd4R70Lyo5Ju",
        "endLoginTime": "1234",
        "__v": 0,
        "isAdmin": true,
        "nickName": "user01",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2hfc3Vud2giLCJpYXQiOjE1NTMyNTY0NTIsImV4cCI6MTU1Mzg2MTI1Mn0.rvJ4K6ZmGY555h6wQwgHvT3IVRWPPmVzf6j2p7bjmGU",
        "role": "1234",
        "avatar": "avatarURL"
    }
}
```

### 26、搜索课程

#### 请求URL：
```
http://47.75.8.64:3002/courseware/search
```

#### 示例：
```
http://47.75.8.64:3002/courseware/search?keyword=Nodejs&pageSize=5&pageNumber=1
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|keyword       |Y       |string   | 搜索关键字 |
|pageNumber    |Y       |string   | 第几页（默认值：1） |
|pageSize      |Y       |string   | 数量（默认值：100） |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "获取数据成功！",
    "coursewares": [
        {
            "dataStatus": "1",
            "_id": "5c87606733da1e5a87b162ef",
            "pictures": [
                "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg",
                "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg",
                "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
            ],
            "author": {
                "id": "5c8744bdc71400367afd3ad7",
                "nickName": "李晨",
                "avatar": "http://47.75.8.64/images/upload_987b7bd76062b78fe18cf8f15f7f37db.jpeg"
            },
            "title": "第3期 | Nodejs + Expressjs+ JWT，JWT使用",
            "content": "为什么要用研究JWT呢，一次关于用户token传递到讨论中，研发部的同事提到 SpringCloud 的zuul网关中引入 JWT，底层服务进行无状态处理，来实现我们之前关于token 传递的技术需求。\n\nJWT(JSON Web Token),字面意思很好理解，就是Web的JSON令牌。一种通过Web可以安全传递JSON格式信息的机制。优势体量小，防串改，数据相对安全。可以用于客户端到服务器端重要用户数据保持，验证用户签名数据，也可以用于无状态服务的状态保持。（个人粗略理解），而我们项目要做的事情，就是用户登录后把用户当前操作的企业关系，以及用户id存储起来。通过网关将JWT解密后，有相关业务权限的API调用都是使用JWT中传递过来的参数进行权限校验。也可以参考JWT简介或者官方网站jwt.io\n\n本人对SpringCloud zuul 网关的认知还是有限，于是就用Nodejs 对JWT进行了实践.本文参照这篇文章实践的。",
            "audioURL": "http://47.75.8.64/audios/Tiffany Alvord - Baby I Love You.mp3",
            "publishTime": "2019-03-21T02:34:00.000Z",
            "__v": 0,
            "courseType": "1"
        }
    ]
}
```

### 28、获取课程发布总数

#### 请求URL：
```
http://47.75.8.64:3002/courseware/count
```

#### 示例：

```
http://47.75.8.64:3002/courseware/count&courseType=1
```

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|courseType      |Y       |string   | 课程类型 |
|Authorization      |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "获取数据成功！",
    "coursewareCount": 1
}
```


### 30、创建我秀点赞

#### 请求URL：
```
http://47.75.8.64:3002/myshowlike/create
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
    "message": "点赞成功!"
}
```

### 31、取消我秀点赞

#### 请求URL：
```
http://47.75.8.64:3002/myshowlike
```

#### 示例：

```
http://47.75.8.64:3002/myshowlike?myShowId=5c971dff588a3d5300f11297
```

#### 请求方式：
```
DELETE
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|myShowId       |Y       |string  | 我秀id |
|Authorization  |Y       |string   | token值 |
注：在请求Headers里面加上Authorization（客户端使用token实现访问服务端API）

#### 返回示例：

```javascript
{
    "result": "success",
    "message": "取消点赞成功！"
}
```
