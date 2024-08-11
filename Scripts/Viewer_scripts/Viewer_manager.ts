const viewer_manager = (function (){
    const main_viewer = document.getElementById("viewer_main_div")!;
    const viewer_parent = document.getElementById("viewer_parent")!;
    const side_panel = document.getElementById("viewer_side_panel")!;

    const close_btn = viewer_parent.querySelector<HTMLElement>(".close_btn")!;
    const title = side_panel.querySelector<HTMLElement>(".title")!;
    const desc = side_panel.querySelector<HTMLElement>(".desc")!;
    const date = side_panel.querySelector<HTMLElement>(".date")!;
    const imgs = [main_viewer.querySelector<HTMLImageElement>(".main_img")!, 
                    main_viewer.querySelector<HTMLImageElement>(".back_blur_img")!];

    const next_btn = side_panel.querySelector<HTMLButtonElement>("#viewer_next_btn")!;
    const prev_btn = side_panel.querySelector<HTMLButtonElement>("#viewer_prev_btn")!;

    close_btn.addEventListener("click", close_viewer);
    next_btn.addEventListener("click", next_btn_clicked);
    prev_btn.addEventListener("click", prev_btn_clicked);
    
    


    assign_scroll_data_set();
    main_viewer.addEventListener("scroll", assign_scroll_data_set);
    main_viewer.addEventListener("resize", assign_scroll_data_set);

    let current_index:number;

    function assign_scroll_data_set(){
        if(!(main_viewer.scrollHeight > main_viewer.clientHeight)){
            viewer_parent.dataset.scroll_current = "-1";
        }
        else{
            viewer_parent.dataset.scroll_current = main_viewer.scrollTop.toString();
        }
    }

    function open_viewer(data:project_vector_img_class, index:number){
        
        current_index = index;
        
        imgs.forEach((im) => im.src = data.img_path);
        title.textContent = data.title;
        desc.textContent = data.desc;
        date.textContent = `Uploaded date: ${data.date}`;
        
        viewer_parent.classList.remove("not_visible");
        viewer_parent.classList.remove("hiddens");


        document.documentElement.classList.add("viewer_active");
        main_viewer.scrollTop = 0;

        assign_scroll_data_set();
    }

    function add_not_visible_class(ev:TransitionEvent){
        if(<HTMLElement>(ev.target) == viewer_parent){
            viewer_parent.classList.add("not_visible");
            viewer_parent.removeEventListener("transitionend", add_not_visible_class);
        }
        
        
    }
    function close_viewer(){
        viewer_parent.classList.add("hiddens");
        document.documentElement.classList.remove("viewer_active");

        viewer_parent.addEventListener("transitionend", add_not_visible_class);
        assign_scroll_data_set();
    }

    let on_scroll = false;
    function next_btn_clicked(){
        if(on_scroll) return;
        on_scroll = true;
        current_index++;
        check_for_overflow();
        
        viewer_parent.classList.add("faded");
        viewer_parent.addEventListener("transitionend", img_scroll_anim);
    }
    function img_scroll_anim(){
        
        let req_data = Generate_vector_designs_section.get_data_for_index(current_index);
        open_viewer(req_data, current_index);

        viewer_parent.removeEventListener("transitionend", img_scroll_anim);

        viewer_parent.classList.remove("faded");
        on_scroll = false
    }

    function prev_btn_clicked(){
        if(on_scroll) return;
        on_scroll = true;
        current_index--;
        check_for_overflow();
        
        viewer_parent.classList.add("faded");
        viewer_parent.addEventListener("transitionend", img_scroll_anim);
    }
    function check_for_overflow(){
        let length = Generate_vector_designs_section.get_data_count();
        if(current_index >= length){
            current_index = 0;
        }
        if(current_index < 0){
            current_index = length - 1;
        }
    }
    return{
        open_viewer:open_viewer
    }
    
})();
