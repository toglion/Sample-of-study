/**
 * GoogleMapの表示
 * @param {String} id 表示領域ID
 * @param {Object} option google.maps.Mapに設定するオプション
 * @param {Object} markerArray マーカーデータ配列
 * @param {Object} isNumberPin 番号付きマーカーで表示するか
 */
var viewGoogleMap = function(id, option, markerArray, isNumberPin){
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
        content: markerData.content
      });
      google.maps.event.addListener(openInfoWindow,'closeclick',function(){
        openInfoWindow = null;
      })
      openInfoWindow.open(marker.getMap(), marker);
    });
  };
  
  /**
   * マーカーデータのセット
   * @param {Object} makerArray マーカーデータ
   */
  var setMarkerData = function(makerArray) {

    // 登録データ分のマーカーを作成
    for (var i = 0; i < makerArray.length; i++) {
      var marker = new google.maps.Marker({
        position: makerArray[i].position,
        title: makerArray[i].title,
        map: gmap,
        icon: isNumberPin ? new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+ (i + 1) + "|ff7e73|000000") : null,
        shadow:isNumberPin ? new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",null,null, new google.maps.Point(12, 35) ) : null
      });

      // マーカーのclickリスナー登録
      setMarkerClickListener(marker, makerArray[i], true);
    }
  }; 
  
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
  
  if(markerArray){
    setMarkerData(markerArray);
  }
}


