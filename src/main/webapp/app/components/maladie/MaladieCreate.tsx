import React, { useState } from 'react';
import axios from 'axios';

function MaladieCreate() {
  const [numberOfLevels, setNumberOfLevels] = useState(0);
  const [levelInputs, setLevelInputs] = useState([]);
  const [descriptionInputs, setDescriptionInputs] = useState([]);
  const [fileInputs, setFileInputs] = useState([]);

  const newLevels = [...levelInputs];

  function handleNumberChange(e) {
    const newNumberOfLevels = parseInt(e.target.value, 10);

    if (newNumberOfLevels > numberOfLevels) {
      setLevelInputs(prev => [...prev, ...Array(newNumberOfLevels - numberOfLevels)]);
      setDescriptionInputs(prev => [...prev, ...Array(newNumberOfLevels - numberOfLevels)]);
      setFileInputs(prev => [...prev, ...Array(newNumberOfLevels - numberOfLevels)]);
    } else if (newNumberOfLevels < numberOfLevels) {
      setLevelInputs(prev => prev.slice(0, newNumberOfLevels));
      setDescriptionInputs(prev => prev.slice(0, newNumberOfLevels));
      setFileInputs(prev => prev.slice(0, newNumberOfLevels));
    }

    setNumberOfLevels(newNumberOfLevels);
  }

  const [data, setData] = useState({
    fullName: '',
    abbr: '',
  });

  const handleSumbit = () => {
    console.log('send data');
    const levels = levelInputs.map((level, index) => ({
      level: levelInputs[index],
      description: descriptionInputs[index],
      images: fileInputs[index],
    }));
    setData(prevData => ({
      ...prevData,
      levels,
    }));

    console.log(data);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const changeLevelNameAndDescription = async () => {
    const dataJson = {
      maladie: {
        fullName: data.fullName,
        abbr: data.abbr,
        stades: [],
      },
    };
    for (let i = 0; i < levelInputs.length; i++) {
      console.log(levelInputs[i]);
      const newDataStade = {
        stade: levelInputs[i],
        description: descriptionInputs[i],
        imageStades: [],
      };
      for (const file of fileInputs) {
        const FR = new FileReader();

        FR.readAsDataURL(this.files[0]);

        // newDataStade.imageStades.push(string64)
      }

      dataJson.maladie.stades.push(newDataStade);
    }

    console.log(dataJson);

    axios
      .post('/api/maladies/save', dataJson)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const changeImage = () => {
    var imgBase64Arr = [];

    for (var i = 0; i < fileInputs.length; i++) {
      (function (i) {
        var FR = new FileReader();
        FR.onload = function (e) {
          imgBase64Arr.push(e.target.result); // adding base64 value to array

          if (i === fileInputs.length - 1) {
            // after all files are processed
            submitData(imgBase64Arr);
          }
        };

        FR.readAsDataURL(fileInputs[i]);
      })(i);
    }

    function submitData(imgBase64Arr) {
      console.log(imgBase64Arr);
    }
  };

  function getBase64Image(img): string {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(img, 0, 0);
      const dataURL: string = canvas.toDataURL('image/png');
      return dataURL.replace(/^data:image\/?[A-z]*;base64,/, '');
    } else {
      throw new Error('Canvas 2D context is not supported');
    }
  }

  //
  function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1]; // Extract base64 string
          resolve(base64String);
        } else {
          reject(new Error('Invalid result type'));
        }
      };

      reader.onerror = error => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="row">
      <div className="card mt-1 offset-md-3 col-md-6">
        {/*<button onClick={() => changeImage()} >Show data</button>*/}
        <div className="card-header">New disease</div>
        <div className="card-body">
          <label className="form-label">Full name</label>
          <input type="text" name="fullName" className="form-control" onChange={handleChange} />
          <label className="form-label">Abbreviation</label>
          <input type="text" name="abbr" className="form-control" onChange={handleChange} />

          <label className="form-label">Number of levels</label>
          <input type="number" className="form-control" value={numberOfLevels} onChange={e => handleNumberChange(e)} />

          {levelInputs.map((_, index) => (
            <div key={index}>
              <label className="form-label">{`Level ${index + 1}`}</label>
              <input
                type="text"
                name={`level-${index}`}
                className="form-control"
                onChange={e => {
                  const newLevels = [...levelInputs];
                  newLevels[index] = e.target.value;
                  setLevelInputs(newLevels);
                }}
              />

              <label className="form-label">{`Description for Level ${index + 1}`}</label>
              <textarea
                name={`description-${index}`}
                className="form-control"
                value={descriptionInputs[index] || ''}
                onChange={e => {
                  const newDescriptions = [...descriptionInputs];
                  newDescriptions[index] = e.target.value;
                  setDescriptionInputs(newDescriptions);
                }}
              />

              <label className="form-label">{`Select images for Level ${index + 1}`}</label>
              <input
                type="file"
                name={`images-${index}`}
                className="form-control"
                multiple
                onChange={e => {
                  const newFiles = [...fileInputs];
                  newFiles[index] = Array.from(e.target.files);
                  setFileInputs(newFiles);
                }}
              />

              {fileInputs[index] && fileInputs[index].length > 0 && (
                <div className="row">
                  {fileInputs[index].map((file, fileIndex) => (
                    <div key={fileIndex} className="col-md-2">
                      <img src={URL.createObjectURL(file)} alt={`Image ${fileIndex + 1}`} className="img-thumbnail m-1" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="btn btn-primary p-2 m-2" onClick={() => handleSumbit()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default MaladieCreate;
