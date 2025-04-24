import { useState, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Editor from "../page/Editor";

import {
  FaCloudUploadAlt,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
} from "react-icons/fa";

export default function CreateGame() {
  const editorStateRef = useRef(undefined);

  const [gameName, setGameName] = useState("");
  const [gameNameError, setGameNameError] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publisherError, setPublisherError] = useState("");
  const [developer, setDeveloper] = useState("");
  const [developerError, setDeveloperError] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [releaseDateError, setReleaseDateError] = useState("");
  const [source, setSource] = useState([]);
  const [sourceError, setSourceError] = useState("");
  const [fileError, setFileError] = useState("");
  const [editorError, setEditorError] = useState("");
  const [posted, setPosted] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  // const [files, setFiles] = useState([]);

  {
    /* EXAMPLE CODE FOR GAMES TO ADD FILES FOR MEDIA */
  }
  {
    /*------------------------------------------------------------------------------ */
  }
  const exampleFile1 = {
    file: { type: "image/" },
    previewUrl:
      "https://media.contentapi.ea.com/content/dam/walrus/en-gb/migrated-images/2017/04/reveal-swbf2-fb-meta-image-alt.png.adapt.crop191x100.1200w.png", // Example placeholder image URL
  };
  const exampleFile2 = {
    file: { type: "video/mp4" },
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  };

  const [files, setFiles] = useState([exampleFile1, exampleFile2]);
  {
    /*------------------------------------------------------------------------------ */
  }

  const initialConfig = {
    namespace: "MyEditor",
    onError(error) {
      console.error(error);
    },
    editorState: undefined,
  };

  const MAX_DURATION = 240; // Max duration of a video that is added to our post
  const maxLength = 225; // Max length of our section title

  const editorStateContent = editorStateRef.current
    ? editorStateRef.current.toJSON()
    : null;

  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };

  const handlePost = () => {
    if (gameName.length === 0) {
      setGameNameError("This is a required field");
    } else {
      setGameNameError("");
    }

    if (publisher.length === 0) {
      setPublisherError("This is a required field");
    } else {
      setPublisherError("");
    }

    if (developer.length === 0) {
      setDeveloperError("This is a required field");
    } else {
      setDeveloperError("");
    }

    if (releaseDate.length === 0) {
      setReleaseDateError("This is a required field");
    } else {
      setReleaseDateError("");
    }

    if (source.length === 0) {
      setSourceError("This is a required field");
    } else {
      setSourceError("");
    }

    if (
      editorStateRef.current === undefined ||
      editorStateRef.current.toJSON().root.children[0].children.length == 0
    ) {
      setEditorError("Please enter text ");
    } else {
      setEditorError("");
    }

    if (
      gameName.length === 0 ||
      editorStateRef.current === undefined ||
      editorStateRef.current.toJSON().root.children[0].children.length == 0
    ) {
      return;
    }

    const postData = {
      gameName,
      publisher,
      developer,
      releaseDate,
      source,
      files,
      editorStateContent,
    };

    setGameName("");
    setFiles([]);
    setPosted(!posted);
  };

  const getVideo = (file) => {
    return new Promise((resolve, reject) => {
      let video = document.createElement("video");
      const videoUrl = URL.createObjectURL(file);
      video.src = videoUrl;

      video.onloadedmetadata = () =>
        resolve({ videoUrl, duration: video.duration });
      video.onerror = () => reject(new Error("Error loading video"));
    });
  };

  const handleFileChange = async (event) => {
    const validFiles = [...files];
    const newFiles = Array.from(event.target.files);

    setFileError("");

    for (const file of newFiles) {
      if (file.type.startsWith("video/")) {
        try {
          const { videoUrl, duration } = await getVideo(file);

          if (duration > MAX_DURATION) {
            setFileError(
              `"${file.name}" exceeds the maximum allowed duration of ${
                MAX_DURATION / 60
              } minutes.`
            );
            setFiles([]);
            return;
          }
          validFiles.push({
            file: file,
            previewUrl: videoUrl,
          });
        } catch (err) {
          setError(`Error processing "${file.name}".`);
          return;
        }
      } else {
        const imageUrl = URL.createObjectURL(file);
        validFiles.push({
          file: file,
          previewUrl: imageUrl,
        });
      }
    }
    setFiles(validFiles);
  };
  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);

    setFiles(newFiles);

    const safeIndex = Math.max(0, Math.min(currentIndex, newFiles.length - 1));
    setCurrentIndex(safeIndex);

    if (newFiles.length === 0) {
      const input = document.getElementById("fileInput");
      if (input) input.value = null;
    }
  };

  const nextSlide = () => {
    if (currentIndex < files.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedFiles = [...files];
    const draggedItem = updatedFiles.splice(draggedIndex, 1)[0];
    updatedFiles.splice(index, 0, draggedItem);
    setFiles(updatedFiles);
    setDraggedIndex(null);
  };

  return (
    <div className="flex flex-col items-center justify-center relative p-5 lg:p-7">
      <div className=" w-full  max-w-[1250px]  bottom-10 xs:max-w-[85%]  max-h-[50%] relative flex scale-100  sm:scale-90 xs:scale-[90%]  flex-col text-black rounded-lg">
        <h3 className="text-4xl bold-text">Create game</h3>
        <div className="md:min-h-[20%] w-full top-0 xs:min-h-[15.8%] ">
          <textarea
            type="text"
            id="game-name"
            onChange={(e) => {
              setGameName(e.target.value);
              if (e.target.value.trim() === "") {
                setGameNameError("This is a required field");
              } else {
                setGameNameError("");
              }
            }}
            value={gameName}
            maxLength={maxLength}
            className="w-full mt-[30px] max-h-[50px]  lg:max-h-[40%] xs:max-h-[29%] text-black text-2xl xs:text-xl lg:text-2xl bg-gray-100  pl-1  rounded-lg  focus:outline-black resize-none"
            placeholder="Game name"
          />
          <div className="w-full flex justify-between">
            <p className="text-red-500 text-sm lg:text-sm xs:text-xs  md:text-sm min-h-[1rem]">
              {gameNameError || ""}
            </p>
            <span className="text-gray-500 xs:text-xs lg:text-lg md:text-lg sm:text-lg">
              {gameName.length}/{maxLength}
            </span>
          </div>
        </div>

        <div className="md:min-h-[20%] w-full top-0 xs:min-h-[15.8%] ">
          <textarea
            type="text"
            id="publisher"
            onChange={(e) => {
              setPublisher(e.target.value);
              if (e.target.value.trim() === "") {
                setPublisherError("This is a required field");
              } else {
                setPublisherError("");
              }
            }}
            value={publisher}
            maxLength={maxLength}
            className="w-full max-h-[50px]  lg:max-h-[40%] xs:max-h-[29%] text-black text-2xl xs:text-xl lg:text-2xl bg-gray-100  pl-1  rounded-lg  focus:outline-black resize-none"
            placeholder="Publisher"
          />
          <div className="w-full flex justify-between">
            <p className="text-red-500 text-sm lg:text-sm xs:text-xs  md:text-sm min-h-[1rem]">
              {publisherError || ""}
            </p>
            <span className="text-gray-500 xs:text-xs lg:text-lg md:text-lg sm:text-lg">
              {publisher.length}/{maxLength}
            </span>
          </div>
        </div>

        <div className="md:min-h-[20%] w-full top-0 xs:min-h-[15.8%] ">
          <textarea
            type="text"
            id="developer"
            onChange={(e) => {
              setDeveloper(e.target.value);
              if (e.target.value.trim() === "") {
                setDeveloperError("This is a required field");
              } else {
                setDeveloperError("");
              }
            }}
            value={developer}
            maxLength={maxLength}
            className="w-full max-h-[50px]  lg:max-h-[40%] xs:max-h-[29%] text-black text-2xl xs:text-xl lg:text-2xl bg-gray-100  pl-1  rounded-lg  focus:outline-black resize-none"
            placeholder="Developer"
          />
          <div className="w-full flex justify-between">
            <p className="text-red-500 text-sm lg:text-sm xs:text-xs  md:text-sm min-h-[1rem]">
              {developerError || ""}
            </p>
            <span className="text-gray-500 xs:text-xs lg:text-lg md:text-lg sm:text-lg">
              {developer.length}/{maxLength}
            </span>
          </div>
        </div>

        <div className="md:min-h-[20%] w-full top-0 xs:min-h-[15.8%] ">
          <textarea
            type="text"
            id="release-date"
            onChange={(e) => {
              setReleaseDate(e.target.value);
              if (e.target.value.trim() === "") {
                setReleaseDateError("This is a required field");
              } else {
                setReleaseDateError("");
              }
            }}
            value={releaseDate}
            maxLength={maxLength}
            className="w-full max-h-[50px]  lg:max-h-[40%] xs:max-h-[29%] text-black text-2xl xs:text-xl lg:text-2xl bg-gray-100  pl-1  rounded-lg  focus:outline-black resize-none"
            placeholder="Release date"
          />
          <div className="w-full flex justify-between">
            <p className="text-red-500 text-sm lg:text-sm xs:text-xs  md:text-sm min-h-[1rem]">
              {releaseDateError || ""}
            </p>
            <span className="text-gray-500 xs:text-xs lg:text-lg md:text-lg sm:text-lg">
              {releaseDate.length}/{maxLength}
            </span>
          </div>
        </div>

        <div className="md:min-h-[20%] w-full top-0 xs:min-h-[15.8%] ">
          <textarea
            type="text"
            id="source"
            onChange={(e) => {
              setSource(e.target.value);
              if (e.target.value.trim() === "") {
                setSourceError("This is a required field");
              } else {
                setSourceError("");
              }
            }}
            value={source}
            maxLength={maxLength}
            className="w-full max-h-[50px]  lg:max-h-[40%] xs:max-h-[29%] text-black text-2xl xs:text-xl lg:text-2xl bg-gray-100  pl-1  rounded-lg  focus:outline-black resize-none"
            placeholder="Source"
          />
          <div className="w-full flex justify-between">
            <p className="text-red-500 text-sm lg:text-sm xs:text-xs  md:text-sm min-h-[1rem]">
              {sourceError || ""}
            </p>
            <span className="text-gray-500 xs:text-xs lg:text-lg md:text-lg sm:text-lg">
              {source.length}/{maxLength}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row md:flex-row  overflow-hidden sm:mx-h-[50%] md:max-h-[70%] lg:max-h-[60%] h-[100%] w-[100%] items-center justify-center  bg-blue-50 opacity-100 p-4 ">
          {/* Left Side - Media Preview */}
          <div className="bg-gray-400 relative xs:w-full shadow-md w-[50%] h-[100%] overflow-x-auto items-center justify-center flex flex-col overflow-hidden">
            {/* Sidebar Component */}
            {sidebarOpen && (
              <div className="absolute z-30 top-0 left-0 h-full   bg-black text-white p-4 shadow-lg overflow-y-auto transition-transform transform translate-x-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg">Gallery</h2>
                  <button
                    className="text-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="flex flex-col space-y-2 overflow-y-auto ">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                      className={`w-full h-20 border-2 ${
                        currentIndex === index
                          ? "border-blue-500"
                          : "border-gray-400"
                      } rounded-lg overflow-hidden cursor-pointer flex items-center justify-center`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      {file.file.type.startsWith("image/") ? (
                        <img
                          src={file.previewUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={file.previewUrl}
                          className="w-full h-full object-cover"
                        ></video>
                      )}
                    </div>
                  ))}
                  <div className="h-[70px] w-full flex items-center justify-center">
                    <FaCloudUploadAlt
                      className=" scale-[200%] cursor-pointer"
                      onClick={handleIconClick}
                    />
                  </div>
                </div>
              </div>
            )}

            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*,video/*"
              onChange={handleFileChange}
              multiple
            />
            {files.length > 0 ? (
              <div className="relative w-full h-full flex justify-center items-center">
                <button
                  className="absolute top-4
                  xsm:h-[14%] xsm:w-[8%] xs:w-[10%] md:w-[12%] md:h-[6%] sm:w-[5%] lg:w-[8%] lg:h-[9%] lg:max-h-[40px] xl:w-[7%] xl:h-[9%] left-4 z-20 bg-black opacity-70  text-white p-2 rounded-lg shadow-lg hover:opacity-100  transition"
                  onClick={() => setSidebarOpen(true)}
                >
                  <FaBars className="w-[100%] h-[100%]" />
                </button>

                {/* Left Arrow */}
                {files.length > 1 &&
                  currentIndex > 0 &&
                  files[currentIndex] && (
                    <button
                      className="absolute left-2 md:h-[6%]  xs:h-[14%] sm:h-[16%] lg:max-h-[40px]  xl:h-[10%] lg:h-[10%] bg-black z-10 text-white p-2 rounded-full shadow-md hover:bg-black hover:opacity-40"
                      onClick={prevSlide}
                    >
                      <FaArrowLeft className="w-[100%] h-[100%]" />
                    </button>
                  )}
                {files[currentIndex].file.type.startsWith("image/") ? (
                  <img
                    src={files[currentIndex].previewUrl}
                    alt="Preview"
                    className="bg-black w-full h-full object-contain"
                  />
                ) : (
                  <video
                    src={files[currentIndex].previewUrl}
                    controls
                    className="w-full bg-black h-full object-contain "
                  />
                )}

                {/* Right Arrow */}
                {files.length > 1 && currentIndex < files.length - 1 && (
                  <button
                    className="absolute right-2 md:h-[6%] sm:h-[16%] xl:h-[10%] lg:h-[10%] lg:max-h-[40px] xs:h-[14%] z-10 bg-black text-white p-2 rounded-full shadow-md hover:bg-black hover:opacity-40"
                    onClick={nextSlide}
                  >
                    <FaArrowRight className="w-[100%] h-[100%]" />
                  </button>
                )}

                {/* Delete Button */}
                <button
                  className=" absolute top-[3px] right-[2px]  xsm:w-[5%] xsm:h-[10%] xs:w-[7%] sm:w-[5%] md:h-[4%] md:w-[8%] lg:w-[6.5%] lg:h-[7%] lg:max-h-[30px] xl:w-[3.8%] xl:h-[5.5%]   bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                  onClick={() => handleRemoveFile(currentIndex)}
                >
                  <FaTimes className="w-[100%] h-[100%]" />
                </button>
              </div>
            ) : (
              <div className="  w-full flex flex-col items-center">
                <p className="text-black text-xl mb-2">Add an image/video</p>
                <div className=" w-[100%] h-[100%] flex justify-center">
                  <FaCloudUploadAlt
                    onClick={handleIconClick}
                    className="w-60 h-12  text-black cursor-pointer hover:text-gray-800 transition-all"
                  />
                </div>
                <p className=" text-red-500 p-[1px] text-xs ">
                  {fileError || ""}
                </p>
              </div>
            )}
          </div>

          {/* Right Side - Text Editor */}
          <div className="editor">
            <LexicalComposer initialConfig={initialConfig}>
              <Editor
                editorStateRef={editorStateRef}
                editorError={editorError}
                posted={posted}
                setPosted={setPosted}
              />
            </LexicalComposer>
          </div>
        </div>
      </div>

      <div
        className={`bg-gray-400 p-2 sm:w-[10%] md:w-[7%] xs:w-[20%] text-center rounded-3xl text-white
      
         sm:relative sm:bottom-[6%] sm:left-[35%]
         xs:relative xs:mt-8 xs:bottom-[12%]
         lg:relative lg:mt-0 
         
          
        `}
      >
        <button className="w-full" onClick={handlePost}>
          Post
        </button>
      </div>
    </div>
  );
}