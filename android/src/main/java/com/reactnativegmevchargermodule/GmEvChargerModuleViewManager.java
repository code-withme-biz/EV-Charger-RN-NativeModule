package com.reactnativegmevchargermodule;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.util.Log;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.skt.Tmap.TMapMarkerItem;
import com.skt.Tmap.TMapPoint;
import com.skt.Tmap.TMapPolyLine;
import com.skt.Tmap.TMapView;

import java.util.ArrayList;
import java.util.HashMap;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class GmEvChargerModuleViewManager extends SimpleViewManager<TMapBridgeView> {
    public static final String REACT_CLASS = "TMapBridgeView";
    //PARAMS
    private int zoom = 10;
    private Double clatitude ;
    private Double clongitude ;
    private ArrayList<TMapMarkerItem> markerdata = new ArrayList<TMapMarkerItem>();
    private Double dlatitude ;
    private Double dlongitude;

    private TMapView mapView;
    private ArrayList<TMapMarkerItem> markers = new ArrayList<TMapMarkerItem>();
    private ArrayList<TMapPolyLine> polylines = new ArrayList<TMapPolyLine>();

    private String apiKey = "l7xx9d4d587fe7104a57b8feda886c846d1f";
    private String TAG = "ChevroletEVCharger";

    public static final String CURRENT_LOCATION_ID = "CurrentLocation";
    public static final String START_POSITION_ID = "StartPoint";
    public static final String END_POSITION_ID = "EndPoint";
    ReactApplicationContext mCallerContext;

    public GmEvChargerModuleViewManager(ReactApplicationContext reactContext) {
      mCallerContext = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    @NonNull
    public TMapBridgeView createViewInstance(ThemedReactContext reactContext) {
      mapView = new TMapView(reactContext);
      mapView.setSKTMapApiKey(apiKey);
      mapView.setZoom(zoom);
      mapView.setOnApiKeyListener(new TMapView.OnApiKeyListenerCallback() {
        @Override
        public void SKTMapApikeySucceed() {
        }
        @Override
        public void SKTMapApikeyFailed(String s) {

        }
      });
      return new TMapBridgeView(reactContext, mapView);
    }

  @ReactProp(name = "zoom", defaultInt = 10)
  public void setSrc(TMapBridgeView view, @Nullable int zoom) {
    this.zoom = zoom;
    mapView.setZoom(zoom);
  }

  @ReactProp(name = "clatitude")
  public void setCLatitude(TMapBridgeView view, @Nullable double clat) {
    this.clatitude = clat;
    setCurrentLocation();
  }

  @ReactProp(name = "clongitude")
  public void setCLongitude(TMapBridgeView view, @Nullable double clong) {
    clongitude = clong;
    setCurrentLocation();
  }

  @ReactProp(name = "dlatitude")
  public void setDLatitude(TMapBridgeView view, @Nullable double dlat) {
    this.dlatitude = dlat;
    callbackUpdateDestination();
  }

  @ReactProp(name = "dlongitude")
  public void setDLongitude(TMapBridgeView view, @Nullable double dlong) {
    this.dlongitude = dlong;
    callbackUpdateDestination();
  }



  @ReactProp(name = "markerdata")
  public void setMarkerData(TMapBridgeView view, @Nullable ReadableArray markers) {
    assert markers != null;
    this.markerdata.clear();
    mapView.removeAllMarkerItem();

    for (int i = 0; i < markers.size(); i++) {
      ReadableMap marker = markers.getMap(i);
      TMapMarkerItem tItem = new TMapMarkerItem();
      tItem.setName(marker.getString("name") );
      if(marker.getString("centerLat") != null){
        Double markerLatitude = Double.parseDouble(marker.getString("centerLat"));
        Double markerLongitude = Double.parseDouble(marker.getString("centerLon"));
        TMapPoint tpoint = new TMapPoint(markerLatitude, markerLongitude);
        tItem.setTMapPoint(tpoint);

      }else{
        Double markerLatitude = Double.parseDouble(marker.getString("noorLat"));
        Double markerLongitude = Double.parseDouble(marker.getString("noorLon"));
        TMapPoint tpoint = new TMapPoint(markerLatitude, markerLongitude);
        tItem.setTMapPoint(tpoint);
      }

      tItem.setPosition(0.5f, 1.0f);

      mapView.addMarkerItem(marker.getString("id"), tItem);
      this.markerdata.add(tItem);
      setCurrentLocation();
    }
  }

  @ReactProp(name = "routesdata")
  public void setRoutesData(TMapBridgeView view, @Nullable ReadableArray routes) {
    assert routes != null;
    ArrayList<Object> routesArray = routes.toArrayList();
    ArrayList<TMapPoint> alTMapPoint = new ArrayList<TMapPoint>();
    mapView.removeAllTMapPolyLine();
    this.polylines.clear();

    for (int i = 0; i < routesArray.size(); i++) {
      ArrayList<Double> temp = (ArrayList<Double>) routesArray.get(i);
      Double pathLongitude = temp.get(0);
      Double pathLatitude = temp.get(1);
      alTMapPoint.add( new TMapPoint(pathLatitude, pathLongitude) );

    }
    TMapPolyLine tMapPolyLine = new TMapPolyLine();
    tMapPolyLine.setLineColor(Color.GREEN);

    tMapPolyLine.setLineWidth(2);
    for( int i=0; i<alTMapPoint.size(); i++ ) {
      tMapPolyLine.addLinePoint( alTMapPoint.get(i) );
    }
    mapView.addTMapPolyLine(tMapPolyLine.getID(), tMapPolyLine);
    this.polylines.add(tMapPolyLine);


  }

  /*
   * desc: callback update current location
   * */
  public void setCurrentLocation(){
    mapView.removeMarkerItem(CURRENT_LOCATION_ID);
    if(this.clatitude != null && this.clongitude !=null   ){

      TMapPoint tpoint = new TMapPoint(this.clatitude, this.clongitude);
      TMapMarkerItem marker = new TMapMarkerItem();
      marker.setCalloutTitle("현재위치");
      marker.setCalloutSubTitle("내차위치");
      marker.setTMapPoint(tpoint);

      marker.setPosition(0.5f, 1.0f);
      TextView label = new TextView(mCallerContext); //UILabel(frame: CGRect(x: 0, y: 0, width: 30, height: 50))
      label.setText("좌측");
      label.setHeight(50);
      label.setWidth(30);
      label.setX(0);
      label.setY(0);
      label.setDrawingCacheEnabled(true);
      label.buildDrawingCache();
      marker.setCalloutLeftImage(label.getDrawingCache());
      TextView label2 = new TextView(mCallerContext); //UILabel(frame: CGRect(x: 0, y: 0, width: 30, height: 50))
      label2.setText("우측");
      label2.setHeight(50);
      label2.setWidth(30);
      label2.setX(0);
      label2.setY(0);
      label2.setDrawingCacheEnabled(true);
      label2.buildDrawingCache();
      marker.setCalloutRightButtonImage(label2.getDrawingCache());
      mapView.addMarkerItem(CURRENT_LOCATION_ID, marker);
      mapView.setCenterPoint(this.clongitude, this.clatitude);

    }
  }

  /*
   * desc: callback update destination location
   * */
  public void callbackUpdateDestination(){
    mapView.removeMarkerItem(START_POSITION_ID);
    mapView.removeMarkerItem(END_POSITION_ID);
    if(this.dlatitude != null && this.dlongitude !=null && this.clatitude != null && this.clongitude !=null  ){


      TMapPoint spoint = new TMapPoint(this.clatitude, this.clongitude);
      TMapMarkerItem smarker = new TMapMarkerItem();
      smarker.setCalloutTitle("출발지");
      smarker.setTMapPoint(spoint);

      TMapPoint dpoint = new TMapPoint(this.dlatitude, this.dlongitude);
      TMapMarkerItem dmarker = new TMapMarkerItem();
      dmarker.setCalloutTitle("목적지");
      dmarker.setTMapPoint(dpoint);


      mapView.addMarkerItem(START_POSITION_ID, smarker);
      markers.add(smarker);
      mapView.addMarkerItem(END_POSITION_ID, dmarker);
      markers.add(dmarker);
    }
  }
}
