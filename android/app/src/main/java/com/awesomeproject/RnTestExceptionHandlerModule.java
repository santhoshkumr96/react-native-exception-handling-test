

package com.awesomeproject;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.*;
import com.facebook.react.bridge.*;
import android.util.Log;
import android.app.Activity;

public class RnTestExceptionHandlerModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RnTestExceptionHandlerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RnTestExceptionHandler";
  }

  @ReactMethod
  public void callFromJavaScript() throws Exception {
    // if(getCurrentActivity()!= null) {
    //   System.out.println("get current activity from somehwere");
    //   String jsonString = new com.google.gson.Gson().toJson(getCurrentActivity());
    //   System.out.println(jsonString);
    // } else {
    //   System.out.println("get current activity from nowhere");
    // }


    Activity activity = getCurrentActivity();
    Log.d("after activity line 1" , "something");
    MainApplication application = (MainApplication) activity.getApplication();
    Log.d("after activity line 2" , "something");
    ReactNativeHost reactNativeHost = application.getReactNativeHost();

    Log.d("after activity line 3" , "something");
    ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
    Log.d("after activity line 4" , "something");
    ReactContext reactContext = reactInstanceManager.getCurrentReactContext();


    Log.d("after getting current acitivty" , "something");

    if(reactContext != null){
        System.out.println("before if condition");
        CatalystInstance catalystInstance = reactContext.getCatalystInstance();
        WritableNativeArray params = new WritableNativeArray();
        params.pushString("Message to show using nameOfJsMethod");
        catalystInstance.callFunction("JavaScriptVisibleToJava", "nameOfJsMethod", params);
        System.out.println("after if condition");
    }

   
  }

  @ReactMethod
  public void raiseTestNativeError() throws Exception {
    throw new Exception("TEST EXCEPTION ON ANDROID");
  }
}
