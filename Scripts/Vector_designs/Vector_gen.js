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
    let current_index = 0;
    let add_counter;
    let parent;
    var res_ar;
    let elements_added_array = [];
    function load_designs() {
        let elements_added = 0;
        for (current_index; current_index < res_ar.length; current_index++) {
            if (elements_added >= add_counter) {
                break;
            }
            load_designs_single(res_ar[current_index]);
            elements_added++;
        }
    }
    function load_designs_single(itm) {
        // let elements_added = 0;
        // for (current_index; current_index < res_ar.length; current_index++) {
        //     if(elements_added >= add_counter){
        //         break;
        //     }
        let vector_grid_item = document.createElement("div");
        vector_grid_item.classList.add("vector_grid_item", "set_custom_style");
        parent.appendChild(vector_grid_item);
        let main_img = document.createElement("img");
        main_img.classList.add("main_img", "set_custom_style");
        main_img.src = itm.img_path[0];
        main_img.alt = "";
        if (itm.custom_style != null) {
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
        back_img.src = itm.img_path[0];
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
        normal_link.textContent = "View Design";
        links.appendChild(normal_link);
        let cu_ind = current_index;
        normal_link.addEventListener("click", () => viewer_manager.open_viewer(itm, cu_ind, get_data_count(), get_data_for_index));
        // elements_added++;
        elements_added_array.push(vector_grid_item);
        // }
    }
    function on_scroll() {
        // load_designs();
        let bounding_rect = elements_added_array[elements_added_array.length - 1].getBoundingClientRect();
        let prev_bounding_rect = elements_added_array[elements_added_array.length - 2].getBoundingClientRect();
        let inner_win = window.innerWidth;
        if (bounding_rect.x - inner_win <= -(bounding_rect.width / 2)) {
            if (current_index >= res_ar.length) {
                return;
            }
            else {
                load_designs_single(get_data_for_index(current_index));
            }
            current_index++;
        }
        else if (prev_bounding_rect.x - inner_win >= 0 && elements_added_array.length > add_counter) {
            parent.removeChild(elements_added_array[elements_added_array.length - 1]);
            elements_added_array.pop();
            current_index--;
        }
        // console.log(bounding_rect.x - window.innerWidth + " " + bounding_rect.width/2);
    }
    function get_data_count() {
        return res_ar.length;
    }
    function get_data_for_index(index) {
        return res_ar[index];
    }
    function generate(file_path_1, id_1, left_btn_query_1, right_btn_query_1) {
        return __awaiter(this, arguments, void 0, function* (file_path, id, left_btn_query, right_btn_query, add_c = 4) {
            var response = yield fetch(file_path);
            let res_ar_c = yield response.json();
            res_ar = [];
            res_ar_c.forEach(x => { res_ar.push(converter_project_data_class.converter(x)); });
            add_counter = add_c;
            parent = document.querySelector(`#${id}`);
            add_def_viewer_btn();
            document.querySelector(left_btn_query).addEventListener("click", () => parent.scrollBy(-150, 0));
            document.querySelector(right_btn_query).addEventListener("click", () => parent.scrollBy(150, 0));
            load_designs();
            parent.addEventListener("scroll", on_scroll);
        });
    }
    function add_def_viewer_btn() {
        res_ar.forEach(x => {
            if (x.viewer_btns == null) {
                x.viewer_btns = [];
            }
            x.viewer_btns.push({ label: "Need a designer? Let's talk!", action: "mailto:realinspirer@outlook.com" });
        });
    }
    return {
        generate: generate,
        get_data_count: get_data_count,
        get_data_for_index: get_data_for_index
    };
})();
