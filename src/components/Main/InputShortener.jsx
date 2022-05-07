import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const InputShortener = () => {
  const [urlList, setUrlList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  

  useEffect(() => {
    fetchUrls();
  }, []);
 

  let fetchUrls = async () => {
    try {
     
      let allUrls = await axios.get(
        "https://url-shortner-url-backend.herokuapp.com/getUrls"
      );
      setUrlList(allUrls.data);
    } catch (error) {
      console.log(error);
     
    }
  };

  let handleDelete = async (id) => {
    try {
      let result = window.confirm("Are you sure want to delete?");
      if (result) {
        await axios.delete(`https://url-shortner-url-backend.herokuapp.com/url/${id}`);
        fetchUrls();
        
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
       
        axios.post("https://url-shortner-url-backend.herokuapp.com/create-url", values);
       
       
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      
      fetchUrls();
     
    },
   
  });
  
  return (
    <>
      <div className="inputContainer">
        <h1>
          URL <span>Shortener</span>
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="url"
            placeholder="Place your url..."
            onChange={formik.handleChange}
            value={formik.values.url}
            required
          />
          <button className="result">shorten</button>
        </form>
      </div>
    {loading?<p className="text-light">Click refresh button...</p>:""}
          <div class="d-flex justify-content-center" >
            <table class="table table-info table-hover table-bordered border-light">
            {urlList.map((url, index) => {
        return (
          <>
              <thead key={index}>
                <tr>
                  <th scope="col">Short Url</th>
                  <th scope="col">Remove</th>
                  <th scope="col">Clicks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a
                      href={url.url}
                      rel="noreferrer"
                      target="_blank" onClick={()=> setCount(count+1)}
                    >{`${url.shortUrl}`}</a>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(url._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                  <td>{count}</td>
                </tr>
              </tbody>
              </>
               );
              })}
            </table>
          </div>
       
    </>
  );
};

export default InputShortener;
