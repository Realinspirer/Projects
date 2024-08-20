class project_vector_img_class{
    img_path:string ;
    title:string;
    desc:string;
    date:string;
    custom_style?:string|null;

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
const Generate_vector_designs_section = (function(){

    let current_index = 0;
    let add_counter:number;
    let parent:HTMLElement;
    var res_ar:Array<project_vector_img_class>;

    let elements_added_array:Array<HTMLElement> = [];
    
    function load_designs(){
        let elements_added = 0;
        for (current_index; current_index < res_ar.length; current_index++) {

            if(elements_added >= add_counter){
                break;
            }

            const itm = res_ar[current_index];

            let vector_grid_item = document.createElement("div");
            vector_grid_item.classList.add("vector_grid_item");
            parent.appendChild(vector_grid_item);
            
            let main_img = document.createElement("img");
            main_img.classList.add("main_img");
            main_img.src = itm.img_path;
            main_img.alt = "";

            if(itm.custom_style != null){
                main_img.style.cssText = itm.custom_style;
                vector_grid_item.style.cssText = itm.custom_style;
            }
            vector_grid_item.appendChild(main_img);


            let desc_div = document.createElement("div");
            desc_div.classList.add("desc_div");
            vector_grid_item.appendChild(desc_div);

            let grad = document.createElement("div");
            grad.classList.add("grad");
            desc_div.appendChild(grad);

            let back_img = document.createElement("img");
            back_img.src = itm.img_path;
            back_img.alt = "";
            grad.appendChild(back_img);

            let gradient = document.createElement("div");
            gradient.classList.add("gradient");
            desc_div.appendChild(gradient);

            let date = document.createElement("p");
            date.classList.add("date");
            date.textContent = itm.date;
            desc_div.appendChild(date);

            let title = document.createElement("h2");
            title.classList.add("title");
            title.textContent = itm.title;
            desc_div.appendChild(title);

            let links_wrapper = document.createElement("div");
            links_wrapper.classList.add("links_wrapper");
            desc_div.appendChild(links_wrapper);
            
            let links = document.createElement("div");
            links.classList.add("links");
            links_wrapper.appendChild(links);

            let normal_link = document.createElement("button");
            normal_link.type = "button";
            normal_link.classList.add("normal_link");
            normal_link.textContent = "View Design"
            links.appendChild(normal_link);

            let cu_ind = current_index;
            normal_link.addEventListener("click", () => viewer_manager.open_viewer(itm, cu_ind));
            
            elements_added++;
            
        }
    }
    function get_data_count(){
        return res_ar.length;
    }
    function get_data_for_index(index:number){
        return res_ar[index];
    }
    
    async function generate(file_path:string, id:string, left_btn_query:string, right_btn_query:string, add_c:number=4){
            
        var response = await fetch(file_path);
        res_ar = await response.json();
        add_counter = add_c;
        parent = document.querySelector(`#${id}`)!;

        document.querySelector<HTMLButtonElement>(left_btn_query)!.addEventListener("click", () => parent.scrollBy(-150, 0));
        document.querySelector<HTMLButtonElement>(right_btn_query)!.addEventListener("click", () => parent.scrollBy(150, 0));
        
        load_designs();
    }

    return {
        generate: generate,
        get_data_count: get_data_count,
        get_data_for_index: get_data_for_index
    }
    
})();