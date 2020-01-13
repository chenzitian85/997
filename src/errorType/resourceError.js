import BaseMonitor from "../error/BaseMonitor.js"
import { ErrorCategoryEnum,ErrorLevelEnum } from "../error/baseConfig.js"
/**
 * 资源加载错误
 */
class ResourceError extends BaseMonitor {
    
    constructor(params){
        super(params);
    }

    /**
     * 注册onerror事件 当一个资源加载错误时都会触发 error 事件
     *  event 返回了错误的各种信息
     */
    handleError(){
        window.addEventListener('error', (event) => {
            try {
                if(!event){
                    return;
                }
                this.category = ErrorCategoryEnum.RESOURCE_ERROR;
                let target = event.target || event.srcElement;
                var isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
                if (!isElementTarget) { // 判断是否属于 HTMLScriptElement 、HTMLLinkElement 、 HTMLImageElement 这几个的错误，如果不是直接跳出处理
                    return; // js error不再处理
                }
                this.level = ErrorLevelEnum.ERROR; //错误等级
                this.msg = "加载 "+target.tagName+" 资源错误";
                this.url = target.src || target.href;
                this.errorObj = target;
                this.recordError();
            } catch (error) {
                console.log("资源加载收集异常",error);
            }
        },true);
    }
}
export default ResourceError;