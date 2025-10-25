import uuid from "uuid";
class Video {
        constructor(id, videoFile, videoName, videoSize ){
            this.id = uuid()
            this.videoFile = videoFile
            this.videoName = videoName
            this.videoSize = videoSize;
        }


        getVideofile() {
            return this.videoFile
        }
        getVideoName () {
            return this.videoName
        }

        getVideoSize() {
            return this.videoSize;
        }

        getVideoId() {
            return this.videoId;
        }
}