import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { voiceFileResponse } from "../interfaces/voiceFileInterface";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import languageIcon from "../assets/language.svg";
import chatIcon from "../assets/chat.svg";
import cartIcon from "../assets/cart.svg";
import nagarroLogo from "../assets/Nagarro_Logo.svg";
import loadingImage from "../assets/loading.svg";
import { API_BASE_URL } from "../constants";
import { PulseLoader } from "react-spinners";

function Upload() {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<voiceFileResponse[]>([]);
  //dropzone
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fetchData = async (file: any) => {
    const url = `${API_BASE_URL}/send-voice-file`;
    const bodyContent = new FormData();
    bodyContent.append("uploaded_file", file); // Use 'uploaded_file' as the key
    setIsLoading(true);
    const response = await fetch(url, {
      method: "POST",
      body: bodyContent,
    });
    const d = await response.json();
    setIsLoading(false);
    setData(d);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (acceptedFiles.length > 0) {
      fetchData(acceptedFiles[0]);
    } else {
      console.log("No File Selected");
      toast("Please select file");
    }
  }
  return (
    <div className="w-full min-h-screen bg-primary-background flex flex-col">
      <ToastContainer />
      <button id="hiddenButton" style={{ display: "none" }}></button>
      <div className="w-full h-[12vh] flex justify-between items-center px-10">
        <div className="flex-1">
          <img src={nagarroLogo} height={25} width={25} alt="" />
        </div>
        <div className="w-[60%] pt-8 flex justify-center items-start text-white">
          <div className="flex flex-col justify-center items-start w-full gap-2">
            <div className="w-full h-[2px] bg-[#46d7ac] ml-[10%]">
              <div className="w-3 h-3 bg-[#46d7ac] rounded-full relative top-[-5px] left-[-2px] flex justify-center items-center">
                {data.length === 0 && (
                  <div className="w-2 h-2 bg-white rounded-full "></div>
                )}
              </div>
            </div>
            <div>Cart Preparations</div>
          </div>
          <div className="flex flex-col justify-center items-end w-full gap-2">
            <div className="w-full h-[2px] bg-[#46d7ac] flex justify-end mr-[10%]">
              <div className="w-3 h-3 bg-[#46d7ac] rounded-full relative top-[-5px] right-[-2px] flex justify-center items-center">
                {data.length > 0 && (
                  <div className="w-2 h-2 bg-white rounded-full "></div>
                )}
              </div>
            </div>
            <div>Checkout and confirmation</div>
          </div>
        </div>
        <div className="flex-1 flex gap-4 justify-end">
          <img src={languageIcon} height={25} width={25} alt="" />
          <img src={chatIcon} height={25} width={25} alt="" />
          <img src={cartIcon} height={25} width={25} alt="" />
        </div>
      </div>
      {data.length === 0 && (
        <div className="w-full h-[88vh] flex flex-col justify-center items-center">
          <div className="w-full h-full flex justify-center items-start gap-6 mt-8">
            {isloading ? (
              <div className="w-full h-full relative flex flex-col justify-start items-center object-contain">
                <h2 className="text-2xl text-white flex justify-center items-center gap-4">
                  Please wait, Processing your audio{" "}
                  <PulseLoader size={10} color="#36d7b7" />
                </h2>
                <div className="absolute bottom-0 w-full">
                  <img src={loadingImage} alt="" width={1920} />
                </div>
              </div>
            ) : (
              <div className="w-[80%] flex flex-col gap-4 justify-center">
                <form
                  className="text-white flex flex-col gap-4 justify-center items-center"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <h2 className="text-2xl font-bold">Drop Your File Here</h2>
                  <section className="container w-1/2 bg-gray-200 text-black rounded-md ">
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      className="m-2 border-[2px] border-black border-dashed border-opacity-20 p-4 cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <p className="text-gray-400">
                        Drag 'n' drop audio file here, or click to select files
                      </p>
                    </div>
                    {files.length > 0 && (
                      <aside className="px-4">
                        <h4>Files :</h4>
                        <ul>{files}</ul>
                      </aside>
                    )}
                  </section>
                  {/* <input type="file" onChange={(e) => handleChange(e)} /> */}
                  {isloading ? (
                    <button
                      className="w-48 bg-[#297b63]  text-black rounded-full p-2 hover:bg-[#3ab38f] transition flex justify-center gap-2 items-center"
                      disabled
                    >
                      Loading
                    </button>
                  ) : (
                    <button
                      className="w-48 bg-[#46d7ac] text-black rounded-full p-2 hover:bg-[#3ab38f] transition flex justify-center gap-2 items-center"
                      type="submit"
                    >
                      <UploadCloud size={20} />
                      Upload
                    </button>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Table  */}
      {/* {data.length > 0 && (
        <div className="w-full p-4">
          <table className="w-full bg-white p-2 rounded-lg">
            <thead className="text-left p-2 font-bold text-blue-950">
              <tr>
                <th className="p-2 pl-4">Name</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Size</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, _) => (
                <tr key={_} className={_ % 2 == 0 ? "bg-gray-200" : ""}>
                  <td className="p-2 pl-4">{d.product_name}</td>
                  <td className="p-2">{d.quantity}</td>
                  <td className="p-2 flex">
                    {d.product_size?.map((s, _) => (
                      <p key={_}>
                        {s?.value}
                        {s?.unit} {s?.sign}
                      </p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
      <div className="w-full flex justify-center items-center my-8 gap-4">
        {data.length > 0 && (
          <div className="w-[900px] flex flex-col justify-start gap-4">
            {data.map((p, idx) => {
              if (p.search_prod_list) {
                if (p.search_prod_list.length > 0) {
                  return (
                    <div className="block bg-white p-4 my-2 w-full" key={idx}>
                      <p className="border border-b-2 border-t-0 border-l-0 border-r-0 p-2 pl-0 font-bold">
                        {p.product_name}
                      </p>
                      <div className="flex gap-2 pt-2">
                        {p.search_prod_list &&
                          p.search_prod_list.map((sp, _) => (
                            <label key={_}>
                              <div
                                key={_}
                                className="border-2 w-40 p-4  flex flex-col items-center gap-1"
                              >
                                <div className="w-32 h-32 relative overflow-hidden object-cover">
                                  <input
                                    type="checkbox"
                                    name={idx.toString()}
                                    className="absolute right-0"
                                  />
                                  <img
                                    className="object-cover w-full h-full"
                                    src={sp.image_link}
                                    alt=""
                                  />
                                </div>
                                <div key={_} className="text-xs font-bold">
                                  {sp.product_name}
                                </div>
                                <div
                                  key={_}
                                  className="font-bold text-left w-full"
                                >
                                  ₹{sp.price}
                                </div>
                              </div>
                            </label>
                          ))}
                      </div>
                    </div>
                  );
                }
              }
            })}
            <div className="w-full text-right">
              <button className="px-8 py-2 rounded-full bg-[#46d7ac] font-bold">
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
