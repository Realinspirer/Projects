const game_assets_generator = (function(){

    return function add_to_parent(data:Array<project_data_class>, parent:HTMLElement) : Array<HTMLElement>{

        let to_return:Array<HTMLElement> = [];
        data.forEach(itm => {
            let asset_item = document.createElement("div");
            asset_item.classList.add("asset_item", "fading_element_card");
            parent.appendChild(asset_item);
            to_return.push(asset_item);

            let img_div = document.createElement("div");
            img_div.classList.add("img_div");
            asset_item.appendChild(img_div);

            let main_img = document.createElement("img");
            main_img.classList.add("main_img", "overlap", "top_img");
            main_img.src = itm.img_path;
            main_img.alt = "Asset Cover";
            img_div.appendChild(main_img);

            let blur_img = document.createElement("img");
            blur_img.classList.add("blur_img", "overlap");
            blur_img.src = itm.img_path;
            blur_img.alt = "";
            img_div.appendChild(blur_img);

            let desc_div = document.createElement("desc_div");
            desc_div.classList.add("desc_div");
            asset_item.appendChild(desc_div);

            let date = document.createElement("p");
            date.classList.add("date");
            date.textContent = itm.date;
            desc_div.appendChild(date);

            let title = document.createElement("h2");
            title.classList.add("title");
            title.textContent = itm.title;
            desc_div.appendChild(title);

            let desc = document.createElement("p");
            desc.classList.add("desc");
            desc.textContent = itm.desc;
            desc_div.appendChild(desc);

            let links_wrapper = document.createElement("div");
            links_wrapper.classList.add("links_wrapper");
            desc_div.appendChild(links_wrapper);

            let links = document.createElement("div");
            links.classList.add("links");
            links_wrapper.appendChild(links);

            itm.buttons?.forEach(btn => {
                let normal_link = document.createElement("button");
                normal_link.classList.add("normal_link");
                normal_link.type = "button";
                normal_link.textContent = btn.label ? btn.label : "";
                if(btn.action != null){
                    normal_link.addEventListener("click", () => Manage_action_string(btn.action!));
                }
                links.appendChild(normal_link);
            });

        });

        return to_return;
    }

})();


function Manage_action_string(action:string){
    console.log(action);
}