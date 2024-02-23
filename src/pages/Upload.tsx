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

const mockData = [
  {
    product_name: "Texture Conceptor Stonex C307 Texture Paint",
    quantity: 5,
    product_size: [],
    search_prod_list: [
      {
        product_code: "QAZW017",
        product_name: "Texture Concepts Stonex C 304 Texture Paint",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/t/e/texc304.png",
        price: "48940",
        varient: null,
      },
      {
        product_code: "QAZW013",
        product_name: "Texture Concepts Stonex C 308 Texture Paint",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/t/e/texc308.png",
        price: "48940",
        varient: null,
      },
      {
        product_code: "QAZW016",
        product_name: "Texture Concepts Stonex C 305 Texture Paint",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/t/e/texc305.png",
        price: "48940",
        varient: null,
      },
      {
        product_code: "QAZW018",
        product_name: "Texture Concepts Stonex C 303 Texture Paint",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/t/e/texc303.png",
        price: "48940",
        varient: null,
      },
      {
        product_code: "QAZW020",
        product_name: "Texture Concepts Stonex C 301 Texture Paint",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/t/e/texc301.png",
        price: "48940",
        varient: null,
      },
    ],
  },
  {
    product_name: "Grohe Essence Black",
    quantity: 8,
    product_size: [],
    search_prod_list: [
      {
        product_code: "QAZW005",
        product_name: "Grohe Essence Black",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/4/0/40689a01_1.jpg",
        price: "76690",
        varient: null,
      },
      {
        product_code: "QAZW006",
        product_name: "Grohe Essence 35mm Black",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/3/3/33624a01_1.jpg",
        price: "48490",
        varient: null,
      },
      {
        product_code: "QAZW007",
        product_name: "Grohe Essence 28mm Black",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/2/3/23462a01_1.jpg",
        price: "24560",
        varient: null,
      },
    ],
  },
  {
    product_name: "Vector Silk Water Tank",
    quantity: 2,
    product_size: [],
    search_prod_list: [
      {
        product_code: "QAZW022",
        product_name: "Vectus Silk Water Tank",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/v/e/vecslk.png",
        price: "48940",
        varient: null,
      },
    ],
  },
  {
    product_name: "Birla Pivot Ceramic Wall Tiles",
    quantity: 6361,
    product_size: [
      {
        value: 300,
        unit: "mm",
        sign: "x",
      },
      {
        value: 450,
        unit: "mm",
        sign: "",
      },
    ],
    search_prod_list: [
      {
        product_code: "QAZW055",
        product_name:
          "Birla Pivot Ceramic Wall Tiles - 300 mm x 450 mm - 6361 D P2",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/placeholder/default/Product_Pivot_Default.jpeg",
        price: "500",
        varient: null,
      },
      {
        product_code: "QAZW062",
        product_name: "Birla Pivot Ceramic Floor Tiles",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/b/p/bpt-bristoblue_1.png",
        price: "900",
        varient: null,
      },
      {
        product_code: "QAZW056",
        product_name:
          "Birla Pivot Ceramic Floor Tiles - 300 mm x 300 mm - 6361 P6",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/placeholder/default/Product_Pivot_Default.jpeg",
        price: "500",
        varient: null,
      },
      {
        product_code: "QAZW010",
        product_name: "Birla White Precoat Cement Based Putty - 30 Kg",
        summary: "",
        image_link:
          "https://www.birlapivot.com/media/catalog/product/b/i/birlawhitelogo.png",
        price: "48940",
        varient: null,
      },
    ],
  },
];

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
    const url = "https://3.110.223.20/send-voice-file";
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
            <div className="w-[80%] flex flex-col gap-4 justify-center">
              <form
                className="text-white flex flex-col gap-4 justify-center items-center"
                onSubmit={(e) => handleSubmit(e)}
              >
                <h2 className="text-2xl font-bold">Upload Your File Here</h2>
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
          <div className="w-[900px] flex flex-wrap justify-start gap-4">
            {data.map((p, idx) => {
              if (p.search_prod_list) {
                if (p.search_prod_list.length > 0) {
                  return (
                    <div
                      className="block bg-white p-4 my-2 max-w-fit"
                      key={idx}
                    >
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
                                    type="radio"
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
                                  {sp.price}
                                </div>
                              </div>
                            </label>
                          ))}
                      </div>
                    </div>
                  );
                }
                // if (p.search_prod_list.length === 1)
                //   return (
                //     <label className="">
                //       <div className=" bg-white p-4 my-2 max-w-fit" key={idx}>
                //         <p className="border border-b-2 border-t-0 border-l-0 border-r-0 p-2 pl-0 font-bold">
                //           {p.product_name}
                //         </p>
                //         <div className="flex gap-2 pt-2">
                //           {p.search_prod_list &&
                //             p.search_prod_list.map((sp, _) => (
                //               <div
                //                 key={_}
                //                 className="border-2 w-40 p-4  flex flex-col items-center gap-1"
                //               >
                //                 <div className="w-32 h-32 relative overflow-hidden object-cover">
                //                   <input
                //                     type="radio"
                //                     name={idx.toString()}
                //                     className="absolute right-0"
                //                   />
                //                   <img
                //                     className="object-cover w-full h-full"
                //                     src={sp.image_link}
                //                     alt=""
                //                   />
                //                 </div>
                //                 <div key={_} className="text-xs font-bold">
                //                   {sp.product_name}
                //                 </div>
                //                 <div
                //                   key={_}
                //                   className="font-bold text-left w-full"
                //                 >
                //                   {sp.price}
                //                 </div>
                //               </div>
                //             ))}
                //         </div>
                //       </div>
                //     </label>
                //   );
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
