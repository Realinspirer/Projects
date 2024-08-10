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
    let load_btn:HTMLElement;
    let unload_btn:HTMLElement;
    var res_ar:Array<project_vector_img_class>;

    let elements_added_array:Array<HTMLElement> = [];
    
    function load_designs(){
        let elements_added = 0;
        for (current_index; current_index < res_ar.length; current_index++) {

            if(elements_added >= add_counter){
                break;
            }

            const itm = res_ar[current_index];

            let fading_parent = document.createElement("div");
            fading_parent.classList.add("fading_element_card");
            parent.appendChild(fading_parent);
            elements_added_array.push(fading_parent);

            let item = document.createElement("div");
            item.classList.add("vector_grid_item");
            fading_parent.appendChild(item);

            let img_desc = document.createElement("div");
            img_desc.classList.add("img_desc");
            item.appendChild(img_desc);

            let main_img = document.createElement("img");
            main_img.classList.add("main_img");
            
            let cus_style = itm.custom_style;
            if(cus_style != null){
                main_img.setAttribute("style", cus_style);
            }

            let back_blur_img = document.createElement("img");
            back_blur_img.classList.add("back_blur_img");
            
            main_img.alt = back_blur_img.alt = "";
            main_img.src = back_blur_img.src = itm.img_path;
            img_desc.appendChild(main_img);
            img_desc.appendChild(back_blur_img);

            let date_title_par = document.createElement("div");
            img_desc.appendChild(date_title_par);

            let date_text = document.createElement("p");
            date_text.classList.add("date");
            date_text.textContent = itm.date;
            let title_text = document.createElement("h1");
            title_text.classList.add("title");
            // title_text.contentEditable = "true"; ///////////////
            title_text.textContent = itm.title;
            date_title_par.appendChild(date_text);
            date_title_par.appendChild(title_text);

            let desc_div = document.createElement("div");
            desc_div.classList.add("desc_div");
            item.appendChild(desc_div);

            let desc = document.createElement("p");
            desc.classList.add("desc");
            // desc.contentEditable = "true"; ///////////////
            let desc_text = itm.desc;

            let threshold = 140;
            if(desc_text.length >= threshold){
                desc_text = desc_text.substring(0, threshold) + "...";
            }
            desc.textContent = desc_text;
            desc_div.appendChild(desc);


            let links_wrapper = document.createElement("div");
            links_wrapper.classList.add("links_wrapper");
            desc_div.appendChild(links_wrapper);
            
            let links = document.createElement("div");
            links.classList.add("links");
            links_wrapper.appendChild(links);

            let main_link = document.createElement("button");
            main_link.type = "button";
            main_link.classList.add("normal_link");
            main_link.textContent = "Show design"

            let cu = current_index
            main_link.addEventListener("click", () => viewer_manager.open_viewer(itm, cu));
            // main_link.href = "#"; ///////////////////////////////////
            links.appendChild(main_link);
            

            elements_added++;

            btn_checker();
            // if(current_index < add_counter){
            //     unload_btn.classList.add("hidden");
            // }
            // else{
            //     unload_btn.classList.remove("hidden");
            // }
            
            // if(current_index >= res_ar.length - 1){
            //     load_btn.classList.add("hidden");
            // }
            
        }
    }
    function get_data_count(){
        return res_ar.length;
    }
    function get_data_for_index(index:number){
        return res_ar[index];
    }

    function btn_checker(){
        let len = elements_added_array.length;
        if(len <= add_counter){
            load_btn.classList.remove("hidden");
            unload_btn.classList.add("hidden");
        }
        if(len > add_counter){
            unload_btn.classList.remove("hidden");
            load_btn.classList.remove("hidden");
        }
        if(len >= res_ar.length){
            load_btn.classList.add("hidden");
            unload_btn.classList.remove("hidden");
        }
    }
    
    function unload_designs(){
        let elements_removed = 0;
        for (current_index; current_index > 0; current_index--) 
        {
            if(elements_removed >= add_counter){
                break;
            }

            let to_remove = elements_added_array.pop();
            if(to_remove != null){
                parent.removeChild(to_remove);
            }
            else{
                console.warn("Popped element was undefined!");
            }
            
            elements_removed++;
            btn_checker();
        }
    }
    async function generate(file_path:string, id:string, load_more_btn:string, unload_btn_id:string, add_c:number=4){
            
        var response = await fetch(file_path);
        res_ar = await response.json();
        add_counter = add_c;
        
        parent = document.querySelector(`#${id}`)!;
        load_btn = document.getElementById(load_more_btn)!;
        unload_btn = document.getElementById(unload_btn_id)!;

        load_designs();
        load_btn.addEventListener("click", () => load_designs());
        unload_btn.addEventListener("click", () => unload_designs());
    }

    return {
        generate: generate,
        get_data_count: get_data_count,
        get_data_for_index: get_data_for_index
    }

    
})();