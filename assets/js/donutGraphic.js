var segments = new Array();
var RADIUS = 80;
var total = 0;


window.onload = function() {
  var r = Raphael("holder", 450, 450)

      r.customAttributes.arc = function (value, total, R) {
        var alpha = 360 / total * value,
            a = (this.data('alpha_offset') - alpha) * Math.PI / 180,
            x = this.data('x_centre') + R * Math.cos(a),
            y = this.data('y_centre') - R * Math.sin(a),
            path;


        path = [
          ["M", this.data('x_start'), this.data('y_start')], 
          ["A", R, R, 0, +(alpha > 180), 1, x, y]
        ];
        return {path: path, stroke: this.data('colour')};
      };

  function GenerateDonut(dataReceived, config) {

    //loop through data to get the total
    var mydata = dataReceived['dataTotals'];
    for (var i = 0; i < mydata.length; i++) {
        total += mydata[i]['value'];
    }

    //loop through data and generate the donut chart
    var runningtotal = 0;
    var startx = 300,
      starty = 300 - RADIUS;

    
    for (var i = 0; i < mydata.length; i++) {
        var original_runningtotal = runningtotal;
        runningtotal += mydata[i]['value'];

      
        var x_start = 300, y_start = 300 - RADIUS, a_offset = 90;
        if (segments.length > 0){
            x_start = segments[segments.length - 1].data('x_end');  
            y_start = segments[segments.length - 1].data('y_end');  
            a_offset = segments[segments.length - 1].data('alpha_end');
        }
          
        var sec = r.path()
            .data('value',mydata[i]['value'])

            .data('alpha_offset', a_offset)

            .data('x_start', x_start)
            .data('y_start', y_start)

            .data('x_centre',300)
            .data('y_centre',300)

            .data('colour', mydata[i]['colour'])
            .attr({"stroke-width": 100, arc: [0, total, RADIUS]});

        sec.animate({"stroke-width": 60,arc: [mydata[i]['value'], total, RADIUS]},1000, '>');
        setEndPoints(sec,mydata[i]['value'], total, RADIUS);

        segments.push(sec);      
     }
  }

  var data = {
    'dataTotals': [{
      label: 'Agua',
      value: 19054,
      colour: '#83CAFF'
    }, {
      label: 'Luz',
      value: 45258,
      colour: '#FFD320'
    }, {
      label: 'Gas',
      value: 6179,
      colour: '#FF420E'
    }, {
      label: 'Tag',
      value: 14052,
      colour: '#004586'
    }, {
      label: 'Vrt',
      value: 79130,
      colour: '#74298E'
    }],
    'centralText': '500 cases'
  };

  var donutConfig = {
    
  };
  GenerateDonut(data, donutConfig);

};

function AnimateIn(){
    for (var i = 0; i < segments.length; i++){
      segments[i].animate({"stroke-width": 100,arc: [segments[i].data('value'), total, RADIUS]},1000, '>');   
    }
}

function AnimateOut(){
    for (var i = 0; i < segments.length; i++){
      segments[i].animate({"stroke-width": 100,arc: [0, total, RADIUS]},1000, '>');   
    }
}

function HideLabels(){
  Anim.hide('mylist');
}

function ShowLabels(){
  Anim.show('mylist');
}

function Animator(){
    this.addData = function(name, objects){
        this[name] = objects;
    };

    this.IntervalID = null;
    this.Animations = new Array();
  
    this.UpdateAnimations = function(){

        for (var i = 0; i < this.Animations.length; i++){
            
            var name = this.Animations[i].name,
                pos = this.Animations[i].position,
                direction = this.Animations[i].direction,
                action = this.Animations[i].action;
          
            if ((direction == 'forward') && (pos < this[name].length)){
                if (action == 'show'){
                    $(this[name][pos]).fadeIn(100);
                } else {
                    $(this[name][pos]).fadeOut(100);
                }
                this.Animations[i].position += 1;
            } else if ((direction == 'backward') && (pos >= 0)){
                if (action == 'show'){
                    $(this[name][pos]).fadeIn(100);
                } else {
                    $(this[name][pos]).fadeOut(100);
                }
                this.Animations[i].position -= 1;
            }          
        }              

        for (var i = this.Animations.length - 1; i >= 0; i--){
            if ((this.Animations[i].position < 0)||
                (this.Animations[i].position >=          
                    this[this.Animations[i].name].length)){
                this.Animations.splice(i,1);
            }
        }    
      
        if (this.Animations.length == 0){
            clearInterval(this.IntervalID);
            this.IntervalID = null;
        }
    };
  
    this.show = function(name){
        var newAnimation = {
            name: name,
            position: 0,
            direction: 'forward',
            action: 'show'
        };

         this.Animations.push(newAnimation);
         this.StartInterval();
    };

    this.StartInterval = function(){
        if (this.IntervalID === null){
            this.IntervalID = setInterval(
                                  function(){Anim.UpdateAnimations();}, 
                                  100
                              );   
        }
    };
    
    this.hide = function(name){
        var newAnimation = {
            name: name,
            position: this[name].length - 1,
            direction: 'backward',
            action: 'hide'
        };

         this.Animations.push(newAnimation);
         this.StartInterval();
      
         //feedback('hide completed');
    };
}

function feedback(sText){
    $('#feedback').append('<div>' + sText + '</div>');
}

var Anim = new Animator();
var newObjects = new Array();
Anim.addData('mylist',$('#testItems div'));

function setEndPoints(elem, value, total, R){
    var alpha = 360 / total * value,
        a = ( elem.data('alpha_offset') - alpha) * Math.PI / 180,
        x = 300 + R * Math.cos(a),
        y = 300 - R * Math.sin(a);

    elem.data('x_end',x);
    elem.data('y_end',y);
    elem.data('alpha_end', elem.data('alpha_offset') - alpha );
}