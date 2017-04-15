/**
 * Created by zhanglin on 2017/4/14.
 *
 * image增强版
 *
 * 主要用于加载网络图片时可以显示占位图及加载失败后显示的默认图
 *
 *
 * <ReacNativeImage style={styles.icon}
         source={{uri:'****'}}    //网络图片url或本地图片路径  必填
         minShowImageTime={***}   //最少可以显示占位图的毫秒数  选填  默认是500毫秒
         placeholder={require('*****')}   //占位图  在图片还没加载好时显示的图片  选填
         errorImage={require('*****')}   //图片加载失败后显示的默认图  选填
         isOpenCache={true|false}  //是否开启缓存  选填  默认开启
   />
 *
 */



import React , {PropTypes,Component}  from 'react';
import {Image,Fetch,AsyncStorage} from 'react-native';
import DeviceStorage from './storage';


class ReacNativeImage extends React.Component {

    static defaultProps = {
        placeholder: require('../image/load.png'),
        errorImage: require('../image/error.png'),
        minShowImageTime: 500,
        isOpenCache: true,
    }

    static propTypes = {
        placeholder : PropTypes.number,
        errorImage : PropTypes.number,
        minShowImageTime : PropTypes.number,
        source: PropTypes.object.isRequired,
        isOpenCache: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.state = {
            imageSource : null
        };
    }

    componentWillMount() {

        let _this = this;
        if(this.props.source.uri){ //如果是网络图片格式

            if(_this.props.isOpenCache){ //如果开启了缓存
                DeviceStorage.get(_this.props.source.uri,(errs,result)=>{  //先读取图片的缓存
                    if(result){
                        _this.setState({
                            imageSource: {uri:result}
                        });
                        return;
                    }
                })
            }


            /////没有该图片的缓存再从网络中加载/////
            this.time_interval=setInterval(()=>{
                clearInterval(_this.time_interval);
                _this.setState({
                    imageSource : _this.props.placeholder
                })
            },_this.props.minShowImageTime);

            fetch(_this.props.source.uri, {
                method: 'GET'
            }) .then((response) => {
                clearInterval(_this.time_interval);
                return response.text();
            }) .then((responseText) => {

                if(_this.props.isOpenCache){ //如果开启了缓存
                    DeviceStorage.save(_this.props.source.uri,_this.props.source.uri);//存储网络图片到本地
                }
                _this.setState({
                    imageSource: _this.props.source
                })
            }) .catch((error) => {
                clearInterval(_this.time_interval);
                _this.setState({
                    imageSource: _this.props.errorImage
                })
            });
        }else {  //如果本地图片格式
            this.setState({
                imageSource: this.props.source
            })
        }
    }

    componentWillUnmount() {

        //移除计时器
        this.time_interval && clearInterval(this.time_interval)
    }

    render() {
        return (
            <Image style={this.props.style}  source={this.state.imageSource}/>
        );
    }

}

module.exports = ReacNativeImage;



