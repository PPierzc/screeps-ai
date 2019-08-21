!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=1)}([function(e,r){Game.spawns.Spawn1.memory.queue=[],e.exports={add:e=>{const{queue:r}=Game.spawns.Spawn1.memory;r.filter(r=>r.key===e.key).length||r.push(e)},tick:()=>{const e=Game.spawns.Spawn1;if(!e.spawning){e.memory.processing&&(e.memory.queue.shift(),e.memory.processing=!1);const r=e.memory.queue.sort((e,r)=>e-r)[0];r&&(e.createCreep(r.body,r.name,r.memory),e.memory.processing=!0)}}}},function(e,r,t){const n=t(2),o=t(12);e.exports.loop=function(){n(),o()}},function(e,r,t){const n=t(3),o=t(5),a=t(7),s=t(9),c=t(11),i=t(0);e.exports=()=>{const{workers:e,upgraders:r,miners:t,haulers:u}=c();i.tick(),n.tick(e),o.tick(r),a.tick(t),s.tick(u)}},function(e,r,t){const n=t(4);e.exports={tick:function(e){const{creeps:r}=Game,t=Object.values(r).filter(e=>"worker"===e.memory.role),o=Object.values(r).filter(e=>"miner"===e.memory.role),a=Object.values(r).filter(e=>"hauler"===e.memory.role);t.length<e&&n.spawn(t.length),t.forEach(e=>{o.length?Object.values(Game.constructionSites).length&&a.length?e.memory.task="build":a.length?e.memory.task="upgrade":e.memory.task="haul":e.memory.task="mine",n.tick(e)})}}},function(e,r,t){const n=t(0),o=e=>{let r=Game.spawns.Spawn1;const t=e.pos.findInRange(FIND_STRUCTURES,20,{filter:{structureType:STRUCTURE_CONTAINER}});console.log(t.length,t[0].energy),t.length&&t[0].energy&&(r=t[0]),e.withdraw(r,RESOURCE_ENERGY)===ERR_NOT_IN_RANGE&&e.moveTo(r)},a=e=>{const r=e.room.find(FIND_MY_CONSTRUCTION_SITES)[0];e.build(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)},s=e=>{const r=e.room.controller;e.upgradeController(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)};e.exports={spawn:e=>{n.add({key:`worker-${e}`,name:`worker-${e}`,body:[MOVE,WORK,CARRY],memory:{role:"worker",task:"mine"},priority:1})},tick:e=>{if(e.carry.energy||(e.memory.needRefil=!0),e.carry.energy===e.carryCapacity&&(e.memory.needRefil=!1),e.carry.energy<e.carryCapacity)switch(e.memory.task){case"haul":return(e=>{const r=e.room.find(FIND_DROPPED_RESOURCES)[0];e.pickup(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e);case"mine":return(e=>{const r=e.room.find(FIND_SOURCES)[0];e.harvest(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e);case"build":return e.memory.needRefil?o(e):a(e);case"upgrade":return e.memory.needRefil?o(e):s(e);default:return null}switch(e.memory.task){case"build":return a(e);case"upgrade":return s(e);default:return(e=>{const r=Game.spawns.Spawn1;e.transfer(r,RESOURCE_ENERGY)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e)}}}},function(e,r,t){const n=t(6);e.exports={tick:function(e){const{creeps:r}=Game,t=Object.values(r).filter(e=>"upgrader"===e.memory.role);t.length<e&&Object.values(r).length&&n.spawn(t.length),t.forEach(e=>{n.tick(e)})}}},function(e,r,t){const n=t(0),o=e=>{const r=e.room.controller;e.upgradeController(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)};e.exports={spawn:e=>{n.add({key:`upgrader-${e}`,name:`upgrader-${e}`,body:[MOVE,WORK,CARRY],memory:{role:"upgrader"},priority:3})},tick:e=>{e.carry.energy||(e.memory.task="withdraw"),e.carry.energy<e.carryCapacity?("withdraw"===e.memory.task&&(e=>{let r=Game.spawns.Spawn1;const t=e.pos.findInRange(FIND_STRUCTURES,20,{filter:{structureType:STRUCTURE_CONTAINER}});t.length&&t[0].energy&&(r=t[0]),e.withdraw(r,RESOURCE_ENERGY)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e),"upgrade"===e.memory.task&&o(e)):(e.memory.task="upgrade",o(e))}}},function(e,r,t){const n=t(8);e.exports={tick:function(e){const{creeps:r}=Game,t=Object.values(r).filter(e=>"miner"===e.memory.role);t.length<e&&n.spawn(t.length),t.forEach(e=>{n.tick(e)})}}},function(e,r,t){const n=t(0);e.exports={spawn:e=>{n.add({key:`miner-${e}`,name:`miner-${e}`,body:[MOVE,WORK,WORK],memory:{role:"miner"},priority:2})},tick:e=>{(e=>{const r=e.room.find(FIND_SOURCES)[0];e.harvest(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e)}}},function(e,r,t){const n=t(10);e.exports={tick:function(e){const{creeps:r}=Game,t=Object.values(r).filter(e=>"hauler"===e.memory.role);t.length<e&&n.spawn(t.length),t.forEach(e=>{n.tick(e)})}}},function(e,r,t){const n=t(0);e.exports={spawn:e=>{n.add({key:`hauler-${e}`,name:`hauler-${e}`,body:[MOVE,CARRY,CARRY],memory:{role:"hauler"},priority:2})},tick:e=>e.carry.energy<e.carryCapacity?(e=>{const r=e.room.find(FIND_DROPPED_RESOURCES)[0];e.pickup(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e):(e=>{const r=e.pos.findInRange(FIND_STRUCTURES,20,{filter:{structureType:STRUCTURE_CONTAINER}});let t=Game.spawns.Spawn1;r.length&&t.energy>t.energyCapacity-50&&(t=r[0]),e.transfer(t,RESOURCE_ENERGY)===ERR_NOT_IN_RANGE&&e.moveTo(t)})(e)}},function(e,r){e.exports=()=>{const{creeps:e}=Game,r=Object.values(e).filter(e=>"worker"===e.memory.role).length,t=Object.values(e).filter(e=>"miner"===e.memory.role).length;return{workers:Object.values(e).length<3?1:Object.values(e).length/3,upgraders:t,miners:r<1?0:3,haulers:2*t}}},function(e,r){e.exports=()=>{const{rooms:e,constructionSites:r,spawns:t}=Game,n=Object.values(e)[0],o=Object.values(t)[0],a=Object.values(r).filter(e=>e.structureType===STRUCTURE_CONTAINER),s=n.find(FIND_STRUCTURES),c=Object.values(s).filter(e=>e.structureType===STRUCTURE_CONTAINER),i=c.filter(e=>e.energy===e.energyCapacity);return a.length||c.length?c.length===i.length?n.createConstructionSite(o.pos.x-c.length,o.pos.y+10,STRUCTURE_CONTAINER):void 0:n.createConstructionSite(o.pos.x,o.pos.y+10,STRUCTURE_CONTAINER)}}]));