"use strict";
Generate_vector_designs_section.generate("Scripts/Vector_designs/vector_gen.json", "vector_designs", ".vector_designs_parent .sc_button.left", ".vector_designs_parent .sc_button.right");
game_cover_changer.hook_cover_fader("/Games/Scripts/Games_gen.json");
show_more_manager.manage_show_more("/Projects/Scripts/Game_assets_scripts/Game_assets.json", "assets_load_more_btn", "assets_show_less_btn", "assets_section_parent", game_assets_generator, 3);
