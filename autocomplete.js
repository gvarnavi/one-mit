var license = config.license;
$('#fullpage').fullpage({
	//License
	licenseKey: license,
	//Navigation
	anchors: ['search','locate','about','visit','team'],
	//Scrolling
	autoScrolling:true,
	scrollOverflow:true,
	scrollBar:true,
        paddingTop: '85px',
        paddingBottom: '85px',
        responsiveWidth: 1024,
        dragAndMove: 'fingersonly',
        slidesNavigation: true,
        slidesNavigation: 'bottom'
        
});

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
			$("#label1").html("<a target='_blank' href="+ui.item.value+" style='color: #2A5DB0; text-decoration: none; font-weight:bold; font-size: 1.5em;'>DOWNLOAD PDF</a>");
			$("#slide1").attr("src",ui.item.value.substr(0,ui.item.value.lastIndexOf("."))+"_1.svg");
			$("#label2").html("<a target='_blank' href="+ui.item.value+" style='color: #2A5DB0; text-decoration: none; font-weight:bold; font-size: 1.5em;'>DOWNLOAD PDF</a>");
			$("#slide2").attr("src",ui.item.value.substr(0,ui.item.value.lastIndexOf("."))+"_2.svg");
			$("#label3").html("<a target='_blank' href="+ui.item.value+" style='color: #2A5DB0; text-decoration: none; font-weight:bold; font-size: 1.5em;'>DOWNLOAD PDF</a>");
			$("#slide3").attr("src",ui.item.value.substr(0,ui.item.value.lastIndexOf("."))+"_3.svg");
			window.location = "#locate";
			return false;
		}

	});
});
