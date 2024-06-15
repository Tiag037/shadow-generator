"use client";
import React, { useState } from "react";
import { ImageGenerator } from "./ImageGenerator";

const Home = () => {
  const [settings, setSettings] = useState({
    padding: 16,
    shadow: 4,
    radius: 8,
  });
  const [image, setImage] = useState();

  const setSetting = (key, value) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const file = files[0];

    //lire les info de l'image, recuperer sa width et height et sa src en base64
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setImage({
          widh: img.width,
          height: img.height,
          src: img.src,
          name: file.name,
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };
  console.log(image);
  return (
    <main className="flex justify-center items-center m-auto max-w-4xl max-lg:flex-col gap-8 min-h-full	">
      <div>
        <div className="card w-96 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Settings</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">File</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                onChange={handleFileChange}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Padding</span>
              </div>
              <input
                type="range"
                value={settings.padding}
                min={0}
                max={99}
                step={5}
                className="range range-primary"
                onChange={(e) => setSetting("padding", Number(e.target.value))}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Shadow</span>
              </div>
              <input
                type="range"
                value={settings.shadow}
                min={0}
                max={99}
                step={5}
                className="range range-primary"
                onChange={(e) => setSetting("shadow", Number(e.target.value))}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Radius</span>
              </div>
              <input
                type="range"
                value={settings.radius}
                min={0}
                max={99}
                className="range range-primary"
                step={5}
                onChange={(e) => setSetting("radius", Number(e.target.value))}
              />
            </label>
          </div>
        </div>
      </div>
      <div className=" h-fit border rounded-md">
        <ImageGenerator settings={settings} image={image} />
      </div>
    </main>
  );
};

export default Home;
