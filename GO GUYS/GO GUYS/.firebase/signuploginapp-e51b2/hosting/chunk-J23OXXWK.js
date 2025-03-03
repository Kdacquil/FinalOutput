import{a as H}from"./chunk-Y7FABB3Q.js";import{C as x,D as C,E as m,I as O,K as b,M as e,N as i,O as g,R as u,S as a,T as f,U as M,V as P,W as w,Y as r,pa as v,q as _,u as l,v as d,wa as y,xa as k}from"./chunk-RUZQDE4M.js";import{d as h}from"./chunk-U3NIYLHF.js";var A=["accountContainer"];function V(s,E){if(s&1){let n=u();e(0,"div",21)(1,"a",22),a("click",function(){l(n);let o=f();return d(o.openAccountSettings())}),r(2,"Account Settings"),i(),e(3,"a",22),a("click",function(){l(n);let o=f();return d(o.logout())}),r(4,"Logout"),i()()}}var z=(()=>{class s{constructor(n,t){this.router=n,this.authService=t,this.collapsed=!1,this.screenWidth=0,this.showAccount=!1}toggleAccount(n){n.stopPropagation(),this.showAccount=!this.showAccount}onboard(){this.router.navigate(["/dashboard/onboard"])}offboard(){this.router.navigate(["/dashboard/offboard"])}openAccountSettings(){console.log("Open Account Settings")}logout(){return h(this,null,function*(){yield this.authService.logout()})}homepage(){this.router.navigate(["/home"])}closePopups(n){this.accountContainer&&(this.accountContainer.nativeElement.contains(n.target)||(this.showAccount=!1))}static{this.\u0275fac=function(t){return new(t||s)(m(y),m(H))}}static{this.\u0275cmp=_({type:s,selectors:[["app-home"]],viewQuery:function(t,o){if(t&1&&M(A,5),t&2){let c;P(c=w())&&(o.accountContainer=c.first)}},hostBindings:function(t,o){t&1&&a("click",function(p){return o.closePopups(p)},!1,x)},inputs:{collapsed:"collapsed",screenWidth:"screenWidth"},decls:39,vars:1,consts:[["accountContainer",""],[1,"vh-100"],[1,"wrapper"],[1,"account-info",3,"click"],[1,"fas","fa-user-cog","account-icon"],[1,"account-name"],["class","account-popup",4,"ngIf"],[1,"header-content"],["src","hau.ico","alt","HR Logo",1,"logo"],[1,"nav-bar"],[1,"menu"],["routerLink","/home"],["routerLink","/dashboard"],[1,"main-content"],[1,"intro"],[1,"features"],[1,"feature"],["src","onboarding.jpg","alt","Onboarding Icon",2,"width","310px","height","auto"],[1,"button",2,"display","block","margin-top","1rem","background-color","#800020","color","white","padding","10px 20px","text-align","center","border-radius","20px","text-decoration","none",3,"click"],["src","offboarding.jpg","alt","Offboarding Icon",2,"width","310px","height","auto"],[1,"sticky-0"],[1,"account-popup"],[3,"click"]],template:function(t,o){if(t&1){let c=u();e(0,"section",1)(1,"div",2)(2,"header")(3,"div",3,0),a("click",function(S){return l(c),d(o.toggleAccount(S))}),g(5,"i",4),e(6,"span",5),r(7,"HR User"),i(),O(8,V,5,0,"div",6),i(),e(9,"div",7),g(10,"img",8),e(11,"h1"),r(12,"Human Resource Management Office"),i()(),e(13,"nav")(14,"ul",9)(15,"span",10)(16,"li")(17,"a",11),r(18,"Home"),i()(),e(19,"li")(20,"a",12),r(21,"Dashboard"),i()()()()()(),e(22,"main")(23,"div",13)(24,"section",14)(25,"p"),r(26,"The Holy Angel University HR Onboarding and Offboarding System streamlines employee transitions by automating onboarding and offboarding processes. Designed specifically for HR, it features real-time analytics, secure task management, and compliance with local regulations. The system reduces administrative work, enhances efficiency, and ensures a smooth experience for both new hires and departing employees."),i()(),e(27,"section",15)(28,"div",16),g(29,"img",17),e(30,"a",18),a("click",function(){return l(c),d(o.onboard())}),r(31,"Onboarding"),i()(),e(32,"div",16),g(33,"img",19),e(34,"a",18),a("click",function(){return l(c),d(o.onboard())}),r(35,"Offboarding"),i()()()()(),e(36,"footer",20)(37,"p"),r(38,"\xA9 2024 HR Department. All Rights Reserved."),i()()()()}t&2&&(C(8),b("ngIf",o.showAccount))},dependencies:[v,k],styles:[".vh-100[_ngcontent-%COMP%]{min-height:100vh;display:flex;flex-direction:column;justify-content:space-between}.container[_ngcontent-%COMP%]{width:100%}.wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column}header[_ngcontent-%COMP%]{background:#800020;color:#fff;padding:1rem 0;text-align:center}.main-content[_ngcontent-%COMP%]{flex-grow:1;display:flex;flex-direction:column;justify-content:center}img[_ngcontent-%COMP%]{max-width:100%;height:auto}header[_ngcontent-%COMP%], footer[_ngcontent-%COMP%]{width:100%;flex-shrink:0}.header-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;margin-bottom:1rem}header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:200px;height:100%;margin-bottom:.5rem}header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2.5rem;font-weight:700}.nav[_ngcontent-%COMP%]{text-decoration:none;color:#000;padding:10px 0;border-radius:20px;font-weight:700;transition:background-color .3s ease;display:flex;align-items:flex;list-style:none;position:relative;z-index:1000;transition:top .3s ease-in-out}nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0;display:flex;justify-content:center;gap:1.5rem}nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin:0 5px;display:inline}nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding:10px 60px;border-radius:20px;color:#fff;cursor:pointer;font-weight:700;text-decoration:none;transition:background .3s ease}.nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{text-decoration:underline}.nav-bar[_ngcontent-%COMP%]   .dropdown[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%]{display:block}.intro[_ngcontent-%COMP%]{text-align:center;padding:2rem 1rem;background-color:#fff;line-height:1.8}.intro[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{max-width:800px;margin:0 auto;font-size:1.2rem}.features[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:20rem;padding:3rem;background-color:#fff}.feature[_ngcontent-%COMP%]{text-align:center}.feature[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100px;height:auto;margin-bottom:.5rem}.feature[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.2rem;color:#fff}.button[_ngcontent-%COMP%]{padding:10px 20px;background-color:#800020;font-size:1.2rem;border:none;border-radius:20px;text-align:center;cursor:pointer;transition:all .3s ease;text-decoration:none;font-weight:700}.button[_ngcontent-%COMP%]:hover{background:#000;transform:scale(1.05)}footer[_ngcontent-%COMP%]{text-align:center;background:linear-gradient(to right,#cca43b,#800020);color:#fff;font-weight:700;padding:1rem;height:100px}.account-info[_ngcontent-%COMP%]{font-weight:700;position:absolute;right:20px;display:flex;align-items:center;cursor:pointer;font-size:30px}.account-info[_ngcontent-%COMP%]:hover{color:#7c7c7c}.account-icon[_ngcontent-%COMP%]{width:65px}.account-popup[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{position:absolute;top:60px;right:0;background-color:#fff;border:1px solid #dcdcdc;box-shadow:0 4px 8px #0000001a;padding:10px;width:200px;z-index:1000;font-size:14px;color:#000;border-radius:5px;transition:all .2s ease-in-out}"]})}}return s})();export{z as a};
