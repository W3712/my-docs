---
title: redis
icon: fab fa-markdown
order: 2
category:
  - 使用指南
tag:
  - Markdown
---
# redis

## redis是什么

### Redis是一个基于内存的key-value的nosql数据库

## redis Value的五种数据格式

### 字符串 string  类似java中的字符串

### 哈希 hash 	类似java中的对象

### 列表 list

- 有序,可以重复,类似java中的ArrayList

### 集合 set

- 无序,不能重复,类似java中的HashSet

### 有序集合 zset 不 能重复,并且按照分数排序

## redis的操作命令

### 字符串 string

- -  SET  key value 		设置指定key的值
- -  GET  key                                        获取指定key的值
- -  SETEX  key seconds value         设置指定key的值，并将 key 的过期时间设为 seconds 秒
- -  SETNX  key value                        只有在 key    不存在时设置 key 的值

### 哈希 hash

- -  HSET  key field value             将哈希表 key 中的字段 field 的值设为 value
- -  HGET  key field                       获取存储在哈希表中指定字段的值
- -  HDEL  key field                       删除存储在哈希表中的指定字段
- -  HKEYS  key                              获取哈希表中所有字段
- -  HVALS  key                              获取哈希表中所有值

### 列表 list

- -  LPUSH  key value1 [value2]         将一个或多个值插入到列表头部
- -  LRANGE  key start stop                获取列表指定范围内的元素
- -  RPOP  key                                       移除并获取列表最后一个元素
- -  LLEN  key                                        获取列表长度
- -  BRPOP  key1 [key2 ] timeout       移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止

### 集合 set

- -  SADD  key member1 [member2]            向集合添加一个或多个成员
- -  SMEMBERS  key                                         返回集合中的所有成员
- -  SCARD  key                                                  获取集合的成员数
- -  SINTER  key1 [key2]                                   返回给定所有集合的交集
- -  SUNION  key1 [key2]                                 返回所有给定集合的并集
- -  SREM  key member1 [member2]            移除集合中一个或多个成员

### 有序集合 zset

- -  ZADD  key score1 member1 [score2 member2]     向有序集合添加一个或多个成员
- -  ZRANGE  key start stop [WITHSCORES]                     通过索引区间返回有序集合中指定区间内的成员
- -  ZINCRBY  key increment member                              有序集合中对指定成员的分数加上增量 increment
- -  ZREM  key member [member ...]                                移除有序集合中的一个或多个成员

## Spring Data Redis

### Spring Data Redis的五种操作类

- - ValueOperations：string数据操作
- - SetOperations：set类型数据操作
- - ZSetOperations：zset类型数据操作
- - HashOperations：hash类型的数据操作
- - ListOperations：list类型的数据操作

### String 操作方法

- 
redisTemplate.opsForValue().set(key, value)

	-  设置当前的 key 以及 value 值并且设置过期时间

- 
    
redisTemplate.opsForValue().set(key, value, timeout, unit)


	-  设置当前的 key 以及 value 值并且设置过期时间

- 
redisTemplate.opsForValue().get(key)

	- 获取当前key的 value 值

- redisTemplate.opsForValue().setIfAbsent(key, value)

	- 重新设置 key 对应的值，如果存在则设置失败

### Hash 操作方法

- redisTemplate.opsForHash().get(key, field)

	- 获取变量中的指定 map 键是否有值，如果存在该 map 键则获取值，没有则返回 null

- redisTemplate.opsForHash().put(key, hashKey, value)

	- 新增 hashMap 值

- redisTemplate.opsForHash().keys(key)

	- 获取所有 hash 表中字段

- redisTemplate.opsForHash().values(key)

	- 获取 hash 表中存在的所有的值

### List 操作方法

- redisTemplate.opsForList().leftPush(key, value)

	- 存储在 list 的头部，即添加一个就把它放在最前面的索引处

- redisTemplate.opsForList().leftPushAll(key, value)

	- 把多个值存入 List 中(value 可以是多个值，也可以是一个 Collection value)

- redisTemplate.opsForList().range(key, start, end)

	- 获取列表指定范围内的元素(start 开始位置, 0 是开始位置，end 结束位置, -1返回所有)

- redisTemplate.opsForList().size(key)

	- 获取当前 key 的 List 列表长度

- 
redisTemplate.opsForList().rightPop(key)

	- 移除并获取列表最后一个元素

### Set 操作方法

- redisTemplate.opsForSet().add(key, values)

	- 添加元素

- redisTemplate.opsForSet().members(key)

	- 获取集合中的所有元素

- redisTemplate.opsForSet().size(key)

	- 获取集合的大小

- redisTemplate.opsForSet().intersect(key, otherKeys)

	- 获取多个集合的交集

- redisTemplate.opsForSet().union(key, otherKeys)

	- 获取多个集合的并集

- redisTemplate.opsForSet().remove(key, values)

	- 移除元素(单个值、多个值)

### Zset 操作方法

- redisTemplate.opsForZSet().add(key, value, score)

	- 添加元素

- redisTemplate.opsForZSet().incrementScore(key, value, delta)

	- 增加元素的 score 值，并返回增加后的值

- redisTemplate.opsForZSet().range(key, start,end)

	- 获取集合中给定区间的元素(start 开始位置，end 结束位置, -1 查询所有)

- redisTemplate.opsForZSet().remove(key, values)

	- 删除对应的 value，value 可以为多个值

