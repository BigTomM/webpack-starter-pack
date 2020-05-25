import { h } from 'snabbdom'

const createElement = (type, props = {}, ...children) => {
    console.log(type, props, children);
      /**
     * 如果是类组件
     * 1.创建一个实例
     * 2.调用实例的 render 方法
     */
    if(type.prototype && type.prototype.isQndReactClassComponent){
        const componentInstance=new type(props);
        componentInstance.__vNode=componentInstance.render();
        
        //增加钩子函数(当虚拟DOM被添加到真实DOM节点上时)
        componentInstance.__vNode.data.hook={
            create:()=>{
                componentInstance.componentDidMounted();
            }
        }

        return componentInstance.__vNode;


    }
    //如果是函数组件，那么调用它，并返回执行结果
    if (typeof (type) == 'function') {
        return type(props)
    }


    let dataProps={};
    let eventProps={};

    for(let propkey in props){
        // event 属性总是以 `on` 开头
        if(propkey.startsWith('on')){
            const event =propkey.substring(2).toLowerCase();
            eventProps[event]=props[propkey];
        }else {
            dataProps=props[propkey]
        }
    }

    return h(type, { props:dataProps,on:eventProps }, children)
}

class Component{
    componentDidMounted(){
    }
    setState(partialState){
        this.state={
            ...this.state,
            ...partialState
        }
        //调用 QndReactDom 提供的 __updater 方法
        QndReact.__updater(this)
    }
    render(){}
}
Component.prototype.isQndReactClassComponent=true;

const QndReact = {
    createElement,
    Component   
}

export default QndReact;