import BaseMonitor from "../error/BaseMonitor.js";
import { ErrorCategoryEnum,ErrorLevelEnum } from "../error/baseConfig.js"
/**
 * console.error异常
 */
class ConsoleError extends BaseMonitor {
    
    constructor(params){
        super(params);
    }

    /**
     * 处理错误
     */
    handleError(){
        let t = this;
        console.error=function(){
            try {
                t.level = ErrorLevelEnum.INFO;
                let params = [...arguments];
                t.msg = params.join(",");
                t.category = ErrorCategoryEnum.CONSOLE_ERROR;
                t.recordError();    
            } catch (error) {
                console.log("console.error统计错误异常",error);
            }
        }
    }
}
export default ConsoleError;