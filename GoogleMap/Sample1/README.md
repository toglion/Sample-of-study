GoogleMap サンプル1
======================
GoogleMap API V3を使用したサンプルです。

１つの地図内に複数のマーカーを表示し、クリックで情報ウィンドウを開きます。

情報ウィンドウは一度に1つしか開きません。


使い方
------
htmlファイルでgmap.jsを読みこみます。
viewGoogleMapを実行すると、引数で指定したIDに地図が表示されます。

パラメータの解説
---------------- 
     viewGoogleMap(id, option, markerArray)
 
+   `id` :
    GoogleMapを表示する
 
+   `option` :
    google.maps.Map実行時に設定するオプションです。未設定の場合はデフォルトの値が使用されます。
  
+   `markerArray` :
    マーカーデータの配列です。未設定の場合は、マーカーは表示されません。
    1つのマーカーデータとして、__position__、__title__、__content__を持ちます。

    positionはマーカー位置で必須です。

    titleは、マウスオーバーしたときに表示するテキストです。

    contentは、マーカーをクリックしたときに表示する情報ウィンドウのテキストです。

呼び出しサンプル
----------------
    <!DOCTYPE html>
    <html>
      <head>
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false">
        </script>
        <script type="text/javascript">

          function initialize(id){
            var data = new Array();
            data.push({position: new google.maps.LatLng(34.687574,135.189857), title: 'ローソン', content: 'ローソン 神戸中央西町 <br/><a href=\'http://www.lawson.co.jp/\'>HP</a>'});
            data.push({position: new google.maps.LatLng(34.6882,135.188087), title: '南京町広場', content: '南京町広場'});

            var map = viewGoogleMap(id,null,data);
          }
        </script>
        <script src="./js/gmap.js" type="text/javascript"></script>
        <title>GoogleMapTest1</title>
      </head>
      <body onload="initialize('gmap_canvas')">
        <div id="gmap_canvas" style="width: 480px; height: 320px;"></div>
      </body>
    </html>
