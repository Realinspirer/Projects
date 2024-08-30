"use strict";
const element_removed_event_for_scroll = new Event("element_removed_event_for_scroll");
const auto_scroll_sc_manager = (function () {
    function Hook_for_auto_scroll(main_scroller, child_query = ".main_img", switched_invoker = null, indicator_parent = null, indicator_generator = null, interval = 1000, random_time_start = 3, random_time_end = 8, interval_invoker = null) {
        class Child_and_indi_class {
            constructor(element, indicator) {
                this.element = element;
                this.indicator = indicator;
            }
        }
        let index = 0;
        let child_array = main_scroller.querySelectorAll(child_query);
        if (child_array.length <= 1) {
            if (indicator_parent != null) {
                indicator_parent.textContent = "";
            }
            return;
        }
        let Child_with_indi = [];
        let just_indi = [];
        let threshold = (Math.random() * (random_time_end - random_time_start) + random_time_start) * 1000;
        // console.log(threshold);
        let timer = 0;
        let indi_index = 0;
        if (indicator_parent != null && indicator_generator != null) {
            indicator_parent.textContent = "";
            child_array.forEach(itm => {
                let indi = indicator_generator();
                let ind_clone = indi_index;
                indi.addEventListener("click", () => { scroll_to_item(main_scroller, itm, indi, just_indi, switched_invoker); timer = 0; index = ind_clone; });
                indicator_parent.appendChild(indi);
                Child_with_indi.push({ element: itm, indicator: indi });
                just_indi.push(indi);
                indi_index++;
            });
            if (switched_invoker != null) {
                switched_invoker(just_indi[0], just_indi);
            }
        }
        let invoker = setInterval(() => {
            timer += interval;
            if (interval_invoker != null) {
                interval_invoker(timer / threshold);
            }
            if (timer >= threshold) {
                timer = 0;
                index++;
                if (index >= child_array.length) {
                    index = 0;
                }
                if (Child_with_indi.length > 0) {
                    Child_with_indi[index].indicator.click();
                }
                else {
                    scroll_to_item(main_scroller, child_array[index], null, null, switched_invoker);
                }
            }
        }, interval);
        main_scroller.addEventListener("element_removed_event_for_scroll", () => clearInterval(invoker));
    }
    function scroll_to_item(main_scroller, element, element_ind, all_inds, switched_invoker) {
        main_scroller.scrollTo(element.offsetLeft, 0);
        if (switched_invoker != null) {
            switched_invoker(element_ind, all_inds);
        }
    }
    return {
        Hook_for_auto_scroll: Hook_for_auto_scroll
    };
})();
