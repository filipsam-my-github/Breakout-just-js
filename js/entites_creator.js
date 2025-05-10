export function setWidth(element, vhValue) {
    element.style.width = `${vhValue}vh`;
}

export function setHeight(element, vhValue) {
    element.style.height = `${vhValue}vh`;
}

export function setSize(element, width, height) {
    setWidth(element, width)
    setHeight(element, height)
}

export function setColor(element, color){
    element.style.color = color
}


export function setPosition(element, x_coord, y_coord) {
    element.style.left = `${x_coord}vh`;
    element.style.top = `${y_coord}vh`;
}


export function createEntity(classes) {
    const entity = document.createElement('div');
    entity.classList.add(...classes.split(' '));


    return entity
}

