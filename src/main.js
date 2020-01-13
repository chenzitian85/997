import { AjaxError,ConsoleError,JsError,PromiseError,ResourceError,VueError } from './errorType';
import { AjaxLibEnum } from "./base/baseConfig.js";
import MonitorPerformance from './performance';
class MonitorJS {
    constructor(){
        this.jsError = true;
        this.promiseError = true;
        this.resourceError = true;
        this.ajaxError = true;
        this.consoleError = false; //console.error默认不处理
        this.vueError =  false;
    }

    /**
     * 处理异常信息初始化
     * @param {*} options
     */
    init(options){
        options = options || {};
        this.jsError = options.jsError || this.jsError;
        this.promiseError = options.promiseError || this.promiseError;
        this.resourceError = options.resourceError || this.resourceError;
        this.ajaxError = options.ajaxError || this.ajaxError;
        this.consoleError = options.consoleError || this.consoleError;
        this.vueError = options.vueError || this.vueError;
        let reportUrl = options.url;//上报错误地址 现在还没实现这个功能 后面再做实现
        let extendsInfo = options.extendsInfo || {};  //扩展信息（一般用于系统个性化分析）
        let errorAfter = options.errorAfter // 捕捉错误后回调
        let param = { reportUrl, extendsInfo, errorAfter };
        if(this.jsError){
            new JsError(param).handleError();
        }
        if(this.promiseError){
            new PromiseError(param).handleError();
        }
        if(this.resourceError){
            new ResourceError(param).handleError();
        }
        if(this.ajaxError){
            new AjaxError(param).handleError(AjaxLibEnum.DEFAULT);
        }
        if(this.consoleError){
            new ConsoleError(param).handleError();
        }
        if(this.vueError && options.vue){
            new VueError(param).handleError(options.vue);
        }
    }

    /**
     * 监听页面性能
     * @param {*} options {pageId：页面标示,url：上报地址}
     */
    monitorPerformance(options){
        options = options || {};
        let pageId = options.pageId || "";
        let url = options.url || "";
        new MonitorPerformance().record({
            pageId,url
        });
    }

}

export default MonitorJS;
