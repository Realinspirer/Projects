class project_data_class_multiple_imgs{
    img_path:Array<string>;
    title:string;
    desc:string;
    date:string;
    custom_style?:string|null;
    buttons?:Array<project_btn_class>|null;

    constructor(img_path:Array<string>, title:string, desc:string, date:string,
        custom_style?:string|null
    ){
        this.img_path = img_path;
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.custom_style = custom_style;

    }
}
const manager_3d = (function(){
    
    function Generate_3D_item(data:Array<project_data_class_multiple_imgs>, parent:HTMLElement):Array<HTMLElement>{
        let added_items:Array<HTMLElement> = []

        data.forEach(itm =>{
            let item_3d_parent = document.createElement("div");
            item_3d_parent.classList.add("item_3d_parent");
            if(itm.custom_style != null){
                item_3d_parent.classList.add(...itm.custom_style.split(" "));
            }
            parent.appendChild(item_3d_parent);
            added_items.push(item_3d_parent);

            let item_3d = document.createElement("div");
            item_3d.classList.add("item_3d", "fading_element_card");
            item_3d_parent.appendChild(item_3d);

            itm.img_path.forEach(path =>{
                let main_img = document.createElement("img");
                main_img.src = path;
                main_img.alt = "Project cover";
                main_img.classList.add("main_img");

                item_3d.appendChild(main_img);
            });

            let item_desc_parent = document.createElement("div");
            item_desc_parent.classList.add("item_desc_parent");
            item_3d_parent.appendChild(item_desc_parent);

            let item_desc = document.createElement("item_desc");
            item_desc.classList.add("item_desc");
            item_desc_parent.appendChild(item_desc);

            let title = document.createElement("h2");
            title.textContent = itm.title;
            title.classList.add("title");
            item_desc.appendChild(title);

            let date = document.createElement("p");
            date.textContent = itm.date;
            date.classList.add("date");
            item_desc.appendChild(date);

            let desc = document.createElement("p");
            desc.textContent = itm.desc;
            desc.classList.add("desc");
            item_desc.appendChild(desc);

            let links = document.createElement("div");
            links.classList.add("links");
            item_desc.appendChild(links);

            itm.buttons?.forEach(btn =>{
               let normal_link = document.createElement("button");
               normal_link.type = "button";
               if(btn.label != null){
                normal_link.textContent = btn.label;
               }
               normal_link.classList.add("normal_link");
               links.appendChild(normal_link);
            });

            let scroll_indicators = document.createElement("div");
            scroll_indicators.classList.add("scroll_indicators");
            item_3d_parent.appendChild(scroll_indicators);


        });

        added_items.forEach((sc_parent) =>{
                auto_scroll_sc_manager.Hook_for_auto_scroll(sc_parent.querySelector<HTMLElement>(".item_3d")!, ".main_img", 
                (x, y) => { y?.forEach(el => el.classList.remove("active")); x?.classList.add("active");}, sc_parent.querySelector<HTMLElement>(".scroll_indicators"),
                () => { 
                    let indi = document.createElement("div");
                    indi.classList.add("indi");
                    return indi;
                });
        });

        return added_items;
    }

    function removed_element(parent_of_items:HTMLElement){
        parent_of_items.querySelector(".item_3d")!.dispatchEvent(element_removed_event_for_scroll);
    }

    return{
        Generate_3D_item:Generate_3D_item,
        removed_element:removed_element
    }
})();