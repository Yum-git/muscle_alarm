import React, {useEffect, useRef, useState} from "react";
import ml5 from "ml5";
import useInterval from "@use-it/interval";

import 'styles/pose.scss';
import {makeStyles} from "@material-ui/core/styles";
import {Button, CircularProgress, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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
    }
}));


const Train = () => {
    // css in js
    const classes = useStyles();

    // useRef
    const videoRef = useRef();
    const canvasRef = useRef();

    // hooks state
    const [loaded, setLoaded] = useState(false);
    const [brainState, setBrainState] = useState(false);
    const [target, setTarget] = useState('default');

    // 描画関数
    const CanvasOutput = (poses) => {
        const context = canvasRef.current.getContext('2d');

        // 初期化
        context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

        // point描画
        try{
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
            }
        }
        catch (e){
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
    }

    // データ追加の起動関数
    const dataAddPlay = (input_target) => {
        setTarget(input_target);
        console.log("5sec Wait");
        setTimeout(() => {
            console.log("Start 10sec dataTrain", input_target);
            setBrainState(true);
            setTimeout(() => {
                console.log("Stop dataTrain!", input_target);
                setBrainState(false);
            }, 10000);
        }, 5000);
    }

    // データの追加関数
    const dataAdd = (poses) => {
        // point描画
        try{
            let inputs = [];
            let key_target = [target];
            for(let value of poses[0].pose.keypoints){
                inputs.push(value.position.x);
                inputs.push(value.position.y);
            }
            if(brainState){
                brain.addData(inputs, key_target);
            }
        }
        catch (e){
        }
    };

    // データ保存
    const dataSave = () => {
        brain.saveData('save_data.json', () => {
            console.log("saveData!!");
        });
    };

    // データ読み込み
    const dataLoad = () => {
        brain.loadData('save/save_data.json', () => {
            console.log("LoadData!!");
        });
    }

    // データ学習
    const dataTraining = () => {
        // 学習データロード
        brain.loadData('save/pushup.json', () => {
            console.log('Load json!');

            // 正則化&トレーニング
            brain.normalizeData();
            brain.train({epoch: 50, batchSize: 32}, () => {
                console.log("model trained");
                brain.save();
            });
        });
    }

    useEffect(() => {
        videoPlay();
    }, []);

    useInterval(() => {
        if(loaded){
            // canvasに描画する関数
            CanvasOutput(poses);
        }
        if(brainState){
            dataAdd(poses);
        }
    }, 10);

    return(
        <div className="Train-Container">
            <div className={classes.root}>
                <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1">
                            {target} : {brainState ?
                                'training!!' :
                                'not training!!'
                            }
                        </Typography>
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
                            1. Start PoseNet
                        </Button>
                        <Button onClick={() => dataAddPlay('Up')} variant="outlined" color="primary">
                            2a. Up
                        </Button>
                        <Button onClick={() => dataAddPlay('Down')} variant="outlined" color="primary">
                            2b. Down
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={dataSave} variant="outlined" color="primary">
                            3. DataSave
                        </Button>
                        <Button onClick={dataLoad} variant="outlined" color="primary">
                            4. DataLoad
                        </Button>
                        <Button onClick={dataTraining} variant="outlined" color="primary">
                            5. DataTraining
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Train;