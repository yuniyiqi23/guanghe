## TodoList
七牛域名到期时间：4月10号
域名：https://xcx.guanghe520.com

1. 手机号码短信验证
2. 评论课程和我秀逻辑判断（先判断有课程、我秀再评论）
3. 道明的阿里云服务器（部署）
4. 转发数统计接口
修改发布的课程
七牛上传token验证

查询前 pro 验证数据有效性
重构获取我秀、课程发布代码

2. 用户登录记录
创建用户验证用户名是否已存在
我秀点赞前判断是否已点赞
注册用户验证手机号码

Mongoose virtual methods的区别
1. 
2. 搜索课程(全文索引，中文支持不好)  
3. 记录课程（创建、修改）
   用户登录记录（每天一条记录）      
6. 部署服务端
7. mencache、Redis（用户信息缓存）
点赞过于频繁的处理方案
https://www.jianshu.com/p/f9e27a96da89
https://www.jb51.net/article/113210.htm


重构passport验证代码
开源项目数据设计
data migration


返回数据的状态码
开放跨域访问安全性问题
producion和development的区别
https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/


1. Restful API安全设计 https://github.com/shieldfy/API-Security-Checklist/blob/master/README-zh.md
2. Docker部署
职责区分
技术选型（至少两个方案）


## 光合


## 疑问
部署问题：
1. 方便查看服务器上的日志（json格式）
2. 神奇的引用问题： routes/myShow 引用 controller/myShow 无法引用的问题
3. 客户端翻页获取数据（又更新了n条数据，倒序获取数据有疑问？Set数组实现）
4. 测试should断言，先判断返回是否是“数组”，如何再判断其长度？
   