"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Generate_vector_designs_section = (function () {
    class project_vector_img_class {
        constructor() {
            this.img_path = "";
            this.title = "";
            this.desc = "";
            this.date = new Date().toDateString();
        }
    }
    let current_index = 0;
    let add_counter;
    let parent;
    let load_btn;
    let unload_btn;
    var res_ar;
    let elements_added_array = [];
    function load_designs() {
        let elements_added = 0;
        for (current_index; current_index < res_ar.length; current_index++) {
            if (elements_added >= add_counter) {
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
            if (cus_style != null) {
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
            if (desc_text.length >= threshold) {
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
            main_link.textContent = "Show design";
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
    function btn_checker() {
        let len = elements_added_array.length;
        if (len <= add_counter) {
            load_btn.classList.remove("hidden");
            unload_btn.classList.add("hidden");
        }
        if (len > add_counter) {
            unload_btn.classList.remove("hidden");
            load_btn.classList.remove("hidden");
        }
        if (len >= res_ar.length) {
            load_btn.classList.add("hidden");
            unload_btn.classList.remove("hidden");
        }
    }
    function unload_designs() {
        let elements_removed = 0;
        for (current_index; current_index > 0; current_index--) {
            if (elements_removed >= add_counter) {
                break;
            }
            let to_remove = elements_added_array.pop();
            if (to_remove != null) {
                parent.removeChild(to_remove);
            }
            else {
                console.warn("Popped element was undefined!");
            }
            elements_removed++;
            btn_checker();
        }
    }
    return {
        generate(file_path_1, id_1, load_more_btn_1, unload_btn_id_1) {
            return __awaiter(this, arguments, void 0, function* (file_path, id, load_more_btn, unload_btn_id, add_c = 4) {
                var response = yield fetch(file_path);
                res_ar = yield response.json();
                add_counter = add_c;
                parent = document.querySelector(`#${id}`);
                load_btn = document.getElementById(load_more_btn);
                unload_btn = document.getElementById(unload_btn_id);
                load_designs();
                load_btn.addEventListener("click", () => load_designs());
                unload_btn.addEventListener("click", () => unload_designs());
            });
        }
    };
})();
