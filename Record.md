## TodoList
100
获取手机号

道明的阿里云服务器（部署）

1. 新的课程模块  “案例研习社”
2. （目的？）用户角色选择 --> 后台统计使用情况
3. 手机号码验证

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
获取我秀评论总数 --> 加服务的方式
1. 联调myshow/list token验证的问题（客户端反应其他服务正常，这个报401）

## 疑问
部署问题：
1. 方便查看服务器上的日志（json格式）
2. 神奇的引用问题： routes/myShow 引用 controller/myShow 无法引用的问题
3. 客户端翻页获取数据（又更新了n条数据，倒序获取数据有疑问？Set数组实现）
4. 测试（返回的数据不一，如何确认测试通过）
   测试管理（哪些需要运行？哪些不需要？）