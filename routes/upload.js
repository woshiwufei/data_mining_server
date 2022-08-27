const url = "http://localhost:3000";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const connectionPool = require("../util/pool");
// const sendMessage = require("../util/sendMessage");
const timeFormat = require("../util/timeFormat");
const {log} = require("debug");
let fileName = "";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //根据文件类型设置存放的目录，课程视频作为视频需要单独判断并存到课程目录
        if (file.mimetype.indexOf('audio/') !== -1) {
            console.log(file.mimetype, "audio")
            cb(null, 'public/uploads/audios')
        } else if (file.mimetype.indexOf('image/') !== -1) {
            console.log(file.mimetype, "image")
            cb(null, 'public/uploads/images')
        } else if (file.mimetype.indexOf('video/') !== -1 && req.url === '/course') {
            // console.log(req, req.url);
            //如果请求路径包含course表示上传的是课程视频，需要放到courses目录
            // if (req.url === '/course'){
            console.log(file.mimetype, "course_video")
            cb(null, 'public/uploads/courses')
            // } else{
            //   console.log(file.mimetype, "video")
            //   cb(null, 'public/uploads/videos')
            // }
        } else if (file.mimetype.indexOf("video/") !== -1 && req.url !== '/course') {
            console.log(file.mimetype, "video")
            cb(null, 'public/uploads/videos')
        } else {
            console.log(file.mimetype, "other")
            cb(null, 'public/uploads/otherFiles')
        }

    },
    filename: function (req, file, callback) {
        if (req.url === '/course') {
            // let {course_name} = req.body;
            // fileName = course_name;
            callback(null, fileName);
        } else {
            let {filename} = req.body
            console.log(filename);
            // fileName = `${Date.now()}-${file.originalname}`;
            fileName = `${Date.now()}-${filename}`;
            callback(null, fileName);
        }
    },
});
const upload = multer({storage: storage});

// 本函数流程：1.进行类型判断确定上传的文件夹并上传，返回上传的目录路径；2.再进行打印已经send数据
router.post("/image", upload.single("file"), function (req, res, next) {
    res.send({
        imgUrl: `${url}/${req.file.destination}/${fileName}`,
        status: 200,
    });
});

router.post("/video", upload.single("file"), function (req, res, next) {
    res.send({
        videoUrl: `${url}/${req.file.destination}/${fileName}`,
        status: 200,
    });
});

router.post("/audio", upload.single("file"), function (req, res, next) {
    res.send({
        audioUrl: `${url}/${req.file.destination}/${fileName}`,
        status: 200,
    });
});

router.post("/file", upload.single("file"), async function (req, res, next) {
    // let {size, path, mimetype, filename} = req.file
    let {size, path, mimetype} = req.file
    let {filename, upload_time} = req.body
    // let upload_time = new Date().toLocaleString()
    let result = await connectionPool.query('insert into file (file_size, file_path, file_type, file_name, user_id, upload_time) values (?, ?, ?, ?, 1, ?)',
        [size, path, mimetype, filename, upload_time]).catch(error => error)

    if(result.errno){
        res.status(500).send({
            status: 'error',
            msg: '出错啦...请稍候重试！',
            ...result
        })
    } else if(result.affectedRows){
        res.send({
            fileURL: `${url}/${req.file.destination}/${fileName}`,
            status: 'success',
            msg: '文件上传成功！'
        });
    } else {
        res.send({
            status: 'error',
            msg: '文件上传失败！',
            ...result
        });
    }



});

router.post("/course", upload.single("file"), function (req, res, next) {
    res.send({
        courseUrl: `${url}/${req.file.destination}/${fileName}`,
        status: 200,
    });
});

//
module.exports = router;
