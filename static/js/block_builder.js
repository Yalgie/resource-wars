$(function() {
    var blank = "images/abstract_blocks/abstractTile_09.png"
    var glass = "images/voxel_blocks/voxelTile_36.png"
    var clay = "images/voxel_blocks/voxelTile_33.png"
    var wood = "images/voxel_blocks/voxelTile_14.png"
    var grass = "images/voxel_blocks/voxelTile_55.png"
    var stone = "images/voxel_blocks/voxelTile_34.png"
    var green_key_slot = "images/abstract_blocks/abstractTile_16.png"
    var red_key_slot = "images/abstract_blocks/abstractTile_17.png"
    var green_key = "images/abstract_blocks/abstractTile_29.png"
    var red_key = "images/abstract_blocks/abstractTile_28.png"
    var pyrus = "images/voxel_blocks/voxelTile_18.png"

    var resources = [glass, clay, wood, pyrus, stone]

    var round = 1
    var grid = []

    if (round == 1) {
        var blocks_in_row = [2, 3, 4, 5, 6]
    }
    else if (round == 2) {
        var blocks_in_row = [7, 6, 5, 4, 3, 2]
    }
    else if (round == 3) {
        var blocks_in_row = [4, 5, 6, 7, 6, 5, 4]
    }

    for (var i = 0; i < blocks_in_row.length; i++) {
        var grid_row = []
        $(".block_container").append("<div data-row='"+i+"' class='block_row'>")
        for (var x = 0; x < blocks_in_row[i]; x++) {
            grid_row.push(false)
            var block = resources[Math.floor(Math.random()*resources.length)]
            // $(".block_row").last().append("<div class='game_block_wrapper'><img data-block='"+x+"' class='unclickable block' src='" + block + "' /></div>")
            $(".block_row").last().append("<img data-block='"+x+"' class='unclickable block' src='" + block + "' />")
        }
        grid.push(grid_row)
    }

    $(".block_row").last().children().removeClass("unclickable")

    for (var i = 0; i < resources.length; i++) {
        $(".inventory_block_main_wrap").append("<div class='inventory_block_wrapper'><img class='block unclickable' src='" + resources[i] + "' /></div>")
    }

    setClickables()

    bindHovers()

    function bindHovers() {
        $(".block").not(".unclickable").on("mouseover", function() {
            var top = $(this).css("top")
            $(this).animate({"top": 15}, {queue: false})
        })

        $(".block").not(".unclickable").on("mouseout", function() {
            var top = $(this).css("top")
            $(this).animate({"top": 0}, {queue: false})
        })
    }

    $(".block").not(".unclickable").on("click", function() {
        $(this).addClass("harvested unclickable")
        grid[$(this).parent().data("row")][$(this).data("block")] = true
        checkClickables($(this))
        setClickables()
    })

    function checkClickables(block) {
        var parent_row = block.parent().data("row")
        var block_data = block.data("block")


        // console.log(parent_row)
        
        var current = grid[parent_row][block_data]
        var next = grid[parent_row][block_data + 1]
        if (next == undefined) {
            next = true
        }
        var prev = grid[parent_row][block_data - 1]
        if (prev == undefined) {
            prev = true;
        }
        
        prev_row = parent_row - 1
        var prev_row = $(".block_row[data-row="+prev_row+"]")

        if (current && next) {
            var new_data = block_data
        }

        if (current && prev) {
            var new_data = block_data - 1
        }
        console.log(new_data)
        if (new_data >= 0) {
            new_block = prev_row.find(".block[data-block="+(new_data)+"]")
            new_block.removeClass("unclickable")
            bindHovers()
            setClickables()
        }
    }

    function setClickables() {
        // console.log(blocks_in_row.reverse())
        for (var i = grid.length - 1; i >= 0; i--) {
            // console.log(grid[i])
            for (var x = 0; x < grid[i].length; x++) {
                if (grid[i][x]) {
                    row = $(".block_row[data-row="+i+"]")
                    block = row.find(".block[data-block="+x+"]")
                    block.removeClass("unclickable")
                }
            }
        }
    }
    
    // $(".game_container").append("<img src='" + glass + "' />")
    // $(".game_container").append("<img src='" + clay + "' />")
    // $(".game_container").append("<img src='" + wood + "' />")
    // $(".game_container").append("<img src='" + grass + "' />")
    // $(".game_container").append("<img src='" + stone + "' />")
    // $(".game_container").append("<img src='" + green_key_slot + "' />")
    // $(".game_container").append("<img src='" + red_key_slot + "' />")
    // $(".game_container").append("<img src='" + green_key + "' />")
    // $(".game_container").append("<img src='" + red_key + "' />")
    // $(".game_container").append("<img src='" + craft + "' />")
})