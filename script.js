var node_list, adj_matrix, size_h_global, size_w_global, height_top_bound, height_bottom_bound;
function setupCanvas(){   
    /*
    var category = window.localStorage.getItem("i");
    //console.log(category);
    if(category == null)
    {
        category = 0;
    }
    window.localStorage.setItem("i", category==0?1:0);
    //this background will be selected only on desktop and that too with a probability of 0.5
    if(category == 0)
    {
        setup_graph_scene();
    }
    
    if(category == 1)
    {
        setup_bubbles_scene();
    }*/
    setup_graph_scene();
}

var color_global = "rgba(23, 87, 171, 0.9)";

class node
{
    constructor(x, y)
    {
        //setting point's coordinates
        this.x = x;
        this.y = size_h_global/2.0;

        //setting point's velocity
        this.dy = Math.random()*4 + 0.5;
        if(Math.random() > 0.5)
        {
            this.dy = -this.dy;
        }
        //offseting it a little
        this.y += this.dy;
        this.x += Math.random()*10 - Math.random()*10;
    }
}



//this will plot a line
function plot_node(node, ctx)
{
    ctx.beginPath();
    //ctx.fillStyle = "#003d66";
    ctx.fillStyle = color_global;
    ctx.arc(node.x, node.y, 2.5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

//this will plot a line between two nodes
function plot_line(node1, node2, ctx)
{
    ctx.beginPath();
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);
    ctx.strokeStyle = color_global;
    ctx.stroke();
}

//this will move the node and reverse velocity based on its position
function update_node(node, ctx)
{
    node.y += node.dy;
    if(node.y > size_h_global  * 3 / 4 + 25.0)
    {
        node.dy = - Math.abs(node.dy);
    }
    if(node.y < size_h_global / 4 - 25.0)
    {
        node.dy = Math.abs(node.dy);
    }
}

class color
{
    constructor()
    {
        this.colors = [[245, 20, 20], [245, 177, 20], [95, 245, 20], [20, 245, 196], [20, 155, 245], [178, 20, 245], [245, 20, 163]];
        this.current_color = "rgba(23, 87, 171, 0.9)";
        this.current_index = 0;
        this.pointer = 0.0;
        this.max_pointer = 50.0;
        this.update_color = function()
        {
            var next_index = (this.current_index + 1)%this.colors.length
            if(this.pointer < this.max_pointer)
            {
                var r = this.colors[this.current_index][0]*(1 - this.pointer/this.max_pointer) + this.colors[next_index][0]*this.pointer/this.max_pointer;
                var g = this.colors[this.current_index][1]*(1 - this.pointer/this.max_pointer) + this.colors[next_index][1]*this.pointer/this.max_pointer;
                var b = this.colors[this.current_index][2]*(1 - this.pointer/this.max_pointer) + this.colors[next_index][2]*this.pointer/this.max_pointer;
                this.current_color = "rgba(" + r + ", " + g + ", " + b  + ", 0.9)";
                this.pointer = this.pointer + 1;
            }
            else
            {
                this.pointer = 0;
                this.current_index = next_index;
            }
        }
    }
}



function setup_bubbles_scene()
{
    var class_array = ["largeCircle", "smallCircle", "smallCircle", "largeCircle", "largerCircle", "smallCircle"];
        var id_array = ["first", "second", "third", "fourth", "fifth", "sixth"];
        for(var i = 0; i < class_array.length; i++)
        {
            var first = document.createElement("div");
            first.setAttribute("class", class_array[i]);
            first.setAttribute("id", id_array[i]);
            document.getElementsByClassName("topPart")[0].appendChild(first);
        }
}

function setup_graph_scene()
{

    height_top_bound = window.innerHeight/3.0;
    height_bottom_bound = window.innerHeight*2.0/3.0

    is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    //canvas setup
    var c = document.createElement('canvas'),        
    ctx = c.getContext('2d'),
    size_h = c.height = window.innerHeight;
    if(is_mobile)
    {
        size_h = c.height = window.innerHeight/3.0;
    }
    size_w = c.width = window.innerWidth;
    size_h_global = size_h;
    size_w_global = size_w_global;
    //grid variables
    var x_increment = 60.0;
    var y_increment = 50.0;
    if(is_mobile)
    {
        x_increment = 90;
        y_increment = 90;
    }
    //random initialization of nodes.
    var nodes = [];
    new_node = new node(25, 0);
    nodes.push(new_node);
    var prob = 0.18;
    for(var x = 25; x < size_w - 25; x += x_increment)
    {
        for(var y = height_top_bound; y < height_bottom_bound - 25.0; y += y_increment)
        {
            if(Math.random() < prob)
            {
                new_node = new node(x, y);
                nodes.push(new_node);
            }
            
        }
    }
    new_node = new node(size_w - 25, 0);
    nodes.push(new_node);

    //setup of the directed adjacency matrix
    var adj = new Array(nodes.length);
    for(var i = 0; i < nodes.length - 1; i++)
    {
        var count = 0;
        var j_array = new Array(nodes.length);
        for(var j = 1; j <= 2 && i + j < nodes.length; j++)
        {
            if(Math.random() > 0.1)
            {
                j_array[i+j] = 1;
                count++;
            }
        }
        //this is to ensure graph remains connected
        if(count == 0)
        {
            var j = Math.floor((Math.random()*4 + 1));
            j_array[i + j] = 1;
            count++;
        }
        //last vertex will be connected to second last one
        if(i == nodes.length - 2)
        {
            j_array[nodes.length - 1] = 1;
        }
        adj[i] = j_array;
    }
    adj[nodes.length - 1] = [];

    //making these global
    node_list = nodes;
    adj_matrix = adj;
    
    //main animation loop
    make_frame(ctx, c);
}

function make_frame(ctx, c)
{
    color_obj = new color();
    function animate()
    {
        color_obj.update_color();
        color_global = color_obj.current_color;
        //ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.99)";
        ctx.fillRect(0, 0, c.width, c.height);  
        
        //this shall move all the nodes
        for(var i = 0; i < node_list.length; i++)
        {
            update_node(node_list[i]);
        }

        //this will plot all the nodes and edges
        for(var i = 0; i < node_list.length; i++)
        {
            plot_node(node_list[i], ctx);
            
            for(var j = 0; j < node_list.length; j++)
            { 
                if(adj_matrix[i][j] == 1)
                {   
                    plot_line(node_list[i], node_list[j], ctx);
                }  
            }
        }
        //this will set the new frame
        document.body.style.background = 'url(' + c.toDataURL() + ')'; 

        //don't call it a c̶o̶m̶e̶b̶a̶c̶k̶  callback
        requestAnimationFrame(animate);
    };
    //start loop
    animate();
}