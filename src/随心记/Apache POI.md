---
title: Apache POI
icon: fab fa-markdown
order: 2
category:
  - 使用指南
tag:
  - Markdown
---
# Apache POI

apache poi 是专门用来处理Miscrosoft Office各种文件格式的开源项目。简单来说就是，我们可以使用 POI 在 Java 程序中对Miscrosoft Office各种文件进行读写操作。一般情况下，POI 都是用于操作 Excel 文件。

举个例子，比如我们需要导出一个excel表格，需要准备一个模板。

​	我们想操作这个文件，第一步要把这个文件读入到内存中，我们可以把模板文件放在项目文件夹下的某一个目录，当我们想操作他，就可以使用类加载器让程序在启动的时候加载他，加载之后使用一个输入流接收，对他进行操作之后用一个输出流输出给浏览器。大致代码如下：

```java
public void exportBusinessData(HttpServletResponse response) {

        //获取当前类的类加载器
        ClassLoader classLoader  = this.getClass().getClassLoader();
        //获取到xlsx模板
        InputStream inputStream = classLoader .getResourceAsStream("static/运营数据报表模板.xlsx");
        //获取时间
        LocalDate begin = LocalDate.now().minusDays(1);
        LocalDate end = LocalDate.now().minusDays(30);
        //查询
        BusinessDataVO businessData = workspaceService.getBusinessData(LocalDateTime.of(begin,LocalTime.MIN),LocalDateTime.of(end,LocalTime.MAX));
        try {
            //给excel赋值
            XSSFWorkbook excel = new XSSFWorkbook(inputStream);
            //往excel添加数据时我们需要先拿到一个sheet（表）
            XSSFSheet sheet = excel.getSheetAt(0);
            XSSFRow row1 = sheet.getRow(1);
            row1.getCell(1).setCellValue("时间"+begin+"至"+end);
            XSSFRow row3 = sheet.getRow(3);
            row3.getCell(2).setCellValue(businessData.getTurnover());
            row3.getCell(4).setCellValue(businessData.getOrderCompletionRate());
            row3.getCell(6).setCellValue(businessData.getNewUsers());
            XSSFRow row4 = sheet.getRow(4);
            row4.getCell(2).setCellValue(businessData.getValidOrderCount());
            row4.getCell(4).setCellValue(businessData.getUnitPrice());
            for (int i = 0; i < 30; i++) {
                businessData = workspaceService.getBusinessData(LocalDateTime.of(begin, LocalTime.MIN), LocalDateTime.of(begin, LocalTime.MAX));
                XSSFRow rowi = sheet.getRow(7 + i);
                rowi.getCell(1).setCellValue(begin+"");
                rowi.getCell(2).setCellValue(businessData.getTurnover());
                rowi.getCell(3).setCellValue(businessData.getValidOrderCount());
                rowi.getCell(4).setCellValue(businessData.getOrderCompletionRate());
                rowi.getCell(5).setCellValue(businessData.getUnitPrice());
                rowi.getCell(6).setCellValue(businessData.getNewUsers());
                begin = begin.plusDays(1);
            }
            ServletOutputStream outputStream = response.getOutputStream();
            excel.write(outputStream);
            excel.close();
            outputStream.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
```

