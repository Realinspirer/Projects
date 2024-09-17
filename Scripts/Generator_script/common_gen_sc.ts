const common_gen = (function(){
    return async function<Type>(json_path:string, parent_id:string, elements_adder:(data:Array<Type>, parent:HTMLElement) => void, count:number = 4, start:number = 0) {
        var response = await fetch(json_path);
        let res_ar:Array<Type> = await response.json();

        elements_adder(res_ar.slice(start, start + count), document.getElementById(parent_id)!);
    }

})();