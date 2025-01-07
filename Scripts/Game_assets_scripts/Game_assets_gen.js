"use strict";
const game_assets_generator = (function () {
    return function add_to_parent(data, parent) {
        let to_return = [];
        data.forEach(itm_raw => {
            var _a;
            let itm = converter_project_data_class.converter(itm_raw);
            let asset_item_parent = document.createElement("div");
            asset_item_parent.classList.add("asset_item_parent");
            parent.appendChild(asset_item_parent);
            to_return.push(asset_item_parent);
            let asset_item = document.createElement("div");
            asset_item.classList.add("asset_item", "fading_element_card");
            asset_item_parent.appendChild(asset_item);
            let img_div = document.createElement("div");
            img_div.classList.add("img_div");
            asset_item.appendChild(img_div);
            let main_img = document.createElement("img");
            main_img.classList.add("main_img", "overlap", "top_img", "set_custom_style");
            main_img.src = itm.img_path[0];
            main_img.alt = "Asset Cover";
            img_div.appendChild(main_img);
            let blur_img = document.createElement("img");
            blur_img.classList.add("blur_img", "overlap", "set_custom_style");
            if (itm.custom_style != null) {
                main_img.style.cssText = itm.custom_style;
                blur_img.style.cssText = itm.custom_style;
            }
            blur_img.src = itm.img_path[0];
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
            desc.textContent = itm.desc.substring(0, 80) + "...";
            desc_div.appendChild(desc);
            let links_wrapper = document.createElement("div");
            links_wrapper.classList.add("links_wrapper");
            desc_div.appendChild(links_wrapper);
            let links = document.createElement("div");
            links.classList.add("links");
            links_wrapper.appendChild(links);
            (_a = itm.buttons) === null || _a === void 0 ? void 0 : _a.forEach(btn => {
                let normal_link = document.createElement("button");
                normal_link.classList.add("normal_link");
                normal_link.type = "button";
                normal_link.textContent = btn.label ? btn.label : "";
                if (btn.action != null) {
                    normal_link.addEventListener("click", () => Manage_action_string(btn.action, itm, btn.additional_info));
                }
                links.appendChild(normal_link);
            });
        });
        return to_return;
    };
    function Manage_action_string(action, data, add_info) {
        if (action.toLowerCase() == "viewer") {
            viewer_manager.open_viewer(data, ...[, , ,], true);
        }
        else {
            let open_arg = add_info ? (add_info[0].includes("self") ? "_self" : "") : "";
            window.open(action, open_arg);
        }
    }
})();
