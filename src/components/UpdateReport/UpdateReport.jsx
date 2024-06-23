import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


const UpdateReport = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const id = useParams()
  const [file, setFile] = useState(null)
  console.log(id)

  const handleBack = ()=>{
    dispatch({ type: "FETCH_REPORT" })
    history.push("/")
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = ()=>{
    // console.log('file', file)
    if (!file) {
        alert('Please select a file');
        return;
      }
      
      const formData = new FormData()
      formData.append('file', file)
      console.log(formData.get('file'))

      dispatch({type: 'ADD_REPORT', payload: {file: formData, id: id.id}})
      setFile(null)

  }

  return (
    <>
      <button onClick={() => handleBack()}>Back to Report</button>

      <h1>Update Form will go here</h1>
    
      <input type="file" onChangeCapture={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    
    </>
  );
};

export default UpdateReport;
