import "../assets/styles/styles.scss";
import "./form.scss";


const form = document.querySelector("#form");
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener('submit', async event => {
    event.preventDefault();
    console.log("hello1");
    const formData = new FormData(form);

    const entries = formData.entries();
    const article= Object.fromEntries(entries);
    if (formIsValid(article))
    {
        try{
            const json = JSON.stringify(article);
            const response = await fetch("https://restapi.fr/api/articles", {
                method: "POST",
                body: json,
                headers: {
                    "content-type": "application/json"
                }
            });
        const body = await response.json();
        console.log(body);
    } catch (e) {
      console.error("e : ", e);
    }
    }
});

const formIsValid = article => {
    if (!article.author || !article.category || !article.content)
    {
        console.log('hello');
        errors.push("Vous devez renseigner tous les champs");
        console.log(errors)
        errors.forEach(e =>{ 
            errorElement.innerHTML = `<li>${e}</li>`;
        })
        return false;
    }
    else
    {
        errors = [];
        errorElement.innerHTML = "";
        return true;
    }
}