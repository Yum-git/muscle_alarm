import * as ml5 from "ml5";

const Alarm = () => {
    const video_test = () => {
        const video = document.getElementById('video');

        // Create a new poseNet method
        const poseNet = ml5.poseNet(video, modelLoaded);

        // When the model is loaded
        function modelLoaded() {
            console.log('Model Loaded!');
        }
        // Listen to new 'pose' events
        poseNet.on('pose', (results) => {
            if(results.length > 0){
                // console.log(results);
                DrawCanvas(results);
            }
        });
    }

    const DrawCanvas = (poses) => {
        const video = document.getElementById('video');
        let canvas = document.getElementById('canvas');
        let w = video.clientWidth;
        let h = video.clientHeight;

        const ctx = canvas.getContext('2d');

        canvas.height = h;
        canvas.width = w;

        console.log(poses);
        return
        for(const pose of poses){
            let pose_1 = pose.skeleton;
            for(const pose_detail of pose_1){
                for(const pose_data of pose_detail){

                    console.log(pose_data);
                    break
                    // ctx.fillRect(pose_data.position.x, pose_data.position.x, 10, 10);
                }
            }
        }
    }

    const webrtc_run = () => {
        let video = document.getElementById('video');
        let localstream = null;

        navigator.mediaDevices.getUserMedia({video: true, audio: false})
            .then((stream) => {
                localstream = stream;
                video.srcObject = localstream;
            })
            .catch((error) => {
                console.error(error);
                return;
            })
    }

    return(
        <div className="Alarm">
            <p>
                This is Alarm page!!
            </p>
            <div className="videoContainer">
                <video id="video" autoPlay muted />
                <canvas id="canvas"></canvas>
            </div>
            <button onClick={video_test}>aa</button>
            <button onClick={webrtc_run}>aaaaa</button>
        </div>
    )
}
export default Alarm;