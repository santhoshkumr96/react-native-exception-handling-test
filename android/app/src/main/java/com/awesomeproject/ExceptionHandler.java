package com.awesomeproject;

import com.masteratul.exceptionhandler.NativeExceptionHandlerIfc;
import android.util.Log;


public class ExceptionHandler implements NativeExceptionHandlerIfc{
    public void handleNativeException(Thread thread, Throwable throwable, Thread.UncaughtExceptionHandler originalHandler){
        Log.d("exception handle log" , throwable.getMessage());
        // originalHandler.uncaughtException(thread, throwable);
    };
}