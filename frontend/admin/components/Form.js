class Form {
  constructor(
    data={
      img: "",
      name: "",
      description: "",
  }){
    const form = document.querySelector("form");
    form.innerHTML = `
    <label class="imageInput" for="filePicker">
      <p>click <span>here</span> to add an image from your device</p>
      <input class="filePicker" type="file" name="" id="filePicker" accept="image/*" alt="" />
      <p class="uploadedImage" style="background-image: url('${data.img}'); background-size: cover;"></p>
    </label>
    <button class="imgButton" type="button">upload</button>
    <div class="cardTitles">
      <input type="text" name="" id="" value="${data.name}" placeholder="product name" />
      <input type="text" name="" id="" value="${data.description}" placeholder="write short and attention sparking description" />
    </div>
    <textarea class="description" name="" id="" placeholder="enter full spec details here" rows="8" cols="40"></textarea>
    <fieldset>
      <button class="reset" type="reset">clear edit</button>
      <button class="submit" type="submit">add</button>
    </fieldset>
    `;
    this.setEventHandlers();
    this.el = form;
  }
  setEventHandlers(){
    // clear button handler
    const clearForm = () => {
      new Form();
    }
    const clear = document.querySelector("form button[type='reset']");
    clear.addEventListener("click", clearForm);
    
    // image picker handler
    const pickFile = (e) => {
    const el = e.currentTarget;
    const image = el.files[0];
    const imageURL = URL.createObjectURL(image);
    const uncompressedImg = new Image();
    uncompressedImg.src = imageURL;
    
    uncompressedImg.onload = () => {
      const newUploadedImage = document.createElement("p");
      const uploadedImage = document.querySelector(".uploadedImage");
      uploadedImage.replaceWith(newUploadedImage);
      newUploadedImage.outerHTML = `<p class="uploadedImage" style="background-image: url('${imageURL}'); background-size: cover;"></p>`;
      console.log(uploadedImage.outerHTML);
      
      // image compression using HTML canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext("2d");
      canvas.width = uncompressedImg.naturalWidth;
      canvas.height = uncompressedImg.naturalHeight;
      ctx.drawImage(uncompressedImg,  0, 0);
      let source = canvas.toDataURL("image/webp", 0.75);
      source = source.replace("data:image/webp;base64,", "");
      // const data = new FormData();
    }
  }
  const filePicker = document.querySelector(".filePicker");
  filePicker.addEventListener("change", pickFile);
  }
}

export default Form;