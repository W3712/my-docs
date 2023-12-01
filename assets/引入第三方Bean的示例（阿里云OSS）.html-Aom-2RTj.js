import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,f as t}from"./app-b8T7z4VZ.js";const p={},e=t(`<h1 id="引入第三方bean的示例-阿里云oss" tabindex="-1"><a class="header-anchor" href="#引入第三方bean的示例-阿里云oss" aria-hidden="true">#</a> 引入第三方Bean的示例（阿里云OSS）</h1><p>首先我们需要有一个工具类AliOssUtil，例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AliOssUtil</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> endpoint<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> accessKeyId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> accessKeySecret<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> bucketName<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 文件上传
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bytes</span>
     * <span class="token keyword">@param</span> <span class="token parameter">objectName</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes<span class="token punctuation">,</span> <span class="token class-name">String</span> objectName<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 创建OSSClient实例。</span>
        <span class="token class-name">OSS</span> ossClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OSSClientBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span>endpoint<span class="token punctuation">,</span> accessKeyId<span class="token punctuation">,</span> accessKeySecret<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 创建PutObject请求。</span>
            ossClient<span class="token punctuation">.</span><span class="token function">putObject</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">,</span> objectName<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">OSSException</span> oe<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Caught an OSSException, which means your request made it to OSS, &quot;</span>
                    <span class="token operator">+</span> <span class="token string">&quot;but was rejected with an error response for some reason.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Error Message:&quot;</span> <span class="token operator">+</span> oe<span class="token punctuation">.</span><span class="token function">getErrorMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Error Code:&quot;</span> <span class="token operator">+</span> oe<span class="token punctuation">.</span><span class="token function">getErrorCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Request ID:&quot;</span> <span class="token operator">+</span> oe<span class="token punctuation">.</span><span class="token function">getRequestId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Host ID:&quot;</span> <span class="token operator">+</span> oe<span class="token punctuation">.</span><span class="token function">getHostId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ClientException</span> ce<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Caught an ClientException, which means the client encountered &quot;</span>
                    <span class="token operator">+</span> <span class="token string">&quot;a serious internal problem while trying to communicate with OSS, &quot;</span>
                    <span class="token operator">+</span> <span class="token string">&quot;such as not being able to access the network.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Error Message:&quot;</span> <span class="token operator">+</span> ce<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ossClient <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ossClient<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//文件访问路径规则 https://BucketName.Endpoint/ObjectName</span>
        <span class="token class-name">StringBuilder</span> stringBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;https://&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stringBuilder
                <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>endpoint<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>objectName<span class="token punctuation">)</span><span class="token punctuation">;</span>

        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;文件上传到:{}&quot;</span><span class="token punctuation">,</span> stringBuilder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> stringBuilder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，这只是一个工具类。</p><p>其中endpoint，accessKeyId，accessKeySecret，bucketName，这四个属性可以在我们的阿里云oss上找到。</p><p>这四个属性可以写死，但我们不建议这样做，当代码打包部署好之后，如果想修改上传路径时，就需要重新部署代码，非常不方便，所以我们要想办法把这四个属性放入application配置文件中。</p><p>我们可以写一个全局的AliOssProperties文件，例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;sky.alioss&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AliOssProperties</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> endpoint<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> accessKeyId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> accessKeySecret<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> bucketName<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此类只用于重配置文件读取信息用。</p><p>为了把我们的工具类注入到IOC容器中，我们还需要写一个AliyunOssConfiguration类，例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AliyunOssConfiguration</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConditionalOnMissingBean</span><span class="token comment">//此注解用于当bean不存在的时候才会创建bean</span>
    <span class="token keyword">public</span>  <span class="token class-name">AliOssUtil</span> <span class="token function">aliOssUtil</span><span class="token punctuation">(</span><span class="token class-name">AliOssProperties</span> aliOssProperties<span class="token punctuation">)</span><span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;开始创建Oss实例化对象&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AliOssUtil</span><span class="token punctuation">(</span>
                aliOssProperties<span class="token punctuation">.</span><span class="token function">getEndpoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                aliOssProperties<span class="token punctuation">.</span><span class="token function">getAccessKeyId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                aliOssProperties<span class="token punctuation">.</span><span class="token function">getAccessKeySecret</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                aliOssProperties<span class="token punctuation">.</span><span class="token function">getBucketName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于aliyunOss需要使用一些第三方架包，所以我们需要使用@Bean注解将其加载到ioc容器中，此config文件只实例化了一个工具类对象，并使用properties为其从application文件中读取相应的数据，这一步完成之后我们就可以通过@Autowired注入AliOssUtil 对象了。</p>`,12),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","引入第三方Bean的示例（阿里云OSS）.html.vue"]]);export{r as default};
