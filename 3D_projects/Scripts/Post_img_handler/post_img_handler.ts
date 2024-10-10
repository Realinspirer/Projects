const project_3d_post_img_handler = (function(){
    let viewer_parent = document.querySelector("#viewer")!;
    let close_btn = viewer_parent.querySelector<HTMLButtonElement>(".close_btn")!;
    let main_img = viewer_parent.querySelector<HTMLImageElement>(".main_img")!;
    
    let viewer_co:number|null;
    close_btn.addEventListener("click", () => {
        if(viewer_co != null){
            clearInterval(viewer_co);
        }
        
        viewer_parent.classList.remove("visible");
        viewer_co = setTimeout(() => {
            viewer_parent.classList.add("hidden");
            document.documentElement.classList.remove("viewer_active");
            viewer_co = null;
        }, 300);
    });

    return function show_img(img_url:string){
        main_img.src = img_url;

        viewer_parent.classList.remove("hidden");

        setTimeout(() => {
            viewer_parent.classList.add("visible");
        });
        document.documentElement.classList.add("viewer_active");
    }
})();