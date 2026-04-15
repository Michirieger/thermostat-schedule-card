const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,y=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=new Map,$[y("finalized")]=new Map,f?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,w=t=>t,S=x.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,M=`<${C}>`,T=document,N=()=>T.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,D=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,R=/"/g,L=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),J=new WeakMap,F=T.createTreeWalker(T,129);function V(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=z;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===z?"!--"===l[1]?r=H:void 0!==l[1]?r=D:void 0!==l[2]?(L.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=j):void 0!==l[3]&&(r=j):r===j?">"===l[0]?(r=o??z,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?j:'"'===l[3]?R:B):r===R||r===B?r=j:r===H||r===D?r=z:(r=j,o=void 0);const h=r===j&&t[e+1].startsWith("/>")?" ":"";n+=r===z?i+M:c>=0?(s.push(a),i.slice(0,c)+k+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[V(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=q(t,e);if(this.el=Z.createElement(l,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(k)){const e=c[n++],i=s.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],N()),F.nextNode(),a.push({type:2,index:++o});s.append(t[e],N())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);F.currentNode=s;let o=F.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new st(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=F.nextNode(),n++)}return F.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new Z(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Y(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=X(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=X(this,s[i+r],e,r),a===W&&(a=this._$AH[r]),n||=!O(a)||a!==this._$AH[r],a===G?t=G:t!==G&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class it extends Q{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??G)===W)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(Z,Y),(x.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class rt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Y(e.insertBefore(N(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const at=nt.litElementPolyfillSupport;at?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");const lt=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ct=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dt=["sun","mon","tue","wed","thu","fri","sat"];function ht(t){const e=Math.max(0,Math.min(1440,t)),i=Math.floor(e/60)%24,s=e%60;return`${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function pt(t,e=!1){if(!t)return e?1440:0;const[i,s]=t.split(":").map(Number),o=60*(i||0)+(s||0);return 0===o&&e?1440:o}function ut(){return`${Date.now().toString(36)}_${Math.random().toString(36).substr(2,5)}`}function mt(t){const e=[...t].sort((t,e)=>t-e);return 7===e.length?"Every day":JSON.stringify(e)===JSON.stringify([1,2,3,4,5])?"Monday to Friday":JSON.stringify(e)===JSON.stringify([0,6])?"Weekend":JSON.stringify(e)===JSON.stringify([6])?"Saturday":JSON.stringify(e)===JSON.stringify([0])?"Sunday":1===e.length?ct[e[0]]:e.map(t=>lt[t]).join(", ")}function gt(t,e=5,i=35){return(t-e)/(i-e)>=.4?{bg:"#5ba4cf",text:"#fff"}:{bg:"#9e9e9e",text:"#fff"}}function ft(t){return[...t].sort((t,e)=>t.startMinutes-e.startMinutes)}function yt(){return{version:1,groups:[{id:ut(),days:[1,2,3,4,5],blocks:[{id:ut(),startMinutes:0,endMinutes:450,temperature:18},{id:ut(),startMinutes:450,endMinutes:1080,temperature:22},{id:ut(),startMinutes:1080,endMinutes:1440,temperature:18}]},{id:ut(),days:[6],blocks:[{id:ut(),startMinutes:0,endMinutes:540,temperature:18},{id:ut(),startMinutes:540,endMinutes:1200,temperature:22},{id:ut(),startMinutes:1200,endMinutes:1440,temperature:18}]},{id:ut(),days:[0],blocks:[{id:ut(),startMinutes:0,endMinutes:540,temperature:18},{id:ut(),startMinutes:540,endMinutes:1080,temperature:23},{id:ut(),startMinutes:1080,endMinutes:1440,temperature:18}]}]}}function _t(t){return`thermostat_schedule_card:${t}`}async function bt(t,e,i,s,o,n){const r=ht(s.startMinutes),a=i.days.map(t=>dt[t]),l={alias:`[Thermostat Schedule] ${mt(i.days)} → ${s.temperature}° at ${r}`,description:`${e}:${i.id}:${s.id}`,mode:"single",trigger:[{platform:"time",at:`${r}:00`}],condition:a.length<7?[{condition:"time",weekday:a}]:[],action:o.map(t=>({service:"climate.set_temperature",target:{entity_id:t},data:{temperature:s.temperature}}))};await t.callWS({type:"config/automation/create",config:l})}async function vt(t,e){const i=_t(e);try{return(await t.callWS({type:"config/automation/list"})).filter(t=>t.description&&t.description.startsWith(i+":")).length}catch{return 0}}class $t extends rt{static properties={open:{type:Boolean},block:{type:Object},isNew:{type:Boolean},minTemp:{type:Number},maxTemp:{type:Number},tempStep:{type:Number},_startTime:{state:!0},_endTime:{state:!0},_temperature:{state:!0}};static styles=n`
    :host {
      --dialog-width: 340px;
    }

    ha-dialog {
      --mdc-dialog-min-width: var(--dialog-width);
      --mdc-dialog-max-width: var(--dialog-width);
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 8px 0 4px;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .field-label {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .time-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .time-input-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .time-sublabel {
      font-size: 0.7rem;
      color: var(--secondary-text-color);
    }

    input[type='time'] {
      width: 100%;
      padding: 10px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color);
      box-sizing: border-box;
      outline: none;
      cursor: pointer;
    }

    input[type='time']:focus {
      border-color: var(--primary-color);
    }

    .temp-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .temp-btn {
      background: var(--secondary-background-color, #f5f5f5);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 1.4rem;
      cursor: pointer;
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      line-height: 1;
      user-select: none;
      transition: background 0.15s, color 0.15s;
    }

    .temp-btn:hover {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }

    .temp-display {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 4px;
    }

    .temp-value {
      font-size: 1.8rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .temp-unit {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }

    input[type='range'] {
      flex: 1;
      accent-color: var(--primary-color);
    }

    .preview-block {
      border-radius: 6px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 600;
      transition: background 0.2s;
    }

    .delete-btn {
      --mdc-theme-primary: var(--error-color, #b71c1c);
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `;willUpdate(t){if(t.has("block")&&this.block){this._startTime=ht(this.block.startMinutes);const t=this.block.endMinutes;this._endTime=1440===t?"00:00":ht(t),this._temperature=this.block.temperature}t.has("isNew")&&this.isNew&&!this.block&&(this._startTime="07:00",this._endTime="22:00",this._temperature=21)}_cancel(){this.dispatchEvent(new CustomEvent("block-cancel",{bubbles:!0,composed:!0}))}_save(){const t=pt(this._startTime,!1),e=pt(this._endTime,!0);this.dispatchEvent(new CustomEvent("block-save",{bubbles:!0,composed:!0,detail:{block:{...this.block||{},startMinutes:t,endMinutes:e,temperature:this._temperature}}}))}_delete(){this.dispatchEvent(new CustomEvent("block-delete",{bubbles:!0,composed:!0,detail:{id:this.block?.id}}))}_adjustTemp(t){const e=this.minTemp??5,i=this.maxTemp??35,s=this.tempStep??.5;this._temperature=Math.round(Math.max(e,Math.min(i,(this._temperature??20)+t))/s)*s}_onTempSlider(t){this._temperature=parseFloat(t.target.value)}render(){if(!this.open)return I``;const t=this.minTemp??5,e=this.maxTemp??35,i=this.tempStep??.5,s=this._temperature??20,o=gt(s,t,e);return I`
      <ha-dialog
        .open=${this.open}
        .heading=${this.isNew?"Add Time Block":"Edit Time Block"}
        @closed=${this._cancel}
        hideActions
      >
        <div class="content" slot="content">

          <div class="field-group">
            <div class="field-label">Time Range</div>
            <div class="time-row">
              <div class="time-input-wrap">
                <span class="time-sublabel">Start</span>
                <input
                  type="time"
                  .value=${this._startTime??""}
                  @change=${t=>this._startTime=t.target.value}
                />
              </div>
              <div class="time-input-wrap">
                <span class="time-sublabel">End (00:00 = midnight)</span>
                <input
                  type="time"
                  .value=${this._endTime??""}
                  @change=${t=>this._endTime=t.target.value}
                />
              </div>
            </div>
          </div>

          <div class="field-group">
            <div class="field-label">Temperature</div>
            <div class="temp-control">
              <button class="temp-btn" @click=${()=>this._adjustTemp(-i)}>−</button>
              <div class="temp-display">
                <span class="temp-value">${s%1==0?s:s.toFixed(1)}</span>
                <span class="temp-unit">°C</span>
              </div>
              <button class="temp-btn" @click=${()=>this._adjustTemp(i)}>+</button>
            </div>
            <input
              type="range"
              min=${t}
              max=${e}
              step=${i}
              .value=${String(s)}
              @input=${this._onTempSlider}
            />
          </div>

          <div
            class="preview-block"
            style="background:${o.bg}; color:${o.text}"
          >
            ${s%1==0?s:s.toFixed(1)}°C
            &nbsp;·&nbsp;
            ${this._startTime??""} – ${"00:00"===this._endTime?"24:00":this._endTime??""}
          </div>

        </div>

        <div class="dialog-footer" slot="actions">
          ${this.isNew?I``:I`
                <mwc-button
                  class="delete-btn"
                  label="Delete"
                  @click=${this._delete}
                ></mwc-button>
                <span style="flex:1"></span>
              `}
          <mwc-button label="Cancel" @click=${this._cancel}></mwc-button>
          <mwc-button raised label="Save" @click=${this._save}></mwc-button>
        </div>
      </ha-dialog>
    `}}customElements.define("thermostat-block-dialog",$t);class xt extends rt{static properties={open:{type:Boolean},group:{type:Object},usedDays:{type:Array},_selectedDays:{state:!0}};static styles=n`
    ha-dialog {
      --mdc-dialog-min-width: 320px;
      --mdc-dialog-max-width: 380px;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }

    .field-label {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 8px;
    }

    .day-chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .day-chip {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--secondary-text-color);
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      user-select: none;
    }

    .day-chip.selected {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: white;
    }

    .day-chip.disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .hint {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }

    .danger-section {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 12px;
    }

    .danger-label {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--error-color, #b71c1c);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 8px;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      align-items: center;
    }

    mwc-button.delete {
      --mdc-theme-primary: var(--error-color, #b71c1c);
    }
  `;willUpdate(t){t.has("group")&&this.group&&(this._selectedDays=[...this.group.days||[]])}_toggleDay(t){const e=(this.usedDays||[]).filter(t=>!(this.group?.days||[]).includes(t));if(e.includes(t))return;const i=(this._selectedDays||[]).indexOf(t);this._selectedDays=i>=0?this._selectedDays.filter(e=>e!==t):[...this._selectedDays||[],t]}_cancel(){this.dispatchEvent(new CustomEvent("group-cancel",{bubbles:!0,composed:!0}))}_save(){this._selectedDays?.length&&this.dispatchEvent(new CustomEvent("group-days-save",{bubbles:!0,composed:!0,detail:{groupId:this.group.id,days:[...this._selectedDays]}}))}_delete(){this.dispatchEvent(new CustomEvent("group-delete",{bubbles:!0,composed:!0,detail:{groupId:this.group.id}}))}render(){if(!this.open||!this.group)return I``;const t=(this.usedDays||[]).filter(t=>!(this.group.days||[]).includes(t)),e=this._selectedDays||[];return I`
      <ha-dialog
        .open=${this.open}
        heading="Manage Days"
        @closed=${this._cancel}
        hideActions
      >
        <div class="content" slot="content">
          <div>
            <div class="field-label">Days in this group</div>
            <div class="day-chips">
              ${[0,1,2,3,4,5,6].map(i=>I`
                  <div
                    class="day-chip
                      ${e.includes(i)?"selected":""}
                      ${t.includes(i)?"disabled":""}"
                    @click=${()=>this._toggleDay(i)}
                    title=${t.includes(i)?"Used by another group":lt[i]}
                  >
                    ${lt[i]}
                  </div>
                `)}
            </div>
            <p class="hint">
              Grayed-out days are assigned to another group. Remove them from
              that group first to reassign them here.
            </p>
          </div>

          <div class="danger-section">
            <div class="danger-label">Danger Zone</div>
            <mwc-button
              class="delete"
              label="Delete this group"
              @click=${this._delete}
            ></mwc-button>
          </div>
        </div>

        <div class="dialog-footer" slot="actions">
          <mwc-button label="Cancel" @click=${this._cancel}></mwc-button>
          <mwc-button
            raised
            label="Save"
            ?disabled=${!e.length}
            @click=${this._save}
          ></mwc-button>
        </div>
      </ha-dialog>
    `}}customElements.define("thermostat-group-dialog",xt);class wt extends rt{static properties={hass:{type:Object},config:{type:Object}};static styles=n`
    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }

    .section-title {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 4px;
    }

    .entity-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .entity-row ha-entity-picker {
      flex: 1;
    }

    .number-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }

    ha-textfield {
      width: 100%;
    }

    .helper-note {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin-top: 6px;
      line-height: 1.4;
    }

    .helper-note code {
      font-size: 0.72rem;
      background: var(--secondary-background-color, rgba(0,0,0,0.06));
      padding: 1px 4px;
      border-radius: 3px;
    }
  `;setConfig(t){this.config=t}_fireChanged(t){this.config={...this.config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}_addEntity(){const t=[...this.config.entities||[],""];this._fireChanged({entities:t})}_updateEntity(t,e){const i=[...this.config.entities||[]];i[t]=e,this._fireChanged({entities:i})}_removeEntity(t){const e=(this.config.entities||[]).filter((e,i)=>i!==t);this._fireChanged({entities:e})}_updateScheduleEntity(t){if(t)this._fireChanged({schedule_entity:t});else{const{schedule_entity:t,...e}=this.config;this.config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}}render(){if(!this.hass||!this.config)return I``;const t=this.config.entities||[],e=this.config.min_temp??5,i=this.config.max_temp??35,s=this.config.temp_step??.5,o=this.config.schedule_entity??"";return I`
      <div class="form">

        <div>
          <div class="section-title">Climate Entities</div>
          <div class="entity-list">
            ${t.map((t,e)=>I`
                <div class="entity-row">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${t}
                    .includeDomains=${["climate"]}
                    @value-changed=${t=>this._updateEntity(e,t.detail.value)}
                    allow-custom-entity
                  ></ha-entity-picker>
                  <ha-icon-button
                    .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                    @click=${()=>this._removeEntity(e)}
                    title="Remove entity"
                  ></ha-icon-button>
                </div>
              `)}
            <mwc-button
              label="Add Entity"
              icon="mdi:plus"
              @click=${this._addEntity}
            ></mwc-button>
          </div>
        </div>

        <div>
          <div class="section-title">Title (optional)</div>
          <ha-textfield
            label="Card title"
            .value=${this.config.title??""}
            @change=${t=>this._fireChanged({title:t.target.value})}
          ></ha-textfield>
        </div>

        <div>
          <div class="section-title">Temperature Range</div>
          <div class="number-row">
            <ha-textfield
              label="Min (°C)"
              type="number"
              .value=${String(e)}
              @change=${t=>this._fireChanged({min_temp:parseFloat(t.target.value)})}
            ></ha-textfield>
            <ha-textfield
              label="Max (°C)"
              type="number"
              .value=${String(i)}
              @change=${t=>this._fireChanged({max_temp:parseFloat(t.target.value)})}
            ></ha-textfield>
            <ha-textfield
              label="Step (°C)"
              type="number"
              step="0.5"
              .value=${String(s)}
              @change=${t=>this._fireChanged({temp_step:parseFloat(t.target.value)})}
            ></ha-textfield>
          </div>
        </div>

        <div>
          <div class="section-title">Schedule Storage Entity (input_text)</div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${o}
            .includeDomains=${["input_text"]}
            @value-changed=${t=>this._updateScheduleEntity(t.detail.value)}
            allow-custom-entity
          ></ha-entity-picker>
          <div class="helper-note">
            Create a Text helper in
            <strong>Settings → Devices &amp; Services → Helpers</strong>,
            set max length to <code>10000</code>.
            When set, schedule changes are saved immediately without requiring
            dashboard edit mode.
          </div>
        </div>

      </div>
    `}}customElements.define("thermostat-schedule-card-editor",wt);class St extends rt{static properties={hass:{type:Object},config:{type:Object},_schedule:{state:!0},_editBlock:{state:!0},_editGroup:{state:!0},_syncStatus:{state:!0},_syncMessage:{state:!0},_syncCount:{state:!0}};static styles=n`
    :host {
      display: block;
      --block-height: 54px;
      --radius: 8px;
      --comfortable-color: #5ba4cf;
      --eco-color: #9e9e9e;
    }

    ha-card {
      overflow: hidden;
    }

    /* ── Header ── */
    .card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 14px 16px 6px;
    }

    .header-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .card-title {
      font-size: 1rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .card-subtitle {
      font-size: 0.72rem;
      color: var(--secondary-text-color);
    }

    .header-actions {
      display: flex;
      gap: 2px;
      align-items: center;
    }

    /* ── Info banner ── */
    .info-banner {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin: 0 16px 8px;
      padding: 8px 10px;
      border-radius: var(--radius);
      background: var(--info-color, #2196f3);
      color: #fff;
      font-size: 0.72rem;
      line-height: 1.4;
      opacity: 0.88;
    }

    .info-banner ha-icon {
      --mdc-icon-size: 16px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* ── Schedule ── */
    .schedule-body {
      padding: 4px 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    /* ── Loading state ── */
    .loading-state {
      padding: 24px 16px;
      text-align: center;
      font-size: 0.82rem;
      color: var(--secondary-text-color);
    }

    /* ── Group section ── */
    .group-section {
      padding: 10px 0 2px;
    }

    .group-section + .group-section {
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
    }

    .group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .group-name {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .group-btns {
      display: flex;
      gap: 0;
    }

    /* ── Timeline ── */
    .timeline {
      position: relative;
      height: var(--block-height);
      border-radius: var(--radius);
      overflow: hidden;
      background: var(--secondary-background-color, #f0f0f0);
      display: flex;
      cursor: default;
    }

    .timeline-block {
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      border-right: 2px solid rgba(255, 255, 255, 0.5);
      transition: filter 0.12s;
      overflow: hidden;
      user-select: none;
    }

    .timeline-block:last-child {
      border-right: none;
    }

    .timeline-block:hover {
      filter: brightness(0.88);
    }

    .block-temp {
      font-size: 0.82rem;
      font-weight: 700;
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.25);
      pointer-events: none;
    }

    .block-add-hint {
      font-size: 0.6rem;
      color: rgba(255,255,255,0.7);
      pointer-events: none;
    }

    /* ── Time labels ── */
    .time-labels {
      position: relative;
      height: 18px;
      margin-top: 3px;
    }

    .time-label {
      position: absolute;
      font-size: 0.62rem;
      color: var(--secondary-text-color);
      white-space: nowrap;
      transform: translateX(-50%);
    }

    .time-label.edge-left { transform: translateX(0); }
    .time-label.edge-right { transform: translateX(-100%); }

    /* ── Add block button ── */
    .add-block-row {
      display: flex;
      justify-content: flex-end;
      padding-top: 2px;
    }

    /* ── Bottom actions ── */
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 16px 14px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
      flex-wrap: wrap;
      gap: 8px;
    }

    .sync-status {
      font-size: 0.72rem;
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
    }

    .sync-status.ok { color: var(--success-color, #4caf50); }
    .sync-status.error { color: var(--error-color, #f44336); }

    .bottom-right {
      display: flex;
      gap: 6px;
    }

    ha-icon-button {
      --mdc-icon-button-size: 34px;
      color: var(--secondary-text-color);
    }

    ha-icon-button:hover {
      color: var(--primary-color);
    }

    mwc-button {
      --mdc-theme-primary: var(--primary-color);
    }
  `;_lastEntityState=void 0;setConfig(t){if(!t.entities?.length)throw new Error("Please define at least one climate entity.");this.config=t,t.schedule_entity?(this._schedule=null,this._lastEntityState=void 0):this._schedule=t.schedule?JSON.parse(JSON.stringify(t.schedule)):yt(),this._syncStatus="idle",this._syncMessage="",this._syncCount=null,this._loadSyncCount()}updated(t){if(!t.has("hass"))return;const e=this.config?.schedule_entity;if(!e||!this.hass)return;const i=this.hass.states[e]?.state;if(void 0!==i&&i!==this._lastEntityState){this._lastEntityState=i;try{const t=JSON.parse(i);t&&"object"==typeof t&&Array.isArray(t.groups)&&(this._schedule=t)}catch{}}}getCardSize(){return 2+2*(this._schedule?.groups?.length??3)}static getConfigElement(){return document.createElement("thermostat-schedule-card-editor")}static getStubConfig(){return{entities:["climate.living_room"],title:"Thermostat Schedule",min_temp:5,max_temp:35,temp_step:.5,schedule:yt()}}async _loadSyncCount(){this.hass&&this._cardId&&(this._syncCount=await vt(this.hass,this._cardId))}get _cardId(){return(this.config?.entities||[]).join("_").replace(/[^a-z0-9_]/gi,"_")}_commitSchedule(t){this._schedule=t,this.config.schedule_entity?(this.hass.callService("input_text","set_value",{entity_id:this.config.schedule_entity,value:JSON.stringify(t)}),this._lastEntityState=JSON.stringify(t)):(this.config={...this.config,schedule:t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0})))}_saveBlock(t){const{block:e}=t.detail,{groupId:i,isNew:s}=this._editBlock,o=this._schedule.groups.map(t=>{if(t.id!==i)return t;let o;return o=s?[...t.blocks,{...e,id:ut()}]:t.blocks.map(t=>t.id===e.id?e:t),{...t,blocks:ft(o)}});this._commitSchedule({...this._schedule,groups:o}),this._editBlock=null}_deleteBlock(t){const{id:e}=t.detail,{groupId:i}=this._editBlock,s=this._schedule.groups.map(t=>t.id!==i?t:{...t,blocks:t.blocks.filter(t=>t.id!==e)});this._commitSchedule({...this._schedule,groups:s}),this._editBlock=null}_addBlock(t){const e=this._schedule.groups.find(e=>e.id===t);ft(e?.blocks??[]);this._editBlock={block:{id:null,startMinutes:360,endMinutes:480,temperature:21},groupId:t,isNew:!0}}_openEditBlock(t,e){this._editBlock={block:t,groupId:e,isNew:!1}}_saveGroupDays(t){const{groupId:e,days:i}=t.detail,s=this._schedule.groups.map(t=>t.id===e?{...t,days:i}:t);this._commitSchedule({...this._schedule,groups:s}),this._editGroup=null}_deleteGroup(t){const{groupId:e}=t.detail,i=this._schedule.groups.filter(t=>t.id!==e);this._commitSchedule({...this._schedule,groups:i}),this._editGroup=null}_addGroup(){const t=this._schedule.groups.flatMap(t=>t.days),e=[0,1,2,3,4,5,6].filter(e=>!t.includes(e));if(!e.length)return;const i={id:ut(),days:[e[0]],blocks:[{id:ut(),startMinutes:0,endMinutes:480,temperature:18},{id:ut(),startMinutes:480,endMinutes:1080,temperature:22},{id:ut(),startMinutes:1080,endMinutes:1440,temperature:18}]},s=[...this._schedule.groups,i];this._commitSchedule({...this._schedule,groups:s})}async _syncToHA(){this._syncStatus="syncing",this._syncMessage="";try{await async function(t,e,i,s){const o=_t(e);let n=[];try{n=await t.callWS({type:"config/automation/list"})}catch(t){throw new Error(`Failed to list automations: ${t.message}`)}const r=n.filter(t=>t.description&&t.description.startsWith(o+":"));for(const e of r)try{await t.callWS({type:"config/automation/delete",automation_id:e.id})}catch(t){console.warn(`[thermostat-schedule-card] Could not delete automation ${e.id}:`,t)}const a=[];for(const e of s.groups)for(const s of e.blocks)try{await bt(t,o,e,s,i)}catch(t){a.push(`Block ${s.id}: ${t.message}`)}if(a.length)throw new Error(`Some automations failed:\n${a.join("\n")}`)}(this.hass,this._cardId,this.config.entities,this._schedule,this.config.temp_step??.5),this._syncCount=await vt(this.hass,this._cardId),this._syncStatus="ok",this._syncMessage=`${this._syncCount} automation(s) synced`}catch(t){this._syncStatus="error",this._syncMessage=t.message}}_renderGroup(t){const e=ft(t.blocks),i=function(t){const e=new Set;e.add(0),e.add(1440);for(const i of t)e.add(i.startMinutes),e.add(i.endMinutes);return[...e].sort((t,e)=>t-e)}(e),s=this.config.min_temp??5,o=this.config.max_temp??35;return I`
      <div class="group-section">
        <div class="group-header">
          <span class="group-name">${mt(t.days)}</span>
          <div class="group-btns">
            <ha-icon-button
              title="Manage days / delete group"
              .path=${"M12,2C6.48,2 2,6.48 2,12s4.48,10 10,10 10-4.48 10-10S17.52,2 12,2zm1,15h-2v-2h2v2zm0-4h-2V7h2v6z"}
              @click=${()=>{this._editGroup=t}}
            ></ha-icon-button>
          </div>
        </div>

        <div class="timeline">
          ${e.map(e=>{const i=(e.endMinutes-e.startMinutes)/1440*100,n=gt(e.temperature,s,o);return I`
              <div
                class="timeline-block"
                style="width:${i}%; background:${n.bg};"
                title="${ht(e.startMinutes)} – ${1440===e.endMinutes?"24:00":ht(e.endMinutes)}  |  ${e.temperature}°C  (click to edit)"
                @click=${()=>this._openEditBlock(e,t.id)}
              >
                <span class="block-temp">${e.temperature}°</span>
              </div>
            `})}
        </div>

        <!-- Time labels -->
        <div class="time-labels">
          ${i.map((t,e)=>{const s=t/1440*100,o=0===e,n=e===i.length-1;return I`
              <span
                class="time-label ${o?"edge-left":""} ${n?"edge-right":""}"
                style="left:${s}%"
              >
                ${1440===t?"24:00":ht(t)}
              </span>
            `})}
        </div>

        <div class="add-block-row">
          <mwc-button
            dense
            label="Add time block"
            @click=${()=>this._addBlock(t.id)}
          ></mwc-button>
        </div>
      </div>
    `}_renderSyncStatus(){return"idle"===this._syncStatus?I`
        <span class="sync-status">
          ${null!==this._syncCount?I`${this._syncCount} automation(s) active`:I`Not yet synced to HA`}
        </span>
      `:"syncing"===this._syncStatus?I`<span class="sync-status">Syncing…</span>`:"ok"===this._syncStatus?I`<span class="sync-status ok">✓ ${this._syncMessage}</span>`:I`<span class="sync-status error" title=${this._syncMessage}>⚠ Sync failed</span>`}render(){const{schedule:t,...e}=this.config??{},i=this._schedule,s=Boolean(this.config?.schedule_entity);if(!i)return I`
        <ha-card>
          <div class="loading-state">
            Loading schedule from <code>${this.config.schedule_entity}</code>…
          </div>
        </ha-card>
      `;const o=i.groups.flatMap(t=>t.days),n=7-o.length,r=this._editBlock,a=this._editGroup,l=(this.config.entities||[]).join(", "),c=this.config.title??"Thermostat Schedule";return I`
      <ha-card>
        <!-- ── Header ── -->
        <div class="card-header">
          <div class="header-left">
            <span class="card-title">${c}</span>
            <span class="card-subtitle">${l}</span>
          </div>
        </div>

        <!-- ── Info banner (only when no schedule_entity is set) ── -->
        ${s?I``:I`
          <div class="info-banner">
            <ha-icon icon="mdi:information-outline"></ha-icon>
            <span>Tip: Add <code>schedule_entity: input_text.my_schedule</code> to persist changes without dashboard edit mode.</span>
          </div>
        `}

        <!-- ── Schedule rows ── -->
        <div class="schedule-body">
          ${i.groups.map(t=>this._renderGroup(t))}

          ${n>0?I`
                <div style="padding-top:8px;">
                  <mwc-button
                    outlined
                    label="Add day group (${n} day${n>1?"s":""} unassigned)"
                    @click=${this._addGroup}
                  ></mwc-button>
                </div>
              `:I``}
        </div>

        <!-- ── Bottom bar ── -->
        <div class="bottom-bar">
          ${this._renderSyncStatus()}
          <div class="bottom-right">
            <mwc-button
              outlined
              label="Sync to HA"
              title="Create/update Home Assistant automations for this schedule"
              ?disabled=${"syncing"===this._syncStatus}
              @click=${this._syncToHA}
            ></mwc-button>
          </div>
        </div>
      </ha-card>

      <!-- ── Block edit dialog ── -->
      ${r?I`
            <thermostat-block-dialog
              .open=${!0}
              .block=${r.block}
              .isNew=${r.isNew}
              .minTemp=${this.config.min_temp??5}
              .maxTemp=${this.config.max_temp??35}
              .tempStep=${this.config.temp_step??.5}
              @block-save=${this._saveBlock}
              @block-delete=${this._deleteBlock}
              @block-cancel=${()=>{this._editBlock=null}}
            ></thermostat-block-dialog>
          `:I``}

      <!-- ── Group edit dialog ── -->
      ${a?I`
            <thermostat-group-dialog
              .open=${!0}
              .group=${a}
              .usedDays=${o}
              @group-days-save=${this._saveGroupDays}
              @group-delete=${t=>this._deleteGroup({detail:{groupId:t.detail.groupId}})}
              @group-cancel=${()=>{this._editGroup=null}}
            ></thermostat-group-dialog>
          `:I``}
    `}}customElements.define("thermostat-schedule-card",St),window.customCards=window.customCards||[],window.customCards.push({type:"thermostat-schedule-card",name:"Thermostat Schedule Card",description:"A weekly schedule card for climate entities — configure heating/cooling times and temperatures for each day group.",preview:!0,documentationURL:"https://github.com/YOUR_USERNAME/thermostat-schedule-card"});
