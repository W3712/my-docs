---
title: 引入第三方Bean的示例（阿里云OSS）
icon: fab fa-markdown
order: 2
category:
  - 使用指南
tag:
  - Markdown
---

# 引入第三方Bean的示例（阿里云OSS）

首先我们需要有一个工具类AliOssUtil，例：

```java
@Data
@AllArgsConstructor
@Slf4j
public class AliOssUtil {

    private String endpoint;
    private String accessKeyId;
    private String accessKeySecret;
    private String bucketName;

    /**
     * 文件上传
     *
     * @param bytes
     * @param objectName
     * @return
     */
    public String upload(byte[] bytes, String objectName) {

        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try {
            // 创建PutObject请求。
            ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(bytes));
        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch (ClientException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }

        //文件访问路径规则 https://BucketName.Endpoint/ObjectName
        StringBuilder stringBuilder = new StringBuilder("https://");
        stringBuilder
                .append(bucketName)
                .append(".")
                .append(endpoint)
                .append("/")
                .append(objectName);

        log.info("文件上传到:{}", stringBuilder.toString());

        return stringBuilder.toString();
    }
}

```

注意，这只是一个工具类。

其中endpoint，accessKeyId，accessKeySecret，bucketName，这四个属性可以在我们的阿里云oss上找到。

这四个属性可以写死，但我们不建议这样做，当代码打包部署好之后，如果想修改上传路径时，就需要重新部署代码，非常不方便，所以我们要想办法把这四个属性放入application配置文件中。

我们可以写一个全局的AliOssProperties文件，例：



```java
@Component
@ConfigurationProperties(prefix = "sky.alioss")
@Data
public class AliOssProperties {

    private String endpoint;
    private String accessKeyId;
    private String accessKeySecret;
    private String bucketName;

}
```

此类只用于重配置文件读取信息用。

为了把我们的工具类注入到IOC容器中，我们还需要写一个AliyunOssConfiguration类，例：

```java
@Configuration
@Slf4j
public class AliyunOssConfiguration {
    @Bean
    @ConditionalOnMissingBean//此注解用于当bean不存在的时候才会创建bean
    public  AliOssUtil aliOssUtil(AliOssProperties aliOssProperties){
        log.info("开始创建Oss实例化对象");
        return new AliOssUtil(
                aliOssProperties.getEndpoint(),
                aliOssProperties.getAccessKeyId(),
                aliOssProperties.getAccessKeySecret(),
                aliOssProperties.getBucketName()
        );
    }
}
```

由于aliyunOss需要使用一些第三方架包，所以我们需要使用@Bean注解将其加载到ioc容器中，此config文件只实例化了一个工具类对象，并使用properties为其从application文件中读取相应的数据，这一步完成之后我们就可以通过@Autowired注入AliOssUtil 对象了。