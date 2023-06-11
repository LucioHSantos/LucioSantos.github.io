class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    this.formButton.disabled = true;
    this.formButton.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);

      var nome = document.getElementById("nome").value;
      var email = document.getElementById("email").value;
      var mensagem = document.getElementById("mensagem").value;

      if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, atualize a página e preencha todos os campos.");
        return;
      }

      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.form.addEventListener("submit", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: ".form",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada! <br> Obrigado pelo contato, retornarei assim que possível.</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem. Tente novamente por favor.</h1>",
});
formSubmit.init();
