  // Here the code for transforming coordinates starts, no need to edit (src: https://github.com/googollee/eviltransform)




    // NOTHING TO SEE HERE YET


    //AAPK8cd4fa460be54880a127989c9b2d2c052Y1RMjiQ7sO35MsCSEZC916y6qH5ygU6rc3Vc4g-gHx_oBzu6g2OC0PkIrJadazB
        
        // here is where you set the starting location [longitude, latitude] and zoom level
        var map = L.map('map', { zoomControl: true, attributionControl: false }).setView([31.2204, 121.3], 11);



        // here you define a tile style, there are many open source tile sets to choose from here: https://leaflet-extras.github.io/leaflet-providers/preview/
        // var mapStyle = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        // attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        // subdomains: 'abcd',
        // minZoom: 3,
        // maxZoom: 20,
        // ext: 'png',
        // });
        // map.addLayer(mapStyle);

        // switch between basemaps: https://developers.arcgis.com/esri-leaflet/samples/switching-basemaps/
        //                            https://developers.arcgis.com/esri-leaflet/maps/change-the-basemap-style/

        const apiKey = "AAPK8cd4fa460be54880a127989c9b2d2c052Y1RMjiQ7sO35MsCSEZC916y6qH5ygU6rc3Vc4g-gHx_oBzu6g2OC0PkIrJadazB";

      //   //enumerate basemaps
      //   const vectorTiles = {};
      //   const allEnums = [
      //       "arcgis/imagery",
      //       "arcgis/streets"];

         const basemapEnum = "arcgis/streets"; //this is the only 'Streets' version with enough zoom levels...and way faster than sat. images
 //        const basemapEnum2 = "arcgis/imagery"; //this one looks kinda cool actually! and way faster than sat. images

 //      // L.esri.Vector.vectorBasemapLayer(basemapEnum, {
 //      //   apiKey: apiKey
 //      // }).addTo(map);


 // function getBasemap(style) {
 //        return L.esri.Vector.vectorBasemapLayer(style, {
 //          apikey: apiKey
 //        })
 //      }
 //     const basemapLayers = {
 //       "ArcGIS:Streets": getBasemap("ArcGIS:Streets").addTo(map),
 //      "ArcGIS:Imagery": getBasemap("ArcGIS:Imagery")
 //    };
    

 //         L.control.layers(basemapLayers, null, { collapsed:false }).addTo(map);
// add basemaplayer
//var layer = L.esri.basemapLayer('Streets').addTo(map);
var layer = L.esri.Vector.vectorBasemapLayer(basemapEnum, {
   apiKey: apiKey
}).addTo(map);


/* dirty dirty hacks to switch basemap (non of the official methods use the detailed 'Streets' vector version)*/
var layerLabels;

function setBasemap(basemap) {
  if (layer) {
    map.removeLayer(layer);
  }

  layer = L.esri.basemapLayer(basemap);

  map.addLayer(layer);

  if (layerLabels) {
    map.removeLayer(layerLabels);
  }

  if (basemap === 'ShadedRelief' ||
    basemap === 'Oceans' ||
    basemap === 'Gray' ||
    basemap === 'DarkGray' ||
    basemap === 'Terrain'
  ) {
    layerLabels = L.esri.basemapLayer(basemap + 'Labels');
    map.addLayer(layerLabels);
  } else if (basemap.includes('Imagery')) {
    layerLabels = L.esri.basemapLayer('ImageryLabels');
    map.addLayer(layerLabels);
  }
}

function changeBasemap(basemaps) {
  var basemap = basemaps.value;
  setBasemap(basemap);
}
   
/* end of dirty hacks */

        function setSatView(){
           //  L.esri.basemapLayer('Imagery').addTo(map);

  changeBasemap(basemaps);

        }
        function setStreetView(){
               // this works but is wrong steet hahah wtf L.esri.basemapLayer('Streets').addTo(map);
                //L.esri.basemapLayer('Streets').addTo(map);
          

             map.removeLayer(layer); //remove the Imagery basemap
L.esri.Vector.vectorBasemapLayer(basemapEnum, { //add nice 'Streets' version to map
   apiKey: apiKey
}).addTo(map);
        }

