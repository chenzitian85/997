import DeviceInfo from "../utils/getDeviceInfo";
import common from "../utils/common";  //工具
/*
* 监控基类 回调信息在这里处理 所有的 错误类都继承这个类
* */
class  BaseMonitor {
    /*
    * 上报错误信息
    * */
    constructor(parmas){
        try {
            this.category = ErrorCategoryEnum.UNKNOW_ERROR; //错误类型
            this.level = ErrorLevelEnum.INFO; //错误等级
            this.msg = "";  //错误信息
            this.url = "";  //错误信息地址
            this.line = ""; //行数
            this.col = "";  //列数
            this.errorObj = "";  //错误堆栈

            this.reportUrl = params.reportUrl || ''; //上报错误地址
            this.extendsInfo = params.extendsInfo || ''; //扩展信息
            this.errorAfter = params.errorAfter || ''; //错误回调
        } catch (error) {
            console.log("js错误异常",error);
        }
    }
    /*
    * 记录信息
    * */
    recordError(){
        // 挂载任务防止阻塞
        setTimeout(()=>{
            try{
                if(!this.msg)return
                if( this.reportUrl && this.url && this.url.toLowerCase().indexOf(this.reportUrl.toLowerCase())>=0 ){
                    console.log("接口异常",this.msg)

                }
            }catch (e) {
                console.log(e)
            }
        },100)
    }

    /**
     * 处理错误信息
     * @param {*} extendsInfo
     */
    handleErrorInfo(){
        let errorInfo ={
            Category: this.category,
            Error:this.msg,
            URL:this.url,
            Line: this.line,
            Colno:this.col,
            Stack:this.errorObj.stack,
            OtherError:this.errorObj
        }
        let extendsInfo = this.getExtendsInfo();
        let recordInfo = extendsInfo;
        recordInfo.SubCategory = this.category; //错误分类
        recordInfo.LogType = this.level;  //错误级别
        recordInfo.LogInfo = errorInfo;  //错误信息
        recordInfo.DeviceInfo = this.getDeviceInfo(); //设备信息
        return recordInfo;
    }

    /**
     * 获取设备信息
     */
    getDeviceInfo(){
        try {
            let deviceInfo = DeviceInfo.getDeviceInfo();
            return JSON.stringify(deviceInfo);
        } catch (error) {
            console.log(error);
            return "";
        }
    }
}
export default BaseMonitor;