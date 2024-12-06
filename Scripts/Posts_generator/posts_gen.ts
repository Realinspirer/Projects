const posts_blogs_gen_project = (function(){

    return function generate_items(req_data:Array<Data_class_multiple_imgs_btn>,
        parent_selector:string
    )
    {
        let parent = document.querySelector(parent_selector)!;
        let index = 0;
        let count = 3;

        req_data.forEach(data =>{

            if(index >= count){
                return;
            }
            index++;

            let news_section_item = document.createElement("div");
            news_section_item.classList.add("news_section_item", "fading_element_card");
            parent.appendChild(news_section_item);

            let main_img = document.createElement("img");
            main_img.classList.add("main_img");
            
            let back_blur_img = document.createElement("img");
            back_blur_img.classList.add("back_blur_img");

            main_img.alt = "";
            back_blur_img.alt = "";

            if(data.imgs != null && data.imgs.length >= 1){
                main_img.src = data.imgs[0];
                back_blur_img.src = data.imgs[0];
            }
            news_section_item.appendChild(main_img);
            news_section_item.appendChild(back_blur_img);

            let desc_div = document.createElement("div");
            desc_div.classList.add("desc_div");
            news_section_item.appendChild(desc_div);

            let title = document.createElement("h2");
            title.classList.add("title");
            title.textContent = data.title.slice(0,30) + "...";
            desc_div.appendChild(title);

            let date = document.createElement("p");
            date.classList.add("date");
            date.textContent = data.date ?? "";
            desc_div.appendChild(date);

            let desc = document.createElement("p");
            desc.classList.add("desc");
            desc.textContent = (data.subtitle?.slice(0,120) ?? "") + "...";
            desc_div.appendChild(desc);

            let links_wrapper = document.createElement("div");
            links_wrapper.classList.add("links_wrapper");
            desc_div.appendChild(links_wrapper);

            let links = document.createElement("div");
            links.classList.add("links");
            links_wrapper.appendChild(links);

            let post_link = document.createElement("a");
            post_link.classList.add("normal_link");
            post_link.textContent = "Read Post";

            let target_href = new URLSearchParams();
            target_href.append("title", data.title);
            let req_url = window.location.protocol + '//' + window.location.host + "/Blogs/" + "?" + target_href;
            post_link.href = req_url;

            links.appendChild(post_link);

            let btn_index = 0;
            let btn_count = 2;
            data.btns?.forEach(btn => {
                btn_index++;
                if(btn_index < btn_count){
                    let normal_link = document.createElement("a");
                    normal_link.classList.add("normal_link");
                    normal_link.textContent = btn.btn_string ?? "";
                    if(btn.click_url != null){
                        normal_link.href = btn.click_url;
                    }
                    if(btn.external){
                        normal_link.target = "_blank"
                        normal_link.rel = "noopener";
                    }
                    links.appendChild(normal_link);
                }
            });


        });
    }

})();