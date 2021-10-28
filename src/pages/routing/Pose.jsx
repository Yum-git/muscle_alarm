import React, {useEffect, useRef, useState} from "react";
import ml5 from "ml5";
import useInterval from "@use-it/interval";

import 'styles/pose.scss';
import {makeStyles} from "@material-ui/core/styles";
import {Button, CircularProgress, Typography} from "@material-ui/core";
import {useWindowSize} from "react-use";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Paper from "@material-ui/core/Paper";

let classifier;
let poses;
let brain;

let options = {
    inputs: 34,
    outputs: 2,
    task: 'classification',
    debug: true
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
    },
}));


const Pose = () => {
    // css in js
    const classes = useStyles();

    // useRef
    const videoRef = useRef();
    const canvasRef = useRef();

    // hooks state
    const [loaded, setLoaded] = useState(false);
    const [poseState, setPoseState] = useState();
    const [poseTimeState, setPoseTimeState] = useState(0);

    const [poseCount, setPoseCount] = useState(0.0);
    const [poseType, setPoseType] = useState('default');

    // プッシュ時の効果音 pathで指定
    const push_sound = new Audio('audio/push_2.mp3');

    // 幅のリサイズ用変数　保留
    // const [aspectRation, setAspectRation] = useState(1.25);
    // const { width, height } = useWindowSize();

    // 描画関数
    const CanvasOutput = (poses) => {
        const context = canvasRef.current.getContext('2d');

        // 初期化
        context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

        // point描画
        try{
            let inputs = [];
            for(let value of poses[0].pose.keypoints){
                let position_x = value.position.x;
                let position_y = value.position.y;

                // 精度50%以上でなければ表示しない
                if(value.score > 0.5){
                    context.beginPath();
                    context.arc(position_x, position_y, 5, 0, 2 * Math.PI);
                    context.strokeStyle = "Orange";
                    context.closePath();
                    context.stroke();
                }

                inputs.push(position_x);
                inputs.push(position_y);
            }

            brain.classify(inputs, poseOutput);
        }
        catch (e){
            // console.log("Skip Point!");
        }

        // skeleton描画
        try{
            for(let value of poses[0].skeleton){
                let start_position = value[0].position;
                let end_position = value[1].position;

                context.beginPath();
                context.lineWidth = 2;
                context.moveTo(start_position.x, start_position.y);
                context.lineTo(end_position.x, end_position.y);
                context.closePath();
                context.stroke();
            }
        }
        catch (e){
            // console.log("Skip Skeleton!!")
        }
    }

    // カメラ起動関数
    const videoPlay = () => {
        navigator.mediaDevices
            .getUserMedia({video: true, audio: false})
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            });
    }

    // camara&canvasリサイズ関数
    const resizeForAll = () => {
        // videoRef変更
        videoRef.current.height = videoRef.current.clientHeight;
        videoRef.current.width = videoRef.current.clientWidth;

        // if(videoRef.current.width > width){
        //     videoRef.current.width = width;
        //     videoRef.current.height = width * aspectRation;
        // }

        // videoの大きさにcanvasを合わせる
        canvasRef.current.height = videoRef.current.height;
        canvasRef.current.width = videoRef.current.width;
    }

    // poseNet起動関数
    const poseNetPlay = () => {
        resizeForAll();

        classifier = ml5.poseNet(videoRef.current, () => {
            console.log("PoseNet Loaded!");
            classifier.on('pose', result => {
                poses = result;
            });
            setLoaded(true);
        });

        brain = ml5.neuralNetwork(options);

        const modelInfo = {
            model: 'model/squat_add/model.json',
            metadata: 'model/squat_add/model_meta.json',
            weights: 'model/squat_add/model.weights.bin'
        };

        brain.load(modelInfo, () => {
            console.log('pose classification ready!');
        });
    }

    const poseNetSave  = () => {
        const now = new Date();
        const date_ = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay();
        axios.post("http://localhost:8000/result", {
            "result_name": "Squat",
            "result_count": parseInt(poseCount, 10),
            "result_time": date_
        }, {
            headers: {
                Authorization: `Bearer aiueo`,
            }
        }).then(
            response => {
                console.log(response.data);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );

        setPoseCount(0);
        console.log("Save Count!");
    };

    // ポーズ出力
    const poseOutput = (error, results) => {
        console.log(error);
        try{
            console.log(results);
            if(poseState === results[0].label){
                setPoseTimeState((poseTimeState) => poseTimeState + 20);

                if(500 < poseTimeState && poseType !== poseState){
                    setPoseCount((poseCount) => poseCount + 0.5);
                    setPoseType(poseState);

                    if(!(parseInt(poseCount, 10) === poseCount)){
                        push_sound.play();
                    }
                }
            }else{
                setPoseTimeState(0);
            }
            setPoseState(results[0].label);
        }
        catch (e){

        }
    }

    useEffect(() => {
        videoPlay();
    }, []);

    // useEffect(() => {
    //     if(loaded){
    //         resizeForAll();
    //     }
    //
    //     console.log(width, height);
    // }, [width, height]);

    useInterval(() => {
        if(loaded){
            // canvasに描画する関数
            CanvasOutput(poses);
        }
    }, 20);

    return(
        <div className="Pose-Container">
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <h1>
                                {parseInt(poseCount, 10)} 回
                            </h1>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <h1>
                                {Math.floor(parseInt(poseCount, 10) * 0.4 * 10) / 10}kcal
                            </h1>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="wrapper">
                            {!loaded  &&
                            <CircularProgress className="load-progress" />
                            }
                            <video id="video" ref={videoRef} height="100%" width="100%"  />
                            <canvas className="canvas" ref={canvasRef}  />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={poseNetPlay} variant="outlined" color="secondary">
                            Start Count
                        </Button>
                        <Button onClick={poseNetSave} variant="outlined" color="secondary">
                            Save Count
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Pose;