import { useState, useEffect } from "react";
import VideoMetadata from "./VideoMetadata";
import SelectVideoFile from "./SelectVideoFile";
import { useUserContext } from "@/providers/UserContext";
import Modal from "../common/Modal";
import CreateHandleModal from "../common/CreateHandleModal";

export default function UploadPage() {
  const [videoFile, setvideoFile] = useState();
  const {toggleHandleModal, primaryProfile, isShowHandleModal} = useUserContext()
  const [test, settest] = useState(true)
  console.log("the selected file", videoFile);

    useEffect(() => {
        if(!primaryProfile){
          toggleHandleModal()
        }
    }, [primaryProfile])
    
  return (
    <div className=" min-h-screen px-2 flex items-center justify-center">
      {videoFile ? (
        <VideoMetadata videoFile={videoFile} setVideoFile={setvideoFile} />
      ) : (
        <SelectVideoFile handleSelectFile={setvideoFile} />
      )}

       <Modal isOpen={isShowHandleModal} closeModal={toggleHandleModal}>
         <CreateHandleModal closeModal={toggleHandleModal} />
       </Modal>
    </div>
  );
}
