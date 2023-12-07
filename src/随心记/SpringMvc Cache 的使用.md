---
title: SpringMvc Cache 的使用
icon: fab fa-markdown
order: 2
category:
  - 使用指南
tag:
  - Markdown
---

# SpringMvc Cache 的使用

这个使用步骤很简单，第一步导入maven坐标，第二步在我们的启动类上加上注解@EnableCaching 注解加完以后我们就可以使用这个缓存工具了。

它提供了3个方法：

1.@CaCheable,这个注解表示在方法执行前先查询缓存中是否有数据，如果有数据，则直接返回缓存数据；如果没有缓存数据，调用方法并将方法返回值放到缓存中。使用示例：

```java
@Cacheable(value = "***",key = "#***")
```

这个注解里面常用的两个参数就是上面的，value代表存储在redis缓存中的文件的名字，这个缓存添加形式是：name(value).empty.key（key）:value，#***，代表向方法体取值。

2.@CachePut这个注解表示将方法的返回值放到缓存中

```
@CachePut(value = "***",key = "***")
```

参数和上面的没有太大区别，只不过是添加一条数据.

3.@CacheEvict这个注解将一条或多条数据从缓存中删除

删除一条数据

```java
@CacheEvict(value = "***",key = "***")
```

删除全部数据

```java
@CacheEvict(value = "***",allEntries=true)
```

