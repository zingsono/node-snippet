# 文件系统

文件管理系统功能：

1. 文件上传
2. 文件下载
3. 文件分布式存储


Mongodb存储文件映射关系    
id   
bucket      
path   
createdAt


前端访问： http://msd.static.umq.cn/{bucket}/{id}   自动根据bucket判断是否验证权限,根据id获取图片真实路径    
前端访问： http://msd.static.umq.cn/{bucket}/{id}?sid=xxxxx   验证访问权限

前端上传文件： htttp://msd.static.umq.cn/upload/{bucket}
