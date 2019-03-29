## 开发日志

### 知识积累

时间：2019-3-29
1. ObjectId 取出时间的方法
    const time =  new Date(parseInt(_id.toString().substring(0, 8), 16) * 1000)

2. Mongoose数据库操作前后都可以执行其他操作pro，post
   经验：查询课程列表使用post连表查询评论数、点赞数

### 遇到的问题
1. 控制发布版本日志输出级别