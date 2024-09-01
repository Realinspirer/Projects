class project_btn_class{
    label?:string|null;
    action?:string|null;
    additional_info?:Array<string>|null;
}
class converter_project_data_class{
    img_path:Array<string>|string;
    viewer_img?:Array<string>|string|null;
    title:string;
    desc:string;
    date:string;
    custom_style?:string|null;
    buttons?:Array<project_btn_class>|null;
    viewer_btns?:Array<project_btn_class>|null;
    viewer_custom_style?:string|null;

    constructor(img_path:Array<string>, title:string, desc:string, date:string,
        custom_style?:string|null, buttons?:Array<project_btn_class>|null,
        viewer_img?:Array<string>|null, viewer_btns?:Array<project_btn_class>|null,
        viewer_custom_style?:string|null
    ){
        this.img_path = img_path;
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.custom_style = custom_style;
        this.buttons = buttons;
        this.viewer_img = viewer_img;
        this.viewer_btns = viewer_btns;
        this.viewer_custom_style = viewer_custom_style;
    }
    
    static converter(data:converter_project_data_class):project_data_class{
        let im_paths:Array<string>;
        let vi_path:Array<string>|null = null;
        
        if((<Array<string>>data.img_path).forEach){
            im_paths = data.img_path as Array<string>;
        }
        else{
            im_paths = [data.img_path as string]
        }
        
        if(data.viewer_img != null){
            if((<Array<string>>data.viewer_img).forEach){
                vi_path = data.viewer_img as Array<string>;
            }
            else{
                vi_path = [data.viewer_img as string]
            }
        }
        
        return new project_data_class(im_paths, data.title, data.desc, data.date, data.custom_style,
            data.buttons, vi_path, data.viewer_btns, data.viewer_custom_style
        );
    }
}
class project_data_class extends converter_project_data_class{
    img_path:Array<string>;
    viewer_img?:Array<string>|null;

