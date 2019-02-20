$('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
                var $svg = jQuery(data).find('svg');
                if(typeof imgID !== 'undefined') {
                        $svg = $svg.attr('id', imgID);
                }
                if(typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass+' replaced-svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                $img.replaceWith($svg);
                }, 'xml');
        });

$(function() {
	var cache={};
	$("#name").autocomplete({
		minLength: 4,
		source:	function(request, response){
			var term=request.term;
			if(term in cache){
				response(cache[term]);
				return;
				}
			$.getJSON('search.php',request,function(data){
				cache[term]=data;
				response(data);
			});
		},
		focus: function(event,ui){
			$("#name").val(ui.item.label);
			return false;
		},
		select: function(event, ui){
			$("#name").val(ui.item.label);
			$("#label").html("<a href="+ui.item.value+" style='color: #2A5DB0;'>CLICK HERE TO DOWNLOAD PDF</a>");
			$("#pdf").attr("src",ui.item.value.substr(0,ui.item.value.lastIndexOf("."))+".svg");
			return false;
		}

	});
});
