package com.lwansbrough.ReactCamera;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.hardware.Camera;

import android.media.MediaRecorder;
import android.media.CamcorderProfile;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;
import java.io.File;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.io.IOException;
import android.os.Bundle;
import android.os.AsyncTask;

import android.util.Base64;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import android.provider.MediaStore.Images.Media;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import java.io.ByteArrayOutputStream;
import java.util.Map;
import java.util.HashMap;

public class ReactCameraModule extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;
    
    public static final int MEDIA_TYPE_IMAGE = 1;
    public static final int MEDIA_TYPE_VIDEO = 2;
    private static final String TAG = "ReactCameraModule";
    private static final int QUALITY_SETTING = CamcorderProfile.QUALITY_LOW;

    public ReactCameraModule(ReactApplicationContext reactContext, CameraInstanceManager cameraInstanceManager) {
        super(reactContext);
        this.reactContext = reactContext;
        this.cameraInstanceManager = cameraInstanceManager;
    }

    @Override
    public String getName() {
        return "ReactCameraModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
            final Map<String, Object> constantsAspect = new HashMap<>();
            constantsAspect.put("stretch", "stretch");
            constantsAspect.put("fit", "fit");
        constants.put("Aspect", constantsAspect);
        return constants;
    }

    @ReactMethod
    public void capture(ReadableMap options, final Callback callback) {
        Camera camera = cameraInstanceManager.getCamera(options.getString("type"));
        camera.takePicture(null, null, new PictureTakenCallback(options, callback, reactContext));
    }

    // NOTE - START CODE THAT BRIAN ADDED
    @ReactMethod
    public void captureVideo(ReadableMap options, final Callback callback) {
        mCamera = cameraInstanceManager.getCamera(options.getString("type"));

        Log.d(TAG, "isRecording : " + isRecording);
        if (isRecording) {
            new Thread("START RECORDER") {
                public void run () {
                    try {
                        Log.d(TAG, "MediaRecorder STOP");

                        mMediaRecorder.stop();  // stop the recording
                        Log.d(TAG, "MediaRecorder RELEASE");
                        releaseMediaRecorder(); // release the MediaRecorder object
                    } catch (RuntimeException stopException) {
                        Log.d(TAG, "MediaRecorder error :" + stopException);
                        // cleanup here
                        
                    }
                }
            }.start();

            // releaseCamera();

            isRecording = false;
            // inform the user that recording has stopped
            callback.invoke("RECORDING_STOPPED");
        } else {
            new MediaPrepareTask(callback).execute(null, null, null);
        }
    }

    /**
     * Asynchronous task for preparing the {@link android.media.MediaRecorder} since it's a long blocking
     * operation.
     */
    class MediaPrepareTask extends AsyncTask<Void, Void, Boolean> {
        Callback callback;

        public MediaPrepareTask(Callback callback) {
            this.callback = callback;
        }

        @Override
        protected Boolean doInBackground(Void... voids) {
            // initialize video camera
            if (prepareVideoRecorder()) {
                // Camera is available and unlocked, MediaRecorder is prepared,
                // now you can start recording
                mMediaRecorder.start();

                isRecording = true;
            } else {
                // prepare didn't work, release the camera
                releaseMediaRecorder();
                // inform user
                callback.invoke("RECORDING_ERROR");
                return false;
            }
            return true;
        }

        @Override
        protected void onPostExecute(Boolean result) {
            if (!result) {
                // TODO what to do here?
                // MainActivity.this.finish();
            }
            // inform the user that recording has started
            callback.invoke("RECORDING_STARTED");
        }
    }

    /** Create a file Uri for saving an image or video */
    private static Uri getOutputMediaFileUri(int type){
        return Uri.fromFile(getOutputMediaFile(type));
    }

    /** Create a File for saving an image or video */
    private static File getOutputMediaFile(int type){
        // To be safe, you should check that the SDCard is mounted
        // using Environment.getExternalStorageState() before doing this.

        File mediaStorageDir = new File(Environment.getExternalStoragePublicDirectory(
                  Environment.DIRECTORY_PICTURES), "MyCameraApp");
        // This location works best if you want the created images to be shared
        // between applications and persist after your app has been uninstalled.

        // Create the storage directory if it does not exist
        if (! mediaStorageDir.exists()){
            if (! mediaStorageDir.mkdirs()){
                // Log.d("MyCameraApp", "failed to create directory");
                return null;
            }
        }

        // Create a media file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        File mediaFile;
        if (type == MEDIA_TYPE_IMAGE){
            mediaFile = new File(mediaStorageDir.getPath() + File.separator +
            "IMG_"+ timeStamp + ".jpg");
        } else if(type == MEDIA_TYPE_VIDEO) {
            mediaFile = new File(mediaStorageDir.getPath() + File.separator +
            "VID_"+ timeStamp + ".mp4");
        } else {
            return null;
        }

        return mediaFile;
    }

    private CameraInstanceManager cameraInstanceManager;
    private boolean isRecording;
    private Camera mCamera;
    private MediaRecorder mMediaRecorder;

    private void releaseMediaRecorder(){
        if (mMediaRecorder != null) {
            mMediaRecorder.reset();   // clear recorder configuration
            mMediaRecorder.release(); // release the recorder object
            mMediaRecorder = null;
            mCamera.lock();           // lock camera for later use
        }
    }

    private void releaseCamera(){
        if (mCamera != null){
            mCamera.release();        // release the camera for other applications
            mCamera = null;
        }
    }

    private boolean prepareVideoRecorder(){
        mCamera.setDisplayOrientation(90);

        mMediaRecorder = new MediaRecorder();

        // Step 1: Unlock and set camera to MediaRecorder
        mCamera.unlock();
        mMediaRecorder.setCamera(mCamera);

        // Step 2: Set sources
        mMediaRecorder.setAudioSource(MediaRecorder.AudioSource.CAMCORDER);
        mMediaRecorder.setVideoSource(MediaRecorder.VideoSource.CAMERA);

        // Step 3: Set a CamcorderProfile (requires API Level 8 or higher)
        mMediaRecorder.setProfile(CamcorderProfile.get(QUALITY_SETTING));

        mMediaRecorder.setOrientationHint(90);

        // Step 4: Set output file
        mMediaRecorder.setOutputFile(getOutputMediaFile(MEDIA_TYPE_VIDEO).toString());

        // Step 5: Set the preview output
        // TODO - nullcheck here
        mMediaRecorder.setPreviewDisplay(cameraInstanceManager.getView().surfaceHolder.getSurface());

        // Step 6: Prepare configured MediaRecorder
        try {
            mMediaRecorder.prepare();
        } catch (IllegalStateException e) {
            Log.d(TAG, "IllegalStateException preparing MediaRecorder: " + e.getMessage());
            releaseMediaRecorder();
            return false;
        } catch (IOException e) {
            Log.d(TAG, "IOException preparing MediaRecorder: " + e.getMessage());
            releaseMediaRecorder();
            return false;
        }
        return true;
    }

    // NOTE - END CODE THAT BRIAN ADDED

    private class PictureTakenCallback implements Camera.PictureCallback {
        ReadableMap options;
        Callback callback;
        ReactApplicationContext reactContext;

        PictureTakenCallback(ReadableMap options, Callback callback, ReactApplicationContext reactContext) {
            this.options = options;
            this.callback = callback;
            this.reactContext = reactContext;
        }

        private Bitmap RotateBitmap(Bitmap original, int deg)
        {
            Matrix matrix = new Matrix();
            matrix.postRotate((float)deg);
            return Bitmap.createBitmap(original, 0, 0, original.getWidth(), original.getHeight(), matrix, true);
        }

        @Override
        public void onPictureTaken(byte[] data, Camera camera) {
            camera.startPreview();

            int cameraOrientation = cameraInstanceManager.getCameraOrientation(camera);

            BitmapFactory.Options bitmapOptions = new BitmapFactory.Options();
            bitmapOptions.inSampleSize = options.getInt("sampleSize");
            Bitmap bitmap = RotateBitmap(BitmapFactory.decodeByteArray(data, 0, data.length, bitmapOptions), -90);

            switch(options.getString("target")) {
                case "base64":
                    ByteArrayOutputStream stream = new ByteArrayOutputStream();
                    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, stream);
                    byte[] byteArray = stream.toByteArray();
                    String encoded = Base64.encodeToString(byteArray, Base64.DEFAULT);
                    callback.invoke(encoded);
                break;
                case "gallery":
                    Media.insertImage(reactContext.getContentResolver(), bitmap, options.getString("title"), options.getString("description"));
                    callback.invoke();
                break;
                case "file":
                    callback.invoke();
                break;
            }
        }
    }
}