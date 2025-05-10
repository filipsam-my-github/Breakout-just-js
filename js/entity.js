import * as mo_EntiesCreator from './entites_creator.js'
import * as mo_Rect from './rects.js'

export class Entity {
    constructor(x_coord, y_coord, width, height, clssses){
        this.rect = new mo_Rect.Rect(x_coord, y_coord, width, height)
        this.display = mo_EntiesCreator.createEntity(clssses)
        mo_EntiesCreator.setSize(this.display, width, height)
        mo_EntiesCreator.setPosition(this.display, x_coord, y_coord)
    }

    

    destructor() {
        if (this.display != null){
            this.display.parentElement.removeChild(this.display)
            this.display = null
            this.rect.width = 0
            this.rect.height = 0
            this.rect.w = 0
            this.rect.h = 0
        }
        
    }
}





