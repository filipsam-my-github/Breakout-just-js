import * as mo_Entity from './entity.js'
import * as mo_Globals from './game_global_varables.js'
import * as mo_Util from './util.js'

export class Ball extends mo_Entity.Entity{
    constructor(y_coord){
        const width = 3;
        const x_coord = (60 - width) / 2;
        const height = 3;
        const type_of_entity = "ball";

        super(x_coord, y_coord, width, height, type_of_entity);

        this.bounc_vector = [0, -1]
        this.speed = 68

        this.have_touched_bottom = false
    }

    interactWhitBorder(){
        if (mo_Globals.world_width < this.rect.width + this.rect.x){
            this.rect.x = mo_Globals.world_width - this.rect.width
            this.bounc_vector[0] = -1

        }

        if (this.rect.x < 0){
            this.rect.x = 0
            this.bounc_vector[0] = 1
        }

        if (mo_Globals.world_height < this.rect.height + this.rect.y){
            this.rect.y = mo_Globals.world_height - this.rect.height
            let eihter_one_or_minus_one = 1-mo_Util.randint(0, 1)*2
            this.bounc_vector = [eihter_one_or_minus_one , -1]
            this.have_touched_bottom = true
        }

        if (this.rect.y < 0){
            this.rect.y = 0
            let eihter_one_or_minus_one = 1-mo_Util.randint(0, 1)*2
            this.bounc_vector = [eihter_one_or_minus_one, 1]
        }



    }

    interactWithObjects(x_movment_vector, y_movment_vector, ...obj_with_rect){
        let collide_with_obj = this.rect.collide_hiddne_within_the_object(...obj_with_rect)
        if (collide_with_obj){
            // this.bounc_vector[0] *= -1
            this.bounc_vector[1] *= -1
            this.rect.x -= x_movment_vector
            this.rect.y -= y_movment_vector
            collide_with_obj.has_been_hitted = true

            let still_collide_with_obj = this.rect.collide_hiddne_within_the_object(collide_with_obj)
            if (still_collide_with_obj){
                this.rect.y = still_collide_with_obj.rect.y - this.rect.height
            }
        }
    }

    changePosition(x_axis, y_axis, ...obj_with_rect) {
        this.rect.x += x_axis
        this.rect.y += y_axis

        this.interactWhitBorder()
        this.interactWithObjects(x_axis, y_axis, ...obj_with_rect)


        this.display.style.left = `${this.rect.x}vh`;
        this.display.style.top = `${this.rect.y}vh`;
    }

    move(dt, ...obj_with_rect) {
        let x_movment_vector = this.bounc_vector[0] * this.speed * dt
        let y_movment_vector = this.bounc_vector[1] * this.speed * dt

        this.changePosition(x_movment_vector, y_movment_vector, ...obj_with_rect)
    }
}
