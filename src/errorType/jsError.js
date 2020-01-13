import BaseMonitor from "../error/baseMonitor.js"
import { ErrorCategoryEnum,ErrorLevelEnum } from "../error/baseConfig.js"
/**
 * 捕获JS错误
 */
class JSError extends BaseMonitor {
    
    constructor(params){
        super(params);
    }

    /**
     * 注册onerror事件
     * 1、异常信息：获取异常信息。
     * 2、URL：获取发生异常的文件的绝对路径。
     * 3、行号：给定发生异常文件的行号。
     */
    handleError(){
        window.onerror = (msg, url, line, col, error) => {
            try {
                this.level = ErrorLevelEnum.WARN;
                this.category = ErrorCategoryEnum.JS_ERROR;
                this.msg = msg;
                this.url = url;
                this.line = line;
                this.col = col;
                this.errorObj = error;
                this.recordError();    
            } catch (error) {
                console.log("js错误异常",error);
            }
        }
    }
}
export default JSError;