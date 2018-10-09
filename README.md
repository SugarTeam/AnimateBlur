# 抛物线动画
## 使用
将 `ghost()` 与 `addAnimation()` 拷贝至你的项目, 在需要的时候调用。
## 传入参数
 ```
  addAnimation(startPosition, endPosition, time) //普通小球
  1.初始坐标 2.结束点坐标 3.动画执行时长
  ghost(startPosition, endPosition, time, num) // 动态模糊
  1.初始坐标 2.结束点坐标 3.动画执行时长 4.残影小球个数
 ```
## 其他
实现原理及详情请阅读 [原生JS实现抛物线动画以及动态模糊效果](https://juejin.im/post/5bb0b7fae51d450e62380ef3