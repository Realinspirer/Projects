"use strict";
const posts_blogs_gen_project = (function () {
    return function generate_items(req_data, parent_selector) {
        let parent = document.querySelector(parent_selector);
        let index = 0;
        let count = 3;
        req_data.forEach(data => {
            var _a, _b, _c;
            if (index >= count) {
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
            if (data.imgs != null && data.imgs.length >= 1) {
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
            title.textContent = data.title;
            desc_div.appendChild(title);
            let date = document.createElement("p");
            date.classList.add("date");
            date.textContent = (_a = data.date) !== null && _a !== void 0 ? _a : "";
            desc_div.appendChild(date);
            let desc = document.createElement("p");
            desc.classList.add("desc");
            desc.textContent = (_b = data.subtitle) !== null && _b !== void 0 ? _b : "";
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
            (_c = data.btns) === null || _c === void 0 ? void 0 : _c.forEach(btn => {
                var _a;
                btn_index++;
                if (btn_index < btn_count) {
                    let normal_link = document.createElement("a");
                    normal_link.classList.add("normal_link");
                    normal_link.textContent = (_a = btn.btn_string) !== null && _a !== void 0 ? _a : "";
                    if (btn.click_url != null) {
                        normal_link.href = btn.click_url;
                    }
                    if (btn.external) {
                        normal_link.target = "_blank";
                        normal_link.rel = "noopener";
                    }
                    links.appendChild(normal_link);
                }
            });
        });
    };
})();
