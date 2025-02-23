(async function() { 
        Generate_vector_designs_section.generate("/JSON_data/Projects_vector_designs/vector_gen.json", "vector_designs", ".vector_designs_parent .sc_button.left", ".vector_designs_parent .sc_button.right");
    game_cover_changer.hook_cover_fader("/JSON_data/Games_games_list/Games_gen.json");

    common_gen("/JSON_data/Projects_game_assets/Game_assets.json","assets_section_parent", 
        game_assets_generator, 6);

    // common_gen("/JSON_data/Projects_3D/3D_items_gen.json", "parent_3D_grid", manager_3d.Generate_3D_item);
    
    scroll_to_id.hook_to_elements(...document.querySelectorAll<HTMLElement>(".hash_creator"));

    var posts_response = await fetch("/JSON_data/Blogs_posts/Blogs_and_posts_data.json");
    var posts_data_raw:Array<Data_class_multiple_imgs_btn> = await posts_response.json();
    
    posts_blogs_gen_project(await post_tag_searcher.return_found_tagged_items_excluded(posts_data_raw, 3, "3D", "Blender", "Animation", "Animated"), "#posts_section");
    
    let req_data = await post_tag_searcher.return_found_tagged_items(posts_data_raw, 4, "3D", "Blender", "Animation", "Animated");
    manager_3d.Generate_3D_item(req_data, document.getElementById("parent_3D_grid")!)

})();