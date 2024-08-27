class project_btn_class{
    label?:string|null;
    action?:string|null;
}
class project_data_class{
    img_path:string ;
    title:string;
    desc:string;
    date:string;
    custom_style?:string|null;
    buttons?:Array<project_btn_class>|null;

    constructor(img_path:string, title:string, desc:string, date:string,
        custom_style?:string|null
    ){
        this.img_path = img_path;
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.custom_style = custom_style;

    }
}

let show_more_manager = (function(){

    class loader_element_class{
        Show_more_btn:HTMLButtonElement;
        Show_less_btn:HTMLButtonElement;
        elements_adder:(data:Array<project_data_class>, parent:HTMLElement) => Array<HTMLElement>
        req_data:Array<project_data_class>;
        parent:HTMLElement;
        add_amount:number;

        constructor(Show_more_btn:HTMLButtonElement, Show_less_btn:HTMLButtonElement,
            elements_adder:(req_data:Array<project_data_class>, parent:HTMLElement) => Array<HTMLElement>,
            parent:HTMLElement, req_data:Array<project_data_class>, add_amount:number){

                this.Show_less_btn = Show_less_btn;
                this.Show_more_btn = Show_more_btn;
                this.elements_adder = elements_adder;
                this.req_data = req_data;
                this.parent = parent;
                this.add_amount = add_amount;
        }
        
        current_index = 0;
        #last_amount = 0;
        #added_children:Array<HTMLElement> = [];
        
        initialize_element() {
            // let req_to_add = this.req_data.slice(this.#current_index, this.#current_index + this.add_amount);
            let added = this.elements_adder(this.#return_next(), this.parent);
            this.#last_amount = added.length;
            this.current_index += this.#last_amount;
            
            this.#added_children.push(...added);
            
            this.Show_more_btn.addEventListener("click", () => this.load_more_clicked());
            this.Show_less_btn.addEventListener("click", () => this.#unload_clicked());

            this.#button_checker();
        }
        load_more_clicked(){
            if(this.current_index >= this.req_data.length) { return; }

            let added = this.elements_adder(this.#return_next(), this.parent);
            this.#last_amount = added.length;
            this.current_index += added.length;

            this.#added_children.push(...added);
            console.log(added.length);

            this.#button_checker();
        }
        
        #unload_clicked(){
            if(this.#added_children.length <= this.add_amount){
                return;
            }
            for(let x = 0; x < this.#last_amount; x++){
                let last_ele = this.#added_children[this.#added_children.length -1];
                this.parent.removeChild(last_ele);
                this.#added_children.pop();
                this.current_index--;
            }
            if(this.#last_amount != this.add_amount){
                this.#last_amount = this.add_amount;
            }
            this.#button_checker();
        }

        #button_checker(){
            if(this.#added_children.length <= this.add_amount){
                this.Show_less_btn.classList.add("hidden");
            }
            else{
                this.Show_less_btn.classList.remove("hidden");
            }
            if(this.#added_children.length >= this.req_data.length){
                this.Show_more_btn.classList.add("hidden")
            }
            else{
                this.Show_more_btn.classList.remove("hidden")
            }
        }
        
        
        #return_next() : Array<project_data_class>{
            let last_index = this.current_index + this.add_amount;
            last_index = last_index > this.req_data.length ? this.req_data.length : last_index;

            return this.req_data.slice(this.current_index, last_index);
        }
    }

    async function manage_show_more(json_path:string, show_more_btn_id:string,
        show_less_btn_id:string, parent_of_items:string,
        elements_adder:(req_data:Array<project_data_class>, parent:HTMLElement) => Array<HTMLElement>,
        load_amount:number = 4)
    {
        var response = await fetch(json_path);
        let res_ar:Array<project_data_class> = await response.json();

        let show_more_btn = document.getElementById(show_more_btn_id)! as HTMLButtonElement;
        let show_less_btn = document.getElementById(show_less_btn_id)! as HTMLButtonElement;
        let parent = document.getElementById(parent_of_items)!;

        let manager_class = new loader_element_class(show_more_btn, show_less_btn,
                elements_adder, parent, res_ar, load_amount);

        manager_class.initialize_element();
            
    }
    
    return{
        manage_show_more:manage_show_more
    }
})();