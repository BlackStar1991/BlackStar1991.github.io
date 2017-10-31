var mcVM_options={menuId:"menu-v",alignWithMainMenu:false};
//var el1;
var timerMenuClose = [];
//var timerClose;
var el1 = [];
//var my_i;
//var timerMenuOpen =[];
var timerOpen;
//var lastMenuForClose;
var lastMenuForOpen;
/* www.menucool.com/vertical/vertical-menu.*/
init_v_menu(mcVM_options);
function init_v_menu(a){
	if(window.addEventListener)window.addEventListener("load",function(){
		start_v_menu(a)},false);
		else window.attachEvent&&window.attachEvent("onload",function(
		){start_v_menu(a)})}
		
function start_v_menu(i){

	var e=document.getElementById(i.menuId),
		j=e.offsetHeight,
		b=e.getElementsByTagName("ul"),
		g=/msie|MSIE 6/.test(navigator.userAgent);
	
	if(g)for(var h=e.getElementsByTagName("li"),a=0,l=h.length;a<l;a++){
		h[a].onmouseover=function(){this.className="onhover"};
		h[a].onmouseout=function(){this.className=""}
		}
	
//	my_i=0;
	for(var k=function(a,b){if(a.id==i.menuId)return b;
							else{b+=a.offsetTop;return k(a.parentNode.parentNode,b)}
		},a=0;a<b.length;a++)
{
	var c=b[a].parentNode;c.getElementsByTagName("a")[0].className+=" arrow";b[a].style.left=c.offsetWidth+"px";
	b[a].style.top=c.offsetTop+"px";
	if(i.alignWithMainMenu){
									var d=k(c.parentNode,0);if(b[a].offsetTop+b[a].offsetHeight+d>j){
										var f;if(b[a].offsetHeight>j)f=-d;
										else f=j-b[a].offsetHeight-d;b[a].style.top=f+"px"}
							}
	
	
	$(c).mouseenter(function(){
											
											if(g)this.className="onhover";
											var a=this.getElementsByTagName("ul")[0];

											if(lastMenuForOpen){ 
												if (lastMenuForOpen != a){  //не дає відкритись проміжному пункту (не блимає, якщо залишили відкритий елемент і знову вернулись
												//	clearTimeout(timerMenuOpen[lastMenuForOpen.id]);
													clearTimeout(timerOpen);
												}
											}
											
											
											clearTimeout(timerMenuClose[a.id]); //поточний елемент не закривати (відповідно і не закриває всі підменю)

											
										/*		$("ul[id="+a.id+"]").parents("ul").each(function(indx, element){ //не закривати всі батьківськи елементи
													if (element.id!="menu-v"){
													clearTimeout(timerMenuClose[element.id]);
													}
												});
										*/
											
										//	console.log("enter");
											
											if(a){
											//	console.log(a.id);
												var st_open_id = String(a.id);
												lastMenuForOpen = a;
											//	timerMenuOpen[st_open_id]
												timerOpen= setTimeout(function(){
												a.style.visibility="visible";a.style.display="block";
												document.getElementById('bg_layer').className='bg_layer';
												$('#bg_layer').show();
												
												},350);
											}
											
	
	});
	
	
	$(c).mouseleave(function(){
				var elem=this.getElementsByTagName("ul")[0];
				var st_id = String(elem.id);
				el1[st_id]=elem;
				

				if(lastMenuForOpen){ //не дає відкритись пункту, якщо його лише зачепили і виїхали за межі меню (не на інший пункт)
					if (lastMenuForOpen == elem){
//						clearTimeout(timerMenuOpen[lastMenuForOpen.id]);
						clearTimeout(timerOpen);
					}
				}

				
			//	var a1=$(this).find("ul:first");
				
			//	lastMenuForClose = elem;
			//	console.log("leave");
				timerMenuClose[st_id]=setTimeout(function(){
			//	timerClose=setTimeout(function(){
							if(g)this.className="";
							el1[st_id].style.visibility="hidden";
							el1[st_id].style.display="none";
							},350);
			
				
												
			
	});

	

}
	
	for(var a=b.length-1;a>-1;a--)b[a].style.display="none"
}
