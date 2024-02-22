import { Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { voiceFileResponse } from "../interfaces/voiceFileInterface";
import { useDropzone } from "react-dropzone";

const UploadForm = () => {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<voiceFileResponse[]>([]);
  //dropzone
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   if (event.target.files) {
  //     setFile(event.target.files[0]);
  //     console.log(event.target.files[0]);
  //   }
  // }

  const fetchData = async (file: any) => {
    const url = "http://localhost:8000/send-voice-file";
    let bodyContent = new FormData();
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
    <div className="w-[80%] flex flex-col gap-4">
      <form
        className="text-white flex flex-col gap-4"
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
            <Upload size={20} />
            Upload
          </button>
        )}
      </form>
      {data.length > 0 && (
        <div className="w-full">
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
      )}
    </div>
  );
};

export default UploadForm;
