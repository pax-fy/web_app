import { useState } from "react";
import VideoMetadata from "./VideoMetadata";
import SelectVideoFile from "./SelectVideoFile";

export default function UploadPage() {
  const [videoFile, setvideoFile] = useState();
  const [test, settest] = useState(true)
  console.log("the selected file", videoFile);
  return (
    <div className=" min-h-screen px-2 flex items-center justify-center">
      {videoFile ? (
        <VideoMetadata videoFile={videoFile} setVideoFile={setvideoFile} />
      ) : (
        <SelectVideoFile handleSelectFile={setvideoFile} />
      )}
    </div>
  );
}
