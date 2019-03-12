$(document).ready(function(){
    // Inisiasi API url
    var _url = 'http://my-json-server.typicode.com/DesertHaze99/belajar-api/mahasiswa';

    // Untuk menampung data semua mahasiswa
    var result = '';

    // Untuk menampung gender sebagai option di select
    var gender_result = '';

    // Untuk menampung gender semua mahasiswa
    var gender = [];




    // $.get(_url, function(data){
    function renderPage(data){
        $.each(data, function(key, items){
            _gend = items.gender;

            result +=  '<div>'+'<h3>'+items.name+'</h3>'+'<p>'+_gend+'</p>'+'</div>';

            if($.inArray(_gend, gender) === -1){
                gender.push(_gend);
                gender_result += "<option value='"+_gend+"'>"+_gend+"</option>";
            }

        });

        $('#mhs-list').html(result);
        $('#mhs-select').html("<option value='semua'>semua</option>"+gender_result);

    }

    var networkDataReceiver = false;

    /*
    * start balapan antara service dengan cache
    * fresh data from online service
    */
    var networkUpdate = fetch(_url).then(function(response){
        return response.json();
    }).then(function(data){
        networkDataReceiver = true;
        renderPage(data);
    })


    /*ambilkan data dalam local cache */
    caches.match(_url).then(function(response){
        if(!response) throw Error("no data on cache")
        return response.json();
    }).then(function(data){
        if(!networkDataReceiver){
            renderPage(data);
            console.log("render from cache")
        }
    }).catch(function(){
        return networkUpdate;
    });






    $("#mhs-select").on('change', function(){
        updateListMahasiwa($(this).val());
    });

    function updateListMahasiwa(opt){
        var result = '';
        var _url2 = _url;

        if(opt !== 'semua'){
            _url2 = _url + '?gender='+opt;
        }

        $.get(_url2, function(data){
            $.each(data, function(key, items){
                _gend = items.gender;
    
                result +=  '<div>'+'<h3>'+items.name+'</h3>'+'<p>'+_gend+'</p>'+'</div>';
    
            });
            
            $('#mhs-list').html(result);
        });
        
    }
});

if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/serviceworker.js').then(
            function(reg){
                console.log('SW registration success, scope : ',reg.scope);
            }, function(err){
                console.log('SW registration failed : ', err);
            }
        )
    })
}