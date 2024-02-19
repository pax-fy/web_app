

//@ts-nocheck
import { useRef, useState, useEffect, useMemo } from "react";
//import { Contract } from "crossbell";
import {
  generateVideoThumbnailViaUrl,
  generateVideoThumbnails,
  importFileandPreview,
} from "@rajesh896/video-thumbnails-generator";
import { toast, useToast } from "../ui/use-toast";
//const contract = new Contract(window.ethereum)
import { LIVEPEER_KEY } from "@/assets/constant";
//import { usePostVideo } from "@/hooks/usePostVideo";
//import { usePostNote } from "@crossbell/connect-kit";
import { usePinToIpfs } from "@/hooks";
import { useCreateAsset } from "@livepeer/react";
//import { useContract } from "@crossbell/contract";
//import { useAccountCharacter } from "@crossbell/connect-kit";
import { ClipLoader } from "react-spinners";
import { ThumbnailsLoadingSpinner } from "../skeletons";
import { Progress } from "@radix-ui/react-progress";
//import { ipfsLinkToHttpLink } from "@/helpers";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Switch } from "../ui/switch";
import { ethers, Contract } from "ethers";
import Button from "../common/Button";
import { useGetUserProfiles } from "@/hooks/useGetUserProfiles";
import { APP_ID, SHORT_APP_ID } from "@/assets/constant";
import { useUserContext } from "@/providers/UserContext";
import { contractAddress } from "@/assets/constant";
import ABI   from '../../abi/paxfy.json'
console.log(" ", LIVEPEER_KEY);
export default function VideoMetadata({ videoFile , setVideoFile  }: any) {
  const [videoTitle, setvideoTitle] = useState("");
  const [vidDuration, setvidDuration] = useState()
  const [caption, setcaption] = useState("");
  const [videoTags, setVideoTags] = useState([]);
  const [isShortClip, setisShortClip] = useState(false)
  const [videoTag, setvideoTag] = useState("");
  const [isSenstive, setisSensitive] = useState("no");
  const [videoThumnail, setvideoThumnail] = useState();
  const [selectedThumbnail, setselectedThumbnail] = useState();
  const [pointedThumbail, setpointedThumbail] = useState();
  const [isGeneratingThumbnails, setisGeneratingThumbnails] = useState(true);
  const [videoThumbnails, setvideoThumbnails] = useState([]);
  const [videoUrl, setvideoUrl] = useState("");
  const [isUploadingCover, setisUploadingCover] = useState(false);
  const [isVideoUploading, setisVideoUploading] = useState(false);
  const [isCreatingNote, setisCreatingNote] = useState(false);
  const [trueTest, settrueTest] = useState(true);
  const [isNotCreated, setisNotCreated] = useState(false);
  const [coverCID, setcoverCID] = useState();
  const { uploadToIpfs, isUploading, isUploadingError } = usePinToIpfs();

  const { width, height } = useWindowSize()
const [testTruth, settestTruth] = useState(true)
   const  {userAddress, userProfile, primaryProfile, signer} = useUserContext()
   const {data, loading, error: fetchErrors} = useGetUserProfiles(userAddress)

  console.log("the user address", primaryProfile?.id)

    const toggleTruthTest = () => {
      settrueTest(! trueTest)
    }
  // const {postVideo} = usePostVideo()
  const selectThumbnailRef = useRef(null);
  // console.log("thumbnails ", videoThumbnails)
  //
  const addTag = (event: any) => {
    if (event.key === "Enter" && videoTag.length > 1 && videoTags.length < 5) {
      setVideoTags([...videoTags, videoTag]);
      setvideoTag("");
    }
  };

   console.log("uploading error", isUploadingError)

  //Remove  tag
  const removeTag = (index : any) => {
    setVideoTags([
      ...videoTags.filter((tags) => videoTags.indexOf(tags) !== index),
    ]);
  };

  /*
   =========================
   UPLOD VIDEO THUMBNAIL
   ==========================
   */
  const handleUploadThumbnail = async () => {
    if (selectedThumbnail || videoThumbnails) {
      const base64ToBlob = (base64String, type) => {
        try {
          const byteCharacters = atob(base64String);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          return new Blob([byteArray], { type: type });
        } catch (error) {
          if (error.name === "InvalidCharacterError") {
            console.error("Invalid base64 string:", base64String);
            return null;
          } else {
            throw error;
          }
        }
      };

      // UPLOAD_VIDEO_COVER_TO_IPFS

      setisUploadingCover(true);
      const jpegBlob = base64ToBlob(
        selectedThumbnail?.replace(/^data:image\/(png|jpeg|jpg);base64,/, "") ||
          videoThumbnails[0]?.replace(
            /^data:image\/(png|jpeg|jpg);base64,/,
            ""
          ),
        "image/png"
      );
      const videoCoverCID = await uploadToIpfs(jpegBlob);
      console.log("the image cid", videoCoverCID);
      setcoverCID(videoCoverCID?.path);
      setisUploadingCover(false);
    }
  };

  useEffect(() => {
    handleUploadThumbnail();
  }, [selectedThumbnail, videoThumbnails]);

  /* 
    ===============================
        END OF UPLOAD THUMBNAIL 
    ================================
    */

  /*
     ===============================
       GENERATE VIDEO  THUMBNAILS
     ==============================
     
     */

  useEffect(() => {
    if (videoFile) {
      importFileandPreview(videoFile).then((res) => {
        setvideoUrl(res);
      });
      generateVideoThumbnails(videoFile, 6)
        .then((res) => {
          setvideoThumbnails(res);
          setisGeneratingThumbnails(false);
          //setvidThunbnail(videoThumbnails[0])
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [videoFile]);

  console.log('is short clip', isShortClip)
  /*
=========================
CHECK VIDEO  DURATION
============================

  */
  
  const getVideoDuration = (file: any) => {
    return new Promise((resolve) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        resolve(video.duration)
      }

      const objectUrl = URL.createObjectURL(file)
      video.src = objectUrl
    })
  }

  const getTheVideoDuration = async () => {
    if (videoFile) {
      const videoDuration = await getVideoDuration(videoFile)
      setvidDuration(videoDuration)
    }
  }

  console.log('the video duration here', vidDuration)

  useEffect(() => {
    getTheVideoDuration()
  }, [videoFile])

  /*
     ===========================================
      END OF  GENERATE VIDEO  THUMBNAILS
     ========================================
     
     */

  /*
     ===============================
       RESET FORM FUNCTION
     ==============================
     
     */

  const handleReset = () => {
    setvideoTitle("");
    setcaption("");
    setVideoTags([]);
    setVideoFile();
    setselectedThumbnail();
  };

  /*
     ===============================
       END OF RESET FUNCTION
     ==============================
     
     */

  /*
     ==================================
       LIVEPEER HOOK TO UPLOAD FILE
     ====================================
     
     */
  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
    isLoading,
  } = useCreateAsset(
    videoFile
      ? {
          sources: [
            {
              name: videoFile.name,
              file: videoFile,
              storage: {
                ipfs: true,
                metadata: {
                  name: "interesting video",
                  description: "a great description of the video",
                },
              },
            },
          ] as const,
        }
      : null
  );

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress]
  )

  console.log("the progress of video", progress);
  console.log("the assets itsell", assets);
  console.log("the error when posting", error);

  /*
     ===========================================
       END OF LIVEPEER HOOK TO UPLOAD FILE
     ===========================================
     
     */
  /*
     ===============================
       CROSSBELL CONTRACT INSTACNCE
     ==============================
     
     */

  /*
     ======================================
      END OF CROSSBELL CONTRACT INSTANCE
     ======================================
     
     */

  /*
     ===============================
       UPLOAD VIDEO FUNCTION
     ==============================
     */
  const postVideo = async () => {
    //UPLOAD_VIDEO_TO_LIVEPEER
    setisVideoUploading(true);
    await createAsset();
    setisVideoUploading(false);
  };
  /*
     ===============================
       END UPLOAD VIDEO FUNCTION
     ==============================
     */
  /*
     ======================================
       POST_VIDEO AS NOTE TO CROSSBELL
     =======================================
     */
  const handleCreateNote = async () => {

       const videoMetadata = {
        title: videoTitle,
      content: caption,
      tags: "video tags",
      source:  isShortClip ? SHORT_APP_ID : APP_ID,
      cover: coverCID,
       media: assets[0]?.playbackId,
       mediaAddress: assets[0]?.playbackId,
      mime_type: "DEMO CONTENT",
        
      
    }

    const  contract = new Contract(contractAddress, ABI, signer)
    try{
      setisCreatingNote(true);
        // CREATING NOTE  FUNCTION
        
     /* const result = await postNote.mutate({
        metadata : {
        title: videoTitle,
        content: caption,
        tags: videoTags,
        sources: isShortClip ? [SHORT_APP_ID] : [APP_ID],
        attachments: [
          {
            name: coverCID,
            address: assets[0]?.playbackId,
            alt: videoTitle,
            mime_type: videoFile?.type,
          },
        ],
      }});*/
  
      const ipfsCID = await uploadToIpfs(JSON.stringify(videoMetadata))
      console.log("the ipfs cid", ipfsCID)
      const fakeLinkModuleInitData = "0x7374617274696e675f6279746533320000000000000000000000000000000000"; // Adjust as needed

      const createVideoData = {
        characterId: primaryProfile?.id, 
        contentUri:  ipfsCID?.path,
        linkModule: "0x0000000000000000000000000000000000000000", // Use zero address for now
        linkModuleInitData: fakeLinkModuleInitData, 
        mintModule: "0x0000000000000000000000000000000000000000", // Use zero address for now
        mintModuleInitData: fakeLinkModuleInitData
     
      };

      const transaction = await contract?.postNote(createVideoData);
    await transaction.wait();
    setisNotCreated(true);
    setisCreatingNote(false);
    console.log("Character created successfully!");
    console.log("Character created  here is the tx id", transaction);
        
      console.log("the note results", result);
  
     
        /* =====================
        TODO
         Direct  the  creator to  video  page
        ====================*/
        toast({
          title : "video uploaded",
          description : "video uploaded succefully "
        })
  
        
      } catch (error) {
         /* =====================
        TODO
        TOASTIFY THE ERROR
        ====================*/
        console.log( error)
     
      }
    };
       
    

  useEffect(() => {
    if (status === "success" && !isNotCreated) {
      handleCreateNote();
    }
  }, [status]);

  /*
     ======================================
       END POST_VIDEO AS NOTE TO CROSSBELL
     =======================================
     */

  /*
     ======================================
       GET CURRENT  UPLOADING STATE
     =======================================
     */
  const getCurrentUploadingState = () => {
    if (status === "loading") {
      return "Uploading Video";
    } else if (isCreatingNote) {
      return "Posting Video";
    } else {
      return "Post Video";
    }
  };

  /*
     ======================================
      END OF  GET CURRENT  UPLOADING STATE
     =======================================
     */

  return (
    <div className="  flex  xs:flex-col md:flex-row gap-3 items-center justify-center relative">
      { isShortClip && vidDuration > 180 && (
          <div className='absolute top-2'>
            <h3 className='  text-center font-semibold text-red-600 md:text-xl'>
              Video is too long. Please choose a video shorter than 3 minutes.
            </h3>
          </div>
        )}
<div className="flex-1  h-full  px-3">
        <div className="z-0  ">
          <video
            width={500}
            controls
            className={`rounded-xl ${isShortClip && "w-[400px]"} max-w-[450px] max-h-[450px] `}
            poster={selectedThumbnail}
          >
            <source src={ videoFile && URL?.createObjectURL(videoFile)} />
          </video>
        </div>

        <div className="my-4 ">
          <h1 className="opacity-75 text-sm my-3">THUMBNAILS</h1>
          <div className="flex flex-wrap gap-3">
            <div className="w-[120px] h-[70px] border border-gray-300 flex flex-col items-center justify-center rounded-xl">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setvideoThumnail(e.target.files[0])}
                ref={selectThumbnailRef}
                hidden
              />
              {videoThumnail ? (
                <img
                  src={URL.createObjectURL(videoThumnail)}
                  className="w-[100%] h-[100%] object-cover rounded-md"
                />
              ) : (
                <>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" 
   onClick= {() => {
    selectThumbnailRef.current.click();
  }}
  />
</svg>

                  <h1 className="text-xs opacity-60">Upload</h1>
                </>
              )}
            </div>

            {isGeneratingThumbnails && (
              <div className="flex gap-2 items-center">
                {" "}
               {/* <ClipLoader size={19} /> <p>Loading Thambnails</p>{" "}*/}
               <ThumbnailsLoadingSpinner  />
              </div>
            )}
            {videoThumbnails?.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`w-[120px] h-[70px] cursor-pointer rounded-xl ${
                    pointedThumbail === i && "ring-2 ring-blue-700 rounded-xl"
                  } relative `}
                  onClick={() => {
                    setselectedThumbnail(item);
                    setpointedThumbail(i);
                  }}
                >
                  <img
                    src={item}
                    key={i}
                    className="rounded-xl w-full h-full object-cover"
                  />
                  {/*<div>
                          <h1 className='absolute top-[50%] left-[50%] right-[50%]'>loading</h1>
                      </div>*/}
                </div>
              );
            })}
          </div>
        </div>

      </div>
        
      <div className="flex-1 h-full px-4 py-2 mb-7 md:mb-0">
        <div className="flex flex-col gap-2 mb-3">
          <h1 className="opacity-75 text-sm">TITLE</h1>
          {isNotCreated && (
                <Confetti
                width={width}
                height={height}
              />
          )}
      
          <input
            value={videoTitle}
            onChange={(e) => setvideoTitle(e.target.value)}
            placeholder="Title that describes Your video"
            className="py-2 px-4 focus:outline-none border dark:border-gray-700 rounded-xl placeholder:text-sm dark:placeholder:text-gray-600 border-gray-300 bg-inherit focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <h1 className="opacity-75 text-sm">DESCRIPTION</h1>
          <textarea
            value={caption}
            onChange={(e) => setcaption(e.target.value)}
            placeholder="Description of your video"
            className="h-32 py-2 px-4 focus:outline-none border rounded-xl placeholder:text-sm dark:placeholder:text-gray-600 dark:border-gray-800 border-gray-300 bg-inherit focus:border-blue-500 resize-none"
          />
        </div>
        <div className="border border-gray-300 dark:border-gray-700 rounded-xl h-32 px-4 py-2 my-3">
          <h1 className="opacity-75 text-sm">TAGS</h1>
          <input
            value={videoTag}
            onChange={(e) => setvideoTag(e.target.value)}
            placeholder="Eg Music"
            onKeyUp={(event) => addTag(event)}
            className="focus:outline-none border border-gray-200 dark:border-gray-800 px-4 bg-inherit rounded-xl placeholder:text-sm dark:placeholder:text-gray-600 h-9 py-1 w-full"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {videoTags?.map((tag, i) => (
              <div
                className="flex bg-blue-600 opacity-70 py-1 px-4 rounded-md items-center text-white gap-2"
                key={i}
              >
                <p>{tag}</p>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"    onClick={() => removeTag(i)}/>
</svg>

              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
         
          <h1 className="opacity-90">
            Does this video contain sensitive information that targets an adult
            audience?
          </h1>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isSensitive"
                value="yes"
                checked={isSenstive === "yes"}
                className="bg-inherit"
                onChange={() => setisSensitive("yes")}
              />
              Yes
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isSensitive"
                value="no"
                className="bg-inherit"
                checked={isSenstive === "no"}
                onChange={() => setisSensitive("no")}
              />
              No
            </label>
          </div>
        
        </div>
        <div className="flex flex-col gap-3 my-5">
         
         <h1 className="opacity-90">
          is short video ?
         </h1>
         <div className="flex gap-4">
           <label className="flex items-center gap-2 cursor-pointer">
             <input
               type="radio"
               name="isShortClip"
               value={false}
               checked={isShortClip === true}
               className="bg-inherit"
               onChange={() => setisShortClip(!isShortClip)}
             />
             Yes
           </label>
           <label className="flex items-center gap-2 cursor-pointer">
             <input
               type="radio"
               name="isShortClip"
               value={false}
               className="bg-inherit"
               checked={isShortClip === false}
               onChange={() => setisShortClip(! isShortClip)}
             />
             No
           </label>
         </div>
       
       </div>
         
        <div className="flex gap-4  my-4 text-sm w-full  px-3 justify-between border-t dark:border-border-gray py-3">
        
          <Button onClick={handleReset}
            variant={`transparent`}
          >Reset</Button>
          {/*}
          <div
            className="bg-black rounded-xl text-white dark:bg-white dark:text-black font-semibold px-4 py-1.5 xl:py-2  flex items-center gap-2 cursor-pointer"
            onClick={postVideo}
          >
            <ClipLoader size={15} loading={isLoading || isCreatingNote} className="text-white dark:text-black"
             color="#e11d48"
            />
            <button className=" font-semibold   rounded-lg">
              {getCurrentUploadingState()}
            </button>
          </div>
            */}
           <Button className="w-3/4"
            disabled={isShortClip && vidDuration > 180 || isLoading || isCreatingNote}
            isLoading={isLoading || isCreatingNote}
            loadingText={isLoading ? progressFormatted : "Posting video"}
            onClick={() => postVideo()}
           >
            {isLoading ? progressFormatted :  "Post video"}
           </Button>

          
        </div>
      </div>
    
    </div>
  );
}