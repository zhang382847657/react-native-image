# react-native-image
对RN中的image进行封装<br>
新增图片缓存功能

> ### 使用方法
```
<ReacNativeImage style={styles.icon}
         source={{uri:'****'}}    //网络图片url或本地图片路径  必填
         minShowImageTime={***}   //最少可以显示占位图的毫秒数  选填  默认是500毫秒
         placeholder={require('*****')}   //占位图  在图片还没加载好时显示的图片  选填
         errorImage={require('*****')}   //图片加载失败后显示的默认图  选填
         isOpenCache={true|false}  //是否开启缓存  选填  默认开启
/>
```
