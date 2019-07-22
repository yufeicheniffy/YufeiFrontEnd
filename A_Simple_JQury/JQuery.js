var JQuery=function(nodeOrSelector){
    let nodeList={};
    if(typeof nodeOrSelector ==='string'){
        // console.log("string para")
        nodeList=document.querySelectorAll(nodeOrSelector);
    }else if(nodeList instanceof Node){
        // console.log("node para")
        nodeList[0]=node;
        nodeList.length=1;
    }else{
        // console.log("else para")
        nodeList=nodeOrSelector;
    }

    nodeList.addClass=function(classes){ //param: classes, Array
        if(classes instanceof Array){
            for(let i =0;i<nodeList.length;i++) {
                classes.forEach((value) => {
                    nodeList[i].classList.add(value);
                })
            }
        }else if(typeof classes ==='string'){
            for(let i =0;i<nodeList.length;i++) {
                nodeList[i].classList.add(classes);
            }
        }
        return nodeList;
    }

    nodeList.getSiblings=function(){
        let siblingsList=new Set();
        for(let i=0;i<nodeList.length;i++){
            nodeList[i].parentNode.childNodes.forEach(value => {siblingsList.add(value)});
        }
        return siblingsList.toArray();
    }

    nodeList.text=function(text){
        if(text){
            nodeList.forEach(value=>{value.textContent=text});
            return nodeList;
        }else{
            let textContent='';
            nodeList.forEach(value=>{textContent+=value.textContent})
            return textContent;
        }
    }
    return nodeList;
}

window.$=JQuery;