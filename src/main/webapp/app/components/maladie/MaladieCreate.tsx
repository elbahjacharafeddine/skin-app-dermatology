import React, { useEffect, useState } from 'react';
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
    maladie: {
      fullName: '',
      abbr: '',
      stades: [],
    },
  });

  const handleSumbit = () => {
    console.log('send data');
    const stades = levelInputs.map((level, index) => ({
      level: levelInputs[index],
      description: descriptionInputs[index],
      images: fileInputs[index],
    }));
    setData(prevData => ({
      ...prevData,
      stades,
    }));

    console.log(data);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prevData => ({
      maladie: {
        ...prevData.maladie,
        [name]: value,
      },
    }));
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

  const [notifySenddata, setNotifySendDada] = useState(false);
  const [imagesTransfered, setImagesTransfered] = useState([]);
  const handleSubmitData = async () => {
    console.log('je vais transferer data vers le backend');

    for (let i = 0; i < levelInputs.length; i++) {
      console.log(levelInputs[i]);
      const newStade = {
        stade: levelInputs[i],
        description: descriptionInputs[i],
        imageStades: [],
      };

      for (let j = 0; j < fileInputs[i].length; j++) {
        newStade.imageStades.push({
          picture: imagesTransfered[i][j],
        });
      }
      console.log('new stade is');
      console.log(newStade);

      setData(prevData => ({
        maladie: {
          ...prevData.maladie,
          stades: [...prevData.maladie.stades, newStade],
        },
      }));
    }
    setNotifySendDada(false);
  };

  useEffect(() => {
    if (notifySenddata) {
      handleSubmitData();
    }
  }, [notifySenddata]);

  const convertFilesToBase64 = async () => {
    try {
      console.log('je vais transferer les images au base 64');
      const base64List = await Promise.all(
        fileInputs.map(async files => {
          const base64Images = await Promise.all(
            files.map(file => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                  const result = reader.result as string;
                  const base64Data = result.split(',')[1];
                  resolve(base64Data);
                };
                reader.onerror = error => reject(error);
                reader.readAsDataURL(file);
              });
            }),
          );
          return base64Images;
        }),
      );

      // console.log('Base64 Images:', base64List);
      setImagesTransfered(base64List);
      setNotifySendDada(true);
      return base64List;
    } catch (error) {
      console.error('Erreur lors de la conversion des fichiers en base64', error);
      throw error;
    }
  };

  const handleSendToServer = async () => {
    await axios
      .post('/api/maladies/save', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    // console.log(data)
  };

  return (
    <div className="row p-4">
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
          <button className="btn btn-primary p-2 m-2" onClick={() => handleSendToServer()}>
            Save
          </button>

          <button className="btn btn-primary p-2 m-2" onClick={() => convertFilesToBase64()}>
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}

export default MaladieCreate;
