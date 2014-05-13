$(document).ready(function() { 
    
$('#reset').click(function() {
var data = $("#massimgrename_last_run").val();
var token=getURLVar('token');
        $('#massimgrename_last_run').val('0000-00-00 00:00:00');
        $.get('index.php?route=module/massimgrename/reset&token=' + token);
        
    });
    
$('#process').click(function() {
var page; 
var num_pages;
var data = $(":input").serializeArray();
data['page']=page;
var token=getURLVar('token');
//console.log(data);
//console.log(token);
// $.post('index.php?route=module/massimgrename/process&token=' + token, $("#form").serialize());
//console.log(data);
$('#loader').show();
$('#loader_txt').empty();


        $.ajax({
            url: 'index.php?route=module/massimgrename/process&token=' + token,
            dataType: 'json',
            data:data,
            type:'POST',
            success: function(json) {
                page = json['page'];
                num_pages = json['num_pages'];
                $('#massimgrename_last_run').val(json['last_run']);
                $('#loader_txt').empty();
                $('#loader_txt').append('Please wait. This may take a while... ' + page +'/'+ num_pages);

                while (page < num_pages)
        {
            page = page +1;
            
           //  $('#loader_txt').append(' '+ page +'/'+ num_pages);
           //sleep for a sec
               
            $.ajax({
                url: 'index.php?route=module/massimgrename/process&page=' + page +'&token=' + token,
                dataType: 'json',
                type:'POST',
                success: function(json) {
                    $('#loader_txt').empty();
                     $('#loader_txt').append('Please wait. This may take a while... ' + page +'/'+ num_pages);
                    page = json['page'];
                     if(page == num_pages)
                   {
                    $('#massimgrename_last_run').val(json['last_run']);
                   $('#loader_txt').empty();
                    $('#loader_txt').append(' Processing Complete');
                    $('#loader').hide(2200);
                   }
                }
            });
             
                

        }



            }
        });

        
        
});

});



