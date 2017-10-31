var showMenu = false;
var hideMenu = true;
var mouse_on_menu = false;

$('#buttonStartMenu').mouseenter(function(){
//	console.log("But Yes");
	showMenu = true;
  mouse_on_menu = true;
  setTimeout(show_menu,300);
});

$('#buttonStartMenu').mouseleave(function(){
//	console.log("But No");
	mouse_on_menu = false;
	no_show_menu(); //якщо курсор просто проїхав по кнопці
  close_menu();//якщо меню вже було показано, але курсор поїхав не на меню
});



$('#menu-v').mouseenter(function(){
//	$('#bg_layer').show();
	document.getElementById('id-left-group-menu').className='left-group-menu';
	document.getElementById('menu-v').className='menu-v-vis';
	document.getElementById('buttonStartMenu').className='buttonStartMenuShow';
  hideMenu=false;
  mouse_on_menu = true;
//	console.log("Menu Yes");

});

$('#menu-v').mouseleave(function(){
	hideMenu = true;
	mouse_on_menu = false;
//	console.log("Menu No");

	setTimeout(hide_menu,1000);
  
});


function show_menu() {


if (showMenu) {
//	$('#bg_layer').show();
	document.getElementById('id-left-group-menu').className='left-group-menu';
	document.getElementById('menu-v').className='menu-v-vis';
	}
}

function no_show_menu() {
showMenu = false;


}

function close_menu() {
	setTimeout(hide_menu_mouse_on_menu,1000);
	}

function hide_menu_mouse_on_menu() {
	if (!mouse_on_menu) {
	document.getElementById('id-left-group-menu').className='left-group-menu-hid';
	document.getElementById('menu-v').className='menu-v-hid';	
	$('#bg_layer').hide();
	}
}

function hide_menu() {

	if (hideMenu && !mouse_on_menu){
	document.getElementById('id-left-group-menu').className='left-group-menu-hid';
	document.getElementById('menu-v').className='menu-v-hid';
	document.getElementById('buttonStartMenu').className='buttonStartMenu';
	$('#bg_layer').hide();
	}
}


