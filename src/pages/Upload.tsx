import { ToastContainer } from "react-toastify";
// import DefImage from "../assets/images/default.jpg";
import "react-toastify/dist/ReactToastify.css";
import UploadForm from "../components/UploadForm";

function Upload() {
  // const [isError, setIsError] = useState<boolean>(false);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [showVoice, setShowVoice] = useState(false);
  // const dispatch = useAppDispatch();
  // const responseData = useAppSelector((state) => state.message.responseData);
  // const [speechText, setSpeechText] = useState(
  //   "Good Morning, How can I help you?"
  // );
  // const [isListening, setIsListening] = useState<boolean>(false);
  // // const [showToast, setShowToast] = useState("");
  // //speech
  // const [isSpeaking, setIsSpeaking] = useState(false);
  // //voice from google
  // const [audio, setAudio] = useState<string | null>(null);

  // function getWordCount(str: string) {
  //   var count = 0;
  //   for (let i = 0; i < str.length; i++) {
  //     if (str.charAt(i) === " " || i + 1 === str.length) count++;
  //   }
  //   return count;
  // }
  // function getFrequency(str: string, char: string) {
  //   var freq = 0;
  //   for (let i = 0; i < str.length; i++) {
  //     if (str.charAt(i) === char) freq++;
  //   }
  //   return freq;
  // }

  // const fetchAudio = async (str: string) => {
  //   const url = "https://texttospeech.googleapis.com/v1/text:synthesize";
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       Accept: "*/*",
  //       "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  //       "x-goog-user-project": "test1-ywpq",
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "Bearer ",
  //     },
  //     body: JSON.stringify({
  //       input: { text: str },
  //       voice: {
  //         languageCode: "en-IN",
  //         name: "en-IN-Neural2-B",
  //         ssmlGender: "MALE",
  //       },
  //       audioConfig: { audioEncoding: "MP3" },
  //     }),
  //   };
  //   try {
  //     const response = await fetch(url, options);
  //     if (response.status === 200) {
  //       const data = await response.json();
  //       setShowVoice(true);
  //       setIsSpeaking(true);
  //       setAudio(data.audioContent);
  //       setTimeout(() => {
  //         setIsSpeaking(false);
  //         setIsListening(true);
  //       }, getWordCount(str) * 350 + getFrequency(str, ".") * 500 + getFrequency(str, ",") * 500 + getFrequency(str, ";") * 500);
  //       return data;
  //     } else {
  //       setIsSpeaking(false);
  //       setIsListening(false);
  //       setIsError(true);
  //       setShowVoice(false);
  //       throw new Error();
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     return error;
  //   }
  // };

  // console.log("isSpeaking = ", isSpeaking, "isListening = ", isListening);

  // const sentenceCorrection = async (str: string) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8000/sentence-correction?request_sentence=${str}`
  //     );
  //     const data = await response.json();
  //     return data.response_sentence;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // useEffect(() => {
  // //   if (annyang) {
  // //     annyang.addCallback("result", (phrases: string[]) => {
  // //       const firstPhrase = phrases[0];
  // //       if (
  // //         isListening === false &&
  // //         showVoice === false &&
  // //         isSpeaking === false
  // //       ) {
  // //         //not listening and not showing voice rec
  // //         if (
  // //           firstPhrase.toLowerCase().includes("hello vk") ||
  // //           firstPhrase.toLowerCase().includes("hello weeke") ||
  // //           firstPhrase.toLowerCase().includes("hello pk") ||
  // //           firstPhrase.toLowerCase().includes("hello vijay") ||
  // //           firstPhrase.toLowerCase().includes("hello vicki.")
  // //         ) {
  // //           //is
  // //           setShowVoice(true);
  // //         } else {
  // //           console.log(firstPhrase);
  // //           toast("Say 'Hello VK' to begin!");
  // //         }
  // //       }
  // //       if (isSpeaking === false && showVoice && isListening) {
  // //         //SENTENCE CORRECTION
  // //         if (getWordCount(firstPhrase) > 2) {
  // //           sentenceCorrection(firstPhrase).then((sentence) =>
  // //             handleWordDetection(sentence)
  // //           );
  // //         } else handleWordDetection(firstPhrase);
  // //       } else console.log("Speaking or No hot word");
  // //     });

  // //     annyang.start();

  // //     return () => {
  // //       annyang.abort();
  // //       annyang.removeCallback("result");
  // //     };
  // //   }
  // // });

  // const handleWordDetection = (text: string) => {
  //   setSearchTerm(() => {
  //     sendMessage(text);
  //     return text;
  //   });
  // };

  // const sendMessage = (text: string) => {
  //   const query = text;
  //   setSearchTerm(text);
  //   const body = {
  //     user_request: query,
  //     ask_for: responseData?.ask_for,
  //     current_intent: responseData?.current_intent,
  //     cart_id: responseData?.cart_id,
  //     address_id: responseData?.address_id,
  //     order_id: responseData?.order_id,
  //     prv_response: responseData?.prv_response,
  //     show_page: responseData?.show_page,
  //     quantity: responseData?.quantity,
  //     products: responseData?.products?.map((p) => {
  //       const price = p.price.toString();
  //       return { ...p, price };
  //     }),
  //     selectedProduct: responseData?.selectedProduct
  //       ? {
  //           ...responseData.selectedProduct,
  //           price: responseData?.selectedProduct?.price.toString(),
  //         }
  //       : null,
  //   };
  //   dispatch(addToMessages(body));
  //   dispatch(fetchMessage(body));
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   sendMessage(searchTerm);
  // };

  // //Auto click a hidden button to bypass Auto Play restriction
  // useEffect(() => {
  //   const hiddenButton = document.getElementById("hiddenButton");
  //   if (hiddenButton) {
  //     hiddenButton.click();
  //     console.log("Welcome to our website");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (showVoice) {
  //     if (responseData === null) {
  //       fetchAudio(speechText);
  //     } else {
  //       fetchAudio(responseData.responce_data);
  //     }
  //   }
  // }, [showVoice, responseData]);

  //SENTENCE CORRECTION

  return (
    <div className="w-full h-screen bg-primary-background flex flex-col">
      <ToastContainer />
      <button id="hiddenButton" style={{ display: "none" }}></button>

      <div className="w-full h-[88vh] flex flex-col justify-center items-center">
        <div className="w-full h-full flex justify-center items-start gap-6 mt-8">
          {<UploadForm />}
        </div>
        {/* {showVoice && audio && (
          <div className="bg-black w-full h-1/5 absolute bottom-0 opacity-80 flex flex-col gap-4 justify-center items-center overflow-hidden">
            <div className="h-[180px] flex items-center justify-center">
              <Siriwave theme="ios9" autostart={isSpeaking} />
              <div className="absolute m-auto top-5 ">
                <img src={micImage} height={50} width={50} alt="" />
              </div>
              <div className="absolute bottom-2 w-[70%] text-center text-white">
                {responseData?.responce_data ? (
                  <p className="text-white">{responseData?.responce_data}</p>
                ) : (
                  <p className="text-white">
                    {searchTerm.length > 0 ? searchTerm : speechText}
                  </p>
                )}
                <audio autoPlay={true} src={"data:audio/ogg;base64," + audio} />
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Upload;
