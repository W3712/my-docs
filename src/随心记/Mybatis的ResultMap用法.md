---
title: Mybatis的ResultMap用法
icon: fab fa-markdown
order: 2
category:
  - 使用指南
tag:
  - Markdown
---

# Mybatis的ResultMap用法

ResultMap用于映射查询结果到对象的属性。例如，当一个对象的属性中包含另一个对象时，我们就可以使用ResultMap来使用一个多表查询，然后把相应的结果映射给其对象相对应的属性。

例：

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Dish implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    //菜品名称
    private String name;

    //菜品分类id
    private Long categoryId;

    //菜品价格
    private BigDecimal price;

    //图片
    private String image;

    //描述信息
    private String description;

    //0 停售 1 起售
    private Integer status;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;

    private Long createUser;

    private Long updateUser;

    //菜品关联的口味
    private List<DishFlavor> flavors = new ArrayList<>();
}
```

我们有一个Dish类，在这里面他包含了DishFlavor类，此时我们在查询的时候就可以使用ResultMap来做映射。

```xml
<resultMap id="dishMap" type="***Dish" autoMapping="true">
        <id column="id" property="id"></id>
        <collection property="flavors" ofType="***DishFlavor">
            <result column="dfId" property="id"></result>
            <result column="dish_id" property="dishId"></result>
            <result column="dfName" property="name"></result>
            <result column="value" property="value"></result>
        </collection>
    </resultMap>

<select id="getByDishId" resultMap="dishMap">
        select d.*, df.name dfName, df.id dfId,df.dish_id,df.value
        from dish d
                 left join dish_flavor df on d.id = df.dish_id
        where d.id = #{id}
</select>
```

其中，id元素用于定义主键映射result元素来定义普通属性的映射。`property`属性指定了Java对象的属性名，`column`属性指定了数据库查询结果中的列名。collection 元素用于处理一对多关联关系的映射。当一个对象中包含另一个对象的集合时，可以使用 `<collection>` 元素来定义这种关联关系的映射。