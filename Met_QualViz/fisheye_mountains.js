// Code for fisheye modeled after https://observablehq.com/@stroked/heroes-and-heroines/2#heroineMap


xAlign = "xMid"
xAlign={return meetOrSlice==="meet" ?  'xMax' : 'xMid'}

ArtSlices =(images,align)=> {

 const height = window.innerHeight,

        xSteps= d3.range(0, width, width/images.length);
  //console.log(xSteps)
  const regularScale = d3.scaleIdentity().range(0, width).domain(xSteps).nice();
  const svg = d3
  .select(DOM.svg(width, width))
  .attr("viewBox", `0, 0, ${width}, ${height}`)
  .attr('width','100%')
  .attr("min-width", '100%')
  .attr("height", 'height')

  const g = svg.append("g")  
  .attr('width','100%')
  .attr("transform", `translate(${margin.left},${margin.top})`)

  var imageSlides = g.selectAll("image")
  .data(images)
  .join("image")  
  .attr("xlink:href",d=>d)
  .attr("preserveAspectRatio",`${align} ${meetOrSlice}`)



  defaultScale();
  
  function defaultScale(){
    imageSlides
      //.transition()
      .attr("x", (d,i)=>regularScale(xSteps[i]))
      .attr("y", 0)
      .attr("width",(d,i)=>width/images.length)
      .attr("height",height)
  }
  
  svg
    .on("mousemove", function(){return handleMove(d3.mouse(this))})
    .on("touchmove", function(){return handleMove(d3.touches(this)[0])})
  // .on("mouseout touchend", defaultScale);

  function handleMove(mouse) {
    xFisheye
      .focus(mouse[0]);    // yFisheye(mouse[1]);
    imageSlides
      .attr("x",(d,i)=> xFisheye(xSteps[i]) )
      .attr("height", height)
      .attr("width",  (d, i) => {
          let x1 = xFisheye(xSteps[i+1]);
          if (!x1) x1 = width;
          return x1 - xFisheye(xSteps[i]);
      })
//.attr("preserveAspectRatio",`${align} none`)
  }

  return svg.node();

}

xFisheye = fisheye.scale(d3.scaleIdentity).domain([0, width]).focus(0)


// Adding in the image arrays

amerMount={
  const files=
        [
          "AMER_images/1_12902.jpg",
          "AMER_images/2_10768.jpg",
          "AMER_images/3_10500.jpg"
        ].map(n=>  `https://github.com/amandersonyou/MajorStudio1_AAY/raw/master/Met_QualViz/AMER_images/${n}`)
  return files;
}

// https://github.com/Stroked/ajay-works/blob/master/heroes&heroines/${n}?raw=true

// European Mountains:
euroMap = euroMount.map(x=>`<image `)

euroMount={
  const files=
        [
          "EURO_images/1_436817.jpg",
          "EURO_images/2_437093.jpg",
          "EURO_images/3_437548.jpg"
        ].map(n=>  `https://github.com/amandersonyou/MajorStudio1_AAY/raw/master/Met_QualViz/EURO_images/${n}`)
  return files;
}



// create layout
margin = ({top: 0, bottom: 0, left: 0, right: 1})
width=window.innerWidth
import {d3} from '@pstuffa/helpers'

// Make the images align along the x and y axis
viewof unused = radio({
  title: 'Slides Perspective',
  description: 'This value makes the images align along the x and y axis',
  options: [
    { label: 'xMinYMin', value: 'xMinYMin' },
    { label: 'xMidYMid', value: 'xMidYMid' },
    { label: 'xMaxYMax', value: 'xMaxYMax' },
    { label: 'xMaxYMin', value: 'xMaxYMin' },
    { label: 'xMinYMax', value: 'xMidYMid' },
  ],
  value: 'meet'
})

import { radio } from "@meetamit/multiple-choice-inputs"

// Style: edit this, placeholder for now!
slideshow_styles=html`<style>

svg{
box-sizing:content-box;
  width: calc(100% + 28px);
height:'40vh';
border:hidden;
  margin: 0 -15px;
padding:0;
  background: #fff;
display:flex;
align-items:center;
}
g{
width:100%;
 pointer-events: none;
}


p ,a{
  font-family: Open Sans;
  color: rgba(0, 0, 0, 0.7);
font-size:12px
}
</style>`


// Fisheye 
import {fisheye} from '@pstuffa/cartesian-fisheye-distortion'

fisheye = {
  const fisheye = {
    scale: function(scaleType) {
      return d3_fisheye_scale(scaleType(), 5, 0);
    },
    circular: function() {
      var radius = 200,
          distortion = 2,
          k0,
          k1,
          focus = [0, 0];

      function fisheye(d) {
        var dx = d.x - focus[0],
            dy = d.y - focus[1],
            dd = Math.sqrt(dx * dx + dy * dy);
        if (!dd || dd >= radius) return {x: d.x, y: d.y, z: dd >= radius ? 1 : 10};
        var k = k0 * (1 - Math.exp(-dd * k1)) / dd * .75 + .25;
        return {x: focus[0] + dx * k, y: focus[1] + dy * k, z: Math.min(k, 10)};
      }

      function rescale() {
        k0 = Math.exp(distortion);
        k0 = k0 / (k0 - 1) * radius;
        k1 = distortion / radius;
        return fisheye;
      }

      fisheye.radius = function(_) {
        if (!arguments.length) return radius;
        radius = +_;
        return rescale();
      };

      fisheye.distortion = function(_) {
        if (!arguments.length) return distortion;
        distortion = +_;
        return rescale();
      };

      fisheye.focus = function(_) {
        if (!arguments.length) return focus;
        focus = _;
        return fisheye;
      };

      return rescale();
    }
  };

  function d3_fisheye_scale(scale, d, a) {

    function fisheye(_) {
      var x = scale(_),
          left = x < a,
          range = d3.extent(scale.range()),
          min = range[0],
          max = range[1],
          m = left ? a - min : max - a;
      if (m == 0) m = max - min;
      return (left ? -1 : 1) * m * (d + 1) / (d + (m / Math.abs(x - a))) + a;
    }

    fisheye.distortion = function(_) {
      if (!arguments.length) return d;
      d = +_;
      return fisheye;
    };

    fisheye.focus = function(_) {
      if (!arguments.length) return a;
      a = +_;
      return fisheye;
    };

    fisheye.copy = function() {
      return d3_fisheye_scale(scale.copy(), d, a);
    };

    // fisheye.nice = scale.nice;
    // fisheye.ticks = scale.ticks;
    // fisheye.tickFormat = scale.tickFormat;
    return rebind(fisheye, scale, "domain", "range");
  }
  
  return fisheye
}

rebind = function(target, source) {
  var i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
  return target;
};

d3_rebind = (target, source, method) => {
  return function() {
    var value = method.apply(source, arguments);
    return value === source ? target : value;
  };
}