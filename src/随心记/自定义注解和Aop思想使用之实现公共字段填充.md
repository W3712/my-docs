---
title: 自定义注解和Aop思想使用之实现公共字段填充
icon: fab fa-markdown
order: 2
category:
  - 使用指南
tag:
  - Markdown
---

# 自定义注解和Aop思想使用之实现公共字段填充

在我们写代码时碰到需要频繁的为某一处字段进行填充时，我们可以使用自定义注解和Aop来对帮我们自动实现填充。例如在我写的这个项目中，需要多次对创建人Id和创建时间以及修改人和修改时间进行设置，此时我们可以通过自定义注解来标记到这些代码块，然后使用Aop对其进行一个增强。实现如下：

先在全局环境中创建enumeration包，在里面写上OperationType枚举类，具体如下：

```java
public enum OperationType {
    /**
     * 更新操作
     */
    UPDATE,
    /**
     * 插入操作
     */
    INSERT
}
```

此类仅用于区分到底是增加还是更新。

然后我们就需要写我们的标记注解AutoFill，如下：

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AutoFill{

    /**
     * 数据库操作类型
     * @return
     */
    OperationType value();
}
```

此注解只使用了两个原生的注解，以标明这是一个注解接口，里面写了一个OperationType的接口，当我们标记时就可以使用这个接口来分别更新和插入。

接着我们就要写我们的Aop增强方法AutoFillAspect了，如下：

```java
public class AutoFillAspect {
    
    @Before("execution(* com.sky.mapper.*.*(..)) &&      		@annotation(com.sky.annotations.AutoFill)")
    public void autoFill(JoinPoint joinPoint){
        log.info("公共字段填充----------------");
        //获得方法签名对象
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        //获得方法上的注解
        AutoFill autoFill = methodSignature.getMethod().getAnnotation(AutoFill.class);
        //获得注解中的操作类型
        OperationType operationType = autoFill.value();

        //获取当前目标方法的参数
        Object[] args = joinPoint.getArgs();
        if(args.length==0||args==null){
            return;
        }

        //实体对象
        Object entity = args[0];

        //准备赋值的数据
        LocalDateTime time = LocalDateTime.now();
        Long id = BaseContext.getCurrentId();

        if(operationType==OperationType.INSERT){
            //当前执行的是insert操作，为4个字段赋值
            try {
                //获得set方法对象----Method
				Method setCreateTime =     entity.getClass().getDeclaredMethod(AutoFillConstant.SET_CREATE_TIME, LocalDateTime.class);
                Method setUpdateTime = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_TIME, LocalDateTime.class);
                Method setCreateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_CREATE_USER, Long.class);
                Method setUpdateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_USER, Long.class);

                //通过反射调用目标对象的方法
                setCreateTime.invoke(entity, time);
                setUpdateTime.invoke(entity, time);
                setCreateUser.invoke(entity, id);
                setUpdateUser.invoke(entity, id);

            } catch (Exception e) {
                log.info("公共字段填充失败：{}",e.getMessage());
            }
        }else {
            //当前执行的是update操作，为2个字段赋值
            try {
                //获得set方法对象----Method
                Method setUpdateTime = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_TIME, LocalDateTime.class);
                Method setUpdateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_USER, Long.class);
                //通过反射调用目标对象的方法
                setUpdateUser.invoke(entity,id);
                setUpdateTime.invoke(entity,time);
            } catch (Exception e) {
                log.info("公共字段填充失败：{}",e.getMessage());
            }
        }
    }
```

注：此方法中的AutoFillConstant类为自定义标记类，仅实现了区分当时所调用的方法，如下：

```java
public class AutoFillConstant {
    /**
     * 实体类中的方法名称
     */
    public static final String SET_CREATE_TIME = "setCreateTime";
    public static final String SET_UPDATE_TIME = "setUpdateTime";
    public static final String SET_CREATE_USER = "setCreateUser";
    public static final String SET_UPDATE_USER = "setUpdateUser";
}
```

仅且做了一个转换处理，因为当程序程序执行到给类的属性设置属性的时候，就会调用set方法，所以就写了一个这个类（完全没必要，换成相应的字符串也可以实现）。

最后我们只需要在mapper层的接口中对应的方法上加上我们的自定义注解即可。