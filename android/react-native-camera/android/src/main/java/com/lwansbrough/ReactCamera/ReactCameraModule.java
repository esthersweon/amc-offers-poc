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
    private CameraInstanceManager cameraInstanceManager;
    
    public static final int MEDIA_TYPE_IMAGE = 1;
    public static final int MEDIA_TYPE_VIDEO = 2;

    private static final String TAG = "ReactCameraModule";
    private static final int QUALITY_SETTING = CamcorderProfile.QUALITY_LOW;
    private boolean isRecording;
    private Camera mCamera;
    private MediaRecorder mMediaRecorder;

    public ReactCameraModule(ReactApplicationContext reactContext, CameraInstanceManager cameraInstanceManager) {
        super(reactContext);
        this.reactContext = reactContext;
        this.cameraInstanceManager = cameraInstanceManager;
    }

    @Override
    public String getName() {
        return TAG;
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
    public void capturePicture(ReadableMap options, final Callback callback) {
        Camera camera = cameraInstanceManager.getCamera(options.getString("type"));
        camera.takePicture(null, null, new PictureTakenCallback(options, callback, reactContext));
    }

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

    @ReactMethod
    public void captureVideo(ReadableMap options, final Callback callback) {
        mCamera = cameraInstanceManager.getCamera(options.getString("type"));

        Log.d(TAG, "isRecording : " + isRecording);
        if (isRecording) {
            new MediaStopTask(callback).execute(null, null, null);
        } else {
            String directory = options.getString("directory");
            new MediaPrepareTask(directory, callback).execute(null, null, null);
        }
    }

    /**
     * Asynchronous task for stopping the {@link android.media.MediaRecorder}
     */
    class MediaStopTask extends AsyncTask<Void, Void, Boolean> {
        Callback callback;

        public MediaStopTask(Callback callback) {
            this.callback = callback;
        }

        @Override
        protected Boolean doInBackground(Void... voids) {
            try {
                Log.d(TAG, "MediaRecorder STOP");
                mMediaRecorder.stop();
                Log.d(TAG, "MediaRecorder RELEASE");
                releaseMediaRecorder();
                return true;
            } catch (RuntimeException stopException) {
                Log.d(TAG, "MediaRecorder error :" + stopException);
                releaseMediaRecorder();
                return false;
            }
        }

        @Override
        protected void onPostExecute(Boolean success) {
            if (success) {
                isRecording = false;
                callback.invoke("RECORDING_STOPPED");
                // MainActivity.this.finish(); ???
            }
        }
    }

    /**
     * Asynchronous task for preparing the {@link android.media.MediaRecorder}
     */
    class MediaPrepareTask extends AsyncTask<Void, Void, Boolean> {
        Callback callback;
        String directory;

        public MediaPrepareTask(String directory, Callback callback) {
            this.directory = directory;
            this.callback = callback;
        }

        @Override
        protected Boolean doInBackground(Void... voids) {
            if (prepareVideoRecorder(directory)) {
                Log.d(TAG, "MediaRecorder START");
                mMediaRecorder.start();
            } else {
                Log.d(TAG, "MediaRecorder NOT PREPARED");
                releaseMediaRecorder();
                callback.invoke("RECORDING_ERROR");
                return false;
            }
            return true;
        }

        @Override
        protected void onPostExecute(Boolean success) {
            if (success) {
                isRecording = true;
                callback.invoke("RECORDING_STARTED");
                // MainActivity.this.finish(); ???
            }
        }
    }

    private boolean prepareVideoRecorder(String directory){
        mCamera.setDisplayOrientation(90);

        mMediaRecorder = new MediaRecorder();

        // Step 1: Unlock and set camera to MediaRecorder
        mCamera.lock();
        mCamera.unlock();
        mMediaRecorder.setCamera(mCamera);

        // Step 2: Set sources
        mMediaRecorder.setAudioSource(MediaRecorder.AudioSource.CAMCORDER);
        mMediaRecorder.setVideoSource(MediaRecorder.VideoSource.CAMERA);

        // Step 3: Set a CamcorderProfile (requires API Level 8 or higher)
        mMediaRecorder.setProfile(CamcorderProfile.get(QUALITY_SETTING));

        mMediaRecorder.setOrientationHint(90);

        // Step 4: Set output file
        mMediaRecorder.setOutputFile(getOutputMediaFile(MEDIA_TYPE_VIDEO, directory).toString());

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

    public static boolean isExternalStorageWritable() {
        String state = Environment.getExternalStorageState();
        if (Environment.MEDIA_MOUNTED.equals(state)) {
            return true;
        } else {
            return false;
        }
    }

    // Create a File for saving an image or video
    private static File getOutputMediaFile(int type, String directory){
        if (isExternalStorageWritable()) {
            Log.d(TAG, "SDCard is mounted.");

            File mediaStorageDir = new File(Environment.getExternalStoragePublicDirectory(
                Environment.DIRECTORY_PICTURES), directory);

            // Create the storage directory if it does not exist
            if (! mediaStorageDir.exists()){
                if (! mediaStorageDir.mkdirs()){
                    Log.d(TAG, "Failed to create picture directory.");
                    return null;
                } 
            } else {
                Log.d(TAG, "Picture directory already exists.");
            }

            // Create a media file name
            String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            File mediaFile;
            if (type == MEDIA_TYPE_IMAGE){
                Log.d(TAG, "Storing IMAGE FILE");
                mediaFile = new File(mediaStorageDir.getPath() + File.separator + "IMG_"+ timeStamp + ".jpg");
            } else if(type == MEDIA_TYPE_VIDEO) {
                Log.d(TAG, "Storing VIDEO FILE");
                mediaFile = new File(mediaStorageDir.getPath() + File.separator + "VID_"+ timeStamp + ".mp4");
            } else {
                return null;
            }

            return mediaFile;
        }
        Log.d(TAG, "SDCard is not mounted.");
        return null;
    }

    private void releaseMediaRecorder(){
        if (mMediaRecorder != null) {
            mMediaRecorder.reset();
            mMediaRecorder.release();
            mMediaRecorder = null;
            mCamera.lock();
        }
    }
}