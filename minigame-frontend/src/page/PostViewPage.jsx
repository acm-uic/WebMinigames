import { useState, useMemo, useRef, useEffect } from "react";
import { GoXCircle } from "react-icons/go";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Editor from "../page/Editor";

import {
  FaCloudUploadAlt,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
} from "react-icons/fa";

export default function PostViewPage() {
  const editorStateRef = useRef(undefined);

  const [title, setTitle] = useState("");
  const [sectionTitleError, setSectionTitleError] = useState("");
  const [fileError, setFileError] = useState("");
  const [tagError, setTagError] = useState("");
  const [editorError, setEditorError] = useState("");
  const [posted, setPosted] = useState(false);
  const [TagsPopUpAvailable, setTagsPopUpAvailable] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [search, setSearch] = useState("");
  const [tagIsSelected, setTagIsSelected] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const initialConfig = {
    namespace: "MyEditor",
    onError(error) {
      console.error(error);
    },
    editorState: undefined,
  };

  const MAX_DURATION = 240; // Max duration of a video that is added to our post
  const maxLength = 225; // Max length of our section title
  const games = {
    "Black Ops": { categories: ["Action", "PvP"] },
    "Black Desert": { categories: ["MMORPG", "Open World"] },
    Battlefield: { categories: ["FPS", "War"] },
    Battlefront: { categories: ["Shooter", "Star Wars"] },
  };

  const extendedGames = useMemo(() => {
    // Create a copy of the original games object
    const newGames = { ...games };
    const uniqueCategories = new Set();

    // Collect all unique categories from the existing games
    Object.values(games).forEach((game) => {
      game.categories.forEach((category) => uniqueCategories.add(category));
    });
    // Ensure each unique category is also added as a key in newGames to show them in our modal when we add a tag.
    uniqueCategories.forEach((category) => {
      if (!newGames[category]) {
        newGames[category] = { categories: [] };
      }
    });

    return newGames;
  }, []);

  const filteredGames = Object.entries(extendedGames)
    // filter tag choices based on tags that have already been chosen and choices that match some part of the search bar content
    .filter(
      ([gameName, gameData]) =>
        !selectedTags.includes(gameName) &&
        (gameName.toLowerCase().includes(search.toLowerCase()) ||
          gameData.categories.some((cat) =>
            cat.toLowerCase().includes(search.toLowerCase())
          ))
    )
    // convert back to an object
    .reduce((acc, [gameName, gameData]) => {
      acc[gameName] = gameData;
      return acc;
    }, {});

  const toggleTagPopup = () => {
    setTagsPopUpAvailable(!TagsPopUpAvailable);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() === "") {
      setSectionTitleError("This is a required field");
    } else {
      setSectionTitleError("");
    }
  };

  const editorStateContent = editorStateRef.current
    ? editorStateRef.current.toJSON()
    : null;

  const unselectTag = (newTag) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== newTag));
  };

  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };

  const handlePost = () => {
    if (selectedTags.length === 0) {
      setTagError("You need to add at least one tag.");
    } else {
      setTagError("");
    }
    if (title.length === 0) {
      setSectionTitleError("This is a required field");
    } else {
      setSectionTitleError("");
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
      selectedTags.length === 0 ||
      title.length === 0 ||
      editorStateRef.current === undefined ||
      editorStateRef.current.toJSON().root.children[0].children.length == 0
    ) {
      return;
    }

    const postData = {
      title,
      selectedTags,
      files,
      editorStateContent,
    };

    setTitle("");
    setFiles([]);
    setSelectedTags([]);
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
    const validFiles = [];
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
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      let newIndex = currentIndex;
      if (currentIndex >= updatedFiles.length)
        newIndex = Math.max(0, updatedFiles.length - 1);
      setCurrentIndex(newIndex);
      document.getElementById("fileInput").value = null;
      return updatedFiles;
    });
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
    <div className=" overflow-y-auto flex flex-col items-center justify-center relative h-screen p-5 lg:p-7">
      <div className=" w-full  max-w-[1250px]  bottom-10 min-h-[90%] xs:max-h-[80%] xs:max-w-[85%]  max-h-[50%] h-[80vh] relative flex scale-100  sm:scale-90 xs:scale-[90%]  flex-col text-black rounded-lg">
        <h3 className="text-4xl bold-text">Create post</h3>
        <div className="md:min-h-[20%] w-full mb-1 top-0 xs:min-h-[15.8%] ">
          <textarea
            type="text"
            id="subject-title"
            onChange={handleChange}
            value={title}
            maxLength={maxLength}
            className="w-full mt-[30px] max-h-[50px]  lg:max-h-[40%] xs:max-h-[29%] text-black text-2xl xs:text-xl lg:text-2xl bg-gray-100  pl-1  rounded-lg  focus:outline-black resize-none"
            placeholder="Subject title"
          />
          <div className="w-full flex justify-between mt-1">
            <p className="text-red-500 text-sm lg:text-sm xs:text-xs  md:text-sm min-h-[1rem]">
              {sectionTitleError || ""}
            </p>
            <span className="text-gray-500 xs:text-xs lg:text-lg md:text-lg sm:text-lg">
              {title.length}/{maxLength}
            </span>
          </div>
        </div>

        <div className="w-full h-[22%]  mb-1 sm:max-h-[13%] flex flex-row gap-y-1 flex-wrap">
          <button
            onClick={toggleTagPopup}
            disabled={selectedTags.length >= 6}
            className={`w-[66px] h-[30px] mb-[2px] bg-gray-300 flex items-center text-sm justify-center rounded-full
             ${
               selectedTags.length < 6
                 ? " cursor-pointer"
                 : "cursor-not-allowed"
             }


           `}
          >
            Add tag
          </button>
          <p className="text-red-500 pl-2 pt-1 text-sm lg:text-sm xs:text-xs  md:text-sm min-h-[1rem]">
            {tagError || ""}
          </p>

          {selectedTags.length > 0 && (
            <>
              {[...selectedTags].map((tag) => (
                <div className="relative flex items-center justify-center  p-2 h-[32px] rounded-full ">
                  <button className="rounded-full tx-sm bg-gray-300 w-auto h-auto p-1 pl-2 pr-2">
                    {tag}
                  </button>

                  <GoXCircle
                    onClick={() => unselectTag(tag)}
                    className="w-[16px] h-[16px] absolute right-[2px] top-[1px] cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              ))}
            </>
          )}
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
                {files.length > 1 && currentIndex > 0 && (
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

      {/* Modal */}
      {TagsPopUpAvailable && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}
      {TagsPopUpAvailable && (
        <div className="fixed bg-white shadow-md rounded-xl  xs:w-[80%] xs:h-[40%] md:w-[65%] md:h-[30%] sm:w-[70%] sm:h-[30%] lg:w-[42%] lg:h-[50%]  p-4 z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="  flex items-center relative w-full h-[22%]">
            <p className="xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl absolute left-5">
              Add tag
            </p>
            <GoXCircle
              onClick={toggleTagPopup}
              className="   xs:w-[10%] xs:h-[60%]  md:w-[20%] md:h-[50%] sm:w-[20%] sm:h-[75%]  lg:w-[12%] lg:h-[45%]  absolute right-1 cursor-pointer"
            />
          </div>
          <input
            type="text"
            placeholder="Search tag"
            className="w-full top-[150px] p-2 rounded bg-gray-200 border border-gray-400 focus:outline-none  disabled:cursor-not-allowed"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={selectedTag !== null}
          />
          <div className=" mt-2 relative w-full h-[53%]   xs:w-full xs:h-[37%] md:w-full md:h-[45%]  sm:w-full sm:h-[20%]   lg:w-full lg:h-[53%]">
            {search && (
              <div className="absolute top-0 w-full max-h-[100%] overflow-y-auto rounded">
                {Object.entries(filteredGames).map(
                  ([gameName, gameData], index) => (
                    <div
                      key={index}
                      className={`flex justify-between p-2 cursor-pointer ${
                        selectedTag === gameName
                          ? "bg-blue-200"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedTag((prevTag) => {
                          const newTag = prevTag === gameName ? null : gameName;
                          setTagIsSelected(newTag !== null);
                          return newTag;
                        });
                      }}
                    >
                      <span>{gameName}</span>
                      <span className="text-gray-500 text-sm mr-1">
                        {gameData.categories.join(", ")}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <button
            disabled={!tagIsSelected}
            className={` absolute mt-1 right-8  xs:w-[14%]  xs:h-[8%]   :w-[10%]  sm:h-[10%]  md:w-[12%]  md:h-[9%]  lg:w-[18%]  lg:max-w-[60px]  lg:h-[7%] items-center text-sm justify-center rounded-full
                 ${
                   tagIsSelected
                     ? "bg-blue-300 hover:bg-blue-400 cursor-pointer"
                     : "bg-gray-400 cursor-not-allowed"
                 }
               `}
            onClick={() => {
              if (tagIsSelected) {
                setSelectedTags((prevTags) => {
                  return [
                    ...new Set([
                      ...prevTags,
                      selectedTag,
                      ...(extendedGames[selectedTag].categories || []),
                    ]),
                  ];
                });

                setSelectedTag(null);
                setTagIsSelected(null);
                toggleTagPopup();
                setSearch("");
                setTagError("");
              }
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
