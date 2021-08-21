#import <Foundation/Foundation.h>

#import "React/RCTViewManager.h"
@interface
RCT_EXTERN_MODULE(TMapBridgeViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(zoom, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(clatitude, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(clongitude, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(markerdata, NSArray)
RCT_EXPORT_VIEW_PROPERTY(dlatitude, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(dlongitude, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(routesdata, NSArray)
@end
