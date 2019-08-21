!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){var r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(o,n,function(r){return e[r]}.bind(null,n));return o},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=1)}([function(e,r){Game.spawns.Spawn1.memory.queue=[],e.exports={add:e=>{const{queue:r}=Game.spawns.Spawn1.memory;r.filter(r=>r.key===e.key).length||r.push(e)},tick:()=>{const e=Game.spawns.Spawn1;if(!e.spawning){e.memory.processing&&(e.memory.queue.shift(),e.memory.processing=!1);const r=e.memory.queue.sort((e,r)=>e-r)[0];r&&(e.createCreep(r.body,r.name,r.memory),e.memory.processing=!0)}}}},function(e,r,t){const o=t(2),n=t(12);e.exports.loop=function(){o(),n()}},function(e,r,t){const o=t(3),n=t(5),s=t(7),a=t(9),c=t(11),i=t(0);e.exports=()=>{const{workers:e,upgraders:r,miners:t,haulers:u}=c();i.tick(),o.tick(e),n.tick(r),s.tick(t),a.tick(u)}},function(e,r,t){const o=t(4);e.exports={tick:function(e){const{creeps:r}=Game,t=Object.values(r).filter(e=>"worker"===e.memory.role),n=Object.values(r).filter(e=>"miner"===e.memory.role),s=Object.values(r).filter(e=>"hauler"===e.memory.role);t.length<e&&o.spawn(t.length),t.forEach(e=>{n.length?Object.values(Game.constructionSites).length&&s.length?e.memory.task="build":e.memory.task="haul":e.memory.task="mine",o.tick(e)})}}},function(e,r,t){const o=t(0);e.exports={spawn:e=>{o.add({key:`worker-${e}`,name:`worker-${e}`,body:[MOVE,WORK,CARRY],memory:{role:"worker",task:"mine"},priority:1})},tick:e=>{if(e.carry.energy<e.carryCapacity)switch(e.memory.task){case"haul":return(e=>{const r=e.room.find(FIND_DROPPED_RESOURCES)[0];e.pickup(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e);case"mine":return(e=>{const r=e.room.find(FIND_SOURCES)[0];e.harvest(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e);case"build":return(e=>{const r=Game.spawns.Spawn1;e.withdraw(r,RESOURCE_ENERGY)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e);default:return null}switch(e.memory.task){case"build":return(e=>{const r=e.room.find(FIND_MY_CONSTRUCTION_SITES)[0],t=e.build(r);console.log(t),t===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e);default:return(e=>{const r=Game.spawns.Spawn1;e.transfer(r,RESOURCE_ENERGY)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e)}}}},function(e,r,t){const o=t(6);e.exports={tick:function(e){const{creeps:r}=Game,t=Object.values(r).filter(e=>"upgrader"===e.memory.role);t.length<e&&Object.values(r).length&&o.spawn(t.length),t.forEach(e=>{o.tick(e)})}}},function(e,r,t){const o=t(0),n=e=>{const r=e.room.controller;e.upgradeController(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)};e.exports={spawn:e=>{o.add({key:`upgrader-${e}`,name:`upgrader-${e}`,body:[MOVE,WORK,CARRY],memory:{role:"upgrader"},priority:3})},tick:e=>{e.carry.energy||(e.memory.task="withdraw"),e.carry.energy<e.carryCapacity?("withdraw"===e.memory.task&&(e=>{const r=Game.spawns.Spawn1;e.withdraw(r,RESOURCE_ENERGY)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e),"upgrade"===e.memory.task&&n(e)):(e.memory.task="upgrade",n(e))}}},function(e,r,t){const o=t(8);e.exports={tick:function(e){const{creeps:r}=Game,t=Object.values(r).filter(e=>"miner"===e.memory.role);t.length<e&&o.spawn(t.length),t.forEach(e=>{o.tick(e)})}}},function(e,r,t){const o=t(0);e.exports={spawn:e=>{o.add({key:`miner-${e}`,name:`miner-${e}`,body:[MOVE,WORK,WORK],memory:{role:"miner"},priority:2})},tick:e=>{(e=>{const r=e.room.find(FIND_SOURCES)[0];e.harvest(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e)}}},function(e,r,t){const o=t(10);e.exports={tick:function(e){const{creeps:r}=Game,t=Object.values(r).filter(e=>"hauler"===e.memory.role);t.length<e&&o.spawn(t.length),t.forEach(e=>{o.tick(e)})}}},function(e,r,t){const o=t(0);e.exports={spawn:e=>{o.add({key:`hauler-${e}`,name:`hauler-${e}`,body:[MOVE,CARRY,CARRY],memory:{role:"hauler"},priority:2})},tick:e=>e.carry.energy<e.carryCapacity?(e=>{const r=e.room.find(FIND_DROPPED_RESOURCES)[0];e.pickup(r)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e):(e=>{const r=Game.spawns.Spawn1;e.transfer(r,RESOURCE_ENERGY)===ERR_NOT_IN_RANGE&&e.moveTo(r)})(e)}},function(e,r){e.exports=()=>{const{creeps:e}=Game,r=Object.values(e).filter(e=>"worker"===e.memory.role).length,t=Object.values(e).filter(e=>"miner"===e.memory.role).length;return{workers:1,upgraders:Math.floor(t/3),miners:r<1?0:3,haulers:t}}},function(e,r){e.exports=()=>{const{rooms:e,constructionSites:r,structures:t,spawns:o}=Game,n=Object.values(e)[0],s=Object.values(o)[0],a=Object.values(r).filter(e=>e.structureType===STRUCTURE_CONTAINER),c=Object.values(t).filter(e=>e.structureType===STRUCTURE_CONTAINER);a.length||c.length||n.createConstructionSite(s.pos.x,s.pos.y+2,STRUCTURE_CONTAINER)}}]));