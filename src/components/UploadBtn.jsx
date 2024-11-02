import styled, {keyframes} from "styled-components";
import {useNavigate} from "react-router-dom";
import upload from "../images/upload.svg";
import add from "../images/add.svg";
import camera from "../images/camera.svg";
import uploadBtn from "../images/uploadbtn.svg";
import {useRef, useState} from "react";
import Modal from "react-modal";
import axios from "axios";

export default function UploadBtn({handleClick, isVisible, setIsVisible}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [cameraModalIsOpen, setCameraModalIsOpen] = useState(false);
  const videoRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const goToReceiptDirect = async () => {
    navigate("/receiptdirect");
  };

  const postReceipt = async () => {
    if (!selectedFile) {
      console.error("No file selected for upload");
      return;
    }

    setIsLoading(true);

    try {
      // Create a FormData object and append the file to it
      const formData = new FormData();
      formData.append("file", selectedFile); // 'file' should match the field expected by the backend

      // Make the POST request with axios
      const response = await axios.post("http://13.125.121.218:8080/ocr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);
      // Handle successful response here, like navigating to a different page
      setIsVisible(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openCameraModal = () => {
    setCameraModalIsOpen(true);
    startCamera();
  };

  const closeCameraModal = () => {
    stopCamera();
    setCameraModalIsOpen(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type: mime});
  };

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const photoData = canvas.toDataURL("image/png");
    setPhoto(photoData);
    setCameraModalIsOpen(false);

    // Convert the photo data URL to a File object
    const photoFile = dataURLtoFile(photoData, "receipt.png");

    // Log the photo file or handle the upload
    console.log("Captured photo file:", photoFile);

    // Set selectedFile to use in postReceipt
    setSelectedFile(photoFile);
    postReceipt();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // 파일 업로드 처리 로직을 여기에 추가
      console.log("파일 업로드:", selectedFile);
      postReceipt();
      closeModal(); // 모달 닫기
    }
  };

  return (
    <Container>
      {isVisible && <Overlay/>}
      <ElementsContainer>
        {isVisible && (
          <>
            <Element onClick={goToReceiptDirect}>
              <ChildContainer>
                <div>직접 추가</div>
                <img src={add} alt="add"/>
              </ChildContainer>
            </Element>
            <Element onClick={openCameraModal}>
              <ChildContainer>
                <div>영수증 촬영</div>
                <img src={camera} alt="camera"/>
              </ChildContainer>
            </Element>
            <Element onClick={openModal}>
              <ChildContainer>
                <div>영수증 업로드</div>
                <img src={uploadBtn} alt="uploadBtn"/>
              </ChildContainer>
            </Element>
          </>
        )}
      </ElementsContainer>

      <Button onClick={handleClick}>
        <img src={upload} alt="upload"/>
      </Button>

      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner/>
        </LoadingOverlay>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "300px",
            height: "150px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "var(--darkgrey-color)",
            border: "none",
            borderRadius: "20px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div style={{color: "white", fontSize: "20px", fontWeight: "600"}}>영수증 선택</div>
        <FileInputLabel htmlFor="file-upload">파일 선택</FileInputLabel>
        <FileInput id="file-upload" type="file" onChange={handleFileChange}/>
        <div style={{display: "flex", gap: "30px"}}>
          <UploadButton onClick={handleFileUpload}>업로드</UploadButton>
          <CancelButton onClick={closeModal}>닫기</CancelButton>
        </div>
      </Modal>

      <Modal
        isOpen={cameraModalIsOpen}
        onRequestClose={closeCameraModal}
        style={{
          content: {
            width: "70%",
            height: "50%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "var(--darkgrey-color)",
            border: "none",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <video ref={videoRef} style={{width: "100%", height: "auto"}}/>
        <CaptureButton onClick={takePhoto}>촬영</CaptureButton>
        <CancelButton onClick={closeCameraModal}>닫기</CancelButton>
      </Modal>
    </Container>
  );
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
`;

const slideUp = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Container = styled.div`
    text-align: end;
`;

const Button = styled.button`
    all: unset;
    z-index: 1000;
`;

const ElementsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 35px;
    z-index: 999;
`;

const Element = styled.div`
    opacity: 0;
    animation: ${slideUp} 0.5s forwards;
    border-radius: 5px;
    font-size: 18px;
`;

const ChildContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    color: white;
    font-family: Pretendard-regular;
`;

// 로딩 오버레이 스타일
const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7); // 반투명 배경
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; // 다른 요소 위에 표시
`;

// 로딩 스피너 애니메이션
const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

// 로딩 스피너 스타일
const LoadingSpinner = styled.div`
    border: 8px solid rgba(255, 255, 255, 0.3); /* 하얀색의 반투명 */
    border-top: 8px solid white; /* 위쪽은 흰색 */
    border-radius: 50%;
    width: 60px; /* 크기 조정 가능 */
    height: 60px; /* 크기 조정 가능 */
    animation: ${spin} 1s linear infinite; /* 무한 회전 애니메이션 */
`;

const FileInput = styled.input`
    display: none; /* 기본 파일 입력을 숨김 */
`;

// 커스텀 파일 입력 버튼 스타일
const FileInputLabel = styled.label`
    display: inline-block;
    padding: 10px 20px;
    background-color: var(--red-color);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: darkred; /* 호버 시 배경색 변경 */
    }
`;

// 업로드 버튼 스타일
const UploadButton = styled.button`
    background-color: var(--red-color);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

// 취소 버튼 스타일
const CancelButton = styled.button`
    background-color: #ccc;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const CaptureButton = styled.button`
    background-color: var(--midgrey-color);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px 0;
`;