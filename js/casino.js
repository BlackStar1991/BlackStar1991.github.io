$('body').on('click', '[data-href]', function(e){
window.open($(this).data('href'));
e.preventDefault();
});