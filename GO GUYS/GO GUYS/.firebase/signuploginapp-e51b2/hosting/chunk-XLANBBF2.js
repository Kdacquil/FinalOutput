import{a as x}from"./chunk-Y7FABB3Q.js";import{E as c,M as t,N as n,O as a,S as g,Y as e,q as d,va as s,wa as f,xa as m}from"./chunk-RUZQDE4M.js";import{d as l}from"./chunk-U3NIYLHF.js";var b=(()=>{class o{constructor(r,i){this.router=r,this.authService=i}logout(){return l(this,null,function*(){yield this.authService.logout(),this.router.navigate(["/login"])})}static{this.\u0275fac=function(i){return new(i||o)(c(f),c(x))}}static{this.\u0275cmp=d({type:o,selectors:[["app-sidebar"]],decls:38,vars:0,consts:[["id","sidebar",1,"sidebar","d-flex","flex-column","justify-content-between"],[1,"logo"],["src","hau.ico","alt","Logo"],["routerLink","/home"],["routerLink","/dashboard/onboard"],["routerLink","/dashboard/offboard"],["routerLink","/dashboard/employee-info"],["routerLink","/dashboard/distribution"],["routerLink","/dashboard/evaluation"],[1,"dropdown"],[1,"dropdown-content"],["routerLink","/dashboard/onboarding-report"],["routerLink","/dashboard/offboarding-report"],["routerLink","/dashboard/audit-logs"],["href","#","id","dropdownUser1","data-bs-toggle","dropdown","aria-expanded","false",1,"d-flex","align-items-center","justify-content-between","text-white","text-decoration-none","dropdown-toggle"],[1,"fas","fa-user-shield","me-2"],["aria-labelledby","dropdownUser1",1,"dropdown-menu","dropdown-menu-primary","text-small","shadow","w-100","p-0","m-0","text-center"],[1,"dropdown-item","p-2","m-0",2,"cursor","pointer",3,"click"]],template:function(i,p){i&1&&(t(0,"div",0)(1,"div")(2,"div",1),a(3,"img",2),n(),t(4,"h2"),e(5,"Dashboard"),n(),t(6,"a",3),e(7,"Home"),n(),t(8,"a",4),e(9,"Onboarding"),n(),t(10,"a",5),e(11,"Offboarding"),n(),t(12,"a",6),e(13,"Employee Information"),n(),t(14,"a",7),e(15,"Employee Distribution"),n(),t(16,"a",8),e(17,"Evaluation"),n(),t(18,"div",9)(19,"a"),e(20,"Analytics & Reports"),n(),t(21,"div",10)(22,"a",11),e(23,"Onboarding Report"),n(),t(24,"a",12),e(25,"Offboarding Report"),n(),t(26,"a",13),e(27,"Audit Logs Report"),n()()()(),t(28,"div",9)(29,"a",14)(30,"div"),a(31,"i",15),t(32,"strong"),e(33,"User"),n()()(),t(34,"ul",16)(35,"li")(36,"p",17),g("click",function(){return p.logout()}),e(37,"Sign out"),n()()()()())},dependencies:[m],styles:['@charset "UTF-8";.sidebar[_ngcontent-%COMP%]{width:200px;background:linear-gradient(to bottom,#800020,#cca43b);padding:20px;color:#fff;flex-shrink:0;height:100%;position:fixed}.sidebar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;color:#fff;text-decoration:none;margin:10px 0}.sidebar[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{background-color:#fff3;padding:5px;border-radius:5px}.offboarding-container[_ngcontent-%COMP%]{margin-left:280px;padding:40px 20px 20px;background-color:#ecf0f1;box-sizing:border-box;overflow-y:auto;width:calc(100% - 200px);height:100%}h2[_ngcontent-%COMP%]{text-align:center;font-size:28px}.form-container[_ngcontent-%COMP%]{display:flex;gap:40px;background:#fff;padding:30px;border-radius:8px;box-shadow:0 4px 10px #0000001a;width:100%}.section[_ngcontent-%COMP%]{flex:1}h3[_ngcontent-%COMP%]{border-bottom:2px solid #ddd;padding-bottom:8px;font-size:30px}h4[_ngcontent-%COMP%]{border-bottom:2px solid #ddd;padding-bottom:35px;font-size:45px;font-weight:700}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:15px}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{padding:12px;border:1px solid #ccc;border-radius:6px;font-size:16px}.user-icon[_ngcontent-%COMP%]{width:40px;height:40px;margin-bottom:8px}button[_ngcontent-%COMP%]{display:block;width:100%;padding:12px;background-color:#800020;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:18px}button[_ngcontent-%COMP%]:hover{background-color:#333}@media (max-width: 1024px){.form-container[_ngcontent-%COMP%]{flex-direction:column;gap:20px}}@media (max-width: 768px){.offboarding-container[_ngcontent-%COMP%], .form-container[_ngcontent-%COMP%]{padding:20px}}@media (max-width: 480px){.offboarding-container[_ngcontent-%COMP%]{max-width:100%;padding:10px}button[_ngcontent-%COMP%]{font-size:16px;padding:10px}}.sidebar[_ngcontent-%COMP%]{position:fixed;top:0;left:0;height:100%;width:250px;background:linear-gradient(to bottom,#800020,#cca43b);color:#fff;padding:20px 10px;box-shadow:2px 0 6px #0003;overflow-y:auto}.sidebar[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#fff;text-align:center;margin-bottom:20px;font-size:1.5em}.sidebar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;color:#fff;text-decoration:none;padding:10px;border-radius:4px;margin:5px 0;transition:background .3s,transform .3s}.sidebar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .sidebar[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{background-color:#ffffff4d;transform:scale(1.05)}.dropdown[_ngcontent-%COMP%]{position:relative}.dropdown[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:after{content:"\\25bc";float:right;margin-right:10px}.dropdown-content[_ngcontent-%COMP%]{display:none;background-color:#fff3;margin-left:10px;padding-left:20px}.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.9em;padding:5px}.dropdown[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%]{display:block}.content[_ngcontent-%COMP%]{margin-left:260px;padding:20px;background-color:#fff;min-height:100vh}.content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center;color:#333;margin-bottom:20px;font-size:2em}.table-container[_ngcontent-%COMP%]{overflow-x:auto;box-shadow:0 2px 4px #0000001a}table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;margin-top:20px}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid #ddd;padding:10px;text-align:left}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#ff5722;color:#fff;font-size:1em}table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#f9f9f9}table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#f1f1f1}.Side[_ngcontent-%COMP%]{display:none;position:fixed;top:10px;left:10px;background-color:#ff5722;color:#fff;border:none;padding:10px;cursor:pointer;z-index:1000}.Side[_ngcontent-%COMP%]:focus{outline:none}@media (max-width: 768px){.sidebar[_ngcontent-%COMP%]{width:200px;transform:translate(-100%);transition:transform .3s ease}.sidebar.show[_ngcontent-%COMP%]{transform:translate(0)}.content[_ngcontent-%COMP%]{margin-left:0}.Side[_ngcontent-%COMP%]{display:block}}.logo[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px}.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:150px;border-radius:50%;box-shadow:0 4px 8px #0003}@media (max-width: 600px){body[_ngcontent-%COMP%]{flex-direction:column}.sidebar[_ngcontent-%COMP%]{width:100%;height:auto;position:static}.main-content[_ngcontent-%COMP%]{margin-left:0;width:100%;padding-top:20px}}.dropdown-toggle[_ngcontent-%COMP%]{outline:0}']})}}return o})();var P=(()=>{class o{static{this.\u0275fac=function(i){return new(i||o)}}static{this.\u0275cmp=d({type:o,selectors:[["app-dashboard"]],decls:2,vars:0,template:function(i,p){i&1&&a(0,"app-sidebar")(1,"router-outlet")},dependencies:[s,b]})}}return o})();export{P as a};