//"Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Physical", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ImageryClarity", "ImageryFirefly", ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"



//------------------------------ here you add markers ------------------------------
// dennis de bel

// One big issue... you are not allowed to make maps in China: 
// https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China

// Instead of GPS China uses a different coordinate system. 
// You either have:
// - to tweak you coordinates by hand
// - use this generator https://artoria2e5.github.io/PRCoords/demo (Choose 'GCJ → WGS')
// - use a chinese tile set: https://github.com/htoooth/Leaflet.ChineseTmsProviders  or  https://github.com/muyao1987/leaflet-tileLayer-baidugaode
// - or implement this script, but this is outside of the scope of this class (also the name of the script is rather dubious):   (https://github.com/googollee/eviltransform/tree/master/javascript)


// This is why providing an accurate address and photo is important ;)

        var item1 = L.circleMarker([31.24003, 121.42391],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 1</b><br><br> \
                            <b>Description: </b>Apartment building construction site, address plate not found, like any number between 330 and 600.<br> \
                            <b>Address (en): </b>No. 475 Guangfu West Road <a href='http://maps.apple.com/?daddr=31.24003, 121.42391'>Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市光复西路475号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory1.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 1");

        
        var item2 = L.circleMarker([31.25244, 121.43649],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map) //was 31.249684, 121.441060
                .bindPopup("<b>Shanghai Radio Factory No. 2</b><br><br> \
                            <b>Description: </b>Moved to Guizhou 083(4110) during the Third Front Movement<br> \
                            <b>Address (en): </b>Yichang Road 96 <a href='http://maps.apple.com/?daddr=31.249684, 121.441060'>Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市宜昌路96号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory2.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 2");


        var item3 = L.circleMarker([31.24391, 121.44671],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 3</b><br><br> \
                            <b>Description: </b>Residential area (you can get on the roof). But behind the towerblock is a massive abbandoned factory, the Shanghai Elecric Machine Tool & Engineering Co., LTD. The gate is open. (Also opposite there are former factory buildings, 1950's style, clearly preserved and renovated, but no further info ).<br> \
                            <b>Address (en): </b>No. 65 West Suzhou Road  <a href='http://maps.apple.com/?daddr=31.24391, 121.44671'>Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市西苏州路65号<br> \
                            <b>Reference</b>: <a href='https://mp.weixin.qq.com/s/G2weDICmSL8hEFNOYRFzXQ'>link</a><br><br> \
                            <img src='images/factory3.jpg' style='width:40%;'><img src='images/factory3-2.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 3");


        var item4a = L.circleMarker([31.19681, 121.43756],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 4(a)</b><br><br> \
                            <b>Description: </b>This is one if the locations of factory 4 (hence the 'a' attribution by editor). The address can not be found in real life, but it is exactyl opposite the remains of the Chungwha Rubber Factory Chimney<br> \
                            <b>Address (en): </b>No. 1001 Zhaojiabang Road<a href='http://maps.apple.com/?daddr=31.19681, 121.43756'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市肇嘉浜路1001号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory4a.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 4(a)");

        var item4b = L.circleMarker([31.19979, 121.45651],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 4(b)</b><br><br> \
                            <b>Description: </b>Second location ('b' addded by editor) of Shanghai Radio Factory No. 4, not sure which came first, marker position is incorrect (it's on a corner). Behind the building is a 'Shanghai Electric' xiaoqu interestingly.<br> \
                            <b>Address (en): </b>No. 414 Xietu Road<a href='http://maps.apple.com/?daddr=31.19979, 121.45651'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市斜土路414号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory4b-1.jpg' style='width:40%;'><img src='images/factory4b-2.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 4(b)");


        var item6 = L.circleMarker([31.24272, 121.42523],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 6</b><br><br> \
                            <b>Description: </b>2000 era apartment building complex with recent (not finished) addition of some red brick pre opening up factory aestethics. Similar to Factory No. 1, the address plate was not found, like any number between 330 and 600.<br> \
                            <b>Address (en): </b>No. 419 Guangfu West Road<a href='http://maps.apple.com/?daddr=31.24272, 121.42523'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市光复西路419号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory6.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 6");

        var item7 = L.circleMarker([31.268506, 121.489337],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 7</b><br><br> \
                            <b>Description: </b> gps unusure<br> \
                            <b>Address (en): </b>No.289 Ouyang Road<a href='http://maps.apple.com/?daddr=31.268506, 121.489337'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市欧阳路289号<br> \
                            <b>Reference</b>: <a href='https://www.sohu.com/a/704664731_121687414'>link</a><br><br> \
                            <img src='images/factory7.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 7");

        var item8 = L.circleMarker([31.267639, 121.482681],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 8</b><br><br> \
                            <b>Description: </b> Now the North Sichuan Road Police Station<br> \
                            <b>Address (en): </b>No. 2246 Sichuan North Road<a href='http://maps.apple.com/?daddr=31.267639, 121.482681'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市虹口区四川北路2246号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory8.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 8");

        var item9a = L.circleMarker([31.20680, 121.46182],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 9</b><br><br> \
                            <b>Description: </b>Developed and produced China's first (single) transistor medium wave handheld '636' type radio<br> \
                            <b>Address (en): </b>Building 17+393, Lane 62, Zhaojiabang Road <a href='http://maps.apple.com/?daddr=31.20680, 121.46182'>Directions</a> (Apple maps) <br> \
                            <b>Address (cn): </b>上海市肇嘉浜路62弄17号和393号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory9a.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 9");

        var item9b = L.circleMarker([30.985674,121.541687],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map) 
                .bindPopup("<b>Shanghai Radio Factory No. 9 later location</b><br><br> \
                            <b>Description: </b>Has very interesting antennas in the garden opposite (30.98729, 121.53715)<br> \
                            <b>Address (en): </b>Off Yanpu Highway, Pudong <a href='http://maps.apple.com/?daddr=30.991968,121.5482'>Directions</a> (Apple maps) <br> \
                            <b>Address (cn): </b><br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory9b.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 9");

        var item10 = L.circleMarker([31.23604, 121.55627],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 10</b><br><br> \
                            <b>Description: </b> Now the North Sichuan Road Police Station<br> \
                            <b>Address (en): </b>No. 1900 Yanggao Middle Road<a href='http://maps.apple.com/?daddr=31.23604, 121.55627'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b><a href='https://maps.baidu.com/search/%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA%E6%9D%A8%E9%AB%98%E4%B8%AD%E8%B7%AF1900%E5%8F%B7/@13532897.125,3641527,19z?querytype=s&da_src=shareurl&wd=%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA%E6%9D%A8%E9%AB%98%E4%B8%AD%E8%B7%AF1900%E5%8F%B7&c=289&src=0&pn=0&sug=0&l=14&b=(13526319.274461443,3638055.158463892;13538809.204388006,3645857.85626071)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2'>上海市浦东新区杨高中路1900号</a><br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory10.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 10");

        var item11 = L.circleMarker([31.213143, 121.427448],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 11</b><br><br> \
                            <b>Description: </b> Address unfindable, but among the embassies and other colonial structures emerges a vast red brick factory complex now a xiaohongshu / influencer shopping area.<br> \
                            <b>Address (en): </b>No. 174 Wuyi Road<a href='http://maps.apple.com/?daddr=31.23604, 121.55627'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b><a href='https://maps.baidu.com/search/%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA%E6%9D%A8%E9%AB%98%E4%B8%AD%E8%B7%AF1900%E5%8F%B7/@13532897.125,3641527,19z?querytype=s&da_src=shareurl&wd=%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA%E6%9D%A8%E9%AB%98%E4%B8%AD%E8%B7%AF1900%E5%8F%B7&c=289&src=0&pn=0&sug=0&l=14&b=(13526319.274461443,3638055.158463892;13538809.204388006,3645857.85626071)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2'>上海市浦东新区杨高中路1900号</a><br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory11.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 11");

        var item12 = L.circleMarker([31.23617, 121.48539],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 12</b><br><br> \
                            <b>Description: </b>Demolished. Could not find address, but only numbers 59,60 and 43. 60 is an empty lot as pictured. This is the location indicated by baidu maps as being number 50 as well. The lot sits right behind the Shanghai Telecom Museum. <br> \
                            <b>Address (en): </b>No.50 Guangdong Road, Huangpu<a href='http://maps.apple.com/?daddr=31.23617, 121.48539'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市黄浦区广东路50号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory12.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 12");


        var item13 = L.circleMarker([31.22111, 121.43561],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 13</b><br><br> \
                            <b>Description: </b> The adress points to a French style bakery located in a building similar to that of factory 21. Walking down the alley reveils, amongst others, the 'Shanghai Computer Factory' now repurposed as multi-use lot featuring a gym, kebab bbq and more. This building is number 2 of the 'Donghaidasha Plaza complex; a collection of 1920 style factory buildings that once, and still, hosts electronics companies.<br> \
                            <b>Address (en): </b>No. 1486 Nanjing West Road<a href='http://maps.apple.com/?daddr=31.22111, 121.43561'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>南京西路1486号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory13-1.jpg' style='width:40%;'><img src='images/factory13-2.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 13");


        var item14 = L.circleMarker([31.19573, 121.46936],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 14</b><br><br> \
                            <b>Description: </b>Now Greenland shopping mall - 黄浦绿地缤纷城 <br> \
                            <b>Address (en): </b>No.795 Longhua East Road<a href='http://maps.apple.com/?daddr=31.19573, 121.46936'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市龙华东路795号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory14.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 14");


        var item15 = L.circleMarker([31.20454, 121.46618],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 15</b><br><br> \
                            <b>Description: </b>Residential Area (Tower Blocks)<br> \
                            <b>Address (en): </b>No.90 Dapu Road<a href='http://maps.apple.com/?daddr=31.20454, 121.46618'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市打浦路90号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory15.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 15");

        var item16 = L.circleMarker([31.24770, 121.44562],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 16</b><br><br> \
                            <b>Description: </b>The location of the pin is not correct, but the mentioned address is also not to be found. At the foot of the bridge there is a new construction site with the address 19-21, at the end of the bridge is an abbandoned building that seems to be part of a water treatment plant.<br> \
                            <b>Address (en): </b>No.11, Lane 56, Changshou Road<a href='http://maps.apple.com/?daddr=31.24770, 121.44562'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市长寿路56弄11号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br>")
                .bindTooltip("Shanghai Radio Factory No. 16");


        var item17 = L.circleMarker([31.21626, 121.50076],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 17</b><br><br> \
                            <b>Description: </b>Address can not be found. Either a Chruch, CIAO Shopping Mall or a construction site (pictured)<br> \
                            <b>Address (en): </b>No. 175 Dongjiadu Road<a href='http://maps.apple.com/?daddr=31.21626, 121.50076'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市董家渡路175号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory17.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 17");

        var item18 = L.circleMarker([31.19479, 121.45581],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 18</b><br><br> \
                            <b>Description: </b> Could not find address, but its most likely part of the current Shanghai Institute of Organic Chemistry of the Chinese Academy of Sciences (it is a HUGE compound)<br> \
                            <b>Address (en): </b>No. 332 Lingling Road<a href='http://maps.apple.com/?daddr=31.19479, 121.45581'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市零陵路332号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory18.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 18");

        var item19 = L.circleMarker([31.17206, 121.42758],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 19</b><br><br> \
                            <b>Description: </b> Non descript tan colored buildings. Seems legit factory still, but not a single signs to be spotted outside. Boa'an confirmed the address. Baidu Maps shows it as Shanghai Panasonic Semiconductor Limited Company (上海松下半导体有限公司). Is there a link with former factory number 3 that had panasonic lettering inside?<br> \
                            <b>Address (en): </b>No.25, Lane 258, Caoxi Road<a href='http://maps.apple.com/?daddr=31.17206, 121.42758'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市漕河泾新兴技术开发区漕溪路258弄25号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory19.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 19");

        var item20 = L.circleMarker([31.17522, 121.40900],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 20</b><br><br> \
                            <b>Description: </b>Cannot find the exact address. Baidu points to an office building but these are number 717 and 719. The opposite side of the street hosts a construction site with all the way in the back a still operational, dark grey non descript building with no signage. Further around the back is a wall with the CASC logo. The whole area is high tech industry.<br> \
                            <b>Address (en): </b>No. 711 Yishan Road<a href='http://maps.apple.com/?daddr=31.17522, 121.40900'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市漕河泾新兴技术开发区宜山路711号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory20.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 20");

        var item21 = L.circleMarker([31.23864, 121.44573],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 21</b><br><br> \
                            <b>Description: </b>Became Shanghai Xinjian Instrument & Equipment Co.,Ltd. in 1999 and is still operating from this location as a repair center<br> \
                            <b>Address (en): </b>No. 631 Jiangning Road<a href='http://maps.apple.com/?daddr=31.23864, 121.44573'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市江宁路631号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory21.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 21");

        var item22 = L.circleMarker([31.21413, 121.47027],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 22</b><br><br> \
                            <b>Description: </b>Now a Shopping Mall (恒基 旭辉天地, https://www.tianyancha.com/company/1621626300 <br> \
                            <b>Address (en): </b>No. 390 Jianguo East Road<a href='http://maps.apple.com/?daddr=31.21413, 121.47027'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市建国东路390号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory22.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 22");

        var item23 = L.circleMarker([31.26220, 121.53243],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 23</b><br><br> \
                            <b>Description: </b>Empty lot on maps <br> \
                            <b>Address (en): </b>No.220, Lane 431 Meizhou Road<a href='http://maps.apple.com/?daddr=31.26220, 121.53243'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>眉州路431弄220号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory23.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 23");


        var item24 = L.circleMarker([31.24738, 121.48589],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 24</b><br><br> \
                            <b>Description: </b>Inacurate gps<br> \
                            <b>Address (en): </b>No. 390 Wuchang Road<a href='http://maps.apple.com/?daddr=31.24738, 121.48589'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海武昌路390号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory24.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 24");


        var item26 = L.circleMarker([31.17815, 121.43817],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 26</b><br><br> \
                            <b>Description: </b>Residential Area, establishesd in 1999. The factorty became Shanghai Yamei Electrical Appliances Factory (ref?...Link to Giuzhou/Sichuan?)<br> \
                            <b>Address (en): </b>No. 525 Longhua West Road <a href='http://maps.apple.com/?daddr=31.17815, 121.43817'>Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市龙华西路525号<br> \
                            <b>Reference</b>: <a href='https://www.shtong.gov.cn/difangzhi-front/book/detailNew?oneId=1&bookId=190116&nodeId=411435&parentNodeId=251562&type=jie'>link</a><br><br> \
                            <img src='images/factory26.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 26");

        var item27 = L.circleMarker([31.25779, 121.52743],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 27</b><br><br> \
                            <b>Description: </b>Inacurate gps<br> \
                            <b>Address (en): </b>No. 60 Danyang Road<a href='http://maps.apple.com/?daddr=31.25779, 121.52743'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市丹阳路60号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory27.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 27");

        var item28 = L.circleMarker([31.24486, 121.48139],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 28</b><br><br> \
                            <b>Description: </b>Inacurate gps<br> \
                            <b>Address (en): </b>No. 659 Middle Sichuan Road<a href='http://maps.apple.com/?daddr=31.24486, 121.48139'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市四川中路659号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory28.jpg' style='width:40%;'> <img src='images/factory28-inside.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 28");


        var item29 = L.circleMarker([31.21848, 121.47405],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 29</b><br><br> \
                            <b>Description: </b>Cannot find the address. Inacurate gps<br> \
                            <b>Address (en): </b>No. 1381 Xinzhaozhou Road<a href='http://maps.apple.com/?daddr=31.21848, 121.47405'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市新肇周路1381号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br>")
                .bindTooltip("Shanghai Radio Factory No. 29");


        var item30 = L.circleMarker([31.16922, 121.39738],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 30</b><br><br> \
                            <b>Description: </b>The adress is currently  occupied by various companies it seems, the buildings seem rather new (90's?). Three identiacal buildings occupy the lot, one of which is obviously a datacenter (no windows and 100's of AC's)<br> \
                            <b>Address (en): </b>No. 201 Tianlin Road, Caohejing Emerging Technology Development Zone<a href='http://maps.apple.com/?daddr=31.16922, 121.39738'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市漕河泾新兴技术开发区田林路201号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory30.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 30");


        var item32 = L.circleMarker([31.22515, 121.39777],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 32</b><br><br> \
                            <b>Description: </b>Can't find the address, residential area on the Suzhou river bund. The possible address (a street corner) hosts an empty walled-off lot with the text 'Shanghai technological and financial industry center'. There used to be a lot of instdustry by the Suzhou river, close to this location one can find the remains of the Chimney of the Shanghai Chemical Reagent factory.<br> \
                            <b>Address (en): </b>No. 2359 Guangfu West Road<a href='http://maps.apple.com/?daddr=31.22515, 121.39777'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市光复西路2359号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory32.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 32");

        var item33 = L.circleMarker([31.421685, 121.193816],{weight:2,radius:20,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 33</b><br><br> \
                            <b>Description: </b>Marker is wrong. Bao'an told us that building 8 used to house the factory (back when it was called building 4) but that the factory recently moved. Building 8 is now empty (although it seemed filled to the brim with wooden shipping crates). The whole area is industrial; car manufacturers (Volvo) interwtined with farm land (what would zoning type be?). Searching on Baidu reveals two possible alternative addressed: 上海市嘉定区嘉行公路2588号 and 南石二路120号 (南石二路120号(无线电三十三厂)地块房地产评估委托合同公告)<br> \
                            <b>Address (en): </b>No. 1277 Xingwen Road, Baihao AI Science Park, Jiading<a href='http://maps.apple.com/?daddr=31.421685, 121.193816'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海无线电三十三厂<br> \
                            <b>Reference</b>: just searched apple maps for 上海无线电厂<br><br> \
                            <img src='images/factory33.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 33 ");

        var item35 = L.circleMarker([31.20446, 121.46936],{weight:2,radius:20,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 35</b><br><br> \
                            <b>Description: </b><br> \
                            <b>Address (en): </b>No. 630 Xietu Road<a href='http://maps.apple.com/?daddr=31.20446, 121.46936'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市斜土路630号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory35.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 35");

        var item36 = L.circleMarker([31.19122, 121.45591],{weight:2,radius:20,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 36</b><br><br> \
                            <b>Description: </b>Registered in 1981, Is currently housing the 'Shanghai clock culture and science museum' (2024)</b><br> \
                            <b>Address (en): </b>No. 520, Zhongshan South 2nd Road<a href='http://maps.apple.com/?daddr=31.19122,121.45591'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市中山南二路520号<br> \
                            <b>Reference</b>: <a href='http://shwxdssl.dayinmao.com/'>link</a><br><br> \
                            <img src='images/factory36.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 36");

        var item41 = L.circleMarker([31.20594, 121.44324],{weight:2,radius:20,fillColor: "#a83246", fillOpacity: 1}).setStyle({color: '#f7f6d8'}).addTo(map)
                .bindPopup("<b>Shanghai Radio Factory No. 41</b><br><br> \
                            <b>Description: </b>Currently houses the National Institute of Quality Inspection and Research on Product and the Institute of Quality Inspection and Technical Research /上海市仪表电子产品质量监督检验站<br> \
                            <b>Address (en): </b>No.627 Yongjia Road<a href='http://maps.apple.com/?daddr=31.20594, 121.44324'> Directions</a> (Apple maps)<br> \
                            <b>Address (cn): </b>上海市永嘉路627号<br> \
                            <b>Reference</b>: <a href='http://www.studyofnet.com/717614483.html'>link</a><br><br> \
                            <img src='images/factory41.jpg' style='width:40%;'>")
                .bindTooltip("Shanghai Radio Factory No. 41");
                
//-------------------------------------- end ---------------------------------------



        // here are the controls for your map
        L.control.locate(
            {   keepCurrentZoomLevel: true, 
                icon: 'fa fa-crosshairs',
                follow: true,
                position:"topright",
                markerStyle: {
                    className: 'leaflet-control-locate-marker',
                    color: '#fff',
                    fillColor: 'green',
                    fillOpacity: 0.5,
                    weight: 3,
                    opacity: 1,
                    radius: 15
                },
                circleStyle: {
                    className: 'leaflet-control-locate-circle',
                    color: 'red',
                    fillColor: 'red',
                    fillOpacity: 0.05,
                    weight: 0,
                    clickable: false,
                },
                locateOptions: {
                    enableHighAccuracy: true
                }
            }).addTo(map);


// var locateControl = L.control.locate({
//   position: "bottomright",
//   markerClass:mymarkerLocation,
//   drawCircle: true,
//   drawMarker: true,
//   follow: true,
//   setView: true,
//   keepCurrentZoomLevel: false,
//   markerStyle: {
//     className: 'leaflet-control-locate-marker',
//     color: '#fff',
//     fillColor: '#2A93EE',
//     fillOpacity: 0.5,
//     weight: 3,
//     opacity: 1,
//     radius: 15
//   },
//   circleStyle: {
//     className: 'leaflet-control-locate-circle',
//     color: '#136AEC',
//     fillColor: '#136AEC',
//     fillOpacity: 0.05,
//     weight: 0,
//     clickable: false,
//   },
//   icon: "fa fa-location-arrow",
//   metric: false,
//   strings: {
//     title: "My location",
//     popup: "You are within {distance} {unit} from this point",
//     outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
//   },
//   locateOptions: {
//     maxZoom: 22,
//     zoom: 15,
//     watch: true,
//     enableHighAccuracy: true,
//     maximumAge: 10000,
//     timeout: 10000
//   }
// }).addTo(map);

        map.zoomControl.remove(); // remove default zoom controls (always on the top left)
        L.control.zoom({position:'topright'}).addTo(map); //add zoom controls to the right side of the screen


        //hide zoom controls on mobile
        if (L.Browser.mobile) { //https://gis.stackexchange.com/questions/259690/remove-the-leaflet-zoom-control-on-mobile
          
            map.setView([31.2304, 121.5000],9);

        }


//-------------------------------------- ui interactions ---------------------------------------


    $(document).ready(function(){
        //toggle list / map view
        $('#toggle').click(function(){
            var list = $('.list');
            var listIcon = $('.listIcon');
            var mapIcon = $('.mapIcon');
            //list.animate({"left":"-100px"}, "slow").addClass('hidden');

             if (list.hasClass('hidden')){
                 list.animate({"left":"0px"}, "slow").removeClass('hidden');
                 listIcon.animate({"opacity":"0"}, "fast").removeClass('hidden');
                 mapIcon.animate({"opacity":"100"}, "slow").removeClass('hidden');

             } else {
                 list.animate({"left":"-345px"}, "slow").addClass('hidden');
                 mapIcon.animate({"opacity":"0"}, "slow").removeClass('hidden');
                listIcon.animate({"opacity":"100"}, "slow").removeClass('hidden');
             }

        });
        // toggle base map styles
        $('#toggleBaseMap').click(function(){
            var iconSat = $('.iconSat');
            //list.animate({"left":"-100px"}, "slow").addClass('hidden');

             if (iconSat.hasClass('hidden')){
        
                 iconSat.animate({"opacity":"0.5"}, "fast").removeClass('hidden');
                 setStreetView();

             } else {
              
               
                 iconSat.animate({"opacity":"1"}, "slow").addClass('hidden');
                 setSatView();
             }

        });
        

        //expand/toggle factory divs
        $('.factory').click(function(){

             if ($(this).hasClass('hidden')){
                 $(this).animate({"height":"80px"}, "slow").removeClass('hidden');
                 $(this).children(":first").animate({"marginTop":"-48px"}, "slow").addClass('hidden'); //move the photo in view

        
             } else {
                $(this).animate({"height":"100%"}, "slow").addClass('hidden');
                $(this).children(":first").animate({"marginTop":"0px"}, "slow").addClass('hidden'); //move the photo in view
              
            
             }
    });
});