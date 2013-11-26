$(function(){

	var paperWidth = 900,
		paperHeight = 300;

	var paper = Raphael('mapHolder', paperWidth, paperHeight);
	var itemWidth = +paperWidth/+map.width;
	var itemHeight = +paperHeight/+map.height;

	var cX = 0;
	var cY = 0;

	var green_layer = "";
	var blue_layer = "";

  console.profile('loop');

	for ( var x = 0; x < map.width; x++ ){
		cX = 0;
		for ( var y = 0; y < map.height; y++ ){

			if ( map[x+'_'+y].z == 1 ){
				green_layer += 'M '+cX+' '+cY+' L '+(cX+itemWidth)+' '+(cY)+' L '+(cX+itemWidth)+' '+(cY+itemHeight)+' L '+(cX)+' '+(cY+itemHeight)+' L '+(cX)+' '+(cY);
			}
			else{
				blue_layer += 'M '+cX+' '+cY+' L '+(cX+itemWidth)+' '+(cY)+' L '+(cX+itemWidth)+' '+(cY+itemHeight)+' L '+(cX)+' '+(cY+itemHeight)+' L '+(cX)+' '+(cY);
			}

			cX+=itemWidth;
		}
		cY+=itemHeight;
	}
  console.profileEnd();

  console.profile('draw');
	var greenCover = paper.path(green_layer);
	greenCover.attr({fill: "green",stroke:'green'});
	var blueCover = paper.path(blue_layer);
	blueCover.attr({fill: "blue",stroke:'blue'});
  console.profileEnd();

});



/*nba.FullCourtChart = Backbone.View.extend({

  event_data : [],

  initialize: function(){

    this.collection.on( 'add', this.render, this );
    this.collection.on( 'change', this.render, this );
    this.collection.on( 'reset', this.render, this );

    this.vars = {};
    this.vars.width   = 450;
    this.vars.height  = 242;
    this.vars.$graph  = $('#'+this.options.container);
    this.vars.paper   = Raphael(this.options.container, this.vars.width, this.vars.height);
    this.vars.homeColor = nba.colors.get('homeColorHex');
    this.vars.awayColor = nba.colors.get('awayColorHex');
    this.render();

  },
  render: function(){

    this.vars.start_time = new Date();

    this.overal_count = 0;
    this.court_values = [];

    this.vars.paper.clear();
    this.syncPlays( this.collection.models );

  },

  syncPlays: function( play_array ){

    for ( var x = 0; x < play_array.length; x++ ){
      //if it has a location on the court

      var this_play = play_array[x].attributes;

      if ( this_play['x-shot-coord'] != "" ){

        this.event_data[this_play.id] = this_play;

        var fill_color;

        var item = this_play;
        //if it is a home shot ( left )
        if ( +this_play['global-team-code-1'] == this.options.homeTeamID ){

          fill_color = this.vars.homeColor;

          var graph_x = 28 - +this_play['x-shot-coord'];
          var graph_y = 97 - +this_play['y-shot-coord'];

        }
        //it is away ( right );
        else{

          fill_color = this.vars.awayColor;

          var graph_x = 29 + +this_play['x-shot-coord'];
          var graph_y = +this_play['y-shot-coord'] + 2;

        }

        var chart_y = graph_y/0.21888889;
        var chart_x = graph_x/0.23727272;

        var pin = this.vars.paper.circle(chart_y, chart_x, 6);
          pin.attr("stroke", fill_color);
          pin.attr("fill", fill_color);
          pin.attr("fill-opacity", 0.6);
          pin.attr("stroke-opacity", 0.9);
          pin.attr("stroke-width", 2);
          pin.attr('cursor','pointer');
          pin.attr('stuff', this_play );

        this.event_data[pin.id] = this_play;

        pin.click(function(){

          //TODO place correct location

          var search_seq = nba.fullCourtChart.event_data[this.id]['id'];
          var index = 0;

          for ( var x = nba.plays.models.length-1; x >= 0; x-- ){

              if ( nba.plays.models[x].id == search_seq){
                index = x;
              }
          }

          var total_width = nba.plays.models.length*300;

          var move_to = (total_width-(300*index)-300);

          var play_panel = $('.play-pane');

          var play_bar = $('#seq_'+search_seq);

          play_panel.jScrollPane({
            autoReinitialise: true,
            hijackInternalLinks: false,
            animateScroll: true,
            horizontalDragMinWidth: 100
          });

          var api = play_panel.data('jsp');

          api.scrollTo(move_to,0);

          play_bar.stop().animate({backgroundColor:'#666'},300).animate({backgroundColor:'#353535'},600);

        });

        pin.mouseover(function(){

            this.animate({ 'stroke-width': 6, 'fill-opacity': .9 }, 100, '>');
            //if(Raphael.type != 'VML') //solves IE problem
                //this.toFront();

        }).mouseout(function(){
            this.animate({ 'stroke-width': 2, 'fill-opacity': .6 }, 300, '<');
        });

      }
    }

      //this.sendToArray();

  }

});*/