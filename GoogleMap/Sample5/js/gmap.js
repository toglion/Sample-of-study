/**
 * GoogleMapの表示
 * @param {String} id 表示領域ID
 * @param {Object} option google.maps.Mapに設定するオプション
 * @param {Object} isNumberPin 番号付きマーカーで表示するか
 */
var viewGoogleMap = function(id, option, isNumberPin){
  /**
   * マーカーのクリックイベントリスナーの登録
   * @param {google.maps.Marker} marker マーカーオブジェクト
   * @param {Object} markerData マーカーに設定する情報ウィンドウデータ
   */
  var setMarkerClickListener = function(marker, markerData) {
    google.maps.event.addListener(marker, 'click', function(event) {
      if (openInfoWindow) {
        openInfoWindow.close();
      }
      openInfoWindow = new google.maps.InfoWindow({
        content:markerData.content
      });
      google.maps.event.addListener(openInfoWindow,'closeclick',function(){
        openInfoWindow = null;
      })
      openInfoWindow.open(marker.getMap(), marker);
    });
  };
  
  /**
   * リンクのクリックイベントの登録
   */
  var setLinkClickEvent = function(lnk, marker){
    lnk.bind('click', function(){
      google.maps.event.trigger(marker, 'click');
    });    
  }
  
  /**
   * マーカーデータのセット
   * @param {Object} markerData マーカーデータ
   */
  var setMarkerData = function(markerData) {

    for (var i = 0; i < markerData.length; i++) {
      var marker = new google.maps.Marker({
        position: markerData[i].position,
        title: markerData[i].title,
        map: gmap,
        icon: isNumberPin ? new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+ (i + 1) + "|ff7e73|000000") : null,
        shadow:isNumberPin ? new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",null,null, new google.maps.Point(12, 35) ) : null
      });
      markerArray.push(marker);

      // マーカーのclickリスナー登録
      setMarkerClickListener(marker, markerData[i], true);
      
      // マーカーの一覧出力・リンクのクリック時のイベント設定
      var lnk = $('<li>').append($('<a href="javascript:void(0)"/>').text(markerData[i].title));
      $('#marker_list >ol').append(lnk);      
      setLinkClickEvent(lnk, marker);      
    }
  };
  /**
   * マーカー削除
   */
  var clearMarkerData = function(){
    var i;
    //表示中のマーカーがあれば削除
    if(markerArray.length > 0){
      //マーカー削除
      for ( i = 0; i <  markerArray.length; i++) {
        markerArray[i].setMap();
      }
      markerArray.length = 0;
    }
  }
    
  /**
   * マーカーのリフレッシュ 
   */
  var refleshMarker = function(){
    //リストの内容を削除
    $('#marker_list > ol').empty();
  
    //マーカー削除
    clearMarkerData();
    
    //地図の表示範囲を取得
    var bounds = gmap.getBounds();
    var northEastLatLng = bounds.getNorthEast();
    var southWestLatLng = bounds.getSouthWest();

    //jsonファイルの取得
    $.ajax({
      url: 'php/get_marker.php?neLat='+northEastLatLng.lat()+'&neLng='+northEastLatLng.lng()+'&swLat='+southWestLatLng.lat()+'&swLng='+southWestLatLng.lng(),
      type: 'GET',
      dataType: 'json',
      timeout: 1000,
      error: function(){
        alert("地図データの読み込みに失敗しました");
      },
      success: function(json){
        //帰ってきた地点の数だけループ
        var markerData = new Array();
        $.each(json.points,function(){
          markerData.push({
            position: new google.maps.LatLng(this.lat,this.lng), 
            title: this.title,
            content:this.content
          });
        });
      
        // マーカーデータをセット
        if(markerArray){
          setMarkerData(markerData);
        }      
      }
    });    
  }
  
  option = option ? option : {};
  if(id == null){
    return;
  }
  var mapOption = {
    zoom: option.zoom || 16,
    center:option.center || new google.maps.LatLng(34.687463, 135.18813),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.DEFAULT
    }
  };
  
  var gmap = new google.maps.Map(document.getElementById(id), mapOption);
  var openInfoWindow;
  var markerData;
  var markerArray = new Array();
  
  // 地図変更時のリスナーの追加
  google.maps.event.addListener(gmap, 'idle', function(){
    refleshMarker();
  })
}


