"use strict";
const manager_3d = (function () {
    function create_main_img_and_add(path, item_3d) {
        let main_img = document.createElement("img");
        main_img.src = path;
        main_img.alt = "Project cover";
        main_img.classList.add("main_img");
        item_3d.appendChild(main_img);
    }
    function Generate_3D_item(data, parent) {
        let added_items = [];
        let custom_styles = ["c2 small_9", "r2 desc_down small_82 desc_just_midd scroll_down",
            "desc_down desc_just_midd small_7 scroll_down", "desc_down desc_just_midd small_7 scroll_down"
        ];
        let style_ind = 0;
        let items_count = 0;
        let items_limit = 4; //need to change/add custom styles if changing
        data.forEach(itm => {
            // let itm = converter_project_data_class.converter(itm_raw);
            var _a, _b, _c, _d;
            if (!(items_count >= items_limit)) {
                let item_3d_parent = document.createElement("div");
                item_3d_parent.classList.add("item_3d_parent");
                item_3d_parent.classList.add(...custom_styles[style_ind].split(" "));
                style_ind++;
                if (style_ind >= custom_styles.length) {
                    style_ind = custom_styles.length - 1;
                }
                parent.appendChild(item_3d_parent);
                added_items.push(item_3d_parent);
                let item_3d = document.createElement("div");
                item_3d.classList.add("item_3d", "fading_element_card");
                item_3d_parent.appendChild(item_3d);
                // if((<Array<string>>(itm.img_path)).forEach){
                (_a = itm.imgs) === null || _a === void 0 ? void 0 : _a.forEach(path => {
                    create_main_img_and_add(path, item_3d);
                });
                // }
                // else{
                //     create_main_img_and_add(itm.img_path[0], item_3d);
                // }
                let item_desc_parent = document.createElement("div");
                item_desc_parent.classList.add("item_desc_parent");
                item_3d_parent.appendChild(item_desc_parent);
                let item_desc = document.createElement("item_desc");
                item_desc.classList.add("item_desc");
                item_desc_parent.appendChild(item_desc);
                let title = document.createElement("h2");
                title.textContent = itm.title.slice(0, 25) + "...";
                title.classList.add("title");
                item_desc.appendChild(title);
                let date = document.createElement("p");
                date.textContent = (_b = itm.date) !== null && _b !== void 0 ? _b : "";
                date.classList.add("date");
                item_desc.appendChild(date);
                let desc = document.createElement("p");
                desc.textContent = ((_d = (_c = itm.subtitle) === null || _c === void 0 ? void 0 : _c.slice(0, 55)) !== null && _d !== void 0 ? _d : "") + "...";
                desc.classList.add("desc");
                item_desc.appendChild(desc);
                let links = document.createElement("div");
                links.classList.add("links");
                item_desc.appendChild(links);
                let normal_link = document.createElement("a");
                normal_link.textContent = "Read Post";
                let target_href = new URLSearchParams();
                target_href.append("title", itm.title);
                let req_url = "/Blogs/" + "?" + target_href;
                normal_link.href = req_url;
                normal_link.classList.add("normal_link");
                links.appendChild(normal_link);
                let scroll_indicators = document.createElement("div");
                scroll_indicators.classList.add("scroll_indicators");
                item_3d_parent.appendChild(scroll_indicators);
                items_count++;
            }
        });
        added_items.forEach((sc_parent) => {
            auto_scroll_sc_manager.Hook_for_auto_scroll(sc_parent.querySelector(".item_3d"), ".main_img", (x, y) => { y === null || y === void 0 ? void 0 : y.forEach(el => el.classList.remove("active")); x === null || x === void 0 ? void 0 : x.classList.add("active"); }, sc_parent.querySelector(".scroll_indicators"), () => {
                let indi = document.createElement("div");
                indi.classList.add("indi");
                return indi;
            });
        });
        // return added_items;
    }
    function removed_element(parent_of_items) {
        parent_of_items.querySelector(".item_3d").dispatchEvent(element_removed_event_for_scroll);
    }
    return {
        Generate_3D_item: Generate_3D_item,
        removed_element: removed_element
    };
})();
