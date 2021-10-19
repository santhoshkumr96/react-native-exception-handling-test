package com.awesomeproject;

import com.masteratul.exceptionhandler.NativeExceptionHandlerIfc;
import android.util.Log;
import okhttp3.*;
import java.io.*;
import java.lang.Thread;
import com.facebook.react.*;
import com.facebook.react.bridge.*;
import android.app.Activity;
// extends ReactContextBaseJavaModule
public class ExceptionHandler  implements NativeExceptionHandlerIfc   {

    // @Override
    // public String getName() {
    //     return "ActivityStarter";
    // }

    // public ExceptionHandler(Object... parameters){
    //     System.out.println("constructor for exception handling");

    //     String jsonString = new com.google.gson.Gson().toJson(parameters);

    //     System.out.println(jsonString);
    // }

    // @ReactMethod
    public void handleNativeException(Thread thread, Throwable throwable, Thread.UncaughtExceptionHandler originalHandler){
        Log.d("exception handle log before thread sleep" , Log.getStackTraceString(throwable));

        // try {
        //     Thread.sleep(3000);
        // } catch (Exception e) {
        //     System.out.println("caught thread exception");
        // }



        


        Log.d("exception handle log after thread sleep" , Log.getStackTraceString(throwable));


        String body = "{\"somedata\":\"erororo\"}";
        // ;
        final RequestBody requestBody = RequestBody.create(MediaType.get("application/json"), body);


        OkHttpClient client = new OkHttpClient();
        
        Request request = new Request.Builder()
                            .url("http://10.0.2.2:3000/")
                            .post(requestBody)
                            .build();

        client.newCall(request)
            .enqueue(new okhttp3.Callback() {

                @Override
                public void onFailure(Call call, IOException e) {
                    Log.e("sendException","fail");
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    Log.e("sendException","success");
                }

            });

        
        Log.d("before getting current acitivty" , "something");


        // try{

        //             // Log.d("after activity line 00" , getCurrentActivity);
        // System.out.println("after activity line 00" + getCurrentActivity());

        // }catch(Exception e ){
        //     System.out.println(e);
        // }



        // if(getCurrentActivity() == null){
        //     System.out.println("get current activity" + getCurrentActivity());
        // }

        // System.out.println("after activity line 1" + getCurrentActivity());


        // Activity activity = getCurrentActivity();
        // Log.d("after activity line 1" , "something");
        // MainApplication application = (MainApplication) activity.getApplication();
        // Log.d("after activity line 2" , "something");
        // ReactNativeHost reactNativeHost = application.getReactNativeHost();

        // Log.d("after activity line 3" , "something");
        // ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
        // Log.d("after activity line 4" , "something");
        // ReactContext reactContext = reactInstanceManager.getCurrentReactContext();


        // Log.d("after getting current acitivty" , "something");

        // if(reactContext != null){
        //     System.out.println("before if condition");
        //     CatalystInstance catalystInstance = reactContext.getCatalystInstance();
        //     WritableNativeArray params = new WritableNativeArray();
        //     params.pushString("Message to show using nameOfJsMethod");
        //     catalystInstance.callFunction("JavaScriptVisibleToJava", "nameOfJsMethod", params);
        //     System.out.println("after if condition");
        // }

       

        // String body = "{\"A\" : \"seomerror\"}";
        // final RequestBody requestBody = RequestBody.create(MediaType.get("application/json"), body);
        // Request builder = new Request.Builder()
        //     .url("http://10.0.2.2:3000/test/")
        //     .build();
        // new OkHttpClient()
        //     .newCall(builder);
            // .enqueue(new okhttp3.Callback() {
            //     @Override
            //     public void onFailure(Call call, IOException e) {
            //         Log.e("sendException","fail");
            //     }
            //     @Override
            //     public void onResponse(Call call, Response response) throws IOException {
            //         Log.e("sendException","success");
            //     }
            // });
        originalHandler.uncaughtException(thread, throwable);
    };
}