    constructor(img_path:Array<string>, title:string, desc:string, date:string,
        custom_style?:string|null, buttons?:Array<project_btn_class>|null,
        viewer_img?:Array<string>|null, viewer_btns?:Array<project_btn_class>|null,
        viewer_custom_style?:string|null
    ){

        super(img_path, title, desc, date, custom_style, buttons, viewer_img, viewer_btns, viewer_custom_style)
        this.img_path = img_path;
        this.viewer_img = viewer_img;
    }
}


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

    const btns_holder = side_panel.querySelector<HTMLElement>(".btns")!;

    let next_data_fnc:((index:number) => project_data_class)|null = null;
    let using_custom_style = false;
    let anim_side_panel = true;
    let current_data:project_data_class;

    close_btn.addEventListener("click", close_viewer);
    next_btn.addEventListener("click", next_btn_clicked);
    prev_btn.addEventListener("click", prev_btn_clicked);
    window.addEventListener("keydown", (ev) => {
        if(ev.key == "Escape"){
            if(document.documentElement.classList.contains("viewer_active")){
                close_viewer();
            }
        }
    });
    
    


    assign_scroll_data_set();
    main_viewer.addEventListener("scroll", assign_scroll_data_set);
    window.addEventListener("resize", assign_scroll_data_set);

    let current_index:number;
    let total_data:number;
    let multiple_viewer_current_index = 0;

    function assign_scroll_data_set(){
        if(!(main_viewer.scrollHeight > main_viewer.clientHeight)){
            viewer_parent.dataset.scroll_current = "-1";
        }
        else{
            viewer_parent.dataset.scroll_current = main_viewer.scrollTop.toString();
        }
    }

    function open_viewer(data:project_data_class, index:number = 0, data_count:number = 0,
        index_next_fnc:((index:number) => project_data_class)|null = null, 
        use_custom_styling:boolean = false,
        multiple_img_index = 0){
        
        current_index = index;
        using_custom_style = use_custom_styling;
        total_data = data_count;
        next_data_fnc = index_next_fnc;
        multiple_viewer_current_index = multiple_img_index;
        current_data = data;

        if(next_data_fnc == null 
            && (data.viewer_img == null || (data.viewer_img.length <= 1)) 
            && data.img_path.length <= 1){
            next_btn.classList.add("hidden");
            prev_btn.classList.add("hidden");
        }
        else{
            next_btn.classList.remove("hidden");
            prev_btn.classList.remove("hidden");
        }

        btns_holder.textContent = "";
        data.viewer_btns?.forEach(btn =>{
            let normal_button = document.createElement("a");

            let active_action = btn.action;
            if(active_action != null){
                if(active_action.toLowerCase() == "mail"){
                    normal_button.href = "mailto:realinspirer@outlook.com";
                }
                else{
                    normal_button.href = active_action;
                }
            }
            normal_button.classList.add("normal_button");
            normal_button.textContent = btn.label ? btn.label: "";
            
            btns_holder.appendChild(normal_button);
        });

        let imgs_src:string;
        if(data.viewer_img != null){
            imgs_src = data.viewer_img[multiple_viewer_current_index];
        }
        else{
            imgs_src = data.img_path[multiple_viewer_current_index];
        }
        
        let custom_styling:string|null = null;
        if(using_custom_style){
            if(data.viewer_custom_style != null){
                custom_styling = data.viewer_custom_style;
            }
            else if (data.custom_style != null){
                custom_styling = data.custom_style;
            }
        }

        imgs.forEach((im) => 
        { 
            im.src = imgs_src;
            
            if(custom_styling != null){
                im.classList.add("set_custom_style");
                im.style.cssText = custom_styling;
            }
            else{
                im.classList.remove("set_custom_style");
                im.style.cssText = "";
            }
        });
        title.textContent = data.title;
        desc.textContent = data.desc;
        date.textContent = `Uploaded date: ${data.date}`;
        
        viewer_parent.classList.remove("not_visible");
        viewer_parent.classList.remove("hiddens");


        document.documentElement.classList.add("viewer_active");
        main_viewer.scrollTop = 0;

        assign_scroll_data_set();
    }
    function add_not_visible_class(){
        viewer_parent.classList.add("not_visible");
    }
    function close_viewer(){
        viewer_parent.classList.add("hiddens");
        document.documentElement.classList.remove("viewer_active");

        setTimeout(() => {
            add_not_visible_class();
        }, 800);
        // assign_scroll_data_set();
    }

    let on_scroll = false;
    let add_amount = 0;
    function next_btn_clicked(){
        if(on_scroll) return;
        on_scroll = true;
        
        add_amount = 1;
        img_scroll_get_ready();
        
        if(anim_side_panel){
            viewer_parent.classList.add("faded");
        }
        else{
            viewer_parent.classList.add("faded_just_img")
        }
        viewer_parent.addEventListener("transitionend", img_scroll_anim);
    }
    let next_data:project_data_class;
    function img_scroll_get_ready(){
        let imgs_list:number;
        if(current_data.viewer_img != null){
            imgs_list = current_data.viewer_img.length;
        }
        else{
            imgs_list = current_data.img_path.length;
        }
        
        if(imgs_list > 1){
            multiple_viewer_current_index += add_amount;
            if(next_data_fnc != null){
                if(multiple_viewer_current_index >= 0 &&
                    multiple_viewer_current_index < imgs_list)
                {
                    anim_side_panel = false;
                    next_data = current_data;
                    return;
                }
            }
            else{
                check_for_overflow_multiple(imgs_list);
                anim_side_panel = false;
                next_data = current_data;
               return;
            }
        }
        
        if(next_data_fnc == null) return;
    
        current_index += add_amount;
        check_for_overflow();
        let req_data = next_data_fnc(current_index);
        
        multiple_viewer_current_index = 0;
        if(add_amount < 0){
            multiple_viewer_current_index = req_data.viewer_img != null ? req_data.viewer_img.length - 1 
                    : req_data.img_path.length - 1
            console.log(multiple_viewer_current_index + " sep " + req_data.img_path.length);
        }
    
        anim_side_panel = true;
        next_data = req_data;
    }
    function img_scroll_anim(){
        open_viewer(next_data, current_index, total_data, next_data_fnc,
                 using_custom_style, multiple_viewer_current_index);

        scroll_end_things();
        
    }
    function scroll_end_things(){
        viewer_parent.removeEventListener("transitionend", img_scroll_anim);

        viewer_parent.classList.remove("faded");
        viewer_parent.classList.remove("faded_just_img");
        on_scroll = false
    }

    function prev_btn_clicked(){
        if(on_scroll) return;
        on_scroll = true;
        
        add_amount = -1;
        
        img_scroll_get_ready();
        
        if(anim_side_panel){
            viewer_parent.classList.add("faded");
        }
        else{
            viewer_parent.classList.add("faded_just_img")
        }
        viewer_parent.addEventListener("transitionend", img_scroll_anim);
    }
    function check_for_overflow(){
        let length = total_data;
        if(current_index >= length){
            current_index = 0;
        }
        if(current_index < 0){
            current_index = length - 1;
        }
    }
    function check_for_overflow_multiple(length:number){
        if(multiple_viewer_current_index >= length){
            multiple_viewer_current_index = 0;
        }
        if(multiple_viewer_current_index < 0){
            multiple_viewer_current_index = length - 1;
        }
    }
    return{
        open_viewer:open_viewer,
    }
    
})();
