import searchIcon from "./assets/search_icon.svg";
import micIcon from "./assets/mic_icon.svg";
import cameraIcon from "./assets/camera_icon.svg";
import nagarroLogo from "./assets/Nagarro_Logo.svg";
import languageIcon from "./assets/language.svg";
import chatIcon from "./assets/chat.svg";
import cartIcon from "./assets/cart.svg";
import micImage from "./assets/images/microphone.png";
import ImageGrid from "./components/ImageGrid";
import Siriwave from "react-siriwave";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { addToMessages, fetchMessage } from "./store/slice/messageSlice";
import tickImage from "./assets/images/tick.png";
import annyang from "annyang";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "./constants";

function App() {
  // const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showVoice, setShowVoice] = useState(false);
  const dispatch = useAppDispatch();
  const responseData = useAppSelector((state) => state.message.responseData);
  const speechText = "Good Evening, How can I help you?";
  const [isListening, setIsListening] = useState<boolean>(false);
  // const [showToast, setShowToast] = useState("");
  //speech
  const [isSpeaking, setIsSpeaking] = useState(false);
  //voice from google
  const [audio, setAudio] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  function getWordCount(str: string) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === " " || i + 1 === str.length) count++;
    }
    return count;
  }
  function getFrequency(str: string, char: string) {
    let freq = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === char) freq++;
    }
    return freq;
  }

  const validateOrGetToken = async (str: string | null) => {
    const headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const bodyContent = `access_token=${str}`;
    if (str === null) {
      const res = await fetch(`${API_BASE_URL}/api/get-access-token`);
      const d = await res.json();
      return d.access_token;
    }
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/tokeninfo",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    if (response.status === 400) {
      const res = await fetch(`${API_BASE_URL}/api/get-access-token`);
      const d = await res.json();
      return d.access_token;
    }
    return str;
  };

  const fetchAudio = async (str: string) => {
    try {
      //if token null get token
      const tkn = await validateOrGetToken(token);
      setToken(tkn);
      const url = "https://texttospeech.googleapis.com/v1/text:synthesize";
      const options = {
        method: "POST",
        headers: {
          Accept: "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "x-goog-user-project": "test1-ywpq",
          "Content-Type": "application/json",
          Authorization: `Bearer ${tkn}`,
        },
        body: JSON.stringify({
          input: { text: str },
          voice: {
            languageCode: "en-IN",
            name: "en-IN-Neural2-B",
            ssmlGender: "MALE",
          },
          audioConfig: { audioEncoding: "MP3" },
        }),
      };
      const response = await fetch(url, options);
      if (response.status === 200) {
        const data = await response.json();
        setShowVoice(true);
        setIsSpeaking(true);
        setAudio(data.audioContent);
        setTimeout(() => {
          setIsSpeaking(false);
          setIsListening(true);
        }, getWordCount(str) * 350 + getFrequency(str, ".") * 500 + getFrequency(str, ",") * 500 + getFrequency(str, ";") * 500);
        return data;
      } else {
        setIsSpeaking(false);
        setIsListening(false);
        // setIsError(true);
        setShowVoice(false);
        throw new Error();
      }
    } catch (error) {
      console.log(error);

      return error;
    }
  };

  // console.log("isSpeaking = ", isSpeaking, "isListening = ", isListening);

  const sentenceCorrection = async (str: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/sentence-correction?request_sentence=${str}`
      );
      const data = await response.json();
      return data.response_sentence;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (annyang) {
      annyang.addCallback("result", (phrases: string[]) => {
        const firstPhrase = phrases[0];
        if (
          isListening === false &&
          showVoice === false &&
          isSpeaking === false
        ) {
          //not listening and not showing voice rec
          if (
            firstPhrase.toLowerCase().includes("hello vk") ||
            firstPhrase.toLowerCase().includes("hello weeke") ||
            firstPhrase.toLowerCase().includes("hello pk") ||
            firstPhrase.toLowerCase().includes("hello vijay") ||
            firstPhrase.toLowerCase().includes("hello vicki.")
          ) {
            //is
            setShowVoice(true);
          } else {
            // console.log(firstPhrase);
            toast("Say 'Hello VK' to begin!");
          }
        }
        if (isSpeaking === false && showVoice && isListening) {
          //SENTENCE CORRECTION
          if (getWordCount(firstPhrase) > 2) {
            sentenceCorrection(firstPhrase).then((sentence) =>
              handleWordDetection(sentence)
            );
          } else handleWordDetection(firstPhrase);
        } else console.log("Speaking or No hot word");
      });

      annyang.start();

      return () => {
        annyang.abort();
        annyang.removeCallback("result");
      };
    }
  });

  const handleWordDetection = (text: string) => {
    setSearchTerm(() => {
      sendMessage(text);
      return text;
    });
  };

  const sendMessage = (text: string) => {
    const query = text;
    setSearchTerm(text);
    const body = {
      user_request: query,
      ask_for: responseData?.ask_for,
      current_intent: responseData?.current_intent,
      cart_id: responseData?.cart_id,
      address_id: responseData?.address_id,
      order_id: responseData?.order_id,
      prv_response: responseData?.prv_response,
      show_page: responseData?.show_page,
      quantity: responseData?.quantity,
      next_event: responseData?.next_event,
      products: responseData?.products?.map((p) => {
        const price = p.price.toString();
        return { ...p, price };
      }),
      selectedProduct: responseData?.selectedProduct
        ? {
            ...responseData.selectedProduct,
            price: responseData?.selectedProduct?.price.toString(),
          }
        : null,
    };
    dispatch(addToMessages(body));
    dispatch(fetchMessage(body));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(searchTerm);
  };

  //Auto click a hidden button to bypass Auto Play restriction
  useEffect(() => {
    const hiddenButton = document.getElementById("hiddenButton");
    if (hiddenButton) {
      hiddenButton.click();
      console.log("Welcome to our website");
    }
  }, []);

  useEffect(() => {
    if (showVoice) {
      if (responseData === null) {
        fetchAudio(speechText);
      } else {
        fetchAudio(responseData.responce_data);
      }
    }
  }, [showVoice, responseData]);

  //SENTENCE CORRECTION

  return (
    <div className="w-full h-screen bg-primary-background flex flex-col">
      <ToastContainer />
      <button id="hiddenButton" style={{ display: "none" }}></button>
      <div className="w-full h-[12vh] flex justify-between items-center px-10">
        <div className="flex-1">
          <img src={nagarroLogo} height={25} width={25} alt="" />
        </div>
        {responseData === null && (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
            className="flex-1 p-2 px-4 rounded-full bg-white flex gap-4"
          >
            <img src={searchIcon} height={15} width={15} alt="" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 focus:outline-none px-1"
            />
            <img
              src={micIcon}
              onClick={() => {
                setShowVoice(!showVoice);
              }}
              height={12}
              width={12}
              alt=""
              className="cursor-pointer"
            />
            <img src={cameraIcon} height={15} width={15} alt="" />
          </form>
        )}
        {responseData?.show_page && (
          <div className="w-[60%] pt-8 flex justify-center items-start text-white">
            <div className="flex flex-col justify-center items-start w-full gap-2">
              <div className="w-full h-[2px] bg-[#46d7ac] ml-[10%]">
                <div className="w-3 h-3 bg-[#46d7ac] rounded-full relative top-[-5px] left-[-2px] flex justify-center items-center">
                  {responseData.show_page !== "pdp-page" && (
                    <div className="w-2 h-2 bg-white rounded-full "></div>
                  )}
                </div>
              </div>
              <div>Discovery</div>
            </div>
            <div className="flex flex-col justify-center items-center w-full gap-2">
              <div className="w-full h-[2px] bg-[#46d7ac] flex justify-center">
                <div className="w-3 h-3 bg-[#46d7ac] rounded-full relative top-[-5px] left-[-2px] flex justify-center items-center">
                  {responseData.show_page !== "cart-page" && (
                    <div className="w-2 h-2 bg-white rounded-full "></div>
                  )}
                </div>
              </div>
              <div>Cart Operations</div>
            </div>
            <div className="flex flex-col justify-center items-end w-full gap-2">
              <div className="w-full h-[2px] bg-[#46d7ac] flex justify-end mr-[10%]">
                <div className="w-3 h-3 bg-[#46d7ac] rounded-full relative top-[-5px] right-[-2px] flex justify-center items-center">
                  {responseData.show_page !== "address-payment-page" &&
                    responseData.show_page !== "order-confirmation-page" && (
                      <div className="w-2 h-2 bg-white rounded-full "></div>
                    )}
                </div>
              </div>
              <div>Checkout and Confirmation</div>
            </div>
          </div>
        )}
        <div className="flex-1 flex gap-4 justify-end">
          <img src={languageIcon} height={25} width={25} alt="" />
          <img src={chatIcon} height={25} width={25} alt="" />
          <img src={cartIcon} height={25} width={25} alt="" />
        </div>
      </div>
      <div className="w-full h-[88vh] flex flex-col justify-center items-center">
        <div className="w-full h-full flex justify-center items-start gap-6 mt-8">
          {responseData === null && <ImageGrid />}
          {responseData &&
            responseData.cart_id === null &&
            responseData.selectedProduct && (
              <div className="bg-white h-fit w-[600px] flex rounded-md justify-center items-start p-2 gap-4">
                <div className="bg-gray-200 w-1/4 h-full rounded-md object-contain flex justify-center items-center">
                  <img src={responseData.selectedProduct.image_link} alt="" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p className="font-bold">
                    {responseData.selectedProduct.product_name}
                  </p>
                  <p className="font-semibold text-sm">
                    {responseData.selectedProduct.summary.length > 300
                      ? responseData.selectedProduct.summary.substring(0, 300) +
                        "..."
                      : responseData.selectedProduct.summary}
                  </p>
                  {responseData.selectedProduct.varient &&
                    responseData.selectedProduct.varient.map((v, _) => (
                      <div key={_} className="flex flex-col">
                        <p className="font-bold">{v.name}</p>
                        <div className="flex gap-4">
                          {v.avilable &&
                            v.avilable.map((a, _) => {
                              if (
                                a.toLowerCase() ===
                                v.selected_varient?.toLowerCase()
                              ) {
                                return (
                                  <div
                                    key={_}
                                    className="bg-[#46d7ac] px-4 py-1 rounded-full"
                                  >
                                    {a}
                                  </div>
                                );
                              }
                              return (
                                <div className="border-2 px-4 py-1 rounded-full">
                                  {a}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ))}
                  <div>
                    <p className="font-bold py-1">Quantity</p>
                    <div className="border-2 px-4 py-1 rounded-full">
                      0 piece
                    </div>
                  </div>
                  <div>
                    <p className="font-bold py-1">Price</p>
                    <div className="border-2 px-4 py-1 rounded-full">
                      {responseData.selectedProduct.price}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold py-1">Pack Size</p>
                    <div className="border-2 px-4 py-1 rounded-full">
                      {responseData.selectedProduct.pack_size}
                    </div>
                  </div>
                </div>
              </div>
            )}
          {responseData &&
            responseData.cart_id === null &&
            responseData.selectedProduct === null &&
            responseData.products?.map((p, _) => (
              <div
                key={_}
                className="bg-white h-[330px] w-[200px] p-4 flex flex-col justify-between rounded-md overflow-hidden"
              >
                <div className="bg-gray-200 w-30 h-40 rounded-md flex justify-center items-center overflow-hidden object-center">
                  <img src={p.image_link} alt="" />
                </div>
                <p className="font-bold h-12 flex items-center">
                  {p.product_name.length > 35
                    ? p.product_name.substring(0, 35) + "..."
                    : p.product_name}
                </p>
                <p className="text-sm">
                  {p.summary.length > 82
                    ? p.summary.substring(0, 82) + "..."
                    : p.summary}
                </p>
              </div>
            ))}
          {responseData?.order_id && (
            <div className="bg-white w-[50%] h-[300px] flex flex-col justify-around items-center rounded-md p-4">
              <div className="bg-[#46d7ac] rounded-full p-2 h-16 w-16">
                <img src={tickImage} alt="" />
              </div>
              <p className="text-2xl font-bold text-[#46d7ac]">
                Your order has been placed successfully!
              </p>
              <p className="text-center">
                {responseData.responce_data.substring(40)}
              </p>
              <div className="flex flex-col items-center">
                <p className="font-bold">Thank You</p>
                <p>Do you wish to place another order?</p>
              </div>
            </div>
          )}

          {responseData?.cart_id && responseData.address_id === null && (
            <div className="bg-white w-[50%] h-[300px] flex flex-col justify-start items-center rounded-md p-4 gap-2">
              <div className="border border-b-1 border-t-0 border-l-0 border-r-0 w-full pb-2 font-bold">
                Order Details
              </div>
              <p>{responseData.responce_data}</p>
            </div>
          )}

          {responseData?.address_id && (
            <div className="bg-white w-[50%] h-[300px] flex flex-col justify-start items-center rounded-md p-4 gap-2">
              <div className="border border-b-1 border-t-0 border-l-0 border-r-0 w-full pb-2 font-bold">
                Address Details
              </div>
              <label htmlFor="" className="flex gap-2 w-full">
                <input type="radio" checked />
                {responseData.responce_data.length > 24
                  ? responseData.responce_data.substring(24, 70)
                  : responseData.responce_data}
              </label>
            </div>
          )}
        </div>
        {showVoice && audio && (
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
        )}
      </div>
    </div>
  );
}

export default App;
