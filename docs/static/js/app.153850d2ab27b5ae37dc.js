webpackJsonp([1],{"+qiL":function(t,i){},"2NXm":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n,s=e("Dd8w"),a=e.n(s),o=e("NYxO"),c=e("cjn6"),r=e("6w0h"),h=(e("P6Se"),e("d7EF")),u=e.n(h),d=e("bOdI"),f=e.n(d),l=(e("SQpT"),[[0,0],[1,0],[2,0]]),v=[3,0],m=(n={},f()(n,c.a.NORMAL,"#33a050"),f()(n,c.a.MIDDLE,"#fabe00"),f()(n,c.a.HARD,"#d8210d"),n),p={name:"main-canvas",data:function(){var t;return{canvas:void 0,context:void 0,canvasWidth:600,canvasHeight:600,containerArr:[],snakeBody:l.slice(),snakeHead:v.slice(),headDirection:c.b.RIGHT,disabledDirection:c.b.LEFT,foodPosition:void 0,timer:void 0,winningWord:"CONGRATULATIONS, YOU DID IT!",HEAD_DIFF_POSITIONS:(t={},f()(t,c.b.UP,[0,-1]),f()(t,c.b.RIGHT,[1,0]),f()(t,c.b.DOWN,[0,1]),f()(t,c.b.LEFT,[-1,0]),t)}},computed:a()({},Object(o.b)({started:function(t){return t.gameStatus.started},paused:function(t){return t.gameStatus.paused},score:function(t){return t.gameStatus.score},difficulty:function(t){return t.gameStatus.difficulty}}),{rowGridCount:function(){return this.canvasWidth/20|0},columnGridCount:function(){return this.canvasHeight/20|0},baseFontSize:function(){return this.canvasWidth/this.winningWord.length|0},controlBtnSize:function(){return{width:.05*this.canvasWidth*2,height:.05*this.canvasWidth*Math.sqrt(3)}},controlBtnArea:function(){return{top:(this.canvasHeight-this.controlBtnSize.height)/2,right:(this.canvasWidth+this.controlBtnSize.width)/2,bottom:(this.canvasHeight+this.controlBtnSize.width)/2,left:(this.canvasWidth-this.controlBtnSize.height)/2}}}),mounted:function(){this.init()},methods:{init:function(){var t=this;this.reset(),this.canvas=document.getElementById("main-canvas"),this.context=this.canvas.getContext("2d"),this.canvas.onclick=this.mouseClickListener,document.onkeydown=this.keyPress,this.context.strokeStyle="#EEE",this.initAvailableFoodArea(),this.resizeCanvas(),this.$nextTick(function(){t.clearCanvas(),t.drawStartBtn()})},mouseClickListener:function(t){var i=t.offsetX,e=t.offsetY;this.started?this.paused?this.resume():this.pause():(this.drawStartBtn(),this.context.isPointInPath(i,e)&&this.startGame())},initAvailableFoodArea:function(){var t=this;this.containerArr=[];for(var i=0;i<this.rowGridCount;i++)for(var e=0;e<this.columnGridCount;e++)this.containerArr.push([i,e].join());this.snakeBody.forEach(function(i){var e=t.containerArr.indexOf(i.join());!~e&&t.containerArr.splice(e,1)});var n=this.containerArr.indexOf(this.snakeHead.join());!~n&&this.containerArr.splice(n,1)},resizeCanvas:function(){var t=document.getElementsByClassName("main-canvas-view")[0],i=t.clientWidth,e=t.clientHeight;this.canvasWidth=20*(i/20|0),this.canvasHeight=20*(e/20|0)},clearCanvas:function(){this.context.fillStyle="#fff",this.context.fillRect(0,0,this.canvas.width,this.canvas.height)},addScore:function(){this.$store.commit("ADD_SCORE")},keyPress:function(t){var i=t.keyCode;if(console.log(i),this.disabledDirection!==i)switch(i){case c.b.UP:this.headDirection=c.b.UP,this.disabledDirection=c.b.DOWN;break;case c.b.DOWN:this.headDirection=c.b.DOWN,this.disabledDirection=c.b.UP;break;case c.b.LEFT:this.headDirection=c.b.LEFT,this.disabledDirection=c.b.RIGHT;break;case c.b.RIGHT:this.headDirection=c.b.RIGHT,this.disabledDirection=c.b.LEFT}},drawPausedBtn:function(){this.context.fillStyle="#FF6666",this.context.font=this.baseFontSize+"px serif",this.context.textAlign="center",this.context.fillText(this.score,this.canvasWidth/2,this.canvas.height/2);this.context.font=this.baseFontSize+"px serif",this.context.fillText("Resume",this.canvasWidth/2,this.canvas.height/2+this.baseFontSize)},drawStartBtn:function(){this.context.fillStyle="#FF6666",this.context.beginPath(),this.context.moveTo(this.controlBtnArea.left,this.controlBtnArea.top),this.context.lineTo(this.controlBtnArea.left,this.controlBtnArea.bottom),this.context.lineTo(this.controlBtnArea.right,(this.controlBtnArea.top+this.controlBtnArea.bottom)/2),this.context.closePath(),this.context.fill();this.context.font=this.baseFontSize+"px serif",this.context.textAlign="center",this.context.fillText("Start",this.canvasWidth/2,this.controlBtnArea.bottom+this.baseFontSize)},drawLastScene:function(){this.clearCanvas(),this.snakeDraw(),this.foodDraw()},fillRectDraw:function(t,i){this.context.fillRect(20*t,20*i,18,18)},createFood:function(){var t=Math.random()*(this.containerArr.length-1)|0,i=this.containerArr[t].split(",");this.foodPosition=[+i[0],+i[1]],this.foodDraw()},foodDraw:function(){this.context.fillStyle="#FFCCCC",this.fillRectDraw(this.foodPosition[0],this.foodPosition[1])},snakeDraw:function(){var t=this;this.context.fillStyle="#FF9966",this.snakeBody.forEach(function(i,e){t.fillRectDraw(i[0],i[1])}),this.context.fillStyle=m[this.difficulty],this.fillRectDraw(this.snakeHead[0],this.snakeHead[1])},finalDraw:function(t){this.context.font=this.baseFontSize+"px serif",this.context.textAlign="center",this.context.fillStyle="#fff",this.context.fillRect(0,this.canvas.height/2-2*this.baseFontSize,this.canvasWidth,3*this.baseFontSize),this.context.fillStyle="#FF6666",this.context.fillText(t,this.canvasWidth/2,this.canvas.height/2)},clearRect:function(t,i){this.context.fillStyle="#fff",this.context.fillRect(20*t,20*i,18,18)},checkIfStuck:function(t,i){return t<0||t>=this.rowGridCount||i<0||i>=this.columnCount||~this.snakeBody.findIndex(function(e){return e[0]===t&&e[1]===i})},animate:function(){var t=this;requestAnimationFrame(function(){if(t.foodPosition.join()===t.snakeHead.join())t.addScore(),t.createFood();else{var i=t.snakeBody.shift();t.clearRect(i[0],i[1]),t.containerArr.push(i.join())}var e=t.containerArr.indexOf(t.snakeHead.join());!~e&&t.containerArr.splice(e,1),t.containerArr.length||(t.clearTimer(),t.finalDraw(t.winningWord)),t.snakeDraw()})},reset:function(){this.clearTimer(),this.$store.commit(r.d),this.snakeBody=l.slice(),this.snakeHead=v.slice(),this.headDirection=c.b.RIGHT,this.disabledDirection=c.b.LEFT},startGame:function(){this.reset(),this.$store.commit(r.g),this.clearCanvas(),this.snakeDraw(),this.createFood(),this.startTimer()},stopGame:function(){this.$store.commit(r.h),this.clearTimer(),this.finalDraw("GAME OVER!")},resume:function(){this.$store.commit(r.f),this.drawLastScene(),this.startTimer()},pause:function(){this.$store.commit(r.c),this.clearTimer(),this.drawLastScene(),this.drawPausedBtn()},startTimer:function(){var t=this;this.timer=setInterval(function(){var i=u()(t.snakeHead,2),e=i[0],n=i[1],s=t.HEAD_DIFF_POSITIONS[t.headDirection];if(e+=s[0],n+=s[1],t.checkIfStuck(e,n))return console.log({nextX:e,nextY:n}),void t.stopGame();t.snakeBody.push(t.snakeHead),t.snakeHead=[e,n],t.animate()},this.difficulty)},clearTimer:function(){this.timer=clearInterval(this.timer)}}},b={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"main-canvas-view"},[i("canvas",{attrs:{id:"main-canvas",width:this.canvasWidth+"px",height:this.canvasHeight+"px"}})])},staticRenderFns:[]},D={name:"nebulas-snake",components:{MainCanvas:e("VU/8")(p,b,!1,null,null,null).exports},data:function(){return{DIFFICULTY:c.a}},computed:a()({},Object(o.b)({score:function(t){return t.gameStatus.score},difficulty:function(t){return t.gameStatus.difficulty}})),methods:{setDifficulty:function(t){this.$store.commit(r.b,t),this.$refs.mainCanvas.init()}}},x={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"default-view"},[e("div",{staticClass:"default-view-header"},[e("p",[t._v("Nebulas Snake")]),t._v(" "),e("div",{staticClass:"difficulty-select-area"},[e("p",{class:["difficulty-btn","normal",{unselected:t.DIFFICULTY.NORMAL!==t.difficulty}],on:{click:function(i){t.setDifficulty(t.DIFFICULTY.NORMAL)}}},[t._v("Normal")]),t._v(" "),e("p",{class:["difficulty-btn","middle",{unselected:t.DIFFICULTY.MIDDLE!==t.difficulty}],on:{click:function(i){t.setDifficulty(t.DIFFICULTY.MIDDLE)}}},[t._v("Middle")]),t._v(" "),e("p",{class:["difficulty-btn","hard",{unselected:t.DIFFICULTY.HARD!==t.difficulty}],on:{click:function(i){t.setDifficulty(t.DIFFICULTY.HARD)}}},[t._v("Hard")])]),t._v(" "),e("p",[t._v("Score: "+t._s(t.score))])]),t._v(" "),e("div",{staticClass:"default-view-main"},[e("main-canvas",{ref:"mainCanvas"})],1)])},staticRenderFns:[]},S=e("VU/8")(D,x,!1,null,null,null);i.default=S.exports},"2mV7":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("gNcp"),s={};n.keys().forEach(function(t){"./index.js"!==t&&(s[t.replace(/(\.\/|\.js)/g,"")]=n(t).default)}),i.default=s},"6w0h":function(t,i,e){"use strict";e.d(i,"g",function(){return n}),e.d(i,"h",function(){return s}),e.d(i,"b",function(){return a}),e.d(i,"a",function(){return o}),e.d(i,"i",function(){return c}),e.d(i,"e",function(){return r}),e.d(i,"c",function(){return h}),e.d(i,"f",function(){return u}),e.d(i,"d",function(){return d});var n="START",s="STOP",a="CHANGE_DIFFICULTY",o="ADD_SCORE",c="TOGGLE_START",r="RESTART_GAME",h="PAUSE",u="RESUME",d="RESET"},NHnr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("7+uW"),s=e("mtWM"),a=e.n(s),o=(e("+qiL"),{render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]}),c=e("VU/8")({name:"app"},o,!1,null,null,null).exports,r=e("/ocq");n.a.use(r.a);var h=new r.a({routes:[{path:"/",name:"default",component:e("2NXm").default}]}),u=e("NYxO"),d=e("2mV7");n.a.use(u.a);var f=new u.a.Store({modules:d.default,strict:!1});n.a.http=n.a.prototype.$http=a.a,n.a.config.productionTip=!1,new n.a({el:"#app",router:h,store:f,components:{App:c},template:"<App/>"})},O9x0:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n,s=e("bOdI"),a=e.n(s),o=e("6w0h"),c={started:!1,paused:!1,score:0,difficulty:e("cjn6").a.NORMAL},r=(n={},a()(n,o.a,function(t){t.score++}),a()(n,o.b,function(t,i){t.difficulty=i}),a()(n,o.g,function(t){t.started=!0,t.paused=!1}),a()(n,o.h,function(t){t.started=!1,t.paused=!1}),a()(n,o.c,function(t){t.paused=!0}),a()(n,o.f,function(t){t.paused=!1}),a()(n,o.i,function(t){t.started=!t.started,t.paused=!1}),a()(n,o.e,function(t){t.started=!0,t.paused=!1,t.score=0}),a()(n,o.d,function(t){t.started=!1,t.paused=!1,t.score=0}),n);i.default={state:c,mutations:r,actions:{}}},P6Se:function(t,i){},SQpT:function(t,i){},cjn6:function(t,i,e){"use strict";var n={LEFT:37,UP:38,RIGHT:39,DOWN:40,SPACE:31,ENTER:13},s={NORMAL:500,MIDDLE:300,HARD:100};e.d(i,"b",function(){return n}),e.d(i,"a",function(){return s})},gNcp:function(t,i,e){var n={"./gameStatus.js":"O9x0","./index.js":"2mV7"};function s(t){return e(a(t))}function a(t){var i=n[t];if(!(i+1))throw new Error("Cannot find module '"+t+"'.");return i}s.keys=function(){return Object.keys(n)},s.resolve=a,t.exports=s,s.id="gNcp"}},["NHnr"]);
//# sourceMappingURL=app.153850d2ab27b5ae37dc.js.map