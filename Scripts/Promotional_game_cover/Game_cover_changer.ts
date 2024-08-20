const game_cover_changer = (function(){
    class just_img{
        image_cover:string|null = null;
        image_url:string = "";
    }
    
    let cover_img = document.querySelector<HTMLImageElement>(".game_discover .image_cover")!;
    
    let index = 0;
    let res_ar:Array<just_img>;

    async function hook_cover_fader(json_path:string, interval:number= 5000){

        var response = await fetch(json_path);
        res_ar = await response.json();


        changer();
        setInterval(() => 
        {
            changer();
        }, interval);
    }
    function changer(){
        if(index >= res_ar.length){
            index = 0;
        }

        cover_img.style.opacity = "0";
        cover_img.addEventListener("transitionend", change_img);

    }
    function change_img(){

        let current_instance = res_ar[index];
        let custom_cover = current_instance.image_cover;
        
        if(custom_cover != null){
            cover_img.src = custom_cover;
        }
        else{
            cover_img.src = current_instance.image_url;
        }
        cover_img.style.opacity = "1";

        cover_img.removeEventListener("transitionend", change_img);

        index++;
    }

    return{
        hook_cover_fader:hook_cover_fader
    }
    
})();