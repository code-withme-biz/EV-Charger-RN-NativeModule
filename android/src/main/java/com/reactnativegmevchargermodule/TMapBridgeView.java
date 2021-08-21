package com.reactnativegmevchargermodule;
import android.content.Context;
import android.widget.LinearLayout;
import com.skt.Tmap.TMapView;

public class TMapBridgeView extends LinearLayout {

  /**
   * Simple constructor to use when creating a view from code.
   *
   * @param context The Context the view is running in, through which it can
   *                access the current theme, resources, etc.
   */
  public TMapBridgeView(Context context, TMapView mapView) {
    super(context);
    this.addView(mapView);
  }
}
