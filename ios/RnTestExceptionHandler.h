//
//  RnTestExceptionHandler.h
//  AwesomeProject
//
//  Created by santhosh kumar on 19/10/21.
//

//#ifndef RnTestExceptionHandler_h
//#define RnTestExceptionHandler_h

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RnTestExceptionHandler : NSObject <RCTBridgeModule>

@end
