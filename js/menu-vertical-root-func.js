var showMenu_root = false;
var hideMenu_root = true;
var mouse_on_menu_root = false;

$('#buttonStartMenu').mouseenter(function(){
//	console.log("But Yes");
	showMenu_root = true;
  mouse_on_menu_root = true;
  setTimeout(show_menu_root,300);
});

$('#buttonStartMenu').mouseleave(function(){
//	console.log("But No");
	mouse_on_menu_root = false;
	no_show_menu_root(); //якщо курсор просто проїхав по кнопці
  close_menu_root();//якщо меню вже було показано, але курсор поїхав не на меню
});



$('#menu-v-root').mouseenter(function(){
 // document.getElementById('id-left-group-menu').className='left-group-menu';
  document.getElementById('menu-v-root').className='menu-v-root-vis';
  hideMenu_root=false;
  mouse_on_menu_root = true;
//	console.log("Menu Yes");

});

$('#menu-v-root').mouseleave(function(){
	hideMenu_root = true;
	mouse_on_menu_root = false;
//	console.log("Menu No");

	setTimeout(hide_menu_root,300); //в головному меню затримка не викор.
  
});


function show_menu_root() {


if (showMenu_root) {
 //   document.getElementById('id-left-group-menu').className='left-group-menu';
	document.getElementById('menu-v-root').className='menu-v-root-vis';
	}
}

function no_show_menu_root() {
showMenu_root = false;


}

function close_menu_root() {
	setTimeout(hide_menu_mouse_on_menu_root,300);  //в головному меню затримка не викор.
	}

function hide_menu_mouse_on_menu_root() {
	if (!mouse_on_menu_root) {
//	document.getElementById('id-left-group-menu').className='left-group-menu-hid';
	document.getElementById('menu-v-root').className='menu-v-root-hid';	
	$('#bg_layer').hide();

	}
}

function hide_menu_root() {

	if (hideMenu_root && !mouse_on_menu_root){
	//	document.getElementById('id-left-group-menu').className='left-group-menu-hid';
		document.getElementById('menu-v-root').className='menu-v-root-hid';
		$('#bg_layer').hide();

	}
}


