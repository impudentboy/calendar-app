function createCalendar(t,e,a){for(var n=document.getElementById(t),r=a-1,d=new Date(e,r),g='<table class="calandar-app" cellspacing="0"><tr>',D=0;D<getDay(d);D++)g+="<td></td>";for(;d.getMonth()==r;)g+='<td id="'+d.getDate()+'"><span class="date-number">'+d.getDate()+"</span></td>",getDay(d)%7==6&&(g+="</tr><tr>"),d.setDate(d.getDate()+1);if(0!=getDay(d))for(var D=getDay(d);7>D;D++)g+="<td></td>";g+="</tr></table>",n.innerHTML=g}function getDay(t){var e=t.getDay();return 0==e&&(e=7),e-1}