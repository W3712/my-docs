---
title: Maven高级
icon: fab fa-markdown
order: 2
category:
  - 使用指南
tag:
  - Markdown
---


# maven高级

1、分模块开发

分模块开发是指把相同的代码块提取出来，单独放到一个模块中。提取出来的代码块依赖的maven也要一并引入到新模块中，此时原来的模块需要使用我们提取出来的代码时需要导入新模块的gav（groupId,artifactId,version）即可。

2、maven的继承

实现maven的继承可以帮我们更好的管理依赖，我们需要创建一个只有pom.xml的文件，把他当作父类，需要给他设置打包方式为pom，使用

```xml
<packing>pom</packing>
```

实现，可以给父类设置parent属性，可以给上spring-fromwork的gav

```xml
<parent>
        <groupId>***</groupId>
        <artifactId>***</artifactId>
        <version>***</version>
    </parent>
```

子类的pom文件想要声明时父类的儿子时只需要加入parent标签，在里面加入父类的gav，

当继承关系实现后我们可以使用properties标签写入自定义版本，例：

```xml
<properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <spring-boot.version>2.7.6</spring-boot.version>
</properties>
```

注：里面的标签是我们自定义的可以随编写。

设定好版本后，我们可以使用dependencyManagement来管理子类依赖的版本，例如：

```xml
 <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

这里面写的gav不会影响到子类，只有v会被子类使用，${}被用来取properties里面的值。

3、maven的聚合

聚合可以帮我们管理和他聚合的模块的依赖，可以一键构建，安装，清理等。

聚合不分父子关系，我们可以直接让父子聚合，只需要在父标签中加入modules标签，例：

```xml
<modules>
        <module>../../pojo/tlias-pojo</module>
        <module>../../tlias-web-management</module>
</modules>
```

标签中写入被聚合模块的路径可以使用../来表示上一级（写的时候打出../就会有提示）