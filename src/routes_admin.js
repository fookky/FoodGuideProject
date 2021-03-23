
import menu from "views/admin_menu.jsx";
import random from "views/random.js";
import Maps from "views/Map.js";
import member from "views/member_admin.js";



var routes = [

  {
    path: "/menu",
    name: "จัดการเมนู",
    icon: "nc-icon nc-ruler-pencil",
    component: menu,
    layout: "/admin",
  },
  {
    path: "/member",
    name: "จัดการสมาชิก",
    icon: "nc-icon nc-user-run" ,
    component: member,
    layout: "/admin",
  },
  {
    path: "/random",
    name: "สุ่มอาหารทั้งหมด",
    icon: "nc-icon nc-tap-01",
    component: random,
    layout: "/admin",
  },
  
  {
    path: "/maps",
    name: "สุ่มอาหารจากพื้นที่ใกล้เคียง",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },  
  

  
];
export default routes;
