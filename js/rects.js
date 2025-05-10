export class Rect {
    constructor(x_pos, y_pos, width, height) {
        this.x = x_pos
        this.y = y_pos
        this.width = width
        this.height = height

        this.w = this.width
        this.h = this.height
    }

    collide_hiddne_within_the_object(...objs_with_rect){
        for (let obj of objs_with_rect) {
            if (this.isColliding(obj.rect)) {
                return obj
            }
        }
        return false
    }



    collide(...rects) {
        for (let rect of rects) {
            if (this.isColliding(rect)) {
                return true
            }
        }
        return false
    }

    isColliding(rect) {
        return this.x < rect.x + rect.width &&
               this.x + this.width > rect.x &&
               this.y < rect.y + rect.height &&
               this.y + this.height > rect.y
    }


    toString() {
        return `Rect(${this.x}, ${this.y}, ${this.width}, ${this.height})`
    }
}
