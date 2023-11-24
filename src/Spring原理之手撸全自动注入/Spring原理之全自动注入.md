
---
title: Spring原理之全自动注入
icon: fab fa-markdown
order: 2
category:
  - 使用指南
tag:
  - Markdown
---

# 				Spring原理之全自动注入

1、先写好我们需要注入进Ioc容器的类，例子（Jwt）：

```java
package com.itheima.myjwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Date;
import java.util.Map;


@Data
@ConfigurationProperties(prefix = "jwt")//向配置文件读取数据
public class MyJwt {
    private String key;
    private String algorithmName;

    public String createToken(Map<String,Object> map, Long time){
        String token = Jwts.builder()
                .setClaims(map)
                .signWith(SignatureAlgorithm.valueOf(algorithmName), key)
                .setExpiration(new Date(System.currentTimeMillis() + time))
                .compact();
        return token;
    }
    public Map<String,Object> parseToken(String token){
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }
}

```

2、编写我们的Configuration配置文件

```java
package com.itheima.myjwt;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfiguration {

    @Bean
    public MyJwt jwt(){
        return new MyJwt();
    }
}
```

3、找到我们工具类模块的resources目录，并创建META-INF夹，再在此文件夹下创建spring文件夹，最后在spring文件夹下创建org.springframework.boot.autoconfigure.AutoConfiguration.imports文件，此文件我们需要在这里面写上Configuration类的路径。

<img src="C:\Users\86151\Desktop\Snipaste_2023-11-24_20-39-23.png" style="zoom:50%;" />

​	

4、此时我们的Jwt JavaBeany已经完成了，当我们需要使用他时，要在使用它的模块的pom文件导入我们的jwtBean的坐标。（坐标在jwt模块的Pom文件中只需复制gav即可）

```xml
	<groupId>com.itheima</groupId>
    <artifactId>MyJwt</artifactId>
    <version>0.0.1-SNAPSHOT</version>
```

