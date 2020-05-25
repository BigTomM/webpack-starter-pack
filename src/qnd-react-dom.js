//React.render(<App />, document.getElementById('root'));
import * as snabbdom from 'snabbdom'
import propsModule from 'snabbdom/modules/props'
import eventlistenerModule from 'snabbdom/modules/eventlisteners'
import QndReact from './qnd-react';

const reconcile = snabbdom.init([propsModule,eventlistenerModule])

let rootVNode;
const render = (el, rootElement) => {
    //将el渲染到rootElement
    if (rootVNode == null) {
        rootVNode = rootElement
    }
    reconcile(rootVNode, el)
}
const QndReactDom = {
    render
}

//QndReactDom 告诉 QndReact 如何更新 DOM
QndReact.__updater = (componentInstance) =>{
    //当调用 this.setState 的时候更新 DOM 逻辑
    //获取在 __vNode 上存储的 oldVNode
    const oldNode =componentInstance.__vNode;
    //获取 newVNode
    const newNode=componentInstance.render();
    //更新 __vNode
    componentInstance.__vNode=reconcile(oldNode,newNode);
}
export default QndReactDom