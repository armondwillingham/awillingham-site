export const getScrollbarWidth = (): number => {
    let div;
    if (width === undefined) {
        div = document.createElement('div');
        div.innerHTML =
            '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
        div = div.firstChild as any;
        document.body.appendChild(div);
        width = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
    }
    return width;
};

let width: any;
