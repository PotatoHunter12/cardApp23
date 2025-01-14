import{_ as w,o as l,c as s,b as n,w as p,v as T,d as y,F as a,r as m,t as u,e as k,f as V,g as S,h as R,i as h}from"./index-60977d06.js";const C={props:{players:{type:Array,required:!0}},data(){return{players:this.players,games:[{id:1,name:"Three",points:10,diff:!0},{id:2,name:"Two",points:20,diff:!0},{id:3,name:"One",points:30,diff:!0},{id:4,name:"Solo Three",points:40,diff:!0},{id:5,name:"Solo Two",points:50,diff:!0},{id:6,name:"Solo One",points:60,diff:!0},{id:7,name:"Beggar",points:70,diff:!1},{id:8,name:"Solo no Talon",points:80,diff:!0},{id:9,name:"Three - Valat of Color",points:100,diff:!1},{id:10,name:"Two - Valat of Color",points:110,diff:!1},{id:11,name:"One - Valat of Color",points:120,diff:!1},{id:12,name:"Solo Three - Valat of Color",points:125,diff:!1},{id:13,name:"Solo Two - Valat of Color",points:150,diff:!1},{id:14,name:"Solo One - Valat of Color",points:175,diff:!1},{id:15,name:"Solo no Talon - Valat of Color",points:250,diff:!1},{id:16,name:"Three - Valat",points:200,diff:!1},{id:17,name:"Two - Valat",points:220,diff:!1},{id:18,name:"One - Valat",points:240,diff:!1},{id:19,name:"Solo Three - Valat",points:250,diff:!1},{id:20,name:"Solo Two - Valat",points:300,diff:!1},{id:21,name:"Solo One - Valat",points:350,diff:!1},{id:22,name:"Solo no Talon - Valat",points:500,diff:!1}],bonusOptions:[{id:1,name:"Kings",points:10},{id:2,name:"Threesome",points:10},{id:3,name:"King Ultimo",points:10},{id:4,name:"Pagat Ultimo",points:25},{id:5,name:"Valat",points:50}],deductionOptions:[{id:1,name:"Kings",points:-10},{id:2,name:"Threesome",points:-10},{id:3,name:"King Ultimo",points:-10},{id:4,name:"Pagat Ultimo",points:-25},{id:5,name:"Valat",points:-50},{id:6,name:"Mondfang",points:-20}],counters:[{id:1,name:"Kontra",win:-1,loss:2},{id:2,name:"Re",win:-2,loss:4},{id:3,name:"Sub",win:-4,loss:8},{id:4,name:"Mort",win:-8,loss:16}],round:{points:0,game:{points:0,diff:!1},player:"",partner:"",bonuses:[],deductions:[],counter:{win:0,loss:1}}}},computed:{calculateTotal(){const r=this.round.points>=35,e=this.round.bonuses.reduce((t,d)=>t+d.points,0),g=this.round.deductions.reduce((t,d)=>t+d.points,0);return(this.round.game.points*(r?1:-1)+(this.round.game.diff?this.round.points-35:0))*(r?1:this.round.counter.loss)+e+g}},methods:{round25(){this.round.points=Math.round(this.round.points/5)*5},handleSelection(r){this.selected=r,console.log(this.selected)},checkSelection(r){return console.log("aaa"),r===this.selected},async submitRound(){this.round.points,this.round.game,this.round.player,this.round.partner,this.round.bonuses,this.round.deductions,this.round.counter,this.calculateTotal;try{this.$emit("round-submitted"),alert("Round submitted successfully!"),this.resetForm()}catch(r){console.error("Error submitting round:",r),alert("Failed to submit round.")}},resetForm(){this.round={points:0,game:null,player:"",partner:"",bonuses:[],deductions:[],counter:null}},goBack(){this.$router.push({name:"gameSelect"})}}},B={class:"tarok-round"},N=["value"],U=["id","value"],O=["for"],M=["id","value"],P=["for"],x=["id","value","onClick","checked"],K=["for"],c={key:0},q=["onUpdate:modelValue"],F=["value"];function A(r,e,g,v,t,d){return l(),s("div",B,[e[25]||(e[25]=n("h1",null,"Round Results",-1)),n("form",{onSubmit:e[10]||(e[10]=S((...o)=>d.submitRound&&d.submitRound(...o),["prevent"]))},[n("div",null,[e[11]||(e[11]=n("label",{for:"points"},"Points: ",-1)),p(n("input",{id:"points",type:"number","onUpdate:modelValue":e[0]||(e[0]=o=>t.round.points=o),onChange:e[1]||(e[1]=(...o)=>d.round25&&d.round25(...o)),min:0,max:70,step:"5",required:""},null,544),[[T,t.round.points,void 0,{number:!0}]])]),n("div",null,[e[12]||(e[12]=n("label",{for:"game"},"Game:",-1)),p(n("select",{id:"game","onUpdate:modelValue":e[2]||(e[2]=o=>t.round.game=o),required:""},[(l(!0),s(a,null,m(t.games,o=>(l(),s("option",{key:o.id,value:o},u(o.name),9,N))),128))],512),[[y,t.round.game]])]),e[18]||(e[18]=n("br",null,null,-1)),n("div",null,[e[13]||(e[13]=n("label",{for:"player"},"Player: ",-1)),p(n("select",{id:"player","onUpdate:modelValue":e[3]||(e[3]=o=>t.round.player=o),required:""},[(l(!0),s(a,null,m(t.players,o=>(l(),s("option",{key:o.name},u(o.name),1))),128))],512),[[y,t.round.player]])]),n("div",null,[e[14]||(e[14]=n("label",{for:"partner"},"Partner: ",-1)),p(n("select",{id:"partner","onUpdate:modelValue":e[4]||(e[4]=o=>t.round.partner=o),required:""},[(l(!0),s(a,null,m(t.players,o=>(l(),s("option",{key:o.name},u(o.name),1))),128))],512),[[y,t.round.partner]])]),e[19]||(e[19]=n("br",null,null,-1)),n("div",null,[e[15]||(e[15]=n("label",null,"Bonuses: ",-1)),(l(!0),s(a,null,m(t.bonusOptions,o=>(l(),s("div",{key:o.id},[p(n("input",{type:"checkbox",id:"bonus-"+o.id,value:o,"onUpdate:modelValue":e[5]||(e[5]=i=>t.round.bonuses=i)},null,8,U),[[k,t.round.bonuses]]),n("label",{for:"bonus-"+o.id},u(o.name),9,O)]))),128))]),e[20]||(e[20]=n("br",null,null,-1)),n("div",null,[e[16]||(e[16]=n("label",null,"Deductions: ",-1)),(l(!0),s(a,null,m(t.deductionOptions,o=>(l(),s("div",{key:o.id},[p(n("input",{type:"checkbox",id:"deduction-"+o.id,value:o,"onUpdate:modelValue":e[6]||(e[6]=i=>t.round.deductions=i)},null,8,M),[[k,t.round.deductions]]),n("label",{for:"deduction-"+o.id},u(o.name),9,P)]))),128))]),e[21]||(e[21]=n("br",null,null,-1)),e[22]||(e[22]=n("label",null,"Counters:",-1)),(l(!0),s(a,null,m(t.counters,o=>(l(),s("div",{key:o.id},[p(n("input",{type:"checkbox",id:"counter-"+o.id,value:o,"onUpdate:modelValue":e[7]||(e[7]=i=>r.selectedCounter=i),onClick:i=>d.handleSelection(o),checked:d.checkSelection(o)},null,8,x),[[k,r.selectedCounter]]),n("label",{for:"counter-"+o.id},u(o.name),9,K),r.selectedCounter&&r.selectedCounter.id===o.id?(l(),s("div",c,[e[17]||(e[17]=n("label",{for:"counter-player"},"Select Player:",-1)),p(n("select",{id:"counter-player","onUpdate:modelValue":i=>o.player=i},[(l(!0),s(a,null,m(t.players,i=>(l(),s("option",{key:i.name,value:i},u(i.name),9,F))),128))],8,q),[[y,o.player]])])):V("",!0)]))),128)),e[23]||(e[23]=n("br",null,null,-1)),n("div",null,[n("strong",null,"Total Points: "+u(d.calculateTotal),1)]),e[24]||(e[24]=n("br",null,null,-1)),n("button",{type:"submit",class:"btn2",onClick:e[8]||(e[8]=o=>r.$emit("round-submitted"))},"SUBMIT"),n("button",{type:"button",class:"btn2 back-btn",onClick:e[9]||(e[9]=(...o)=>d.goBack&&d.goBack(...o))}," BACK ")],32)])}const G=w(C,[["render",A],["__scopeId","data-v-8d36592b"]]);const D={data(){return{showNewRound:!1,items:[],rounds:[]}},created(){const r=this.$route.query.items;r&&(this.items=JSON.parse(r),console.log(this.items))},methods:{toggleNewRound(){this.showNewRound=!this.showNewRound},addRound(r){this.rounds.push(r),this.showNewRound=!1},goBack(){this.$router.push({name:"gameSelect"})}},components:{NewRound:G}},E={class:"game-view"},I={class:"header"},J={class:"points-table"},L={class:"totals-row"};function W(r,e,g,v,t,d){const o=R("NewRound");return l(),s("main",E,[n("div",I,[e[2]||(e[2]=n("h1",{class:"game-title"},"My Game",-1)),n("button",{class:"btn add-round-btn",onClick:e[0]||(e[0]=(...i)=>d.toggleNewRound&&d.toggleNewRound(...i))},"Add Round")]),n("table",J,[n("thead",null,[n("tr",null,[e[3]||(e[3]=n("th",null,"Players",-1)),(l(!0),s(a,null,m(t.items,i=>(l(),s("th",{key:i.name},u(i.name),1))),128))])]),n("tbody",null,[n("tr",null,[e[4]||(e[4]=n("td",null,"Radli",-1)),(l(!0),s(a,null,m(t.items,i=>(l(),s("td",{key:i.name}," xoo "))),128))]),(l(!0),s(a,null,m(t.rounds,(i,f)=>(l(),s("tr",{key:f},[n("td",null,u(f+1),1),e[5]||(e[5]=n("td",null,null,-1)),(l(!0),s(a,null,m(i,b=>(l(),s("td",{key:b},u(b||"-"),1))),128))]))),128)),n("tr",L,[e[6]||(e[6]=n("td",null,"Totals",-1)),(l(!0),s(a,null,m(t.items,i=>(l(),s("td",{key:i.name},u(t.rounds.reduce((f,b)=>f+(b[t.items.indexOf(i)]||0),0)),1))),128))])])]),t.showNewRound?(l(),h(o,{key:0,onRoundSubmitted:d.addRound,players:t.items,class:"nrnd"},null,8,["onRoundSubmitted","players"])):V("",!0),n("button",{class:"btn back-btn",onClick:e[1]||(e[1]=(...i)=>d.goBack&&d.goBack(...i))},"BACK")])}const z=w(D,[["render",W]]);export{z as default};
