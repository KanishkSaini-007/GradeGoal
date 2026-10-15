(function(root){'use strict';
function calculate(rows,target){
 if(!Number.isFinite(target)||target<0||target>100)throw Error('Target must be between 0 and 100%.');
 if(!Array.isArray(rows)||!rows.length)throw Error('Add at least one component.');
 let total=0,earned=0,remaining=0;for(const r of rows){if(!Number.isFinite(r.weight)||r.weight<=0||r.weight>100)throw Error('Every weight must be above 0 and at most 100.');total+=r.weight;if(r.score===null)remaining+=r.weight;else{if(!Number.isFinite(r.score)||r.score<0||r.score>100)throw Error('Scores must be between 0 and 100%. Leave unfinished scores blank.');earned+=r.weight*r.score/100;}}
 if(Math.abs(total-100)>0.000001)throw Error('Component weights must total 100% (currently '+Number(total.toFixed(4))+'%).');
 const maximum=earned+remaining,required=remaining?(target-earned)/remaining*100:null;
 const status=target<=earned+1e-9?'secured':maximum+1e-9<target?'impossible':remaining<1e-9?'complete':'possible';
 return {earned,remaining,maximum,required:required===null?null:Math.max(0,required),status};
}
function validate(s){if(!s||s.version!==1||!Array.isArray(s.subjects)||s.subjects.length<1||s.subjects.length>20)throw Error('Invalid subjects.');for(const subject of s.subjects){if(typeof subject.name!=='string'||!subject.name.trim()||subject.name.length>60||!Array.isArray(subject.rows)||subject.rows.length>20||!Number.isFinite(subject.target)||subject.target<0||subject.target>100)throw Error('Invalid subject.');for(const r of subject.rows)if(typeof r.name!=='string'||r.name.length>60||!Number.isFinite(r.weight)||r.weight<0||r.weight>100||(r.score!==null&&(!Number.isFinite(r.score)||r.score<0||r.score>100)))throw Error('Invalid component.');}return s;}
const api={calculate,validate};if(typeof module!=='undefined')module.exports=api;else root.GradeMath=api;
})(typeof window!=='undefined'?window:globalThis);
