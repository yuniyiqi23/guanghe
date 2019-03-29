## TodoList
user验证用户名
评论课程和我秀逻辑判断（先判断有课程、我秀再评论）
修改发布的课程

Mongoose virtual methods的区别

1. Wechat登录接口openId
    域名http://xcx.guanghe520.com/
    阿里云HTTPS
    证书acme.sh自动创建
2.1 搜索课程(全文索引，中文支持不好)  
    收藏总数
3. 记录课程（创建、修改）
   用户登录记录（每天一条记录）
4. 我秀转发数量    
5. 重构七牛配置文件（routes/config.json），配置文件写到一起   
6. 部署服务端
7. mencache、Redis（用户信息缓存）
点赞过于频繁的处理方案
https://www.jianshu.com/p/f9e27a96da89
https://www.jb51.net/article/113210.htm


重构passport验证代码
开源项目数据设计
data migration

？删除返回的密码字段
返回数据的状态码
开放跨域访问安全性问题
producion和development的区别
https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/


1. Restful API安全设计 https://github.com/shieldfy/API-Security-Checklist/blob/master/README-zh.md
2. Docker部署
职责区分
技术选型（至少两个方案）


## 光合
1. 联调myshow/list token验证的问题（客户端反应其他服务正常，这个报401）


## 疑问
部署问题：
1. 方便查看服务器上的日志（json格式）

神奇的引用问题： routes/myShow 引用 controller/myShow 无法引用的问题