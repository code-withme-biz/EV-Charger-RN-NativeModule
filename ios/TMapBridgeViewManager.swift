//
//  TMapBridgeViewManager.swift
//  ChevroletEVChargerModule
//
//  Created by Nikolas Damian Vasconcelos on 2021/05/03.
//

import Foundation

import TMapSDK

@objc(TMapBridgeViewManager)
class TMapBridgeViewManager: RCTViewManager {
  override func view() -> UIView! {
    return TMapBridgeView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
      return true
  }
}
