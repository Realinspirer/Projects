"use strict";
Generate_vector_designs_section.generate("/JSON_data/Projects_vector_designs/vector_gen.json", "vector_designs", ".vector_designs_parent .sc_button.left", ".vector_designs_parent .sc_button.right");
game_cover_changer.hook_cover_fader("/JSON_data/Games_games_list/Games_gen.json");
show_more_manager.manage_show_more("/JSON_data/Projects_game_assets/Game_assets.json", "assets_load_more_btn", "assets_show_less_btn", "assets_section_parent", game_assets_generator, null, 3);
show_more_manager.manage_show_more("/JSON_data/Projects_3D/3D_items_gen.json", "load_more_btn_3D", "show_less_btn_3D", "parent_3D_grid", manager_3d.Generate_3D_item, manager_3d.removed_element, 4);
