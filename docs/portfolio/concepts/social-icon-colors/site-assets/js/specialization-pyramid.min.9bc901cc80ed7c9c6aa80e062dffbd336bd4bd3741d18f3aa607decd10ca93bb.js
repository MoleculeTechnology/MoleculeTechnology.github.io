(()=>{"use strict";const t=document.querySelector("[data-pyramid]");if(!t)return;const d=t.querySelector("[data-viewport]"),o=t.querySelector("[data-canvas]"),L=t.querySelector("[data-leaders]"),w=t.querySelector("[data-controls]"),_=t.querySelector("[data-play]"),x=matchMedia("(prefers-reduced-motion: reduce)"),u=[{key:"programming",position:[0,1.3,0],fallback:[320/600,85/460]},{key:"design",position:[-1.15,-.75,.75],fallback:[185/600,180/460]},{key:"art",position:[1.15,-.75,.75],fallback:[485/600,300/460]},{key:"animation",position:[0,-.75,-1.3],fallback:[140/600,340/460]}].map(e=>({...e,label:t.querySelector(`[data-label="${e.key}"]`),point:t.querySelector(`[data-point="${e.key}"]`),leader:t.querySelector(`[data-leader="${e.key}"]`)}));let e,s,b,E,C,D,A,g=0,v=0,c=0,a=0,f=-.48,m=.13,r=!x.matches,O=!0,h=!1,i=null;const l=(e,t,n)=>Math.min(n,Math.max(t,e));function T(e,t){const n=new Float32Array(16);for(let s=0;s<4;s++)for(let o=0;o<4;o++)for(let i=0;i<4;i++)n[s*4+o]+=e[i*4+o]*t[s*4+i];return n}function P(){const n=Math.cos(f),s=Math.sin(f),o=Math.cos(m),i=Math.sin(m),d=new Float32Array([n,0,-s,0,s*i,o,n*i,0,s*o,-i,n*o,0,0,0,0,1]),r=c/a,u=5.4/Math.min(1,r),h=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,-u,1]),l=1/Math.tan(42*Math.PI/360),e=.1,t=30,p=new Float32Array([l/r,0,0,0,0,l,0,0,0,0,(t+e)/(e-t),-1,0,0,2*t*e/(e-t),0]);return T(p,T(h,d))}function R([e,t,n],s){const i=s[0]*e+s[4]*t+s[8]*n+s[12],r=s[1]*e+s[5]*t+s[9]*n+s[13],o=s[3]*e+s[7]*t+s[11]*n+s[15];return{x:(i/o+1)*c/2,y:(1-r/o)*a/2}}function S(e){const n=e.reduce((e,t)=>({x:e.x+t.x/4,y:e.y+t.y/4}),{x:0,y:0}),t=e.map((e,t)=>{const s=u[t].label.offsetWidth,o=u[t].label.offsetHeight,i=e.x-n.x,r=e.y-n.y,d=Math.max(1,Math.hypot(i,r));return{anchor:e,width:s,height:o,x:l(e.x+i/d*(22+s/2),s/2+6,c-s/2-6),y:l(e.y+r/d*33,o/2+8,a-o/2-8)}});for(let e=0;e<8;e++)for(let e=0;e<t.length;e++)for(let o=e+1;o<t.length;o++){const n=t[e],s=t[o],r=(n.width+s.width)/2+12-Math.abs(n.x-s.x),i=(n.height+s.height)/2+10-Math.abs(n.y-s.y);if(r>0&&i>0){const e=n.y<=s.y?-1:1;n.y=l(n.y+e*(i/2+1),n.height/2+8,a-n.height/2-8),s.y=l(s.y-e*(i/2+1),s.height/2+8,a-s.height/2-8)}}t.forEach((e,t)=>{const n=u[t];n.label.style.left=`${e.x}px`,n.label.style.top=`${e.y}px`,n.point.style.left=`${e.anchor.x}px`,n.point.style.top=`${e.anchor.y}px`,n.leader.setAttribute("x1",e.anchor.x),n.leader.setAttribute("y1",e.anchor.y),n.leader.setAttribute("x2",l(e.anchor.x,e.x-e.width/2,e.x+e.width/2)),n.leader.setAttribute("y2",l(e.anchor.y,e.y-e.height/2,e.y+e.height/2))})}function M(){if(c=d.clientWidth,a=d.clientHeight,!c||!a)return;if(L.setAttribute("viewBox",`0 0 ${c} ${a}`),!h){S(u.map(e=>({x:e.fallback[0]*c,y:e.fallback[1]*a})));return}const t=Math.min(devicePixelRatio||1,2),n=Math.round(c*t),i=Math.round(a*t);(o.width!==n||o.height!==i)&&(o.width=n,o.height=i);const r=P();e.viewport(0,0,o.width,o.height),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(s),e.uniformMatrix4fv(E,!1,r),e.uniform2f(C,o.width,o.height),e.uniform1f(D,1.45*t/2),e.uniform1f(A,.75),e.drawArrays(e.TRIANGLES,0,36),S(u.map(e=>R(e.position,r)))}function p(){_.textContent=r?"Pause":"Play",_.setAttribute("aria-label",r?"Pause rotation":"Start rotation")}function n(){!g&&O&&!document.hidden&&(g=requestAnimationFrame(N))}function N(e){g=0;const t=v?Math.min((e-v)/1e3,.05):0;v=e,r&&h&&!i&&(f+=t*.13),M(),r&&h?n():v=0}function y(){cancelAnimationFrame(g),g=0,v=0}function z(t,n){const s=e.createShader(t);if(e.shaderSource(s,n),e.compileShader(s),!e.getShaderParameter(s,e.COMPILE_STATUS))throw e.deleteShader(s),new Error("Pyramid shader compilation failed.");return s}function F(){try{if(e=o.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!0,powerPreference:"low-power"}),!e)throw new Error("WebGL is unavailable.");const n=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0?"highp":"mediump",i=z(e.VERTEX_SHADER,`
        precision ${n} float;
        attribute vec3 a_start;
        attribute vec3 a_end;
        attribute vec2 a_corner;
        attribute vec3 a_color;
        uniform mat4 u_matrix;
        uniform vec2 u_resolution;
        uniform float u_halfWidth;
        uniform float u_feather;
        varying vec3 v_color;
        varying vec2 v_start;
        varying vec2 v_end;
        void main() {
          vec4 start = u_matrix * vec4(a_start, 1.0);
          vec4 end = u_matrix * vec4(a_end, 1.0);
          v_start = (start.xy / start.w * 0.5 + 0.5) * u_resolution;
          v_end = (end.xy / end.w * 0.5 + 0.5) * u_resolution;
          vec2 segment = v_end - v_start;
          vec2 direction = segment / max(length(segment), 0.001);
          vec2 normal = vec2(-direction.y, direction.x);
          // Include the antialiasing fringe and rounded caps inside the quad.
          float extent = u_halfWidth + u_feather;
          vec2 padding = (normal * a_corner.y + direction * (a_corner.x * 2.0 - 1.0)) * extent;
          vec4 point = mix(start, end, a_corner.x);
          point.xy += padding * 2.0 / u_resolution * point.w;
          gl_Position = point;
          v_color = a_color;
        }
      `),a=z(e.FRAGMENT_SHADER,`
        precision ${n} float;
        uniform float u_halfWidth;
        uniform float u_feather;
        varying vec3 v_color;
        varying vec2 v_start;
        varying vec2 v_end;
        void main() {
          vec2 segment = v_end - v_start;
          vec2 offset = gl_FragCoord.xy - v_start;
          float along = clamp(dot(offset, segment) / max(dot(segment, segment), 0.0001), 0.0, 1.0);
          float distanceToLine = length(offset - along * segment);
          float coverage = 1.0 - smoothstep(max(0.0, u_halfWidth - u_feather), u_halfWidth + u_feather, distanceToLine);
          // Match the canvas compositor's premultiplied-alpha convention.
          gl_FragColor = vec4(v_color * coverage, coverage);
        }
      `);if(s=e.createProgram(),e.attachShader(s,i),e.attachShader(s,a),e.linkProgram(s),e.deleteShader(i),e.deleteShader(a),!e.getProgramParameter(s,e.LINK_STATUS))throw new Error("Pyramid linking failed.");const r=[],c=[[0,-1],[1,-1],[1,1],[0,-1],[1,1],[0,1]];[[0,1],[0,2],[1,2],[0,3],[1,3],[2,3]].forEach(([e,t],n)=>{const s=n<3?[248/255,248/255,1]:[132/255,249/255,235/255];c.forEach(n=>r.push(...u[e].position,...u[t].position,...n,...s))}),b=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,b),e.bufferData(e.ARRAY_BUFFER,new Float32Array(r),e.STATIC_DRAW),e.useProgram(s),[["a_start",3,0],["a_end",3,3],["a_corner",2,6],["a_color",3,8]].forEach(([t,n,o])=>{const i=e.getAttribLocation(s,t);e.enableVertexAttribArray(i),e.vertexAttribPointer(i,n,e.FLOAT,!1,44,o*4)}),E=e.getUniformLocation(s,"u_matrix"),C=e.getUniformLocation(s,"u_resolution"),D=e.getUniformLocation(s,"u_halfWidth"),A=e.getUniformLocation(s,"u_feather"),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.clearColor(0,0,0,0),h=!0,t.dataset.renderer="webgl",w.hidden=!1,t.querySelector("[data-instructions]").hidden=!1}catch{h=!1,t.dataset.renderer="static",w.hidden=!0,t.querySelector("[data-instructions]").hidden=!0,e&&s&&e.deleteProgram(s),e&&b&&e.deleteBuffer(b)}p(),n()}function j(e){r=!1,f+=e,p(),n()}function k(){f=-.48,m=.13,r=!1,p(),n()}_.addEventListener("click",()=>{r=!r,p(),n()}),t.querySelectorAll("[data-rotate]").forEach(e=>e.addEventListener("click",()=>j(Number(e.dataset.rotate)*.22))),t.querySelector("[data-reset]").addEventListener("click",k),o.addEventListener("keydown",e=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"," ","Home"].includes(e.key)&&e.preventDefault(),e.key==="ArrowLeft"&&j(-.18),e.key==="ArrowRight"&&j(.18),(e.key==="ArrowUp"||e.key==="ArrowDown")&&(m=l(m+(e.key==="ArrowUp"?-.12:.12),-1.1,1.1),j(0)),e.key===" "&&_.click(),e.key==="Home"&&k()}),d.addEventListener("pointerdown",e=>{if(!h||e.pointerType==="mouse"&&e.button!==0)return;i={id:e.pointerId,x:e.clientX,y:e.clientY,yaw:f,pitch:m,started:e.pointerType==="mouse"},d.setPointerCapture(e.pointerId)}),d.addEventListener("pointermove",e=>{if(!i||i.id!==e.pointerId)return;const t=e.clientX-i.x,s=e.clientY-i.y;if(!i.started&&Math.abs(t)>8&&Math.abs(t)>Math.abs(s)&&(i.started=!0),!i.started)return;r=!1,f=i.yaw+t*.008,m=l(i.pitch+s*.005,-1.1,1.1),p(),n()}),["pointerup","pointercancel","lostpointercapture"].forEach(e=>d.addEventListener(e,()=>{i=null,n()})),o.addEventListener("webglcontextlost",e=>{e.preventDefault(),y(),h=!1,t.dataset.renderer="static",w.hidden=!0,t.querySelector("[data-instructions]").hidden=!0,M()}),o.addEventListener("webglcontextrestored",F),new ResizeObserver(n).observe(d),window.addEventListener("resize",n),new IntersectionObserver(e=>{O=e[0].isIntersecting,O?n():y()}).observe(t),document.addEventListener("visibilitychange",()=>{document.hidden?y():n()}),x.addEventListener("change",()=>{x.matches&&(r=!1,p(),n())}),document.fonts.ready.then(n),window.addEventListener("pagehide",y),window.addEventListener("pageshow",n),F()})()