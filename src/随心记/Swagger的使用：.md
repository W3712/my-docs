---
title: Swagger的使用
icon: fab fa-markdown
order: 2
category:
  - 使用指南
tag:
  - Markdown
---

# Swagger的使用：

环境配置，先导入knife4j的maven坐标，然后往配置类中加入 knife4j 相关配置，最后设置静态资源映射，否则接口文档页面无法访问

例：

```java
@Bean
public Docket docket(){
    ApiInfo apiInfo = new ApiInfoBuilder()
        .title(“***项目接口文档”)
        .version(“1.0”)
        .description(“苍穹外卖项目接口文档")
                     .build();
	Docket docket = new Docket(DocumentationType.SWAGGER_2)
    .apiInfo(apiInfo)
    .select()
//指定生成接口需要扫描的包
    .apis(RequestHandlerSelectors.basePackage("com.***.controller"))
    .paths(PathSelectors.any())
    .build();
    return docket;
}
//此配置写在了WebMvcConfiguration里面
/**
* 设置静态资源映射
* @param registry
*/
protected void addResourceHandlers(ResourceHandlerRegistry registry) {
    log.info(“开始设置静态资源映射...");
             registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
           registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
             
}
```

当我们完成上面的步骤之后，就可以在我们的代码上使用了。

常用的注解：

@Api 用在类上，例如Controller，表示对类的说明

@ApiModel 用在类上，例如entity、DTO、VO

@ApiModelProperty	用在属性上，描述属性信息

@ApiOperation 用在方法上，例如Controller的方法，说明方法的用途、作用

例：

```java
@RestController
@Api(tags = "员工信息相关接口")
public class EmployeeController{
    
    @ApiOperation(value = "登录接口")
    @PostMapping("/login")
    public Result<EmployeeLoginVO> login(@RequestBody EmployeeLoginDTO employeeLoginDTO){
        ***
    }
}
```

完成之后我们就可以访问localhost:8080/doc.html就可以看到我们的借口了，而且还可以在线测试接口。